import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/context";
import styles from "./Login.module.scss";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsLogedIn, setIsAdmin } = useGlobalContext();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      setCredentials(response.data);
    });
  }, []);

  const handleLogin = () => {
    if (login === "admin" && password === "admin") {
      setIsLogedIn(true);
      setIsAdmin(true);
      alert("Pomyślnie zalogowano");
      navigate("/dashboard");
    } else {
      let isMatch = false;

      for (const credential of credentials) {
        if (credential.Login === login && credential.Password === password) {
          setIsLogedIn(true);
          alert("Pomyślnie zalogowano");
          navigate("/dashboard");
          isMatch = true;
          break;
        }
      }

      if (!isMatch) {
        alert("Niepoprawne dane logowania");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h3 className={styles.title}>Zaloguj się </h3>
        <div className={styles.labels}>
          <label htmlFor="username">Nazwa użytkownika: </label>
          <input
            id="username"
            type="text"
            className={styles.input}
            onChange={(event) => setLogin(event.target.value)}
          ></input>
        </div>
        <div className={styles.labels}>
          <label htmlFor="password">Hasło: </label>
          <input
            id="password"
            type="text"
            className={styles.input}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <button
          className={styles.button}
          onClick={() => {
            handleLogin();
          }}
        >
          Zaloguj się
        </button>
      </div>
    </div>
  );
};

export default Login;
