export function fetchDataDevices() {
    return fetch('https://industrial.api.ubidots.com/api/v1.6/data/raw/series',{
        method : 'POST',
        mode : 'cors',
        headers :{
            'X-Auth-Token':'BBFF-R0LuYwI3yzJI9X3wDgZC8dE7OgYmxQ',
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            "variables":["651ba29ff21fd6000e22deb1","651ba29f52844a0af3688f25"],
            "columns":["value.value","variable.name","timestamp"],
            "join_dataframes": false
        })
    })
}
