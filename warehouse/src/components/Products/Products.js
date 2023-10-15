import React from "react";
import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import { useState, useEffect, useCallback } from "react";
import styles from "./Products.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import Catalog from "./Catalog";
import Cart from "./Cart";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();


  const getProducts = useCallback(() => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductList(response.data);
      const uniqueCategories = [
        ...new Set(response.data.map((product) => product.Category)),
      ];
      setCategoryList(uniqueCategories);
    })
    .catch(() => navigate("/error"));
  },[navigate]);

  const getCart = useCallback(() => {
    Axios.get("http://localhost:3001/products/cart").then((response) => {
      setCart(response.data);
    })
    .catch(() => navigate("/error"));
  }, [navigate]);

  useEffect(() => {
    //console.log("Product");
    getProducts();
    getCart();
  }, [cart, getCart, getProducts, productList]);

  

  const filteredProductList = productList.filter((product) => {
    return filterCategory === "" || product.Category === filterCategory;
  });

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.header}>Lista dostępnych produktów</h2>
        <Filter
          categoryList={categoryList}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        <div className={styles.center}>
          <Catalog filteredProductList={filteredProductList} />
        </div>
        <h2 className={styles.header}>Twój koszyk</h2>
        <Cart cart={cart} />
        {cart.length > 0 && (
          <Link to="/makeorder" className={styles.makeOrder}>
            Złóż zamówienie
          </Link>
        )}
      </div>
    </>
  );
};

export default Products;
