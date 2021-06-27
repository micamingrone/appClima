const axios = require('axios');

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'Buenos Aires'];

    constructor() {
        //TODO: leer DB si existe
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY ,
            'limit': '5',
            'lang': 'es'
        };


    }

    get paramsOpenWeather() {
        return{
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'

        };
     }

    async ciudad(lugar = '') {

        try {

            //Petición HTTP - Creando una instancia con Axios

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox

            });

            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],

             }));
                

        } catch (error) {
            return error;

        }




    }


    async climaLugar(lat, lon){
        try {

        //Petición HTTP con Axios a la API
        const instance = axios.create({
      
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {...this.paramsOpenWeather, lat,lon}
                
        });

            const resp = await instance.get();
            const {weather, main} = resp.data;
            console.log(weather);

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } 
        catch (error) {
            console.log(error);
                
        }       
    } 
}









module.exports = Busquedas;