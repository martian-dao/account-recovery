import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GenerateAddresses from "../components/GenerateAddresses";

export default function Home() {
  const [address, setAddress] = React.useState("...");

  const handleCopy = () => {
    navigator.clipboard.writeText(window.martian.address);

    toast.success(`Address is copied to clipboard!`);
  };

  React.useEffect(() => {
    const inter = setInterval(() => {
      if (window.martian) {
        window.martian
          .account()
          .then((data) => {
            setAddress(
              data.address.slice(0, 6) + "..." + data.address.slice(-4)
            );
          })
          .catch((err) => {
            console.log(err);
            toast.error("Unauthorized, Please reload this page", {
              autoClose: false,
            });
            clearInterval(inter);
          });
      }
    }, 1000);

    return () => {
      clearInterval(inter);
    };
  }, []);

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
        <GenerateAddresses />
      </div>
      <button
        onClick={() => handleCopy()}
        style={{ top: "30px", right: "70px", width: "250px" }}
        className="absolute_div btn text-green"
      >
        {address}
      </button>
    </div>
  );
}
