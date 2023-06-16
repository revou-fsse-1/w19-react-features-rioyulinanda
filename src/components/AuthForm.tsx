import React, { useState } from "react";
import axios from "axios";
import { login } from "./AuthService";
import { useNavigate } from "react-router-dom";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const API_BASE_URL = "https://648b04fe17f1536d65ea23c6.mockapi.io";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        const response = await axios.post(`${API_BASE_URL}/CrudUsers`, {
          email,
          password,
        });
        console.log("Registration successful:", response.data);
      } else {
        await login(email, password);
        console.log("Login successful");
        navigate("/dashboard"); // Redirect to dashboard page
      }

      // Reset form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="bg-[#FEA1A1] rounded-lg p-8"
        style={{
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
        }}
      >
        <h2 className="text-2xl font-bold mb-4 font-ChakraPetch text-center text-white">
          {isRegistering ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md text-black">
          <div className="mb-4 font-ChakraPetch">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4 font-ChakraPetch">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-1 bg-white text-black rounded font-ChakraPetch flex items-center"
            >
              {isRegistering ? "Register" : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-4 font-ChakraPetch">
          <button className="text-black" onClick={handleToggleForm}>
            {isRegistering
              ? "Already have an account? Login"
              : "Need an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
