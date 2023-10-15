import React from "react";
import styles from "./Products.module.scss";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Catalog = ({ filteredProductList }) => {
  const navigate = useNavigate();
  const addToCart = (Id, amount) => {
    if (!isNaN(amount)) {
      Axios.post("http://localhost:3001/products/cartadd", {
        ObjectSID: Id,
        Amount: amount,
      }).then(() => {
        alert("Dodano produkt do koszyka");
      })
      .catch(() => navigate("/error"));
    } else {
      alert("Nie można dodać 0 przedmiotów do koszyka");
    }
  };
  return (
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
  );
};
export default Catalog;
