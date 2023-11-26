import styles from "../Products/Products.module.scss";
import Navbar from "../Navbar/Navbar";
import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isPressed, setIsPressed] = useState(false);

  
  
  const getOrders = useCallback(() => {
    Axios.get("http://localhost:3001/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => navigate("/error"));
  }, [navigate]);

  useEffect(() => {
    getOrders();
  },[getOrders, isPressed]);

  const orderEnded = useCallback(
    (Id) => {
      setIsPressed(false);
      Axios.delete(`http://localhost:3001/orders/${Id}`, {})
        .then(() => {
          alert("Zamówienie " + Id + " zostało zrealizowane");
          setIsPressed(true);
        })
        .catch(() => navigate("/error"));
    },
    [navigate]
    
  );

  

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <h2 className={styles.header}>Zamówienia</h2>
        <div className={styles.center}>
          <table className={styles.tableList}>
            <thead className={styles.head}>
              <tr>
                <th className={styles.head}>Nr zamówienia</th>
                <th className={styles.head}>Nazwa klienta</th>
                <th className={styles.head}>Adres klienta</th>
                <th className={styles.head}>Kod pocztowy klienta</th>
                <th className={styles.head}>Telefon</th>
                <th className={styles.head}>Ilość i Przedmioty</th>
                <th>Pracownik</th>
                <th>przypisany</th>
                <th className={styles.head}></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => {
                return (
                  <tr key={key} className={styles.row}>
                    <td className={styles.tdList}>
                      <p className={styles.orderp}>{order.orderId}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p className={styles.orderp}>{order.client}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p className={styles.orderp}>{order.address}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p className={styles.orderp}>{order.zipcode}</p>
                    </td>
                    <td className={styles.tdList}>
                      <p className={styles.orderp}>{order.phoneNumber}</p>
                    </td>
                    <td className={styles.tdListpro}>
                      {order.items.split(", ").map((item, key) => (
                        <p key={key} className={styles.orderpro}>
                          {item}
                        </p>
                      ))}
                    </td>
                    <td className={styles.tdListwork}>
                      <p className={styles.orderp}>{order.worker1}</p>
                    </td>
                    <td className={styles.tdListwork}>
                      <p className={styles.orderp}>{order.worker2}</p>
                    </td>
                    <td className={styles.tdList}>
                      <button
                        className={styles.orderEnd}
                        onClick={() => {
                          orderEnded(order.orderId);
                        }}
                      >
                        Zrealizowane
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
