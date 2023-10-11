import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import styles from "./MakeOrder.module.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MakeOrder = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const navigate = useNavigate();

  const createOrder = () => {
    Axios.post("http://localhost:3001/makeorder/createorder", {
      phoneNumber: phoneNumber,
      address: address,
      zipcode: zipcode,
      name: name,
    }).then(() => {
      alert("Zamówienie zostało złożone");
      navigate("/dashboard");
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        <h2 className={styles.header}>Złóż zamówienie</h2>
        <div className={styles.form}>
          <label for="name" className={styles.formLabel}>
            Imię:
          </label>
          <input
            type="text"
            className={styles.formInput}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <div className={styles.format}>
            <label for="phone" className={styles.formLabel}>
              Nr telefonu:
            </label>
            <small className={styles.smallForm}> Format: 123456123</small>
          </div>
          <input
            type="tel"
            pattern="[0-9]{9}"
            required
            className={styles.formInput}
            onChange={(event) => setPhoneNumber(event.target.value)}
          ></input>

          <label for="address" className={styles.formLabel}>
            Adres zamieszkania:
          </label>
          <input
            type="text"
            className={styles.formInput}
            onChange={(event) => setAddress(event.target.value)}
          ></input>
          <div className={styles.format}>
            <label for="zipcode" className={styles.formLabel}>
              Kod pocztowy:
            </label>
            <small className={styles.smallForm}> Format: 12-345</small>
          </div>
          <input
            type="tel"
            pattern="[0-9]{2}-[0-9]{3}"
            required
            className={styles.formInput}
            onChange={(event) => setZipcode(event.target.value)}
          ></input>
        </div>
        <div className={styles.center}>
          <button
            className={styles.makeOrder}
            onClick={() => {
              createOrder();
            }}
          >
            Złóż zamówienie
          </button>
        </div>
      </div>
    </>
  );
};

export default MakeOrder;
