import styles from "./MakeOrder.module.scss";
import React from "react";

const StringInput = ({ string, setParameter }) => {
  return (
    <>
      <label for={string} className={styles.formLabel}>
        {string}
      </label>
      <input
        type="text"
        className={styles.formInput}
        onChange={(event) => setParameter(event.target.value)}
      ></input>
    </>
  );
};
export default StringInput;
