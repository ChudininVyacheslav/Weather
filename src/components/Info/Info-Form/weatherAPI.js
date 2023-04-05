

export async function requestWeather(valueInput, key) {
    try {
        if (!valueInput) {
            alert('Введите корректное название города!')
            return false;
        };
        
        const value = valueInput || 'Moscow';
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=ru&appid=${key}&units=metric`);
        const getRequest = await request.json();
        const data = {
            name: getRequest.name,
            temp: Math.round(getRequest.main.temp),
            weather: getRequest.weather[0].main
        };

        return data;
    } catch (e) {
        console.log(e.massege)
    }
};

export async function requestThreeHours(valueInput, apiKey) {
    try {
        if (!valueInput) {
            return false;
        };

        const data2 = [];
        const value = valueInput || 'Moscow';
        const request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&cnt=8&appid=${apiKey}&units=metric`);
        const getRequest = await request.json();
        // console.log(getRequest)
        if (getRequest.cod === '404') {
            alert('Введите корректное название города!')
            return;
        };        

        const data = getRequest.list;
        data.map((elem) => {
            return data2.push({
                id: elem.dt,
                time: `${new Date(elem.dt_txt).getHours()}:${new Date(elem.dt_txt).getMinutes()}`,
                weather: elem.weather[0].main,
                temp: elem.main.temp
            });
        });

        data2.map((elem) => {
            if (elem.time[0] === '0') {
                elem.time = '0' + elem.time;
            }
            if (elem.time.slice(-1) === '0') {
                elem.time = elem.time + '0';
            }
            if (elem.time.length === 4) {
                elem.time = '0' + elem.time;
            }
            return elem
        });
        return data2;
    } catch (e) {
        console.log(e.massege);
    }
};

