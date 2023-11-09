import React  from 'react'
import icons from '../Server/icons.json';

function Widgets({currentTemp}) {
    const srcWeatherIcon = icons.filter((value)=>{
        if (currentTemp>value.temperaturaMinima && currentTemp<value.temperaturaMaxima) {
            return value;
        }
        return null;
    })[0].src;

    return (
    <div className='w-full h-15 flex flex-row justify-center items-center'>
        <div className='w-[400px] h-[150px] rounded-lg flex justify-center '>
            {/* Contenedor Widget Tiempo */}
            <div>
                <h1 className='text-2xl font-bold text-azul'>Temperatura Actual</h1>
                <div className='w-[40px] h-[40px] '>
                    <img className='object-cover' src={srcWeatherIcon} alt='Weather' />
                </div>
                <h1 className='text-3xl '>{currentTemp}°C</h1>
            </div>
        </div>
    </div>
  )
}

export default Widgets;