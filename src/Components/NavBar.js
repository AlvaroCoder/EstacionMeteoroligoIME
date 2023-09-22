import React from 'react';
import LogoUdep from '../Assets/Images/UdepLogo.png';
function NavBar() {
    const urls = [
        {"displayName":"Inicio","url":"/"},
        {"displayName":"Historia","url":"/"}
    ]
  return (
    <nav className='w-100 h-20 bg-slate-300 flex flex-row justify-between items-center'>
        <div className='w-48  flex justify-center'>
            <img alt='Logo Udep' src={LogoUdep}></img>
        </div>  
        <div className='w-30'>
            <ul className='flex flex-row '>
                {urls.map((url)=>{
                    return (<li className='ml-5 p-4 py-2 h-10 leading-4 rounded-lg cursor-pointer flex items-center justify-center text-center hover:bg-slate-200'><span>{url.displayName}</span></li>)
                })}
            </ul>
        </div>
        <div>
            <span className='w-20 cursor-pointer hover:bg-slate-200 rounded-md p-4 py-2'>Login</span>
            <span className='w-20 ml-3 cursor-pointer hover:bg-slate-200 rounded-md p-4 py-2'>Register</span>
        </div>
    </nav>
  )
}

export default NavBar;