import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GetCredentials from "../components/GetCredentials";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ width: "auto" }}
      />

      <div
        className={`flex flex-row justify-center items-start w-full`}
        style={{
          marginTop: "60px",
          width: "40%",
        }}
      >
        <GetCredentials />
      </div>
    </div>
  );
}
