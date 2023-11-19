import styles from "./MakeOrder.module.scss";
import React from "react";

const StringInput = ({ id, string, setParameter }) => {
  return (
    <>
      <label htmlFor={id} className={styles.formLabel}>
        {string}
      </label>
      <input
        id={id}
        type="text"
        className={styles.formInput}
        onChange={(event) => setParameter(event.target.value)}
      ></input>
    </>
  );
};
export default StringInput;
