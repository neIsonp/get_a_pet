import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'
import { useState, useEffect} from 'react';

import api from '../../../utils/api'

import Input from '../../form/input'

export default function Profile() {

  const [user, setUser] = useState([]);
  const [token] = useState(localStorage.getItem('token') ?? '')

  useEffect(() =>{
    api.get('/users/checkuser', {
      headers: {
        Authorization: `bearer ${JSON.parse(token)}`
      }
    }).then((response) =>{
      setUser(response.data)  
    })
  },[token]);

  function onFileChange(e){}

  function handleChange(e){}

  return (
    <section>
      <div className={styles.profile_header}>
      <h1>Profile</h1>
        <p>Previw image</p>
      </div>
      <form action="" className={formStyles.form_container}>

        <Input
        text="Image"
        type="file"
        name="image"
        handleOnChange={onFileChange}
        />
        <Input
        text="Email"
        type="email"
        name="email"
        placeholder="insert your email"
        handleOnChange={handleChange}
        value={user.email || ''}
        />
          <Input
        text="Name"
        type="text"
        name="name"
        placeholder="insert your name"
        handleOnChange={handleChange}
        value={user.name || ''}
        />
            <Input
        text="Phone"
        type="text"
        name="phone"
        placeholder="insert your phone number"
        handleOnChange={handleChange}
        value={user.phone || ''}
        />
            <Input
        text="Password"
        type="password"
        name="password"
        placeholder="insert your password"
        handleOnChange={handleChange}
        />
          <Input
        text="Confirm password"
        type="password"
        name="confirmpassword"
        placeholder="Confirm password"
        handleOnChange={handleChange}
        />
        <input type="submit" value="Edit" />
      </form>
    </section>
  );
}