import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importWallet } from "../utils/mnemonic";

import useOnScreen from "../hooks/useOnScreen";
import ScrollDownIcon from "../scroll.png";

const GOOGLE_FORM_URL = "https://forms.gle/Wt2oJDJvw3EpSed28";

export default function GenerateAddresses() {
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
      toast.success(`Metadata copied to clipboard!`);
    } catch (err) {
      toast.error(err);
    }
  };

  const openGoogleForm = () => {
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

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

        <div
          style={{ width: "100%", height: "5px", background: "transparent" }}
          ref={topRef}
        />
        <p1 style={{ marginBottom: "20px", fontWeight: "600" }}>
          We understand that some ecosystem projects have used your previous
          devnet account addresses to reward/airdrop. Please know that there is
          a high probability that your devnet address can be wiped out during
          the Aptos network reset and you would not have the same account on
          mainnet. The Martian Wallet team does not have any control over this.
          <br />
          <br />
          We've built a tool that will bind your new account address to your
          previous account address. We will share your new account address
          linked to your old account address with the ecosystem projects so that
          they can replace your old account address with the new account address
          for future airdrops/rewards.
          <br />
          <br />
          Here are the steps to bind your new account address to your old
          account address:
          <br />
          <br />
          <ol>
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
          </ol>
        </p1>

        <div
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
        </div>

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
          ref={bottomButtonRef}
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
