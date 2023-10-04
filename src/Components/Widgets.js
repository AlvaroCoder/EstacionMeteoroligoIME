import React from 'react'

function Widgets({currentTemp}) {
    return (
    <div className='w-full h-15 flex flex-row justify-center items-center'>
        <div className='w-[400px] h-[150px] rounded-lg flex justify-center '>
            {/* Contenedor Widget Tiempo */}
            <div>
                <h1 className='text-2xl font-bold text-azul'>Temperatura Actual</h1>
                <h1 className='text-3xl '>{currentTemp}°C</h1>
            </div>
        </div>
    </div>
  )
}

export default Widgets;