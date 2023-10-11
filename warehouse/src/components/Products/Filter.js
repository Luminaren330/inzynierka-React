import React from "react";
import styles from "./Products.module.scss";

const Filter = ({ categoryList, filterCategory, setFilterCategory }) => {
  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <div className={styles.categoryFilter}>
      <label htmlFor="category">Filtruj według kategorii:</label>
      <select
        id="category"
        value={filterCategory}
        onChange={handleFilterChange}
      >
        <option value="">Wszystkie</option>
        {categoryList.map((category) => {
          return <option value={category}>{category}</option>;
        })}
      </select>
    </div>
  );
};

export default Filter;
