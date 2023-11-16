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

export function AdapterUbidotsData(dataUbidots) {
  const currentDate = new Date();
  // Lista de los nombres de los dispositivos
    const labelsDevices = dataUbidots.map((val)=>{
      return val[0][1]
    });
    // Creación de labels en función del parámetro "Timestamp" recibido de Ubidots
    const labelsX = dataUbidots[0].reverse().map((val)=>{
      const date = new Date(val[2]);
      if (currentDate.getDay() === date.getDay()) {
        const text = `${date.getHours()}:${date.getMinutes()}`
        return text
  
      }
      return null
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
      const data = dataUbidots[key].map((val)=>{
        const date = new Date(val[2])
        if (currentDate.getDay()===date.getDay()) {
            return val[0]
        }
        return null;
      });
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