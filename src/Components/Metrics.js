import React, { useEffect, useState } from 'react';
import { fetchDataDevices } from '../services/querys';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AdapterUbidotsData, OptionsUbidots } from '../Adapters/ubidotsAdapter';
import Widget from './Widgets';
import { Carousel, IconButton } from '@material-tailwind/react';
function Metrics() {
    const [dataMetrics, setDataMetrics] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [currentTemp, setCurrentTemp] = useState(null);
    useEffect(()=>{
        // Consulta de data API Ubidots
        async function getPost() {
            // Petición de los datos de los dispositivos
            setLoadingData(true);
            const fetchData = await fetchDataDevices();
            // Convierto la data a JSON
            const jsonData = await fetchData.json();
            // Transformar la data de Ubidots para la libreria reac-charts
            setLoadingData(false)
            const dataAdaptted = AdapterUbidotsData(jsonData.results);

            setDataMetrics(dataAdaptted);
            const currentTemperature = dataAdaptted.filter((val)=>val.title.toUpperCase()==="TEMPERATURE")[0]['data']['datasets'][0]['data'][0]
            console.log(currentTemperature);
            setCurrentTemp(currentTemperature)
          }
        getPost();
    },[]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend);

  if (loadingData) {
    return(
      <div className='w-full h-screen justify-center items-center'>
        <h1 className='text-3xl font-bold '>Cargando la data...</h1>
      </div>
    )
  }
  return (
    <div className='w-full min-h-screen flex flex-col py-5'>

<Widget currentTemp={21}/>
        <div className='w-full text-3xl mt-10 h-10 text-center'>
            <h1 className=''>MEDICIONES</h1>
        </div>
        <div className='flex flex-col justify-center items-center w-full min-h-screen'>
            <div className="w-3/4 h-[600px] mt-12 rounded-lg">
                {/*Renderizar componentes de gráficos*/}
                {
                  dataMetrics && dataMetrics.map((elemt, key)=>{
                    return (
                      <Line key={key} className='w-full h-full mt-5' options={OptionsUbidots(elemt['title'])} data={elemt['data']}/>
                    )
                  })
                }
            </div>
        </div>
    </div>
  )
}

export default Metrics;