import styles from "./AddProduct.module.scss";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import StringInput from "../MakeOrder/StringInput";
import IntInput from "./IntInput";
import FloatInput from "./FloatInput";
import Dropdown from "../AddWorker/Dropdown";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [magazine, setMagazine] = useState("A");
  const [material, setMaterial] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Filtr");
  const navigate = useNavigate();

  const magazineOptions = ["A", "B", "C"];

  const categoryOptions = ["Filtr", "Hamulec", "Akumulator", "Tłumik"];

  const MagazineSet = (event) => {
    setMagazine(event.target.value);
  };

  const CategorySet = (event) => {
    setCategory(event.target.value);
  };

  const addNewProduct = () => {
    Axios.post("http://localhost:3001/products/addnewproduct", {
      name: name,
      magazine: magazine,
      material: material,
      unitPrice: unitPrice,
      amount: amount,
      category: category,
    })
      .then(() => {
        alert("Dodano nowy produkt");
        navigate("/products");
      })
      .catch(() => navigate("/error"));
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        <h2 className={styles.header}>Dodaj nowy produkt</h2>
        <div className={styles.form}>
          <StringInput id="name" string="Nazwa: " setParameter={setName} />
          <Dropdown
            id="magazine"
            options={magazineOptions}
            value={magazine}
            string="Numer magazynu"
            setFunction={MagazineSet}
          />
          <StringInput
            id="material"
            string="Materiał: "
            setParameter={setMaterial}
          />
          <FloatInput
            id="price"
            string="Cena jednostkowa: "
            setParameter={setUnitPrice}
          />
          <IntInput id="amount" string="Ilość: " setParameter={setAmount} />
          <Dropdown
            id="category"
            options={categoryOptions}
            value={category}
            string="Kategoria"
            setFunction={CategorySet}
          />
        </div>
        <div className={styles.center}>
          <button
            className={styles.addProduct}
            onClick={() => {
              addNewProduct();
            }}
          >
            Dodaj
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
