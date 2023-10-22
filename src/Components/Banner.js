import React from 'react'
import FondoEstacion from '../Assets/Images/FondoEstacion.png';
import Logo from '../Assets/Images/Logo.png';
function Banner() {

    return (
        <div className='relative w-full h-full'>
            <div className='absolute w-60 h-60'>
                <img src={Logo} alt='Logo'></img>
            </div>
            <div className='w-full h-screen flex flex-row justify-center items-center'>
                <div className='w-1/2 h-screen flex justify-center items-center' >
                    <img className='w-full h-screen object-cover' src={FondoEstacion} alt='Fondo de la Estación'></img>
                </div>
                <div className='w-1/2 h-screen flex justify-center items-center bg-azul'>
                    <div className='w-1/2 h-52 text-center '>
                        <h1 className='text-3xl font-bold text-piel3'>DATOS ACTUALIZADOS 2.0 PERU</h1>
                        <h2 className='text-3xl font-bold text-piel3'>UBICACION : POR DEFINIR</h2>
                        <button className='bg-piel1 text-azul p-4 py-2 font-bold rounded-lg mt-6'>Ver Datos</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Banner;