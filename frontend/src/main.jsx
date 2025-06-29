import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("original")).render(
  <StrictMode>
    <div className="bg-black h-screen w-full text-gray-50">
      <App />
    </div>
  </StrictMode>
);
