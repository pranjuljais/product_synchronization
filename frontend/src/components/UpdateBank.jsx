import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateBank = () => {
  const [updateBank, setUpdateBank] = useState(true);
  const [bankDetails, setBankDetails] = useState({
    bank: "",
    branch: "",
    account: "",
    ifsc: "",
  });
  const { backendUrl, token, loading, setLoading } = useContext(AppContext);

  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(
        `${backendUrl}/admin/bank`,
        bankDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="w-100 p-2 border rounded">
      <p className="font-medium text-xl">Bank Details</p>
      <div className="flex items-center gap-2">
        <label>Bank Name:</label>
        <input
          type="text"
          name="bank"
          value={bankDetails.bank}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, bank: e.target.value })
          }
          placeholder="Bank Name"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>Branch Address:</label>
        <input
          type="text"
          name="branch"
          value={bankDetails.branch}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, branch: e.target.value })
          }
          placeholder="Branch Address"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>Account Number:</label>
        <input
          type="text"
          name="account"
          value={bankDetails.account}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, account: e.target.value })
          }
          placeholder="Account Number"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>IFSC Code:</label>
        <input
          type="text"
          name="ifsc"
          value={bankDetails.ifsc}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, ifsc: e.target.value })
          }
          placeholder="IFSC Code"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      {updateBank ? (
        <p
          onClick={() => setUpdateBank(false)}
          className="cursor-pointer w-13 px-3 py-2 rounded bg-amber-700 text-white font-medium"
        >
          Edit
        </p>
      ) : (
        <button
          onClick={() => setUpdateBank(true)}
          className="cursor-pointer px-3 py-2 rounded bg-green-700 text-white font-medium"
          type="submit"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      )}
    </form>
  );
};

export default UpdateBank;
