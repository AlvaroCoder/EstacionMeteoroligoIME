import React, { useEffect, useState } from 'react';
import { fetchDataDevices } from '../services/querys';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AdapterUbidotsData, OptionsUbidots } from '../Adapters/ubidotsAdapter';
import Widget from './Widgets';
import { Carousel, IconButton } from '@material-tailwind/react';
function Metrics() {
    const [dataMetrics, setDataMetrics] = useState({
        humedad : {
            labels : [],
            datasets : []
        },
        temperatura : {
            labels : [],
            datasets : []
        }
    });
    useEffect(()=>{
        // Consulta de data API Ubidots
        async function getPost() {
            // Petición de los datos de los dispositivos
            const fetchData = await fetchDataDevices();
            // Convierto la data a JSON
            const jsonData = await fetchData.json();

            // Transformar la data de Ubidots para la libreria reac-charts
            const {humedad, temperatura} = AdapterUbidotsData(jsonData.results);

            // asignar los valores a las variables para que luega sean leídas
            const results = {
                humedad,
                temperatura
            }
            setDataMetrics(results);
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

        <Widget currentTemp={dataMetrics.temperatura.datasets[0] ? dataMetrics.temperatura.datasets[0].data[0] : 21}/>
        <div className='w-full text-3xl mt-10 h-10 text-center'>
            <h1 className=''>MEDICIONES</h1>
        </div>
        <div className='flex flex-col justify-center items-center w-full min-h-screen'>
            <div className="w-3/4 h-[600px] mt-12 rounded-lg">
                {/*Renderizar componentes de gráficos*/}
                <Carousel 
                className='rounded-xl'
                prevArrow={({ handlePrev }) => (
                    <IconButton
                      variant="text"
                      color="black"
                      size="lg"
                      onClick={handlePrev}
                      className="!absolute top-2/4 left-4 -translate-y-2/4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                    </IconButton>
                  )}
                  nextArrow={({ handleNext }) => (
                    <IconButton
                      variant="text"
                      color="black"
                      size="lg"
                      onClick={handleNext}
                      className="!absolute top-2/4 !right-4 -translate-y-2/4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </IconButton>
                  )}
                >
                    {dataMetrics.humedad && <Line className='w-full h-full' options={OptionsUbidots("Humedad")} data={dataMetrics.humedad}/>}
                    {dataMetrics.temperatura && <Line className='w-full h-full' options={OptionsUbidots("Temperatura")} data={dataMetrics.temperatura}/>}
                </Carousel>
            </div>
        </div>
    </div>
  )
}

export default Metrics;