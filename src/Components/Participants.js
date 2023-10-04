import React from 'react'
import GloriaPaiva from '../Assets/Images/GloriaPaiva.jpg'
import User1 from '../Assets/Images/User1.png';
import User2 from '../Assets/Images/User2.png';
import User3 from '../Assets/Images/User3.png'
function CardParticipant({img, displayName}) {
    return (
        <div className='w-48  ml-5 h-80 bg-piel3'>
            <img className='rounded-[50%]' src={img} alt='User '></img> 
            <div>
                <h1 className='text-center mt-5'>{displayName}</h1>
            </div>   
        </div>)
}
function Participants() {
    const participants = [
        {"imagen":User2, "nombre":"Pierina García"},
        {"imagen":GloriaPaiva, "nombre":"Gloria Paiva"},
        {"imagen":User3, "nombre":"Gabriela Jimenez"},
        {"imagen":User1, "nombre":"Diego Chunga"},
        {"imagen":User1, "nombre":"Carlos Banda"},
        {"imagen":User1, "nombre":"Jose Ayala"},
        {"imagen":User1, "nombre":"Fabian Valladares"}
    ]
  return (
    <div className='w-full min-h-screen bg-piel1'>
        <div className='w-full h-screen bg-piel1 flex flex-row justify-center items-center'>
            {participants.map((item, key)=>{
                return <CardParticipant key={key} img={item.imagen} displayName={item.nombre}/>
            })}
        </div>
    </div>
  )
}

export default Participants;