import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UsuarioProvider } from "./context/UsuarioContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { VtosProvider } from "./context/VtosContext.jsx";

createRoot(document.getElementById("root")).render(
 
    <BrowserRouter>
      <UsuarioProvider>
        <VtosProvider>
           <App />
        </VtosProvider>
      </UsuarioProvider>
    </BrowserRouter>
  
);
