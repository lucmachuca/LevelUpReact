/// <reference types="vitest" />
import { renderHook, act } from "@testing-library/react";
import { CarritoProvider, CarritoContext } from "../context/CarritoContext";
import React from "react";


describe("🧪 Pruebas unitarias del contexto CarritoContext", () => {
  it("agrega productos correctamente al carrito", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CarritoProvider>{children}</CarritoProvider>
    );

    const { result } = renderHook(() => React.useContext(CarritoContext), { wrapper });

    act(() => {
      result.current?.agregarAlCarrito({
        id: 1,
        nombre: "Mouse Gamer RGB",
        categoria: "Periféricos",
        precio: 24990,
        imagen: "mouse.png",
      });
    });

    expect(result.current?.carrito.length).toBe(1);
  });

  it("elimina productos del carrito", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CarritoProvider>{children}</CarritoProvider>
    );

    const { result } = renderHook(() => React.useContext(CarritoContext), { wrapper });

    act(() => {
      result.current?.agregarAlCarrito({
        id: 1,
        nombre: "Mouse Gamer RGB",
        categoria: "Periféricos",
        precio: 24990,
        imagen: "mouse.png",
      });
    });

    act(() => {
      result.current?.eliminarDelCarrito(1);
    });

    expect(result.current?.carrito.length).toBe(0);
  });
});
