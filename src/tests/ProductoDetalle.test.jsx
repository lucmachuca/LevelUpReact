// src/tests/ProductoDetalle.test.jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext";
import ProductoDetalle from "../pages/ProductoDetalle";

describe("🧪 Prueba del componente ProductoDetalle", () => {
  it("renderiza correctamente el botón de volver", () => {
    render(
      <CarritoProvider>
        <MemoryRouter initialEntries={["/producto/1"]}>
          <Routes>
            <Route path="/producto/:id" element={<ProductoDetalle />} />
          </Routes>
        </MemoryRouter>
      </CarritoProvider>
    );

    expect(screen.getByText(/volver a productos/i)).toBeInTheDocument();
  });
});
