import React from "react";
import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import { useState, useEffect, useCallback } from "react";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    //console.log("Product");
    getProducts();
    getCart();
  }, [cart, productList]);

  const getProducts = useCallback(() => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductList(response.data);
      const uniqueCategories = [
        ...new Set(response.data.map((product) => product.Category)),
      ];
      setCategoryList(uniqueCategories);
    });
  });

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredProductList = productList.filter((product) => {
    return filterCategory === "" || product.Category === filterCategory;
  });

  const addToCart = (Id, amount) => {
    if (!isNaN(amount)) {
      Axios.post("http://localhost:3001/products/cartadd", {
        ObjectSID: Id,
        Amount: amount,
      }).then(() => {
        alert("Dodano produkt do koszyka");
      });
    } else {
      alert("Nie można dodać 0 przedmiotów do koszyka");
    }
  };

  const deleteCart = useCallback(
    (id) => {
      Axios.delete(`http://localhost:3001/products/deletecart/${id}`, {}).then(
        () => {
          alert("Usunięto z koszyka");
        }
      );
    },
    [cart]
  );

  const getCart = useCallback(() => {
    Axios.get("http://localhost:3001/products/cart").then((response) => {
      setCart(response.data);
    });
  }, [cart]);

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
        <div>
          <table className={styles.cartList}>
            {cart.length > 0 && (
              <thead className={styles.head}>
                <tr>
                  <th className={styles.head}>Numer</th>
                  <th className={styles.head}>Nazwa</th>
                  <th className={styles.head}>Ilość</th>
                  <th className={styles.head}>Cena</th>
                  <th className={styles.head}></th>
                </tr>
              </thead>
            )}
            <tbody className={styles.cartButton}>
              {cart.map((product, key) => {
                return (
                  <tr key={key} className={styles.row}>
                    <td className={styles.tdList}>
                      <p>{product.CargoId}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p>{product.ObjectName}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p>{product.Amount}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p>{product.Price} zł</p>
                    </td>
                    <td className={styles.tdList}>
                      <button
                        className={styles.cartDelete}
                        onClick={() => {
                          deleteCart(product.CargoId);
                        }}
                      >
                        Usuń <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {cart.length > 0 && (
            <Link to="/makeorder" className={styles.makeOrder}>
              Złóż zamówienie
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
