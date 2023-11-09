export function fetchDataDevices() {
    return fetch('https://industrial.api.ubidots.com/api/v1.6/data/raw/series',{
        method : 'POST',
        mode : 'cors',
        headers :{
            'X-Auth-Token':'BBFF-R0LuYwI3yzJI9X3wDgZC8dE7OgYmxQ',
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            "variables":["6542e7f0e95a76000de1c46b","6542e0526e1af6000bcfad86","6542e7994a687a000df479a9","6542e2c14a687a000ff98634","6542e76d84e43d000ea611e1","6542bb34b14253000b9b6fb1","6542e7c46e1af6000bcfad87"],
            "columns":["value.value","variable.name","timestamp"],
            "join_dataframes": false
        })
    })
}
export function fetchDevices() {
    
}