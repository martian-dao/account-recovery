import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllPossibleMnemonics, importWallet } from "../utils/mnemonic";
import PrimaryButton from "./PrimaryButton";
import MaterialReactTable from "material-react-table";
import styled from "styled-components";

const TableContainer = styled.div`
  overflow-y: auto;
  padding: 2rem;
  width: 90vw;
  float: left;
  height: auto;
  max-height: 500px;
  position: "relative";
  margin: 20;
  ::-webkit-scrollbar {
    width: 4px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  ::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.9);
  }
`;

export default function GetCredBrute() {
  const [isLoading, setIsLoading] = useState(false);
  const [Mnemonic, setMnemonic] = useState("");
  const [Metadata, setMetadata] = useState([]);
  const [CopyData, setCopyData] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "address", //simple recommended way to define a column
        header: "Address",
      },
      {
        accessorKey: "publicKey", //simple recommended way to define a column
        header: "Public Key",
      },
      {
        accessorKey: "privateKey", //simple recommended way to define a column
        header: "Private Key",
      },
      {
        accessorKey: "derivationPath", //simple recommended way to define a column
        header: "Derivation Path",
      },
    ],
    []
  );

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
      // formattedMnemonic = formattedMnemonic.replace(".", "");
      let allPossibleMnemonics = await getAllPossibleMnemonics(formattedMnemonic);
      allPossibleMnemonics = [...allPossibleMnemonics]
      allPossibleMnemonics.forEach(async (val) => {
          console.log(val)
          let tmp = [...Metadata]
          tmp = [...tmp, ...await importWallet(val)]
          console.log(tmp)
          setMetadata(tmp);
          setCopyData(tmp);
      })

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
          Get Credentials Brute
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
          style={{ width: "50%" }}
          className="input s-step-1"
          placeholder="Enter your secret phrase here"
          type="text"
          onChange={(e) => setMnemonic(e.target.value)}
          value={Mnemonic}
        />
        <PrimaryButton
          onClick={() => handleGenerate()}
          width="50%"
          style={{
            padding: "10px 25px",
            fontWeight: "bold",
          }}
        >
          {isLoading ? "Loading..." : `Step 1 -> Generate Credentials`}
        </PrimaryButton>
        <h4 style={{ marginTop: 20 }}>Metadata:</h4>
        <TableContainer>
          <MaterialReactTable
            columns={columns}
            data={Metadata}
            enablePagination={false} //disable a default feature
          />
        </TableContainer>
        <PrimaryButton
          onClick={() => handleCopy()}
          width="50%"
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
