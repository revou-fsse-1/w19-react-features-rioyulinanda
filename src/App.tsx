import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import DashboardCrud from "./components/DashboardCrud";
import AddData from "./components/AddData";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<DashboardCrud />} />
        <Route path="/dashboard/add" element={<AddData />} />
      </Routes>
    </Router>
  );
};

export default App;
