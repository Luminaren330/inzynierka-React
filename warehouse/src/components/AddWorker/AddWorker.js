import styles from "./AddWorker.module.scss";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import StringInput from "../MakeOrder/StringInput";
import FormatInput from "../MakeOrder/FormatInput";
import Dropdown from "./Dropdown";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


const AddWorker = () => {
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [position, setPosition] = useState('Sprzedawca');
    const [empty, setEmpty] = useState(false);
    const navigate = useNavigate();
    const options = [
      'Sprzedawca', 'Magazynier', 'Menadżer'
    ]
    const [wrong,setWrong] = useState(false);

    const PositionSet = (event) => {
      setPosition(event.target.value);
    }

    const addWorker = () => {
      setEmpty(false);
      setWrong(false);
      if(isNaN(phoneNumber) || phoneNumber.length !==9 ) {
        setWrong(true);
      }
      else if(name.length < 3 || surname.length < 3) {
        setEmpty(true);
      }
      else { 
        Axios.post("http://localhost:3001/workers/addworker", {
            name: name,
            surname: surname,
            phoneNumber: phoneNumber,
            position: position,
        }).then(()=> {
            alert("Dodano pracownika");
            navigate("/workers");
            setWrong(false);
        })
        .catch(() => navigate("/error"));
      }
    }
    return (
        <>
        <Navbar></Navbar>
        <div>
            <h2 className={styles.header}>Dodaj pracownika</h2>
            <div className={styles.form}>
            <StringInput string="Imię: " setParameter={setName} />
            <StringInput string="Nazwisko: " setParameter={setSurname} />
            <FormatInput
            string="Nr telefonu:"
            setParameter={setPhoneNumber}
            format="Format: 123456124"
            pattern="[0-9]{9}"
          />
          <Dropdown options = {options}
          value = {position}
          string = "Stanowisko"
          setFunction = {PositionSet}/>
          {wrong && <div className={styles.wrong}>
            <h4>Niepoprawny format numeru telefonu</h4>
            </div>
            }
             {empty && 
          <div className={styles.wrong}>
            <h4>Długosć imienia lub nazwiska jest za krótka</h4>
            </div>}
            </div>
            <div className={styles.center}>
          <button
            className={styles.addWorker}
            onClick = {() => {
                addWorker();
            }}
          >
            Dodaj
          </button>
        </div>
        </div>
        </>
    )
}

export default AddWorker;