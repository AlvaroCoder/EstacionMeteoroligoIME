import React, { useEffect, useState } from 'react';
import { fetchDataDevices } from '../services/querys';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AdapterUbidotsData, OptionsUbidots } from '../Adapters/ubidotsAdapter';
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
            const currentHumidity = dataAdaptted.filter((val)=>val.title.toUpperCase()==="HUMIDITY")[0]['data']['datasets'][0]['data'][0];
            const currentWind = dataAdaptted.filter((val)=>val.title.toUpperCase()==="VELOCITY")[0]['data']['datasets'][0]['data'][0];
            const currentDirection = dataAdaptted.filter((val)=>val.title.toUpperCase()==="DIRECTION")[0]['data']['datasets'][0]['data'][0];
            const currentLigth = dataAdaptted.filter((val)=>val.title.toUpperCase()==="LIGHT")[0]['data']['datasets'][0]['data'][0];

            const listIcons = [
              {title : 'Dirección', icon : RESOURCES.ICON_DIRECTION, data : `${currentDirection}°`},        
              {title : 'Humedad', icon : RESOURCES.ICON_HUMIDITY, data : `${currentHumidity}%`},
              {title : 'UV', icon : RESOURCES.ICON_SOL, data : `${currentLigth}`},
              {title : 'Presión', icon : RESOURCES.ICON_WIND, data : `${currentWind}hPa`},
              {title : 'Lluvia', icon : RESOURCES.ICON_LLUVIA, data : `${currentWind}mm`},
              {title : 'Temperatura', icon : RESOURCES.ICON_TEMPERATURE, data : `${currentTemperature}°C`},
              {title : 'Viento', icon : RESOURCES.ICON_WIND, data : `${currentWind}km/h`},
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
              <Carousel 
                className='rounded-xl'
                navigation={({setActiveIndex, activeIndex})=>(
                  <div className='absolute w-full top-0 left-2/4 -translate-x-2/4 z-50 flex  gap-5'>
                    <div className='w-full grid grid-cols-7 gap-4'>
                        {
                          iconsStation[0] && iconsStation.map(({title, icon, data}, key)=>{
                            return (
                              <BoxIconStation activeIndex={activeIndex} index={key} onClick={()=>setActiveIndex(key)} key={key} title={title} icon={icon} data={data} />
                            )
                          })
                        }
                      </div>
                  </div>
                )}
              >
                {
                  dataMetrics && dataMetrics.map((elemnt, key)=>{
                    return (
                      <div className='w-full h-full  px-10 py-10 flex flex-col justify-center'>
                        {/* <h1 className='text-3xl font-bold text-[#823B3B] ml-14 mt-12'>{elemnt['title']}</h1> */}
                        <div className='h-[500px] sm:h-auto  w-full flex flex-row items-center justify-center'>
                          <div className='sm:h-[500px] w-[800px]'>
                            <Line key={key} className='w-full h-full mt-5' options={OptionsUbidots(elemnt['title'])} data={elemnt['data']}/>
                          </div>
                        </div>
                      </div>
                      )
                  })
                }
              </Carousel>
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

