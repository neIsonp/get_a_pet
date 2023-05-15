import { Link } from "react-router-dom";

import Logo from "../../assets/img/logo.png";

import styles from "./NavBar.module.css";

import { Context } from "../../context/UserContext";
import { useContext } from "react";

export default function Navbar() {
  const { authenticated } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logo pet" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Adopt</Link>
        </li>
        {authenticated ? (
          <>
            <p>Logged</p>
          </>
        ) : (
          <>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/register">register </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
