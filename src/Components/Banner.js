import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { fetchDataDevices } from '../services/querys';
import { AdapterUbidotsData } from '../Adapters/ubidotsAdapter';
import { RESOURCES } from '../config/assets';
moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  })
  function StyleH1({text, style=null}) {
    let styleText = "text-azul font-volkorn"
    if (style) {
        styleText+=style.style
    }
    return <h1 className={styleText}>{text}</h1>
  }
function Banner() {
    const [timeString, setTimeString] = useState('');
    const [greetingString, setGreetingString] = useState('');
    const [dateString, setDateString] = useState('');
    const [temperature, setTemperature] = useState({
        temp : null,
        icon : null
    })
    const [humidityValue, setHumidityValue] = useState(null);
    const [velocityValue, setVelocityValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentHour, setCurrentHour] = useState(0);
    useEffect(()=>{
        function fetchTime() {
            const date = new Date();
            const time = date.toLocaleTimeString();
            const hour = date.getHours();
            setCurrentHour(hour);

            const timeSuffix = hour > 12 ? 'P.M.' : 'A.M.'
            const timeStr = `${time} ${timeSuffix}`
            const greeting = hour >= 12 ? (hour <= 19 ? 'Buenas Tardes' : 'Buenas Noches') : 'Buenos Días'
            setGreetingString(greeting);
            setTimeString(timeStr);

            const dateFormat = moment().format("Do MMM YYYY");
            const day = moment().format("dddd");
            const str = `${day} ${dateFormat}`
            setDateString(str);
        }

        async function fetchDataApi() {
            setLoading(true);
            const fetchData = await fetchDataDevices();
            const jsonData = await fetchData.json();
            setLoading(false);

            const date = new Date();
            const hour = date.getHours();

            const dataAdaptted = AdapterUbidotsData(jsonData.results);
            const currentTemperature = dataAdaptted.filter((val)=>val.title.toUpperCase()==="TEMPERATURE")[0]['data']['datasets'][0]['data'][0]
            const currentRain = 0
            const currentLigh = 3
            const currentVelocity = dataAdaptted.filter((val)=>val.title.toUpperCase()==="VELOCITY")[0]['data']['datasets'][0]['data'][0];
            const currentHumidity = dataAdaptted.filter((val)=>val.title.toUpperCase()==="HUMIDITY")[0]['data']['datasets'][0]['data'][0];
            const iconTemp  = hour > 5 ? (hour <= 19 ? (currentTemperature > 27 ? (currentLigh >= 3 ? RESOURCES.IMG_SOL : RESOURCES.IMG_SOL_CLOUDY ) : RESOURCES.IMG_SOL_CLOUDY ) : (currentRain > 0 ? RESOURCES.IMG_MOON_RAIN : RESOURCES.IMG_MOON_CLOUDY)  ) : (currentRain > 0 ? RESOURCES.IMG_MOON_RAIN : RESOURCES.IMG_MOON_CLOUDY) 
            setTemperature(prev=>({
                ...prev,
                temp : currentTemperature,
                icon : iconTemp
            }));
            setVelocityValue(currentVelocity);
            setHumidityValue(currentHumidity);
        }

        fetchTime();
        fetchDataApi();
        setInterval(()=>{
            fetchTime();
        }, 1000);
        setInterval(()=>{
            fetchDataApi();
        },300000)
    },[]);
    return (
        <div className={`relative w-full h-screen flex flex-row justify-center items-center ${currentHour > 5 ? (currentHour <= 17 ? 'bg-naranja'  : 'bg-azul'): 'bg-azul'} `}>
            <div className='absolute w-full h-screen top-0 right-0 z-0 flex justify-end items-end'>
            <img className='w-full h-screen object-cover' src={currentHour > 5 ? (currentHour <= 17 ? RESOURCES.SOL_BANNER  : RESOURCES.NOCHE_BANNER): RESOURCES.NOCHE_BANNER} alt='Banner'></img>
            </div>

            <div className='z-10 w-[400px] h-screen rounded-lg flex flex-col justify-center items-center '>
               <div className='px-5'>
                    <h1 className='text-5xl font-bold text-blanco font-volkorn'>{timeString}</h1>
                </div>
                <div className='px-5'>
                    <h1 className='text-[16px] font-bold text-blanco font-volkorn'>{dateString}</h1>
                </div>
                <div className='px-5'>
                    <h1 className='font-bold text-blanco font-volkorn'>{greetingString}</h1>
                </div>
            </div>
            <div className='z-10 w-[400px] h-screen rounded-lg flex flex-col justify-center items-center'>
                <div>
                    <h1 className='text-azul text-3xl font-bold'>Hoy</h1>
                </div>
                {
                    !loading ? 
                        <div className='z-10 h-40 flex flex-row justify-center items-center'>
                            <img className='w-32 h-32' src={temperature.icon && temperature.icon } alt='Icono Imagen Estación Meteorológica' ></img>
                            <h1 className='text-azul text-8xl font-bold mx-4 '>{temperature.temp}°C</h1>
                        </div>          
                    : <span>Loading ...</span>    
                }
                {
                    !loading ? 
                    <div className='z-10 flex flex-col'>
                        <div className='flex flex-row px-5'>
                            <StyleH1 style={{style : "font-bold mr-5"}} text={"Viento"}/>
                            <StyleH1 style={{style : "font-bold"}} text={`${velocityValue}km/h`} />
                        </div>
                        <div className='flex flex-row px-5'>
                            <StyleH1 style={{style : "font-bold mr-5"}} text={"Humedad"} />
                            <StyleH1 style={{style : "font-bold"}} text={`${humidityValue}%`} />
                        </div>
                    </div>
                    : <span>Loading...</span>
                }

            </div>

        </div>
  )
}

export default Banner;