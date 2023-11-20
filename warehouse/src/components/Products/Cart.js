import React, { useCallback } from "react";
import styles from "./Products.module.scss";
import Axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart }) => {
  const navigate = useNavigate();

  const deleteCart = useCallback(
    (id) => {
      Axios.delete(
        `https://mysql-warehouse.onrender.com/products/deletecart/${id}`,
        {}
      )
        .then(() => {
          alert("Usunięto z koszyka");
        })
        .catch(() => navigate("/error"));
    },
    [navigate]
  );

  return (
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
  );
};

export default Cart;
