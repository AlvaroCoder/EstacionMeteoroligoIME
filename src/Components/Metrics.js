import React, { useEffect, useState } from 'react'
import { fetchDataDevices } from '../services/querys';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AdapterUbidotsData } from '../Adapters/ubidotsAdapter';
import Widget from './Widgets';

function Metrics() {
    const [dataMetricsHumedad, setDataMetricsHum] = useState({
        labels : [],
        datasets : []
    });
    const [dataMetricsTemp, setDataMetricsTemp] = useState({
        labels : [],
        datasets : []
    })
    const [optUbidotsHumedad, setOptionsUbidotsHum] = useState({});
    const [optUbidotsTemp, setOptUbidotsTemp] = useState({});
    useEffect(()=>{
        // Consulta de data API Ubidots
        async function getPost() {
            const fetchData = await fetchDataDevices();
            // Convierto la data a JSON
            const jsonData = await fetchData.json();

            // Transformar la data de Ubidots para la libreria reac-charts
            const {optionsHumedad, optionsTemp, dataUbidotsHumedad, dataUbidotsTemperatura} = AdapterUbidotsData(jsonData.results);

            console.log(dataUbidotsHumedad);
            // asignar los valores a las variables para que luega sean leídas
            setDataMetricsHum(dataUbidotsHumedad);
            setOptionsUbidotsHum(optionsHumedad);
            setDataMetricsTemp(dataUbidotsTemperatura);
            setOptUbidotsTemp(optionsTemp);
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
  return (
    <div className='w-full min-h-screen flex flex-col py-5'>
        <Widget currentTemp={dataMetricsTemp.datasets[0] && dataMetricsTemp.datasets[0].data[dataMetricsTemp.datasets[0].data.length-1] }/>
        <div className='w-full text-3xl mt-10 h-10 text-center'>
            <h1 className=''>MEDICIONES</h1>
        </div>
        <div className='flex flex-col justify-center items-center w-full min-h-screen'>
            <div className="w-3/4 h-[600px] rounded-lg">
                {/*Renderizar componentes de gráficos*/}
                
                <Line options={optUbidotsHumedad} data={dataMetricsHumedad} />
                <Line options={optUbidotsTemp} data={dataMetricsTemp}/>
            </div>
        </div>
    </div>
  )
}

export default Metrics