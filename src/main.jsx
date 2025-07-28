import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import ContactProvider from "./contaxt/ContactsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </StrictMode>
);
