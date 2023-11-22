import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import styles from "./MakeOrder.module.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StringInput from "./StringInput";
import FormatInput from "./FormatInput";

const MakeOrder = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const navigate = useNavigate();
  const [wrong, setWrong] = useState(false);
  const [empty, setEmpty] = useState(false);

  const createOrder = () => {
    setEmpty(false);
    setWrong(false);
    if (
      isNaN(phoneNumber) ||
      phoneNumber.length !== 9 ||
      zipcode.length !== 6 ||
      !zipcode.includes("-")
    ) {
      setWrong(true);
    } else if (name.length < 3 || address.length < 10) {
      setEmpty(true);
    } else {
      Axios.post("http://localhost:3001/makeorder/createorder", {
        phoneNumber: phoneNumber,
        address: address,
        zipcode: zipcode,
        name: name,
      })
        .then(() => {
          alert("Zamówienie zostało złożone");
          navigate("/dashboard");
        })
        .catch(() => navigate("/error"));
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        <h2 className={styles.header}>Złóż zamówienie</h2>
        <div className={styles.form}>
          <StringInput id="name" string="Imię: " setParameter={setName} />
          <FormatInput
            id="phoneNumber"
            string="Nr telefonu:"
            setParameter={setPhoneNumber}
            format="Format: 123456124"
            pattern="[0-9]{9}"
          />
          <StringInput
            id="address"
            string="Adres zamieszkania: "
            setParameter={setAddress}
          />
          <FormatInput
            id="zipcode"
            string="Kod pocztowy:"
            setParameter={setZipcode}
            format="Format: 12-345"
            pattern="[0-9]{2}-[0-9]{3}"
          />
          {wrong && (
            <div className={styles.wrong}>
              <h4>Niepoprawne dane logowania</h4>
            </div>
          )}
          {empty && (
            <div className={styles.wrong}>
              <h4>Długosć imienia lub adresu jest za krótka</h4>
            </div>
          )}
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
