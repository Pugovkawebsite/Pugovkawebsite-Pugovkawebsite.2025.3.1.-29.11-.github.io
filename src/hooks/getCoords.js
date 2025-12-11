import {ref, onMounted} from 'vue';
import axios from "axios";


export default function getCoords() {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const isLoading = ref(true)
    const lat = ref('')
    const lon = ref('')
    const place = ref('')
    const temperatureMax = ref('')
    const temperatureMin = ref('')
    const description = ref('')
    const icon = ref('')
    const temperature = ref('')
    const message = ref('')
   
    const fetchingCoords = async () => {    
    function successGeo(position) {
        if (position.coords) {            
            lat.value = position.coords.latitude;
            lon.value = position.coords.longitude;
            fetchingPlace();
            fetchingWeather();           
        }
    }
    function errorGeo(error) {

        switch (error.value) {
            case error.PERMISSION_DENIED, error.TIMEOUT:
                message.value = "Пользователь отклонил запрос на определение местоположения.";
            break;
            case error.POSITION_UNAVAILABLE:
                message.value = "Информация о местоположении недоступна.";
            break;
            case error.UNKNOWN_ERROR:
                message.value = "Произошла неизвестная ошибка..";
            break;
        }
    }
    
    
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
    isLoading.value = false;
    
    };
    const fetchingPlace = async () => {
        try {                
            const geo = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat.value}&lon=${lon.value}&limit=5&appid=${API_KEY}`);
            place.value = geo.data[0].name;     
            
        } catch (e) {
            alert('Ошибка. Город не определен');
        }
   };
    const fetchingWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.value}&lon=${lon.value}&units=metric&appid=${API_KEY}`);
            temperatureMax.value = Math.round(response.data.main.temp_max) + '°';
            temperatureMin.value = Math.round(response.data.main.temp_min) + '°';
            description.value = response.data.weather[0].description;
            icon.value = 'https://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png';
            temperature.value = Math.round(response.data.main.temp);
        } catch (e) {
            alert('Ошибка. Данные о погоде не получены');
        }
    }
    onMounted(fetchingCoords)
    return {
    isLoading, lat, lon, fetchingCoords, place, temperatureMax, temperatureMin, description, icon, temperature, message
    }

};