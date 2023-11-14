import React, { useEffect, useState }  from 'react'
import icons from '../Server/icons.json';
import moment from 'moment';
function Widgets({currentTemp}) {
    moment.lang('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
      }
      )
    const [timeString, setTimeString] = useState('');
    const [dateString, setDateString] = useState('');
    const [greetingString, setGreetingString] = useState('');
    const srcWeatherIcon = icons.filter((value)=>{
        if (currentTemp>value.temperaturaMinima && currentTemp<value.temperaturaMaxima) {
            return value;
        }
        return null;
    })[0].src;
    useEffect(()=>{
        function getHour() {

            const time = new Date().toLocaleTimeString();
            const dateHour = new Date().getHours();
            const timeStr = `${time} ${dateHour> 12 ? 'P.M.' : 'A.M.'}`
            const greeting = `${dateHour> 12 ? (dateHour > 19 ? 'Buenas tardes' : 'Buenas Noches') : 'Buenos días'}`
            setGreetingString(greeting);
            setTimeString(timeStr);
            const date = moment().format("Do MMM YYYY");
            const day = moment().format("dddd");
            const str = `${day} ${date}`
            setDateString(str);
        }
        getHour()
        setInterval(()=>{
            getHour()
        }, 1000)
    },[]);
    return (
    <div className='w-full h-15 flex flex-row justify-center items-center'>
        <div className='w-[400px] h-[150px] rounded-lg flex flex-col justify-center '>
            {/* Contenedor Widget Tiempo */}
            <div className='w-full py-4'>
                <div>
                    <h1 className='text-3xl font-bold text-azul_logo'>{timeString}</h1>
                </div>
                <div>
                    <h1 className='text-[16px]'>{dateString}</h1>
                </div>
                <div>
                    <h1>{greetingString}</h1>
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-bold text-azul'>Temperatura Actual</h1>
                <div className='w-[40px] h-[40px] '>
                    <img className='object-cover' src={srcWeatherIcon} alt='Weather' />
                </div>
                <h1 className='text-3xl '>{currentTemp}°C</h1>
            </div>
        </div>
    </div>
  )
}

export default Widgets;