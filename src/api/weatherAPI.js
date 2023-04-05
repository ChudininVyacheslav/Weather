export async function requestWeather(valueInput, key) {
    try {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${valueInput}&lang=ru&appid=${key}&units=metric`);
        const getRequest = await request.json();
        return getRequest;
    } catch (e) {
        console.log(e.massege)
    }
};

export async function requestThreeHours(valueInput, apiKey) {
    try {
        const data2 = [];
        const request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${valueInput}&cnt=8&appid=${apiKey}&units=metric`);
        const getRequest = await request.json();
        if (getRequest.cod === '404') {
            alert('Введите корректное название города!');
            return;
        };
        return getRequest;
    } catch (e) {
        console.log(e.massege);
    }
};