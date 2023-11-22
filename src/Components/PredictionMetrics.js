import React, { useEffect, useState } from 'react';
import { fetchDataDevices, fetchTemperature } from '../services/querys';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AdapterTemperatureData, AdapterUbidotsData, OptionsUbidots } from '../Adapters/ubidotsAdapter';
import { Carousel, IconButton } from '@material-tailwind/react';
import { RESOURCES } from '../config/assets';
import * as tf from '@tensorflow/tfjs';

function BoxIconStation({title, icon, data, onClick, activeIndex=0, index=0}) {
  return (
    <div onClick={onClick} className={` h-16 p-4 rounded-xl cursor-pointer transition-all flex flex-row items-center justify-center ${activeIndex===index ? 'bg-gray-600' : 'bg-gray-500'  }`}>
      <div className='w-9 h-9'>
        <img className='object-contain w-10 h-10' src={icon} alt='Icono' />
      </div>
      <div className='flex flex-col ml-6'>
        <h1 className='font-bold text-blanco'>{title}</h1>
        <h1 className='text-blanco'>{data}</h1>
      </div>
    </div>
  )
}

function PredictionMetrics() {
    const [dataMetrics, setDataMetrics] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [currentTemp, setCurrentTemp] = useState(null);
    const [dataWidgets, setDataWidgets] = useState(null);
    const [iconsStation, setIconsStation] = useState([]);
    const [dataTemp, setDataTemp] = useState(null);
    useEffect(()=>{
        // Consulta de data API Ubidots
        async function getPost() {
            // Petición de los datos de los dispositivos
            setLoadingData(true);
            const fetchData = await fetchDataDevices();
            const dataTemp = await fetchTemperature();
            const jsonTemp = await dataTemp.json();
            // Convierto la data a JSON
            const jsonData = await fetchData.json();
            // Transformar la data de Ubidots para la libreria reac-charts
            setLoadingData(false)
            const dataAdaptted = AdapterUbidotsData(jsonData.results);
            const dataAdapptedTemp = AdapterTemperatureData(jsonTemp);

            setDataTemp(dataAdapptedTemp)
            setDataMetrics(dataAdaptted); 

            const currentTemperature = dataAdaptted.filter((val)=>val.title.toUpperCase()==="TEMPERATURE")[0]['data']['datasets'][0]['data'][0]
         
            const listIcons = [
              {title : 'Temperatura', icon : RESOURCES.ICON_TEMPERATURE, data : `${currentTemperature}°C`},
            ]
            setCurrentTemp(currentTemperature);
            setIconsStation(listIcons)
          }
          getPost();
          setInterval(()=>{
            getPost();
          }, 600000)
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
        <h1 className='sm:text-3xl font-bold '>Cargando la data...</h1>
      </div>
    )
  }
  return (
    <div className='w-full min-h-screen flex flex-col py-5'>
        <div className='flex items-center justify-center h-1/2'>
          <h1 className='md:text-3xl text-azul font-bold'>Pronóstico</h1>
        </div>
        <div className='flex flex-col justify-center items-center w-full min-h-screen'>
            <div className="w-full px-4 h-screen mt-12 rounded-lg">
            {
                  dataTemp && <div className='w-full h-full  px-10 py-10 flex flex-col justify-center'>
                  {/* <h1 className='text-3xl font-bold text-[#823B3B] ml-14 mt-12'>{elemnt['title']}</h1> */}
                  <div className='h-[500px] sm:h-auto  w-full flex flex-row items-center justify-center'>
                    <div className='sm:h-[500px] w-[800px]'>
                      <Line className='w-full h-full mt-5' options={OptionsUbidots(dataTemp['title'])} data={dataTemp['data']}/>
                    </div>
                  </div>
                </div>
                }
            </div>
        </div>
    </div>
  )
}

function Clima(){
    const [modelo, setModelo] =useState(null);

    useEffect(() =>{
        async function cargarModelo() {
            try {
                console.log("Cargando modelo...");
                const modeloCargado = await tf.loadLayersModel("model_clima.jason");
                setModelo(modeloCargado);
                console.log("Modelo cargado...");

            }   catch(error) {
                console.error("Error al cargar el modelo",error);

            }
        }
        cargarModelo();
    },[]);

    return(
        <div>
            <p className='sm:w-[450px] text-blanco font-volkorn'>Las condiciones climáticas no favorecen al crecimiento de thrips actualmente.</p>
        </div>
    );
}



export default PredictionMetrics;

