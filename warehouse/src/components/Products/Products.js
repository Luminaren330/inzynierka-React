import React from "react";
import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import { useState, useEffect, useCallback, Profiler } from "react";
import styles from "./Products.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import Catalog from "./Catalog";
import Cart from "./Cart";
import { useGlobalContext } from "../context/context";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartPressed, setCartPressed] = useState(false);
  const [productPressed, setProductPressed] = useState(false);
  const navigate = useNavigate();
  const { isLogedIn } = useGlobalContext();

  const getProducts = useCallback(() => {
    Axios.get("http://localhost:3001/products")
      .then((response) => {
        setProductList(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.Category)),
        ];
        setCategoryList(uniqueCategories);
      })
      .catch(() => navigate("/error"));
  }, [navigate]);

  const getCart = useCallback(() => {
    Axios.get("http://localhost:3001/products/cart")
      .then((response) => {
        setCart(response.data);
      })
      .catch(() => navigate("/error"));
  }, [navigate]);

  useEffect(() => {
    getProducts();
    getCart();
  }, [getCart, getProducts, cartPressed, productPressed]);

  const filteredProductList = productList.filter((product) => {
    return filterCategory === "" || product.Category === filterCategory;
  });

  const onRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    console.log(`${id} render time: ${actualDuration}ms`);
    // TODO: log other metrics or perform actions based on performance
  };

  return (
    <>
      <Navbar />
      <Profiler id="Products" onRender={onRenderCallback}>
      <div className={styles.container}>
        <h2 className={styles.header}>Lista dostępnych produktów</h2>
        <Filter
          categoryList={categoryList}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        <div className={styles.center}>
          <Catalog filteredProductList={filteredProductList}
          setProductPressed = {setProductPressed} />
        </div>
        {!isLogedIn && (
          <>
            <h2 className={styles.header}>Twój koszyk</h2>
            <Cart cart={cart} 
            setCartPressed = {setCartPressed}/>
            {cart.length > 0 && (
              <Link to="/makeorder" className={styles.makeOrder}>
                Złóż zamówienie
              </Link>
            )}
          </>
        )}
      </div>
      </Profiler>
    </>
  );
};

export default Products;
