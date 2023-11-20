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
    const [name, setName] = useState('');
    const [magazine, setMagazine] = useState('A')
    const [material, setMaterial] = useState('');
    const [unitPrice, setUnitPrice] = useState(0);
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('Filtr');
    const [wrong,setWrong] = useState(false);
    const [badPrice, setBadPrice] = useState(false);
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
        setBadPrice(false);
        setWrong(false);
        if(name.length < 3 || material.length < 3) {
            setWrong(true);
        }
        else if(amount <= 0 || unitPrice <= 0) {
            setBadPrice(true);
        }
        else { 
        Axios.post("http://localhost:3001/products/addnewproduct", {
            name: name,
            magazine: magazine,
            material: material,
            unitPrice: unitPrice,
            amount: amount,
            category: category,
        }).then(()=> {
            alert("Dodano nowy produkt");
            navigate("/products");
        })
        .catch(() => navigate("/error"));
    }
    }

    return (
        <>
        <Navbar></Navbar>
        <div>
        <h2 className={styles.header}>Dodaj nowy produkt</h2>
        <div className={styles.form}>
        <StringInput string="Nazwa: " setParameter={setName} />
        <Dropdown options = {magazineOptions}
        value = {magazine}
        string = "Numer magazynu"
        setFunction={MagazineSet}/>
        <StringInput string="Materiał: " setParameter={setMaterial}/>
        <FloatInput string = "Cena jednostkowa: " setParameter={setUnitPrice}/>
        <IntInput string = "Ilość: " setParameter={setAmount}/>
        <Dropdown options = {categoryOptions}
        value = {category}
        string = "Kategoria"
        setFunction={CategorySet}/>
         {wrong && 
          <div className={styles.wrong}>
            <h4>Nazwa lub materiał jest niepoprawny</h4>
            </div>}
            {badPrice && 
          <div className={styles.wrong}>
            <h4>Ilość lub cena jest mniejsza od 0</h4>
            </div>}

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
