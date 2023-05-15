import { useState, useContext } from "react";
import Input from "../../form/input";
import styles from "../../form/Form.module.css";

import { Context } from "../../../context/UserContext";
import { Link } from "react-router-dom";

export default function Login() {
  function handleChange(e) {}

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Insert your email"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Insert your password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Click here</Link>
      </p>
    </section>
  );
}
