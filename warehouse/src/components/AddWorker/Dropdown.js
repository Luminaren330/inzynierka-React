import styles from "./AddWorker.module.scss";
import React from "react";

const Dropdown = ({options, value, string, setFunction}) => {
    return (
        <>
        <label htmlFor={string} className={styles.formLabel}>
        {string}:  
      </label>
      <select
      className={styles.dropdown}
      value = {value}
      onChange={setFunction}> 
      {options.map((option,key)=> {
        return (
          <option key={key} value={option}>{option}</option>
        );
      })}
      </select>
      </>
    );
    
}

export default Dropdown;