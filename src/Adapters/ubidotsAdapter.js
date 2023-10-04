export function AdapterUbidotsData(dataUbidots) {
    const labels = dataUbidots[0].reverse().map((val)=>{
      const date = new Date(val[2]);
      const text = `${date.getHours()}:${date.getMinutes()}`
      return text
    });
    const dataHumedad = dataUbidots[0];
    const dataTemperatura = dataUbidots[1];
    const dataUbidotsHumedad = {
      labels,
      datasets : [
        {
            label : "Humedad",
            data : dataHumedad.reverse().map((val)=>val[0]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
    ]
    }
    const dataUbidotsTemperatura = {
      labels,
      datasets : [
        {
          label : "Temperatura",
          data : dataTemperatura.reverse().map((val)=>val[0]),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    }
    const optionsHumedad = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Medición de la humedad',
          },
        },
      }
      const optionsTemp = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Medición de la Temperatura',
          },
        },
      }
    return {
      optionsHumedad,
      optionsTemp,
      dataUbidotsHumedad,
      dataUbidotsTemperatura
    }
}
