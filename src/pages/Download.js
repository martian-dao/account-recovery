import React from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RESPONSE_LINK } from "../utils/constants";

export default function Download() {
  const handleDownload = () => {
    toast.success("Download Started");
    window.open(RESPONSE_LINK, "_blank");
  };

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

      {
        <button
          onClick={() => handleDownload()}
          className="btn"
          style={{ padding: "15px 30px" }}
        >
          Download <span className="text-green">Recovery</span>{" "}
          Data
        </button>
      }
    </div>
  );
}
