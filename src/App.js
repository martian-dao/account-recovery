import React from "react";
import Download from "./pages/Download"
import logoSmall from "./logoSmall.png"

function App() {
  const websiteLink = "https://www.martianwallet.xyz/"

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
      {
              <Download />
      }
          <a href={websiteLink} target="_blank" style={{ top: "30px", left: "70px" }} className="absolute_div">
                    <img src={logoSmall} alt="Martian" />
                    <p color="white">Martian</p>
                </a>
      </div>
    </>
  );
}

export default App;
