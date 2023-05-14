import { Link } from "react-router-dom";

import Logo from '../../assets/img/logo.png'

export default function Navbar() {
    return (
        <nav>

            <div>
                <img src={Logo} alt="Logo pet" />
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