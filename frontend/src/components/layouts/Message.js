import styles from './Message.module.css'
import { useState } from 'react';

export default function Message() {

    const [type, setType] = useState('');

    return (
        <div className={`${styles.message} ${styles[type]}`}>
            my message
        </div>
    );
}