import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ Importar Navigate
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import CompraExitosa from "./pages/CompraExitosa";
import CompraFallida from "./pages/CompraFallida";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import PerfilUsuarioPage from "./pages/PerfilUsuarioPage";
import HistorialComprasPage from "./pages/HistorialComprasPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

// ✅ COMPONENTE DE SEGURIDAD PARA ADMIN
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { usuario } = useAuth();
  
  // Si no hay usuario o el rol no es ADMIN (en mayúscula)
  if (!usuario || usuario.rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/compra-fallida" element={<CompraFallida />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/perfil" element={<PerfilUsuarioPage />} />
          <Route path="/historial" element={<HistorialComprasPage />} />
          
          {/* ✅ RUTA PROTEGIDA DE ADMIN */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            } 
          />
        </Routes>
        <footer className="footer">
          <p>© 2025 Level-Up Gamer. Todos los derechos reservados.</p>
        </footer>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;