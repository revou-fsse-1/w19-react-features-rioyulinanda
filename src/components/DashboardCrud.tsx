import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://648b04fe17f1536d65ea23c6.mockapi.io";

interface DataItem {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: string;
}

const DashboardCrud: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<DataItem[]>(
        `${API_BASE_URL}/SimpleCrud`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (item: DataItem) => {
    setEditItemId(item.id);
    setEditName(item.name);
    setEditAge(item.age.toString());
    setEditGender(item.gender);
    setEditStatus(item.status);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE_URL}/SimpleCrud/${editItemId}`, {
        name: editName,
        age: Number(editAge),
        gender: editGender,
        status: editStatus,
      });
      // Refresh the data after update
      fetchData();
      closeEditModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditItemId(null);
    setEditName("");
    setEditAge("");
    setEditGender("");
    setEditStatus("");
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/SimpleCrud/${id}`);
      // Refresh the data after deletion
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen font-ChakraPetch">
      <div className="bg-[#FEA1A1] rounded-lg p-8 shadow-md w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Member's Club Dashboard
        </h2>
        <Link to="/dashboard/add" className="mb-4 inline-block">
          <button className="px-4 py-2 text-white">➕ Add New Data</button>
        </Link>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Age</th>
              <th className="py-2">Gender</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.age}</td>
                <td className="py-2">{item.gender}</td>
                <td className="py-2">{item.status}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-2 py-1 bg-white text-black rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-[#FEA1A1] rounded-lg p-8 shadow-md w-2/3">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              Edit Data
            </h2>
            <form>
              <div className="mb-4 text-white px-8">
                <label htmlFor="edit-name" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  className="w-full px-3 py-2 border rounded text-black"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="mb-4 text-white px-8">
                <label htmlFor="edit-age" className="block font-medium">
                  Age
                </label>
                <input
                  type="text"
                  id="edit-age"
                  className="w-full px-3 py-2 border rounded text-black"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
              </div>
              <div className="mb-4 text-white px-8">
                <label htmlFor="edit-gender" className="block font-medium">
                  Gender
                </label>
                <select
                  id="edit-gender"
                  className="w-full px-3 py-2 border rounded text-black"
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-4 text-white px-8">
                <label htmlFor="edit-status" className="block font-medium">
                  Status
                </label>
                <select
                  id="edit-status"
                  className="w-full px-3 py-2 border rounded text-black"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="px-2 py-2 bg-white text-black rounded mr-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="px-2 py-2 bg-red-500 text-white rounded"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCrud;
