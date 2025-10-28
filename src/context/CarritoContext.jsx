// src/context/CarritoContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    // ✅ Recuperar carrito desde localStorage al cargar
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Guardar automáticamente cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // 🛒 Funciones básicas
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const itemExistente = prev.find((p) => p.id === producto.id);
      if (itemExistente) {
        // si ya existe, suma cantidad
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, total }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
