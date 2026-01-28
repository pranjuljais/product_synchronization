import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateBank = ({ bankData }) => {
  const { backendUrl, token, loading, setLoading } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bank: "",
    branch: "",
    account: "",
    ifsc: "",
  });

  useEffect(() => {
    if (bankData) {
      setBankDetails({
        bank: bankData.bank || "",
        branch: bankData.branch || "",
        account: bankData.account || "",
        ifsc: bankData.ifsc || "",
      });
    }
  }, [bankData]);

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
        setIsEditing(false);
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
    <form
      onSubmit={onSubmitHandler}
      className="w-100 p-4 border rounded space-y-2"
    >
      <p className="font-medium text-xl">Bank Details</p>

      <div className="flex items-center gap-2">
        <label className="w-32">Bank Name:</label>
        <input
          type="text"
          value={bankDetails.bank}
          disabled={!isEditing}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, bank: e.target.value })
          }
          className="flex-1 outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="w-32">Branch:</label>
        <input
          type="text"
          value={bankDetails.branch}
          disabled={!isEditing}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, branch: e.target.value })
          }
          className="flex-1 outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="w-32">Account No:</label>
        <input
          type="text"
          value={bankDetails.account}
          disabled={!isEditing}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, account: e.target.value })
          }
          className="flex-1 outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="w-32">IFSC:</label>
        <input
          type="text"
          value={bankDetails.ifsc}
          disabled={!isEditing}
          onChange={(e) =>
            setBankDetails({ ...bankDetails, ifsc: e.target.value })
          }
          className="flex-1 outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>

      <div className="pt-2">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded bg-amber-700 text-white font-medium"
          >
            Edit
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-green-700 text-white font-medium"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        )}
      </div>
    </form>
  );
};

export default UpdateBank;
