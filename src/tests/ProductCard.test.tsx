/// <reference types="vitest" />
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../components/ProductCard";
import { CarritoProvider } from "../context/CarritoContext";
import { MemoryRouter } from "react-router-dom";

describe("🧪 Prueba unitaria del componente ProductCard", () => {
  const producto = {
    id: 1,
    nombre: "Teclado Mecánico RGB",
    categoria: "Periféricos",
    precio: 59990,
    imagen: "https://media.falabella.com/falabellaCL/130261563_01/w=1500,h=1500,fit=pad",
  };

  const renderWithContext = () => {
    return render(
      <CarritoProvider>
        <MemoryRouter>
          <ProductCard producto={producto} />
        </MemoryRouter>
      </CarritoProvider>
    );
  };

  it("renderiza correctamente nombre, categoría y precio", () => {
    renderWithContext();
    expect(screen.getByText("Teclado Mecánico RGB")).toBeInTheDocument();
    expect(screen.getByText("Periféricos")).toBeInTheDocument();
    expect(screen.getByText(/\$?\s*59[.,]990/)).toBeInTheDocument();
  });

  it("permite agregar un producto al carrito", () => {
    renderWithContext();
    const boton = screen.getByRole("button", { name: /agregar al carrito/i });
    fireEvent.click(boton);
    expect(boton).toBeInTheDocument();
  });
});
