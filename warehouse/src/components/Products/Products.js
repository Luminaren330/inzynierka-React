import React from "react";
import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import { useState, useEffect } from "react";

const Products = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductList(response.data);
    });
  };

  return (
    <>
      <Navbar />
      {productList.map((product, key) => {
        return (
          <div>
            <div>
              <h3>{product.Name}</h3>
              <h3>{product.Category}</h3>
              <h3>{product.Material}</h3>
              <h3>{product.UnitPrice}</h3>
              <h3>{product.Amount}</h3>
              {/* <h3>{product.MagazinePlacement}</h3> */}
              <input type="number" placeholder="Ilość"></input>
              <button>Dodaj do koszyka</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Products;
