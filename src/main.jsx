import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";

// 3rd party libraries
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
    <Toaster />
    <App />
    </>
  </React.StrictMode>
);
