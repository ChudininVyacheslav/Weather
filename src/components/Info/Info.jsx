import React from 'react';
import Form from './Info-Form/Form';
import styles from './Info.module.scss';

const Info = () => {
    return (
        <div className={styles.weather}> 
            <Form  />
        </div>
    )
};

export default Info