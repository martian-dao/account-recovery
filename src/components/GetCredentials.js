import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importWallet } from "../utils/mnemonic";
import PrimaryButton from "./PrimaryButton";

export default function GetCredentials() {
  const [isLoading, setIsLoading] = useState(false);
  const [Mnemonic, setMnemonic] = useState("");
  const [Metadata, setMetadata] = useState([]);
  const [CopyData, setCopyData] = useState([]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(CopyData));
      toast.success(`Credentials copied to clipboard!`);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleGenerate = async () => {
    try {
      setIsLoading(true); 
      let formattedMnemonic = Mnemonic.replace(/\s+/g, " ").trim();
      formattedMnemonic = formattedMnemonic.replace(".", "");
      const pkData = await importWallet(formattedMnemonic);
      if (pkData.length === 0) {
        toast.error("Account not found with given address");
        setIsLoading(false);
        return;
      }
      setMetadata(pkData[0]);
      setCopyData(pkData[0]);
    } catch (err) {
      setIsLoading(false);
      if (err?.message) {
        toast.error(err.message);
        setIsLoading(false);
        return;
      } else if (err === "User Rejected the request") {
        toast.error("User rejected the request");
        setIsLoading(false);
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

        <div
          style={{ width: "100%", height: "5px", background: "transparent" }}
        />
        <h2 style={{ fontWeight: "600", marginBottom: "20px" }}>
          Get Credentials
        </h2>
        <p style={{ marginBottom: "20px", fontWeight: "200" }}>
          Note: We don't store or send your secret phrase anywhere.
          <br />
          <br />
          Everything is done on your local system and no network calls are made
          to generate credentials from your secret phrase.
          <br />
          <br />
          At this point you can also turn off your internet and proceed with
          below steps.
        </p>

        <textarea
          className="input s-step-1"
          placeholder="Enter your secret phrase here"
          type="text"
          onChange={(e) => setMnemonic(e.target.value)}
          value={Mnemonic}
        />
        <PrimaryButton
          onClick={() => handleGenerate()}
          width="100%"
          style={{
            padding: "10px 25px",
            fontWeight: "bold",
          }}
        >
          {isLoading ? "Loading..." : `Step 1 -> Generate Credentials`}
        </PrimaryButton>
        <h4 style={{ marginTop: 20 }}>Metadata:</h4>
        <div
          style={{
            overflowY: "scroll",
            width: "700px",
            float: "left",
            height: "100px",
            position: "relative",
            margin: 20,
          }}
        >
          {Metadata &&
            Object.keys(Metadata).map((val, idx) => (
              <h5 key={idx} style={{ margin: 10 }}>
                {val} : {Metadata[val]}
              </h5>
            ))}
        </div>
        <PrimaryButton
          onClick={() => handleCopy()}
          width="100%"
          style={{
            padding: "10px 25px",
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          {`Step 2 -> Copy Credentials`}
        </PrimaryButton>
      </div>
    </>
  );
}
