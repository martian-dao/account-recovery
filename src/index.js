import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/Auth";

import "./index.css";
import "./styles/layout.css";
import "./styles/typography.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
