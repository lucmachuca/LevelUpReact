import React, { createContext, useState, useEffect, ReactNode } from "react";

// ✅ Interfaz alineada 100% con el Backend
export interface Producto {
  id: number;
  nombreProducto: string;      
  categoriaProducto: string;   
  precioProducto: number;      
  imagenUrl: string;           
  cantidadDisponible: number;  
  descripcionProducto?: string;
  
  // Propiedad solo del frontend (cantidad en carrito)
  cantidad: number; 
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

export const CarritoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
      const stockMax = producto.cantidadDisponible;

      if (existe) {
        if (existe.cantidad >= stockMax) {
          alert(`¡Solo quedan ${stockMax} unidades!`);
          return prev;
        }
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      // Al agregar por primera vez, iniciamos cantidad en 1
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const incrementarCantidad = (id: number) => {
    setCarrito((prev) => prev.map((p) => {
      if (p.id === id) {
        if (p.cantidad >= p.cantidadDisponible) return p;
        return { ...p, cantidad: p.cantidad + 1 };
      }
      return p;
    }));
  };

  const decrementarCantidad = (id: number) => {
    setCarrito((prev) => prev.map((p) => 
      p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
    ).filter((p) => p.cantidad > 0));
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  // Usamos precioProducto
  const total = carrito.reduce((acc, p) => acc + p.precioProducto * p.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, incrementarCantidad, decrementarCantidad, eliminarDelCarrito, vaciarCarrito, total }}>
      {children}
    </CarritoContext.Provider>
  );
};