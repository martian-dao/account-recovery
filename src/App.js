import React from "react";
import Home from "./pages/Home";
import Logo from "./icons/logo.png";

function App() {
  const websiteLink = "https://www.martianwallet.xyz/"

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
      {
          <Home />
      }
          <a href={websiteLink} target="_blank" style={{ top: "30px", left: "70px" }} className="absolute_div">
                    <img src={Logo} alt="Martian" />
                    <p color="white">Martian</p>
                </a>
      </div>
    </>
  );
}

export default App;
