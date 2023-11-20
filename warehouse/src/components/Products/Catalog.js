import React from "react";
import styles from "./Products.module.scss";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const Catalog = ({ filteredProductList }) => {
  const navigate = useNavigate();
  const { isLogedIn, isAdmin } = useGlobalContext();

  const addToCart = (Id, amount) => {
    if (!isNaN(amount)) {
      Axios.post("http://localhost:3001/products/cartadd", {
        ObjectSID: Id,
        Amount: amount,
      })
        .then(() => {
          alert("Dodano produkt do koszyka");
        })
        .catch(() => navigate("/error"));
    } else {
      alert("Nie można dodać 0 przedmiotów do koszyka");
    }
  };

  const addProduct = (Id, amount) => {
    if (!isNaN(amount)) {
      Axios.put("http://localhost:3001/products/addproduct", {
        ObjectSID: Id,
        Amount: amount,
      })
        .then(() => {
          alert("Dodano ilość produktów");
        })
        .catch(() => navigate("/error"));
    } else {
      alert("Nie można dodać 0 do przedmiotów");
    }
  };

  return (
    <table className={styles.tableList}>
      <thead className={styles.head}>
        <tr>
          <th className={styles.head}>Kategoria</th>
          <th className={styles.head}>Nazwa</th>
          <th className={styles.head}>Materiał</th>
          {(isLogedIn && !isAdmin) && <th className={styles.head}>Magazyn</th>}
          <th className={styles.head}>Cena jednostkowa</th>
          <th className={styles.head}>Ilość dostępna</th>  
          {isAdmin && <th className={styles.head}>Dodaj ilość</th>}
          {!isLogedIn && <th className={styles.head}>Ilość do koszyka</th>}
          {(!isLogedIn || isAdmin) && <th className={styles.head}></th>}
        </tr>
      </thead>
      <tbody>
        {filteredProductList.map((product, key) => {
          if (product.Amount !== 0 || isAdmin) {
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
                  {(isLogedIn && !isAdmin) && <td className={styles.tdList}>
                  <p>{product.MagazinePlacement}</p>
                </td>}
                <td className={styles.tdList}>
                  <p>{product.UnitPrice} zł</p>
                </td>
                <td className={styles.tdList}>
                  <p>{product.Amount}</p>
                </td>
                {(!isLogedIn || isAdmin) && <td className={styles.tdList}>
                  <input
                    type="number"
                    min="1"
                    max={product.Amount}
                    placeholder="Ilość"
                    className={styles.cartAmount}
                    id={`amount${product.ObjectSID}`}
                  />
                </td> }
                {(!isLogedIn) && (
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
                  )}
                  {isAdmin && (
                    <td className={styles.tdList}>
                    <button
                      className={styles.cartAdd}
                      onClick={() => {
                        const inputField = document.getElementById(
                          `amount${product.ObjectSID}`
                        );
                        const amount = parseInt(inputField.value, 10);
                        addProduct(product.ObjectSID, amount);
                      }}
                    >
                      Dodaj ilość produktów
                    </button>
                    </td>
                  )}           
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
};
export default Catalog;
