// src/pages/Home.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import products from "../data/productsData";

const Home = () => {
  return (
    <>
      <Hero />
      <main className="container my-5">
        <h2 className="text-center mb-4 text-light">Productos Destacados</h2>
        <div className="row justify-content-center">
          {products.map((prod) => (
            <div className="col-md-4 mb-4" key={prod.id}>
              <ProductCard producto={prod} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
