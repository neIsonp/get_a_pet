import styles from './AddPet.module.css'
import api from '../../../utils/api'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

import useFlashMessage from '../../../hooks/useFlashMessage';
import PetForm from '../../form/PetForm';

export default function AddPet() {
    return (
        <section className={styles.addpet_header}>
          <div>
            <h1>Register a new pet</h1>
            <p>Then he will be up for adoption</p>
          </div>
          <PetForm btnText='Register'/>
        </section>
    );
}