export function fetchDataDevices() {
    return fetch('https://industrial.api.ubidots.com/api/v1.6/data/raw/series',{
        method : 'POST',
        mode : 'cors',
        headers :{
            'X-Auth-Token':'BBFF-lPUKYqWg6dRRxXMAI2RpjBKX2FYEixsKXOoGds6gnZewisCFPrCMlI1',
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            "variables":["651ba29ff21fd6000e22deb1","651ba29f52844a0af3688f25"],
            "columns":["value.value","variable.id","timestamp"],
            "join_dataframes": false
        })
    })
}
