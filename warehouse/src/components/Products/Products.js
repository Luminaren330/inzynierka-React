import React from "react";
import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Products.module.scss";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductList(response.data);
      const uniqueCategories = [
        ...new Set(response.data.map((product) => product.Category)),
      ];
      setCategoryList(uniqueCategories);
    });
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredProductList = productList.filter((product) => {
    return filterCategory === "" || product.Category === filterCategory;
  });

  const addToCart = (Id, amount) => {
    Axios.post("http://localhost:3001/products/cartadd", {
      ObjectSID: Id,
      Amount: amount,
    }).then(() => {
      setCart([...cart, Id]);
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.header}>Lista dostępnych produktów</h2>
        <div className={styles.categoryFilter}>
          <label htmlFor="category">Filtruj według kategorii:</label>
          <select
            id="category"
            value={filterCategory}
            onChange={handleFilterChange}
          >
            <option value="">Wszystkie</option>
            {categoryList.map((category) => {
              return <option value={category}>{category}</option>;
            })}
          </select>
        </div>
        <div className={styles.center}>
          <table className={styles.tableList}>
            <thead className={styles.head}>
              <tr>
                <th className={styles.head}>Kategoria</th>
                <th className={styles.head}>Nazwa</th>
                <th className={styles.head}>Materiał</th>
                <th className={styles.head}>Cena jednostkowa</th>
                <th className={styles.head}>Ilość dostępna</th>
                <th className={styles.head}>Ilość do koszyka</th>
                <th className={styles.head}></th>
              </tr>
            </thead>
            <tbody>
              {filteredProductList.map((product, key) => {
                return (
                  <tr key={key} className={styles.row}>
                    <td className={styles.tdList}>
                      <p>{product.Category}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p>{product.Name}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p>{product.Material}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p>{product.UnitPrice} zł</p>
                    </td>
                    <td className={styles.tdList}>
                      <p>{product.Amount}</p>
                    </td>
                    <td className={styles.tdList}>
                      <input
                        type="number"
                        min="1"
                        max={product.Amount}
                        placeholder="Ilość"
                        className={styles.cartAmount}
                        id={`amount${product.ObjectSID}`}
                      ></input>
                    </td>
                    <td className={styles.tdList}>
                      <button
                        className={styles.cartAdd}
                        onClick={() => {
                          const inputField = document.getElementById(
                            `amount${product.ObjectSID}`
                          );
                          const amount = parseInt(inputField.value, 10);
                          addToCart(product.ObjectSID, amount);
                        }}
                      >
                        Dodaj do koszyka
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h2 className={styles.header}>Twój koszyk</h2>
        <div className={styles.center}>
          <table className={styles.tableList}>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
