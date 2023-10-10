import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.bimage}>
          <div className={styles.center}>
            <h2 className={styles.header}>Metaflex</h2>
            <p className={styles.info}>
              Jesteśmy firmą magazynową, która zajmuje się produkcją oraz
              wysyłką dla klientów części zamiennych pojazdów autonomicznych.
              Jeśli potrzebujesz części, a takie posiadamy zamów u nas a
              przesyłka otrzymasz w ciągu kilku dni roboczych. Płatność przy
              odbiorze. Zapraszamy!
            </p>
            <Link to="/products" className={styles.redirect}>
              Przejdź do towarów <FaArrowRight />
            </Link>
          </div>
        </div>
        <div className={styles.contact}>
          <h5 className={styles.contact_header}>Kontakt</h5>
          <div className={styles.contact_info}>
            <p>Wrocław ul. Starej Gwardii 123</p>
            <p>(+48) 123 123 456</p>
            <p>lombard27@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
