import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://648b04fe17f1536d65ea23c6.mockapi.io";

const AddData: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/SimpleCrud`, {
        name,
        age,
        gender,
        status,
      });
      navigate("/dashboard"); // Redirect back to the dashboard
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-ChakraPetch">
      <div className="bg-[#FEA1A1] rounded-lg p-8 shadow-md w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Add New Data
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 px-6">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>

            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4 px-6">
            <label htmlFor="age" className="block font-medium">
              Age
            </label>

            <input
              type="text"
              id="age"
              className="w-full px-3 py-2 border rounded"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <div className="mb-4 px-6">
            <label htmlFor="gender" className="block font-medium">
              Gender
            </label>

            <select
              id="gender"
              className="w-full px-3 py-2 border rounded"
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4 px-6">
            <label htmlFor="status" className="block font-medium">
              Status
            </label>

            <select
              id="status"
              className="w-full px-3 py-2 border rounded"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="p-2 bg-white text-black rounded">
              Add Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddData;
