<script>
import WidgetFrameComponent from './components/WidgetFrameComponent.vue';
import getCoords from "./hooks/getCoords.js";
import fetchDay from "./hooks/fetchDay.js";


export default {
  components: {
    WidgetFrameComponent,
  },    
  setup() {
    const {lat, lon, fetchingCoords, place, temperatureMax, temperatureMin, description, icon, temperature, message, isLoading} = getCoords();
    const {day} = fetchDay();    
    return {
        isLoading,
        lat,
        lon,
        fetchingCoords,
        place,
        temperatureMax, 
        temperatureMin, 
        description,
        icon, 
        temperature,
        day,
        message,
    }
  }
};
</script>

<template>

<div class="widget__error" v-if="message">{{message}}</div>
  <widget-frame-component > 
    <template #img>   
      <img class="widget__img_main" src="./img/widget_1.jpg" />      
    </template>
    <template #top v-if="!message">        
      <div
        v-if="temperature <= 0"
        class="widget__gradient widget__gradient_dark-blue"
      ></div>
      <div
        v-else-if="temperature >= 0 && temperature <= 10"
        class="widget__gradient widget__gradient_blue"
      ></div>
      <div
        v-else-if="temperature > 10 && temperature <= 20"
        class="widget__gradient widget__gradient_yellow"
      ></div>
      <div
        v-else-if="temperature > 20"
        class="widget__gradient widget__gradient_red"
      ></div>
      <div class="widget__temperatura">
        <span>{{ temperature }}°</span>        
      </div>
      <div class="widget__place">{{ place }}</div>
      <div class="widget__loading" v-if="isLoading">Идет загрузка...</div>
    </template>
    <template #bottom>
      <h3 class="widget__day">{{ day }}</h3>
      <div class="widget__weather" v-if="!message">
        <div class="widget__weather__description">
          {{ description }}<br /><div
            >{{ temperatureMin }} <span v-if="temperatureMax!=temperatureMin">/ {{ temperatureMax }}</span></div>
        </div>
        <img class="widget__weather__icon" :src="icon" />
      </div>
    </template>
  </widget-frame-component>
</template>

<style scoped>
.widget__error {
    margin-bottom: 25px;
    color: #db81c5;
    text-align: center;
}
.widget__gradient_yellow {
  background-image: radial-gradient(circle, #dec27b, #f8b70f);
}
.widget__gradient_red {
  background-image: radial-gradient(circle, #ff6262, #f93939);
}
.widget__gradient_blue {
  background-image: radial-gradient(circle, #1569c7, #3a539b);
}
.widget__gradient_dark-blue {
  background-image: radial-gradient(circle, #4863a0, #151b54);
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
.widget__loading {
    color: white;
    margin-top: 15px;
    font-size: 20px;
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
@media (max-width: 1199px) {
  .widget__temperatura span {
    font-size: 60px;
  }
  .widget__place {
    font-weight: 600;
  }
}
@media (max-width: 987px) {
  .widget__temperatura span {
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
@media (max-width: 767px) {
  .widget__temperatura span {
    font-size: 50px;
  }
  .widget__place {
    font-size: 26px;
  }
}
@media (max-width: 575px) {
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
@media (max-width: 459px) {
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
  .widget__error {
    font-size: 14px;
  }
}
</style>
