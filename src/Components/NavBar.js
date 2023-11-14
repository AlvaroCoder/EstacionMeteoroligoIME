import React from 'react';
import LogoUdep from '../Assets/Images/UdepLogo.png';
function NavBar() {
    const urls = [
        {"displayName":"Puquchi","url":"/"}
    ]
  return (
    <nav className='w-100 h-20 bg-slate-300 flex flex-row justify-between items-center'>
        <div className='w-48  flex justify-center'>
            <img alt='Logo Udep' src={LogoUdep}></img>
        </div>  
        <div className='w-30'>
            <ul className='flex flex-row '>
                {urls.map((url,key)=>{
                    return (<li key={key} className='ml-5 p-4 py-2 h-10 leading-4 font-custom rounded-lg cursor-pointer flex items-center justify-center text-center font-londrina text-3xl text-azul_logo hover:bg-slate-200'><span>{url.displayName}</span></li>)
                })}
            </ul>
        </div>
    </nav>
  )
}

export default NavBar;