import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importWallet } from "../utils/mnemonic";

import useOnScreen from "../hooks/useOnScreen";
import ScrollDownIcon from "../scroll.png";

export default function GetCredentials() {
  const [isLoading, setIsLoading] = useState(false);

  const [Mnemonic, setMnemonic] = useState("");
  const [Metadata, setMetadata] = useState([]);
  const [CopyData, setCopyData] = useState([]);

  const topRef = useRef();
  const bottomButtonRef = useRef();

  const isPageOnTop = useOnScreen(topRef);

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
      setMetadata(pkData[0]);
      setCopyData(pkData[0]);
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

        <div
          style={{ width: "100%", height: "5px", background: "transparent" }}
          ref={topRef}
        />
        <h2 style={{ fontWeight: "600", marginBottom: "20px" }}>
          Get Credentials
        </h2>
        <p1 style={{ marginBottom: "20px", fontWeight: "200" }}>
          Note: We don't store or send your secret phrase anywhere.
          <br />
          <br />
          Everything is done on your local system and no network calls are made
          to generate credentials from your secret phrase.
          <br />
          <br />
          At this point you can also turn off your internet and proceed with
          below steps.
          {/* <br /> */}
          {/* <br /> */}
          {/* <ol>
            <li>
              Copy your Discord ID from your account (see article{" "}
              <a
                href="https://www.businessinsider.com/guides/tech/discord-id#:~:text=To%20find%20a%20user's%20Discord,sidebar%20and%20select%20Copy%20ID."
                target="_blank"
                rel="noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                here
              </a>
              ). Please make sure that you only copy your unique Discord ID and
              not a server nickname or part of your username. Eg ID:
              884524840114061379.
            </li>
            <br />
            <li>
              Enter old mnemonic phrase in the web app to authenticate your old
              account address (Martian Wallet does NOT save this mnemonic phrase
              anywhere on the server)
            </li>
            <br />
            <li>
              Connect your wallet containing new account address and sign the
              account recovery authentication.
              <br />
              <br />
              Please understand that any assets in your previous wallets are
              wiped by the Aptos network reset every week and it’s impossible to
              recover those assets. The Aptos team does this to prepare for a
              safe and reliable mainnet for all users.
            </li>
          </ol> */}
        </p1>
        {/* <iframe
          src="https://www.youtube.com/embed/1tLiFMLXkZk"
          width="853"
          height="480"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Binding your old wallet to new wallet"
        />{" "} */}
        {/* <div
          style={{
            position: "fixed",
            bottom: "50%",
            right: "60px",
            display: isPageOnTop ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            transform: "translateY(50%)",
          }}
          onClick={() =>
            bottomButtonRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <img
            src={ScrollDownIcon}
            alt="Scroll Icon"
            style={{
              width: "30px",
              height: "30px",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
          <p1>Scroll Down</p1>
        </div> */}

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
          {`Step 1 -> Generate Credentials`}
          {isLoading && <div id="loader"></div>}
        </button>
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
          {Object.keys(Metadata).map((val, idx) => (
            <h5 key={idx} style={{ margin: 10 }}>
              {val} : {Metadata[val]}
            </h5>
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
          {`Step 2 -> Copy Credentials`}
        </button>
      </div>
    </>
  );
}
