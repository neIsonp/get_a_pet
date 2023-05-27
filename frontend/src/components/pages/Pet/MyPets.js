import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

export default function MyPets() {

  const [pets, setPets] = useState([]);

    return (
        <section>
            <h1>MyPets</h1>
            <Link to='/pet/add'>Register a pet</Link>
            <div>
              {pets.length > 0 && <p>meus pets cadastrados</p>}
              {pets.length === 0 && <p>não há pets cadastrados</p>}
            </div>
        </section>
    );
}