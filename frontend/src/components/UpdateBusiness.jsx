import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateBusiness = () => {
  const [updateBusiness, setUpdateBusiness] = useState(true);
  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    phone: "",
    address: "",
    gst: "",
    pan: "",
    msme: "",
  });

  const { backendUrl, token, loading, setLoading } = useContext(AppContext);

  const onBusinessUpdate = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = axios(
        `${backendUrl}/profile/business`,
        businessDetails,
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
    <form className="w-100 p-2 border rounded" onSubmit={onBusinessUpdate}>
      <p className="font-medium text-xl">Business Details</p>
      <div className="flex items-center gap-2">
        <label>Business Name:</label>
        <input
          type="text"
          name="name"
          value={businessDetails.name}
          onChange={(e) =>
            setBusinessDetails({ ...businessDetails, name: e.target.value })
          }
          placeholder="Business Name"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>Business Address:</label>
        <input
          type="text"
          name="address"
          value={businessDetails.address}
          onChange={(e) =>
            setBusinessDetails({
              ...businessDetails,
              address: e.target.value,
            })
          }
          placeholder="Business Address"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={businessDetails.phone}
          onChange={(e) =>
            setBusinessDetails({
              ...businessDetails,
              phone: e.target.value,
            })
          }
          placeholder="Account Number"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>GST Number:</label>
        <input
          type="text"
          name="gst"
          value={businessDetails.gst}
          onChange={(e) =>
            setBusinessDetails({ ...businessDetails, gst: e.target.value })
          }
          placeholder="GST Number"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>PAN Number:</label>
        <input
          type="text"
          name="pan"
          value={businessDetails.pan}
          onChange={(e) =>
            setBusinessDetails({ ...businessDetails, pan: e.target.value })
          }
          placeholder="PAN Number"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label>MSME Number:</label>
        <input
          type="text"
          name="msme"
          value={businessDetails.msme}
          onChange={(e) =>
            setBusinessDetails({ ...businessDetails, msme: e.target.value })
          }
          placeholder="MSME Number"
          className="outline-none border border-gray-300 px-3 py-1 rounded"
        />
      </div>
      {updateBusiness ? (
        <p
          onClick={() => setUpdateBusiness(false)}
          className="cursor-pointer w-13 px-3 py-2 rounded bg-amber-700 text-white font-medium"
        >
          Edit
        </p>
      ) : (
        <button
          onClick={() => setUpdateBusiness(true)}
          className="cursor-pointer px-3 py-2 rounded bg-green-700 text-white font-medium"
          type="submit"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      )}
    </form>
  );
};

export default UpdateBusiness;
