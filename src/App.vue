<script>
import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import WidgetFrameComponent from './components/WidgetFrameComponent.vue';

dayjs.extend(utc);
dayjs.extend(timezone);
export default {
  components: {
    WidgetFrameComponent,
  },
  data() {
    return {
      lat: '44.34',
      lon: '10.99',
      day: '',
      description: '',
      temperature: '21',
      temperatureMin: '21',
      temperatureMax: '21',
      icon: '',
      place: '',
    }
    
  },
  methods: {
    async getUserGeo(fetchWeather) {
      try {
        navigator.geolocation.getCurrentPosition(position => {
          if (position.coords)
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          console.log(this.lat, this.lon);
            if (position.coords) {
              this.fetchWeather();
              this.fetchPlace();
            }
          
          
        });
        
      } catch (e) {
        alert('Не удалось загрузить координаты пользователя!!')
      }     
      
    },
    async fetchWeather(lat, lon) {
      try {
        const string = "https://api.openweathermap.org/data/2.5/weather?lat=" +  this.lat + "&lon=" + this.lon +
         "&units=metric&appid=67eeefab3125389a4981798cada12be7";
         console.log(string);
        const response = await axios.get(string);
        console.log(response);
        this.temperatureMax = Math.round(response.data.main.temp_max) + "°";
        this.temperatureMin = Math.round(response.data.main.temp_min) + "°";
        this.description = response.data.weather[0].description;
        console.log(this.description);
        this.icon = "https://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png";
        console.log(this.icon);
        this.temperature = Math.round(response.data.main.temp);//температура на главный экран //
        
        
      } catch (e) {
        alert('Ошибка. Данные о погоде не получены');
      }
    },
    
    async fetchPlace() {
      try {
        const geo = await axios.get("http://api.openweathermap.org/geo/1.0/reverse?lat="+  this.lat + "&lon=" + this.lon + "&limit=5&appid=67eeefab3125389a4981798cada12be7");
        console.log(geo);
        this.place = geo.data[0].name;
        console.log(this.place);
      } catch (e) {
        alert('Ошибка. Город не определен')
      }
    },
    async fetchDay() {      
      try {
        const customDayjs = dayjs().tz(dayjs.tz.guess());
        this.day = customDayjs.format('dddd, DD MMMM');
        console.log(this.day);
      } catch (e) {
        alert('Ошибка. Часовой пояс пользователя не определен');
      }
    },
   



  },
  mounted() {
    this.getUserGeo();
    this.fetchDay();
    
    
    
    
  },
 
}
</script>

<template>
  <widget-frame-component>
    <template #img> 
      <img class='widget__img_main' src='./img/widget_1.jpg'>
    </template>
    <template #top>
      <div v-if='temperature <= 0' class="widget__gradient widget__gradient_dark-blue"></div>
      <div v-else-if='temperature >= 0 && temperature <= 10' class="widget__gradient widget__gradient_blue"></div>
      <div v-else-if='temperature > 10 && temperature <= 20' class="widget__gradient widget__gradient_yellow"></div>
      <div v-else-if='temperature > 20' class="widget__gradient widget__gradient_red"></div>

      <div class="widget__temperatura"><span>{{temperature}}°</span></div>
      <div class="widget__place">{{place}}</div>
    </template>
    <template #bottom>
      <h3 class="widget__day">{{day}}</h3>
      <div class="widget__weather">
        <div v-if='temperatureMin == temperatureMax ? temperatureMax = " " : temperatureMax = temperatureMax ' class="widget__weather__description">{{description}}<br><span>{{temperatureMin}} / {{temperatureMax}}</span></div>
        <img class="widget__weather__icon" :src='icon'>
      </div>
    </template>
  </widget-frame-component>
</template>

<style scoped>

.widget__gradient_yellow {
  background-image: radial-gradient(circle, #DEC27B, #F8B70F);
}
.widget__gradient_red {
  background-image: radial-gradient(circle, #FF6262, #F93939);
}
.widget__gradient_blue {
  background-image: radial-gradient(circle, #1569C7, #3A539B);
}
.widget__gradient_dark-blue {
  background-image: radial-gradient(circle, #4863A0, #151B54);
}
.widget__gradient {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  z-index: -5;
  border-radius: 16px 16px 16px 16px;
}
.widget__day {
  font-weight: 700;
  font-size: 25px;
  color: #191919;
}
.widget__weather__icon {
  width: 80px;
  height: 80px;
}
.widget__weather__description {
  font-weight: 700;
  font-size: 23px;
  color: #6b6b6b;
  opacity: 0.4;
  line-height: 1.4;
}
.widget__weather {
  padding-top: 4px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.widget__img_main {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100%;
  height: 100%;
  border-radius: 16px 16px 16px 16px;
}
.widget__temperatura {
  position: relative;
  display: flex;
  
}
.widget__temperatura span {
  font-weight: 700;
  font-size: 70px;
  letter-spacing: -0.02em;
  color: #fff;
}
.widget__place {
  font-weight: 800;
  font-size: 35px;
  letter-spacing: 0.07em;
  color: #fff;
  min-width: 20px;
  min-height: 71px;
}
@media(max-width: 1199px) {
  .widget__temperatura span {
    font-size: 60px;
  }
  .widget__place {
    font-weight: 600;
  }
  @media(max-width: 987px) {
    widget__temperatura span {
      font-size: 50px;
      font-weight: 600;
    }
    .widget__place {
      font-size: 30px;
    }
    .widget__day {
      font-weight: 600;
      font-size: 20px;
    }
    .widget__weather__description {
      font-weight: 600;
      font-size: 18px;
    }
  }
  @media(max-width: 767px) {
    .widget__temperatura span {
      font-size: 50px;
    }
    .widget__place {
      font-size: 26px;
    }
  }
  @media(max-width: 575px) {
    .widget__temperatura span {
      font-size: 47px;
      font-weight: 600;
    }
    .widget__place {
      font-size: 24px;
    }
    .widget__weather__icon {
      width: 50px;
      height: 50px;
    }
    .widget__day {
      font-weight: 600;
      font-size: 18px;
    }
    .widget__weather__description {
      font-size: 16px;
    }
  }
  @media(max-width: 459px) {
    .widget__day {
      font-weight: 700;
      font-size: 15px;
    }
    .widget__weather__icon {
      width: 30px;
      height: 30px;
    }
    .widget__weather__description {
      font-weight: 700;
      font-size: 12px;
    }
    .widget__temperatura span {
      font-weight: 600;
      font-size: 40px;
    }
    .widget__place {
      font-weight: 700;
      font-size: 15px;
    }
  }
}
</style>
