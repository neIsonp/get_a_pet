import Input from "../../form/input";
import styles from '../../form/Form.module.css';
import { Link } from "react-router-dom";

function Register() {

    function handleChange(e) { }

    return (
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form>
                <Input text="Name" type="text" name="name" placeholder="Insert your name" handleOnChange={handleChange} />
                <Input text="Phone" type="text" name="phone" placeholder="Insert your phone number" handleOnChange={handleChange} />
                <Input text="Email" type="email" name="email" placeholder="Insert your email" handleOnChange={handleChange} />
                <Input text="Password" type="password" name="password" placeholder="Insert your password" handleOnChange={handleChange} />
                <Input text="Confirm Password" type="password" name="confirmpassword" placeholder="Confirm password" handleOnChange={handleChange} />
                <input type="submit" value="Register" />
            </form>
            <p>You already have an account ? <Link to="/login">CLick here</Link></p>
        </section>
    );
}
export default Register;
