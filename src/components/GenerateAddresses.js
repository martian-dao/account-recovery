import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importWallet } from "../utils/mnemonic";


export default function GenerateAddresses() {
  
  const [isLoading, setIsLoading] = useState(false);

  const [Mnemonic, setMnemonic] = useState("");
  const [Metadata, setMetadata] = useState([]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(Metadata));
    toast.success(`Metadata copied to clipboard!`);
  };

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      let formattedMnemonic = Mnemonic.replace(/\s+/g, " ").trim();
      formattedMnemonic = formattedMnemonic.replace(".", "")
      const addr = await importWallet(formattedMnemonic);
      setMetadata(addr);
    } catch (err) {
      setIsLoading(false);
      console.log("Err", err);
      if (err?.message) {
        toast.error(err.message);
        return;
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ width: "auto", cursor: "pointer" }}
        />

        <h2 style={{ marginBottom: "10px", fontWeight: "600" }}>
          Generate Metadata
        </h2>

        <textarea
          className="input s-step-1"
          placeholder="Enter your secret phrase here"
          type="text"
          onChange={(e) => setMnemonic(e.target.value)}
          value={Mnemonic}
        />
        <button
          onClick={() => handleGenerate()}
          className="filledBtn"
          style={{
            padding: "10px 25px",
            backgroundColor: "#15d791",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Generate
          {isLoading && <div id="loader"></div>}
        </button>
        <h4 style={{marginTop: 20}}>Metadata:</h4>
        <div
          style={{
            overflowY: "scroll",
            width: "500px",
            float: "left",
            height: "300px",
            position: "relative",
            margin: 20
          }}
        >
          {Metadata.map((val, idx) => (
            <h5 key={idx}>{JSON.stringify(val)}</h5>
          ))}
        </div>
        <button
          onClick={() => handleCopy()}
          className="filledBtn"
          style={{
            padding: "10px 25px",
            marginBottom: 50,
            backgroundColor: "#15d791",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Copy Metadata
        </button>
      </div>
    </>
  );
}
