// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import Contacto from "./pages/Contacto.jsx";
import Carrito from "./pages/Carrito.jsx";
import "./App.css"; // ✅ Estilos secundarios (efectos neón, tarjetas, botones)

function App() {
  return (
    <BrowserRouter>
      {/* 🧭 Barra de navegación principal */}
      <Navbar />

      {/* 🎮 Rutas del sitio */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>

      {/* ⚡ Footer global */}
      <footer className="text-center py-3">
        © 2025 Level-Up Gamer. Todos los derechos reservados.
      </footer>
    </BrowserRouter>
  );
}

export default App;
