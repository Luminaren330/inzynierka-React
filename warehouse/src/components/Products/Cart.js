import React, { useCallback } from "react";
import styles from "./Products.module.scss";
import Axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const Cart = ({ cart }) => {
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
