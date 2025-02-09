import React from "react";
import { useAuth } from './context/Auth';
import Home from "./pages/Home";
import Connect from "./pages/Connect"
import logoSmall from "./logoSmall.png"

function App() {
  const { isAuthenticated } = useAuth();
  const websiteLink = "https://www.martianwallet.xyz/"

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
      {
          isAuthenticated
              ? <Home />
              : <Connect />
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
