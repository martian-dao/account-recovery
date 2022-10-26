import React from "react";
import { Routes, Route } from "react-router-dom";
import GetCredentials from "../components/GetCredentials";
import GetCredBrute from "../components/GetCredsBrute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetCredentials />} />
      <Route path="/brute" element={<GetCredBrute />} />
    </Routes>
  );
};

export default AppRoutes;
