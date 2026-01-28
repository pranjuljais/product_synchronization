import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateTnc = () => {
  const [updateTnc, setUpdateTnc] = useState(true);
  const [tnc, setTnc] = useState([]);

  const { backendUrl, token, loading, setLoading } = useContext(AppContext);

  const addTncRow = () => {
    setTnc([...tnc, ""]);
  };
  const handleTncChange = (index, value) => {
    const updatedTnc = [...tnc];
    updatedTnc[index] = value;
    setTnc(updatedTnc);
  };
  const removeTncRow = (index) => {
    if (tnc.length === 1) return;
    setTnc(tnc.filter((_, i) => i !== index));
  };

  const onTncUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${backendUrl}/profile/tnc`,
        { tnc },
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
    <form onSubmit={onTncUpdate} className="space-y-3">
      <p className="font-medium text-xl">Terms & Conditions</p>

      {tnc.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleTncChange(index, e.target.value)}
            placeholder={`T&C ${index + 1}`}
            className="flex-1 outline-none border border-gray-300 px-3 py-1 rounded"
            disabled={updateTnc}
          />

          {/* Add new row */}
          {index === tnc.length - 1 && (
            <CiCirclePlus
              onClick={addTncRow}
              className="text-green-500 cursor-pointer text-xl"
            />
          )}

          {/* Remove row */}
          {tnc.length > 1 && (
            <CiCircleMinus
              onClick={() => removeTncRow(index)}
              className="text-red-500 cursor-pointer text-xl"
            />
          )}
        </div>
      ))}

      {updateTnc ? (
        <p
          onClick={() => setUpdateTnc(false)}
          className="cursor-pointer inline-block px-3 py-2 rounded bg-amber-700 text-white font-medium"
        >
          Edit
        </p>
      ) : (
        <button
          type="submit"
          onClick={() => setUpdateTnc(true)}
          className="px-3 py-2 rounded bg-green-700 text-white font-medium"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      )}
    </form>
  );
};

export default UpdateTnc;
