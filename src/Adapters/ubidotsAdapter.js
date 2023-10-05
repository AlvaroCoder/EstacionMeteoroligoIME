export function OptionsUbidots(text) {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: text,
      },
    },
  }
}
function CreateDataset(label="", data=[], borderColor="", backgroundColor="") {
  return {
    label,
    data,
    borderColor, 
    backgroundColor
  }
}
export function AdapterUbidotsData(dataUbidots) {
    // Creación de labels en función del parámetro "Timestamp" recibido de Ubidots
    const labels = dataUbidots[0].reverse().map((val)=>{
      const date = new Date(val[2]);
      const text = `${date.getHours()}:${date.getMinutes()}`
      return text
    });
    /*
    Transformación de la data recibida por Ubidots en listas.
    Cuando se agregue una nueva variable debe seguir la forma de dataTemperatura, en la posición (i+1)
    */
    const dataHumedad = dataUbidots[0].map((val)=>val[0]);
    const dataTemperatura = dataUbidots[1].reverse().map((val)=>val[0]);
    // Colores de cada línea del gráfico
    // b->border & bg->background
    let titleHum = "Humedad"
    let bColorHum = 'rgb(255, 99, 132)'
    let bgColorHum = 'rgba(255, 99, 132, 0.5)'

    let titleTemp = "Temperatura"
    let bColorTemp ='rgb(53, 162, 235)'
    let bgColorTemp ='rgba(53, 162, 235, 0.5)'
    
    const humedad = {
      labels,
      datasets : [CreateDataset(titleHum, dataHumedad, bColorHum, bgColorHum)]
    }
    const temperatura = {
      labels,
      datasets : [CreateDataset(titleTemp, dataTemperatura, bColorTemp, bgColorTemp)]
    }

    /*

    TODO:
    Si existiera más data, solo se debe crear un nuevo objeto siguiendo el ejemplo de los objetos de arriba
    y retornarlo en el objeto de "return"

    */
    return {
      humedad,
      temperatura
    }
}
// :)