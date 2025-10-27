// src/tests/ProductCard.spec.js
import React from "react";
import { render } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

describe("Componente ProductCard", () => {
  it("renderiza nombre y precio correctamente", () => {
    const mockProducto = {
      nombre: "PlayStation 5",
      categoria: "Consolas",
      precio: 549990,
      oferta: true
    };

    const { getByText } = render(<ProductCard producto={mockProducto} />);

    expect(getByText("PlayStation 5")).toBeTruthy();
    expect(getByText("$549,990")).toBeTruthy();
  });
});
