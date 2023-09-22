import React from 'react'
import Metrica1 from '../Assets/Images/Metrica1.png';
import Metrica2 from '../Assets/Images/Metrica2.png';
function Metrics() {
    const metricas = [
        {"imagen":Metrica1, "alt":"Metrica 1"},
        {"imagen":Metrica2, "alt":"Metrica 2"},
        {"imagen":Metrica1, "alt":"Metrica 3"},
        {"imagen":Metrica2, "alt":"Metrica 4"}
    ]
  return (
    <div className='w-full min-h-screen flex flex-col py-5'>
        <div className='w-full text-3xl mt-10 h-10 text-center'>
            <h1 className=''>MEDICIONES</h1>
        </div>
        <div className='flex flex-col justify-center w-full min-h-screen'>
            {metricas.map((item,key)=>{
                return (<div key={key} className='mt-6 w-3/4 h-60 flex justify-center'>
                    <img className='object-cover w-1/2 h-60' alt={item.alt} src={item.imagen}></img>
                    </div>)
            })}
        </div>
    </div>
  )
}

export default Metrics