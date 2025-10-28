import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔹 Componentes principales
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// 🔹 Páginas de Rodrigo
import Home from "./pages/Home.tsx";
import Productos from "./pages/Productos.tsx";
import ProductoDetalle from "./pages/ProductoDetalle.tsx";
import Checkout from "./pages/Checkout.tsx";
import CompraFallida from "./pages/CompraFallida.tsx";
import CompraExitosa from "./pages/CompraExitosa.tsx";
import Contacto from "./pages/Contacto.tsx";
import Carrito from "./pages/Carrito.tsx";

// 🔹 Páginas de Luciano
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import AdminPage from "./pages/AdminPage";
import PerfilUsuarioPage from "./pages/PerfilUsuarioPage";
import HistorialComprasPage from "./pages/HistorialComprasPage";
import BlogPage from "./pages/BlogPage";

// 🔹 Estilos globales
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


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

        <Footer />
      
    </BrowserRouter>
  );
}

export default App;
