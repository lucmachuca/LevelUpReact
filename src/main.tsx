import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CarritoProvider } from "./context/CarritoContext";

// 🔹 Importa Bootstrap primero
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// 🔹 Luego tus estilos globales
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </React.StrictMode>
);
