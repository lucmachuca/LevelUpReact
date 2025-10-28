// src/__tests__/CarritoContext.test.jsx
import { renderHook, act } from "@testing-library/react";
import { CarritoProvider, CarritoContext } from "../context/CarritoContext";
import { useContext } from "react";

describe("🧪 Pruebas del contexto CarritoContext", () => {
  it("agrega y elimina productos correctamente", () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;
    const { result } = renderHook(() => useContext(CarritoContext), { wrapper });

    const producto = { id: 1, nombre: "Teclado RGB", precio: 50000 };

    // agregar producto
    act(() => result.current.agregarAlCarrito(producto));
    expect(result.current.carrito.length).toBe(1);

    // agregar nuevamente (incrementa cantidad)
    act(() => result.current.agregarAlCarrito(producto));
    expect(result.current.carrito[0].cantidad).toBe(2);

    // eliminar producto
    act(() => result.current.eliminarDelCarrito(1));
    expect(result.current.carrito.length).toBe(0);
  });

  it("calcula correctamente el total del carrito", () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;
    const { result } = renderHook(() => useContext(CarritoContext), { wrapper });

    const p1 = { id: 1, nombre: "Mouse", precio: 10000 };
    const p2 = { id: 2, nombre: "Teclado", precio: 20000 };

    act(() => {
      result.current.agregarAlCarrito(p1);
      result.current.agregarAlCarrito(p2);
    });

    expect(result.current.total).toBe(30000);
  });
});
