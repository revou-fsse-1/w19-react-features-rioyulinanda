import React, { useState } from "react";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., call an API)
    if (isRegistering) {
      console.log("Register form submitted!");
    } else {
      console.log("Login form submitted!");
    }
    console.log("Email:", email);
    console.log("Password:", password);
    // Reset form fields
    setEmail("");
    setPassword("");
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className=" bg-[#FEA1A1] rounded-lg p-8"
        style={{
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
        }}
      >
        <h2 className="text-2xl font-bold mb-4 font-ChakraPetch text-center text-white">
          {isRegistering ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md text-white">
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
            {" "}
            <button
              type="submit"
              className="px-4 py-1 bg-white text-black rounded font-ChakraPetch flex items-center"
            >
              {isRegistering ? "Submit" : "Submit"}
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
