import styles from "./MakeOrder.module.scss";
import React from "react";

const FormatInput = ({ string, setParameter, format, pattern }) => {
  return (
    <>
      <div className={styles.format}>
        <label htmlFor={string} className={styles.formLabel}>
          {string}
        </label>
        <small className={styles.smallForm}> {format}</small>
      </div>
      <input
        type="tel"
        pattern={pattern}
        required
        className={styles.formInput}
        onChange={(event) => setParameter(event.target.value)}
      ></input>
    </>
  );
};
export default FormatInput;
