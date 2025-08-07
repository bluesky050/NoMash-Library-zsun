<template>
  <div class="container mt-5">
    <div class="weather-app-card">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name"
            class="search-input"
            @keyup.enter="searchByCity"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>

      <hr />

      <main v-if="weatherData" class="weather-display">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div class="weather-main">
          <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
          <p class="temperature">{{ temperature }} °C</p>
        </div>
        <span class="weather-description">{{ weatherData.weather[0].description }}</span>
      </main>
      <p v-else>Please search for a city to see the weather.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      
      apiKey: 'fd2c82e43007a86b30e5707034a37b7d',

      city: '',
      weatherData: null,
    };
  },
  computed: {
    
    temperature() {
      if (!this.weatherData) return null;
      
      return (this.weatherData.main.temp - 273.15).toFixed(1);
    },
    
    iconUrl() {
      if (!this.weatherData) return null;
      const iconCode = this.weatherData.weather[0].icon;
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
  },
  methods: {
    
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
        console.log("Weather data fetched:", this.weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please check the city name or your API key.");
        this.weatherData = null; 
      }
    },
   
    searchByCity() {
      if (!this.city) {
        alert('Please enter a city name.');
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`;
      this.fetchWeatherData(url);
    }
  }
};
</script>

<style scoped>
.weather-app-card {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
}
.search-bar {
  display: flex;
  gap: 10px;
}
.search-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.search-button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.weather-display {
  text-align: center;
}
.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.weather-icon {
  width: 100px;
  height: 100px;
}
.temperature {
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}
.weather-description {
  text-transform: capitalize;
  color: #555;
}
</style>