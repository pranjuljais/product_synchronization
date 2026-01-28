import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const UpdateTnc = () => {
  const { backendUrl, profile, token, loading, setLoading } =
    useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [tnc, setTnc] = useState([""]);

  // Sync T&C from profile
  useEffect(() => {
    if (!profile) return;

    if (profile.tnc?.length > 0) {
      setTnc(profile.tnc);
      setIsEditing(false);
    } else {
      setTnc([""]);
      setIsEditing(true);
    }
  }, [profile]);

  const addTncRow = () => {
    setTnc((prev) => [...prev, ""]);
  };

  const removeTncRow = (index) => {
    if (tnc.length === 1) return;
    setTnc((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, value) => {
    const updated = [...tnc];
    updated[index] = value;
    setTnc(updated);
  };

  const onTncUpdate = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    const cleanedTnc = tnc.filter((item) => item.trim() !== "");

    if (cleanedTnc.length === 0) {
      toast.error("Please add at least one Terms & Condition");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(
        `${backendUrl}/admin/tnc`,
        { tnc: cleanedTnc },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditing(false);
        setTnc(cleanedTnc);
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
    <div className="max-w-4xl mx-auto bg-white border rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Terms & Conditions
        </h2>

        {!isEditing && (
          <button
            type="button"
            disabled={loading}
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition disabled:opacity-50"
          >
            Edit
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={onTncUpdate} className="space-y-4">
        {tnc.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
          >
            <input
              type="text"
              value={item}
              disabled={!isEditing}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`T&C ${index + 1}`}
              className={`flex-1 px-3 py-2 rounded-lg border outline-none transition
                ${
                  !isEditing
                    ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                    : "bg-white border-gray-300 focus:ring-2 focus:ring-green-500"
                }`}
            />

            {isEditing && (
              <div className="flex items-center gap-1">
                {index === tnc.length - 1 && (
                  <CiCirclePlus
                    onClick={addTncRow}
                    className="text-green-600 cursor-pointer text-2xl hover:scale-110 transition"
                  />
                )}

                {tnc.length > 1 && (
                  <CiCircleMinus
                    onClick={() => removeTncRow(index)}
                    className="text-red-600 cursor-pointer text-2xl hover:scale-110 transition"
                  />
                )}
              </div>
            )}
          </div>
        ))}

        {isEditing && (
          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Save"}
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateTnc;
