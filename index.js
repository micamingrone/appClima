const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('dotenv').config();

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {

        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                

                //Buscar los lugares de consulta
                const lugares= await busquedas.ciudad(termino);

                //Seleccionar el lugar a consultar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find( l => l.id === id); 
                
                
                
                //Llamar a la API del clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                

                //Mostrar los resultados en consola
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Lat: ', lugarSel.lat );
                console.log('Lng: ', lugarSel.lng );
                console.log('Temperatura: ',clima.temp );
                console.log('Mínima: ', clima.min);
                console.log('Máxima: ', clima.max);
                console.log('Como está el clima: ',clima.desc);

                break;



        }

        if (opt !== 0) await pausa();


    } while (opt !== 0);
}



main();