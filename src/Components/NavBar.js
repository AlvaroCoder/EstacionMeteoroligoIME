import React, { useEffect, useState } from 'react';
import {RESOURCES} from '../config/assets';
function NavBar() {
    const [resources, setResources] = useState(null);
    const urls = [
        {"displayName":"Predicciones","url":"/predictions", "displayIcon":false},
        {"displayName":"Puquchi","url":"/",  "displayIcon":true},
    ]
    useEffect(()=>{
        async function fetchResources() {
            setResources(RESOURCES);
        }
        fetchResources();
    },[])
  return (
    <nav className='w-100 h-20 bg-slate-300 flex flex-row justify-between items-center'>
        <div className='w-48  flex justify-center'>
            <img alt='Logo Udep' src={resources && resources.UDEO_LOGO_AZUL}></img>
        </div>  
        <div className='w-30'>
            <ul className='flex flex-row '>
                {urls.map((url,key)=>{
                    return (<li key={key} className='mr-12 px-2 h-10 leading-4 font-custom rounded-lg cursor-pointer flex flex-row items-center justify-center text-center font-londrina text-3xl text-azul_logo hover:bg-slate-200'>
                        {url.displayIcon ? <img className='w-12 h-12 mr-5' src={resources && resources.LOGO_PUQUCHI_NAVBAR} alt='Imagen'/>  : null}
                        <span className='block'>{url.displayName}</span></li>)
                })}
            </ul>
        </div>
    </nav>
  )
}

export default NavBar;