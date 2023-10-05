export function fetchWeather() {
    return fetch('https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1',{
        method : 'GET',
        mode : 'cors'
    })
}