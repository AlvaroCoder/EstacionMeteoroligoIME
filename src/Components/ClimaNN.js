import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

function Clima(){
    const [modelo, setModelo] =useState(null);

    useEffect(() =>{
        async function cargarModelo() {
            try {
                console.log("Cargando modelo...");
                const modeloCargado = await tf.loadLayersModel("model_clima.jason");
                setModelo(modeloCargado);
                console.log("Modelo cargado...");

            }   catch(error) {
                console.error("Error al cargar el modelo",error);

            }
        }
        cargarModelo();
    },[]);

    return(
        <div>
            <p className='sm:w-[450px] text-blanco font-volkorn'>Las condiciones climáticas no favorecen al crecimiento de thrips actualmente.</p>
        </div>
    );
}

export default Clima;