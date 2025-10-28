import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// === Páginas principales (Rodrigo) ===
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
import AdminPage from "./pages/AdminPage.tsx";
import PerfilUsuarioPage from "./pages/PerfilUsuarioPage.tsx";
import HistorialComprasPage from "./pages/HistorialComprasPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";

// === Estilos globales ===
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  return (
    <BrowserRouter>
      {/* Barra de navegación global */}
      <Navbar />

      {/* Contenido principal de la app */}
      <main className="pb-5">
        <Routes>
          {/* === Rutas Rodrigo === */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/compra-fallida" element={<CompraFallida />} />

          {/* === Rutas Luciano === */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/perfil-usuario" element={<PerfilUsuarioPage />} />
          <Route path="/historial-compras" element={<HistorialComprasPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </main>

      {/* Pie de página global */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
