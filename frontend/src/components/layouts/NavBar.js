import { Link } from "react-router-dom";

import Logo from '../../assets/img/logo.png'

import styles from './NavBar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Logo pet" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to='/'>Adotar</Link>
                </li>
                <li>
                    <Link to='/Login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>register </Link>
                </li>
            </ul>
        </nav>
    );
}