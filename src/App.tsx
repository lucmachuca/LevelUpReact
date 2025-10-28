// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import Contacto from "./pages/Contacto.jsx";
import Carrito from "./pages/Carrito.jsx";
import Checkout from "./pages/Checkout.jsx";
import CompraExitosa from "./pages/CompraExitosa.jsx";
import CompraFallida from "./pages/CompraFallida.jsx";

// === Páginas de Luciano ===
import LoginPage from "./pages/LoginPage.tsx";
import RegistroPage from "./pages/RegistroPage.tsx";
import PerfilUsuarioPage from "./pages/PerfilUsuarioPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import HistorialComprasPage from "./pages/HistorialComprasPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pb-5">
        <Routes>
          {/* === Rutas de Rodrigo === */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/compra-fallida" element={<CompraFallida />} />

          {/* === Rutas de Luciano === */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/perfil-usuario" element={<PerfilUsuarioPage />} />
          <Route path="/historial-compras" element={<HistorialComprasPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      <footer className="text-center py-3">
        © 2025 Level-Up Gamer. Todos los derechos reservados.
      </footer>
    </BrowserRouter>
  );
}

export default App;
