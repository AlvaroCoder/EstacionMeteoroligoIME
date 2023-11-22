import React from 'react'
import { RESOURCES } from '../config/assets';

function Footer() {
  return (
    <footer className='sm:h-32 w-full bg-azul flex items-center'>
        <img className='sm:ml-5 ml-10 ' src={RESOURCES.UDEP_LOGO_BLANCO} alt='Logo Udep Blanco' />
    </footer>
  )
}

export default Footer;