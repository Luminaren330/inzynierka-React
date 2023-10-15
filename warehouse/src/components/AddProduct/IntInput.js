import styles from "./AddProduct.module.scss";
import React from "react";

const IntInput = ({ string, setParameter }) => {
  return (
    <>
      <label htmlFor={string} className={styles.formLabel}>
        {string}
      </label>
      <input
        type="number"
        min = "1"
        className={styles.formInput}
        onChange={(event) => setParameter(event.target.value)}
      ></input>
    </>
  );
};
export default IntInput;
