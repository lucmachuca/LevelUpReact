import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css"; // <-- tus estilos globales DEBEN ir después

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CarritoProvider } from "./context/CarritoContext";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(
  <StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </StrictMode>
);


