import moment from "moment";

export function OptionsUbidots(text) {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display : false
      },
      title: {
        display: true,
        text: text,
      },
    },
  }
}

export function AdapterUbidotsData(dataUbidots) {
  const currentDate = new Date();
  // Lista de los nombres de los dispositivos
    const labelsDevices = dataUbidots.map((val)=>{
      return val[0][1]
    });
    // Creación de labels en función del parámetro "Timestamp" recibido de Ubidots

    const labelsX = dataUbidots[0].reverse().filter((val)=>{
      const date = new Date(val[2]);
      return currentDate.getDay() === date.getDay();
    }).map((val)=>{
      const d = new Date(val[2])
      let horas = d.getHours();
      let minutos = d.getMinutes();

      horas = horas % 12;
      horas = horas || 12; // Si es 0, asigna 12 en lugar de 0

      minutos = minutos < 10 ? '0' + minutos : minutos;
      return  `${horas}:${minutos}`
    });
    /*
      Transformamos la data de la forma [Array(100),Array(100),...,Array(100)]
      a [{
        "title":label,
        "data":{
          datasets,
          "labels":labelsX
        }
      }]
    */
    const splitData = labelsDevices.map((label, key )=>{
      const data = dataUbidots[key].filter((val)=>{
        const date = new Date(val[2])
        return currentDate.getDay()===date.getDay();
      }).map((val)=>val[0]);
      const datasets = [{
        label : label.toUpperCase(),
        data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }]
      return {
        "title":label.toUpperCase(),
        "data":{
          datasets,
          "labels":labelsX
        }
      }
    });
    return splitData
}

// :)
export function AdapterTemperatureData(data) {
  const dataTemp = data['timelines']['hourly'];
  const labelsX = dataTemp.map((val)=>{
    
    return val['time'];
  });
  const dataT = dataTemp.map((val)=>val['values']['temperature'])
  const datasets = [
    {
      label : "Temperatura",
      data : dataT,
      borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
  return {
    "title" : "Temperature",
    "data":{
      datasets,
      "labels":labelsX
    }
  }
}