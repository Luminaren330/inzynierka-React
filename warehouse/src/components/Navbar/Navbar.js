import React, { useState, useRef, useEffect } from "react";
import { links } from "../../data/navbar-data";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const [isLogedIn, SetIsLogedIn] = useState(false);
  const logedInText = isLogedIn ? "Wyloguj" : "Zaloguj";
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);
  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_center}>
        <div className={styles.nav_header}>
          <div className={styles.links}>
            <Link to="/">
              <FaHome />
            </Link>
          </div>
          <button
            className={styles.nav_toggle}
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>
        <div className={styles.links_container} ref={linksContainerRef}>
          <ul className={styles.links} ref={linksRef}>
            {links.map((linkers) => {
              const { id, link, text } = linkers;
              return (
                <li key={id}>
                  <Link to={link}>{text}</Link>
                </li>
              );
            })}
            <>
              <li className="links">
                <button
                  type="button"
                  className={styles.logout_button}
                  onClick={() => SetIsLogedIn(!isLogedIn)}
                >
                  {logedInText}
                </button>
              </li>
            </>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
