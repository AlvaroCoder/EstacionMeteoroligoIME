import React from 'react'
import { RESOURCES } from '../config/assets';

function Infographic() {
  return (
   <div className='relative bg-blue-gray-300 w-full h-screen flex items-center justify-end'>
        <div className='absolute w-full h-screen top-0 right-0'>
          <img className='z-0 w-full h-screen object-cover' src={RESOURCES.BANNER_BANANITOS} alt='Imagen Bananitos' />
        </div>
        <div className='z-50 px-4 mr-20 w-[600px] h-1/2  flex items-start justify-center flex-col'>
          <h1 className='bg-[#597C00] rounded-xl p-2 text-blanco font-bold sm:text-2xl px-4 font-volkorn'>Banano Orgánico</h1>
          <h1 className='font-bold sm:text-3xl text-blanco my-2 font-volkorn'>¿Sabías que ..?</h1>
          <p className='sm:w-[450px] text-blanco font-volkorn'>Las condiciones climáticas actuales no favorecen el crecimiento de Trips.</p>
        </div>
    </div>
  )
}

export default Infographic;