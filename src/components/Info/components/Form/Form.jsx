import React, { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import clear from '../../../../assets/clear.png';
import clouds from '../../../../assets/cloudy.png';
import haze from '../../../../assets/foggy.png';
import rain from '../../../../assets/rain.png';
import snow from '../../../../assets/snowy.png';
import thunderstorm from '../../../../assets/thunderstorm.png';

const Form = () => {
    const [value, setValue] = useState('');
    const [weatherCity, setWeatherCity] = useState({});
    const [weatherThreeHours, setWeatherThreeHours] = useState([]);
    const apiKey = '5ee14456817b86276d301402ebe9f898';

    useEffect(() => {
        getData(value, apiKey);
        getDataThreeHours(value, apiKey);
    }, []);

    async function getData(valueInput, key) {
        if (!valueInput) {
            valueInput = 'Moscow';
        };
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${valueInput}&lang=ru&appid=${key}&units=metric`);
        const getRequest = await request.json();

        setWeatherCity({ name: getRequest.name, temp: Math.round(getRequest.main.temp), weather: getRequest.weather[0].main });
    };

    async function getDataThreeHours(valueInput, apiKey) {
        try {
            if (!valueInput) {
                valueInput = 'Moscow';
            };
            const request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${valueInput}&cnt=8&appid=${apiKey}&units=metric`);
            const getRequest = await request.json();
    
            setWeatherThreeHours(getRequest.list);
        } catch (e) {
            console.log(e.massege);
            alert('Введите корректное название города!');
        }
    }

    return (
        <div>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                getData(value, apiKey);
                getDataThreeHours(value, apiKey);
                setValue('');
            }}>
                <input onChange={(e) => {
                    setValue(e.target.value);
                }} className={styles.input} type='text' placeholder='Поиск...' value={value} />
            </form>
            {weatherCity && <p className={styles['info-city']}>{weatherCity.name}{
                weatherCity.weather === 'Clouds' ? <img className={styles['info-city-img']} src={clouds}></img> :
                    weatherCity.weather === 'Snow' ? <img className={styles['info-city-img']} src={snow}></img> :
                        weatherCity.weather === 'Clear' ? <img className={styles['info-city-img']} src={clear}></img> :
                            weatherCity.weather === 'Rain' ? <img className={styles['info-city-img']} src={rain}></img> :
                                weatherCity.weather === 'Haze' ? <img className={styles['info-city-img']} src={haze}></img> :
                                    <img className={styles['info-city-img']} src={thunderstorm}></img>
            }{`${weatherCity.temp}°C`}</p>}
            <ul className={styles['weather-list']}>
                {weatherThreeHours && weatherThreeHours.map((elem) => {
                    return (
                        <li key={elem.dt} className={styles['weather-list-item']} >{elem.dt_txt.slice(11, 16)}{
                            elem.weather[0].main === 'Clouds' ? <img className={styles['weather-list-img']} src={clouds}></img> :
                                elem.weather[0].main === 'Snow' ? <img className={styles['weather-list-img']} src={snow}></img> :
                                    elem.weather[0].main === 'Clear' ? <img className={styles['weather-list-img']} src={clear}></img> :
                                        elem.weather[0].main === 'Rain' ? <img className={styles['weather-list-img']} src={rain}></img> :
                                            elem.weather[0].main === 'Haze' ? <img className={styles['weather-list-img']} src={haze}></img> :
                                                <img className={styles['weather-list-img']} src={thunderstorm}></img>
                        }{`${Math.round(elem.main.temp)}°C`}</li>
                    )
                })}
            </ul>
        </div>
    )
};

export default Form