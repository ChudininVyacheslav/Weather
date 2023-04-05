export function processingWeather(value) {
    const data = {
        name: value.name,
        temp: Math.round(value.main.temp),
        weather: value.weather[0].main
    };
    return data;
};

export function processingWeatherThreeHours(value) {
    const changesData = [];
    value.list.map((elem) => {
        return changesData.push({
            id: elem.dt,
            time: `${new Date(elem.dt_txt).getHours()}:${new Date(elem.dt_txt).getMinutes()}`,
            weather: elem.weather[0].main,
            temp: elem.main.temp
        });
    });

    changesData.map((elem) => {
        if (elem.time[0] === '0') {
            elem.time = '0' + elem.time;
        }
        if (elem.time.slice(-1) === '0') {
            elem.time = elem.time + '0';
        }
        if (elem.time.length === 4) {
            elem.time = '0' + elem.time;
        }
        return elem;
    });
    return changesData;
}