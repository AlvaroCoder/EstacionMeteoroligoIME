import React from 'react'
import { RESOURCES } from '../config/assets';

function Infographic() {
  return (
    <div className='relative bg-blue-gray-300 w-full h-screen'>
        <div className='absolute w-full h-screen top-0 right-0'>
            <img className='z-0 w-full h-screen object-cover' src={RESOURCES.BANNER_BANANITOS} alt='Imagen Bananitos' />
        </div>
    </div>
  )
}

export default Infographic;