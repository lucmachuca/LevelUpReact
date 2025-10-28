// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx"; // 👈 nuevo
import Contacto from "./pages/Contacto.jsx";
import Carrito from "./pages/Carrito.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} /> {/* 👈 detalle */}
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      <footer className="text-center py-3">
        © 2025 Level-Up Gamer. Todos los derechos reservados.
      </footer>
    </BrowserRouter>
  );
}

export default App;

