import React, { useEffect, useState, useContext } from 'react';
import { requestWeather, requestThreeHours } from '../../../api/weatherAPI';
import styles from './Form.module.scss';
import clear from '../../../assets/clear.png';
import clouds from '../../../assets/cloudy.png';
import haze from '../../../assets/foggy.png';
import rain from '../../../assets/rain.png';
import snow from '../../../assets/snowy.png';
import thunderstorm from '../../../assets/thunderstorm.png';
import { Context } from '../../../context';
import clearBackground from '../../../assets/clear-background.jpg';
import cloudsBackground from '../../../assets/cloudy-background.jpg';
import foggyBackground from '../../../assets/foggy-background.jpg';
import rainBackground from '../../../assets/rain-background.jpg';
import snowyBackground from '../../../assets/snowy-background.jpg';
import thunderstormBackground from '../../../assets/thunderstorm-background.jpg';
import { processingWeather,processingWeatherThreeHours } from './processingApi';

const apiKey = '5ee14456817b86276d301402ebe9f898';
const weather = {
    Clouds: clouds,
    Snow: snow,
    Clear: clear,
    Rain: rain,
    Haze: haze,
    Thunderstorm: thunderstorm
};
const weatherBackground = {
    Clouds: cloudsBackground,
    Snow: snowyBackground,
    Clear: clearBackground,
    Rain: rainBackground,
    Haze: foggyBackground,
    Thunderstorm: thunderstormBackground
};
const defaultValue = 'Москва';

const Form = () => {
    const [value, setValue] = useState('');
    const [weatherCity, setWeatherCity] = useState({});
    const [weatherThreeHours, setWeatherThreeHours] = useState([]);
    const { stateWeather, setStateWeather } = useContext(Context);

    useEffect(() => {
        getData(defaultValue, apiKey);
        getDataThreeHours(defaultValue, apiKey);
    }, []);

    async function getData(valueInput, key) {
        try {
            if (!valueInput) {
                alert('Введите корректное название города!')
                return false;
            };
            const queryResult = await requestWeather(valueInput, key);
            if (!queryResult) {
                return;
            };
            const data = processingWeather(queryResult);
            setStateWeather(weatherBackground[data.weather]);
            setWeatherCity(data);
        } catch (e) {
            console.log(e.massege);
        }
    };

    async function getDataThreeHours(valueInput, apiKey) {
        try {
            if (!valueInput) {
                return false;
            };
            const queryResult = await requestThreeHours(valueInput, apiKey);
            if (!queryResult) {
                return;
            };
            const changesData = processingWeatherThreeHours(queryResult);
            setWeatherThreeHours(changesData);
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