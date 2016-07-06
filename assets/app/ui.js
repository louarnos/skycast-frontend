'use strict';

const app = require('../app-data.js');
const appApi = require('./api.js');
const currentWeatherTemp = require('../templates/current-weather.handlebars');
const forecastTemp = require('../templates/forecast.handlebars');
const moment = require('moment');

const getForecastSuccess = (data) => {
  if(data.currently.icon === 'clear-day'){
    data.currently.icon = "assets/weather-icons/weezle_sun.png"
  }else if(data.currently.icon === 'clear-night'){
    data.currently.icon = "assets/weather-icons/weezle_fullmoon.png"
  }else if(data.currently.icon === 'rain'){
    data.currently.icon = "assets/weather-icons/weezle_rain.png"
  }else if(data.currently.icon === 'snow'){
    data.currently.icon = "assets/weather-icons/weezle_snow.png"
  }else if(data.currently.icon === 'sleet'){
    data.currently.icon = "assets/weather-icons/weezle_medium_ice.png"
  }else if(data.currently.icon === 'wind'){
    data.currently.icon = "assets/weather-icons/weezle_fog.png"
  }else if(data.currently.icon === 'fog'){
    data.currently.icon = "assets/weather-icons/weezle_fog.png"
  }else if(data.currently.icon === 'cloudy'){
    data.currently.icon = "assets/weather-icons/weezle_cloud.png"
  }else if(data.currently.icon === 'partly-cloudy-day'){
    data.currently.icon = "assets/weather-icons/weezle_sun_minimal_clouds.png"
  }else if(data.currently.icon === 'partly-cloudy-night'){
    data.currently.icon = "assets/weather-icons/weezle_moon_cloud.png"
  }
  data.currently.temperature = Math.round(data.currently.temperature);
  data.currently.apparentTemperature = Math.round(data.currently.apparentTemperature);

  for(let i = 0; i < data.daily.data.length; i++) {
    if(data.daily.data[i].icon === 'clear-day'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_sun.png";
    }else if(data.daily.data[i].icon === 'clear-night'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_fullmoon.png";
    }else if(data.daily.data[i].icon === 'rain'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_rain.png";
    }else if(data.daily.data[i].icon === 'snow'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_snow.png";
    }else if(data.daily.data[i].icon === 'sleet'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_medium_ice.png";
    }else if(data.daily.data[i].icon === 'wind'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_fog.png";
    }else if(data.daily.data[i].icon === 'fog'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_fog.png";
    }else if(data.daily.data[i].icon === 'cloudy'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_cloud.png";
    }else if(data.daily.data[i].icon === 'partly-cloudy-day'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_sun_minimal_clouds.png";
    }else if(data.daily.data[i].icon === 'partly-cloudy-night'){
      data.daily.data[i].icon = "assets/weather-icons/weezle_moon_cloud.png";
    }
    data.daily.data[i].time = moment().add(i, 'days').format('MMMM Do YYYY');
    data.daily.data[i].apparentTemperatureMax = Math.round(data.daily.data[i].apparentTemperatureMax);
    data.daily.data[i].temperatureMax = Math.round(data.daily.data[i].temperatureMax);
    data.daily.data[i].apparentTemperatureMin = Math.round(data.daily.data[i].apparentTemperatureMin);
    data.daily.data[i].temperatureMin = Math.round(data.daily.data[i].temperatureMin);

    let date = new Date(data.daily.data[i].apparentTemperatureMaxTime*1000);
    console.log(date);

  }

  data.currently.time = moment().format('MMMM Do YYYY, h:mm a');
  console.log(data);
  let currentWeather = data.currently;
  let forecast = data.daily.data;

  $('html, body').animate({
    scrollTop: $("#forecast-results").offset().top
  }, 1000);

  $('#forecast-results').append(currentWeatherTemp({currentWeather}));
  $('#forecast-results').append(forecastTemp({forecast}));
};

const getForecastFailure = (data) => {
  console.log(data);
};

module.exports = {
  getForecastSuccess,
  getForecastFailure
};
