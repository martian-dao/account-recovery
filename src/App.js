import React from "react";
import Logo from "./icons/logo.png";
import AppRoutes from "./routes";
function App() {
  const websiteLink = "https://www.martianwallet.xyz/";

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        {<AppRoutes />}
        <a
          href={websiteLink}
          target="_blank"
          style={{ top: "30px", left: "70px" }}
          className="absolute_div"
        >
          <img src={Logo} alt="Martian" />
          <p
            size="16"
            lineheight="24"
            letterspacing="-0.01em"
            fontfamily="MigraLight"
            marginleft="6"
            fontweight="600"
          >
            Martian
          </p>
        </a>
      </div>
    </>
  );
}

export default App;
