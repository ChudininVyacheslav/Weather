import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <div>
            <h1 className={styles.title}>Прогноз погоды</h1>
        </div>
    )
};

export default Header