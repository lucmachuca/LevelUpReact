import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// 📦 Tipo de producto actualizado con stock
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen?: string;
  cantidad: number;
  stock?: number; // Campo opcional por compatibilidad
}

export interface CarritoContextType {
  carrito: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  incrementarCantidad: (id: number) => void;
  decrementarCantidad: (id: number) => void;
  eliminarDelCarrito: (id: number) => void;
  vaciarCarrito: () => void;
  total: number;
}

export const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

interface CarritoProviderProps {
  children: ReactNode;
}

export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
  const [carrito, setCarrito] = useState<Producto[]>(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      const stockDisponible = producto.stock ?? 999; // Si no trae stock, asumimos infinito

      if (existe) {
        // ✅ VALIDACIÓN DE STOCK
        if (existe.cantidad >= stockDisponible) {
          alert(`¡Ups! Solo quedan ${stockDisponible} unidades de este producto.`);
          return prev;
        }
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const incrementarCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((p) => {
        if (p.id === id) {
           // Validamos stock interno del item en el carrito si es que lo tiene guardado
           const stockMax = p.stock ?? 999;
           if (p.cantidad >= stockMax) {
             alert("No hay más stock disponible.");
             return p;
           }
           return { ...p, cantidad: p.cantidad + 1 };
        }
        return p;
      })
    );
  };

  const decrementarCantidad = (id: number) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        incrementarCantidad,
        decrementarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export type { CarritoContextType };