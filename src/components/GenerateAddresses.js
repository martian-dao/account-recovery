import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importWallet } from "../utils/mnemonic";

const GOOGLE_FORM_URL = "https://forms.gle/"

export default function GenerateAddresses() {
  const [isLoading, setIsLoading] = useState(false);

  const [Mnemonic, setMnemonic] = useState("");
  const [Metadata, setMetadata] = useState([]);
  const [CopyData, setCopyData] = useState([]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(CopyData));
      toast.success(`Metadata copied to clipboard!`);
    } catch (err) {
      toast.error(err);
    }
  };

  const openGoogleForm = () => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  }

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      let formattedMnemonic = Mnemonic.replace(/\s+/g, " ").trim();
      formattedMnemonic = formattedMnemonic.replace(".", "");
      const addr = await importWallet(formattedMnemonic);
      setMetadata(addr);
      const { address, publicKey } = await window.martian.account();
      const { signature } = await window.martian.signMessage(
        JSON.stringify(addr)
      );
      const data = {
        address: address,
        publicKey: publicKey,
        metadataSignature: signature,
        metadata: JSON.stringify(addr),
      };
      setCopyData(data);
    } catch (err) {
      setIsLoading(false);
      console.log("Err", err);
      if (err?.message) {
        toast.error(err.message);
        return;
      } else if (err === "User Rejected the request") {
        toast.error("User rejected the request");
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
          placeholder="Enter your old secret phrase here"
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
          {`Step 1 -> Generate & Sign Metadata`}
          {isLoading && <div id="loader"></div>}
        </button>
        <h4 style={{ marginTop: 20 }}>Metadata:</h4>
        <div
          style={{
            overflowY: "scroll",
            width: "500px",
            float: "left",
            height: "100px",
            position: "relative",
            margin: 20,
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
            marginBottom: 10,
            backgroundColor: "#15d791",
            color: "black",
            fontWeight: "bold",
          }}
        >
          {`Step 2 -> Copy Metadata`}
        </button>
        <button
          onClick={() => openGoogleForm()}
          className="filledBtn"
          style={{
            padding: "10px 25px",
            marginBottom: 50,
            backgroundColor: "#15d791",
            color: "black",
            fontWeight: "bold",
          }}
        >
          {`Step 3 -> Open Google Form`}
        </button>
      </div>
    </>
  );
}
