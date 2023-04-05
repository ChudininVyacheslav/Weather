import React, { useEffect, useState } from 'react';
import { requestWeather, requestThreeHours } from './weatherAPI';
import styles from './Form.module.scss';
import clear from '../../../assets/clear.png';
import clouds from '../../../assets/cloudy.png';
import haze from '../../../assets/foggy.png';
import rain from '../../../assets/rain.png';
import snow from '../../../assets/snowy.png';
import thunderstorm from '../../../assets/thunderstorm.png';

const apiKey = '5ee14456817b86276d301402ebe9f898';
const weather = {
    Clouds: clouds,
    Snow: snow,
    Clear: clear,
    Rain: rain,
    Haze: haze,
    Thunderstorm: thunderstorm
};

const Form = () => {
    const [value, setValue] = useState('');
    const [weatherCity, setWeatherCity] = useState({});
    const [weatherThreeHours, setWeatherThreeHours] = useState([]);

    useEffect(() => {
        getData('Москва', apiKey);
        getDataThreeHours('Москва', apiKey);
    }, []);

    async function getData(valueInput, key) {
        const queryResult = await requestWeather(valueInput, key);
        if (!queryResult) {
            return;
        };

        setWeatherCity(queryResult);
    };

    async function getDataThreeHours(valueInput, apiKey) {
        try {
            const queryResult = await requestThreeHours(valueInput, apiKey);
            if (!queryResult) {
                return;
            };

            setWeatherThreeHours(queryResult);
        } catch (e) {
            console.log(e.massege);
        }
    };

    return (
        <div>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                if (!getData(value, apiKey)) {
                    return;
                };
                if (!getDataThreeHours(value, apiKey)) {
                    return;
                };
                setValue('');
            }}>
                <input onChange={(e) => {
                    setValue(e.target.value);
                }} className={styles.input} type='text' placeholder='Поиск...' value={value} />
            </form>
            {weatherCity && <p className={styles['info-city']}>{weatherCity.name}{
                <img alt='погода' className={styles['info-city-img']} src={weather[weatherCity.weather]}></img>
            }{`${weatherCity.temp}°C`}</p>}
            <ul className={styles['weather-list']}>
                {weatherThreeHours && weatherThreeHours.map((elem) => {
                    return (
                        <li key={elem.id} className={styles['weather-list-item']} >{elem.time}{
                            <img alt='погода' className={styles['weather-list-img']} src={weather[elem.weather]}></img>
                        }{`${Math.round(elem.temp)}°C`}</li>
                    )
                })}
            </ul>
        </div>
    )
};

export default Form