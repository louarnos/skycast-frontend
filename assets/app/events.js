'use strict';

const app = require('../app-data.js');
const appApi = require('./api.js');
const appUi = require('./ui.js');

const addHandlers = () => {

  $('#jumbotron-btn').on('click', function(event){
    event.preventDefault();
    console.log('clicked');

    const getLocation = function() {
      let startPos;
      let geoSuccess = function(position) {
        startPos = position;
        console.log(startPos);
        appApi.getLocalForecast(appUi.getForecastSuccess,
                           appUi.getForecastFailure,
                           startPos);
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };
    getLocation();
  });

  $('#location-search-btn').on('click', function(event){
    event.preventDefault();
    app.query = $('#location-search-input').val();
    let input = $('#location-search-input').val();
    input = input.replace(/ /g,"+");
    console.log(input);
    appApi.getNonLocalForecast(appUi.getForecastSuccess,
                       appUi.getForecastFailure,
                       {input});
  });

  $(document).on('click', '.multiple-results-list', function(event){
    event.preventDefault();
    let id = $(this).text();
    app.results.forEach(function(place){
      if(id === place.formatted_address){
        let coords = {};
        coords.latitude = place.geometry.location.lat;
        coords.longitude = place.geometry.location.lng;
        appApi.getLocalForecast(appUi.getForecastSuccess,
                           appUi.getForecastFailure,
                           {coords});
      }
    });
  });

  $(document).on('click', '.historical-multiple-results-list', function(event){
    event.preventDefault();
    let id = $(this).text();
    app.results.forEach(function(place){
      if(id === place.formatted_address){
        let data = {};
        data.input = id;
        data.startDate = app.startDate;
        data.endDate = app.endDate;
        console.log(data);
        appApi.getHistoricalData(appUi.getHistoricalDataSuccess,
                           appUi.getHistoricalDataFailure,
                           data);
      }
    });
  });

  $('#historical-location-search-btn').on('click', function(event){
    event.preventDefault();
    let startDate = new Date($('#forecast-start-date').val());
    let endDate = new Date($('#forecast-end-date').val());
    app.query = $('#location-search-input').val();
    let input = $('#location-search-input').val();
    input = input.replace(/ /g,"+");
    console.log(startDate, endDate, input);
    let data = {};
    data.startDate = (Date.parse(startDate) - 68400000)/1000 + 86400;
    data.endDate = (Date.parse(endDate) - 68400000)/1000 + 86400;
    console.log(data.startDate, data.endDate, input);
    data.input = input;
    appApi.getHistoricalData(appUi.getHistoricalDataSuccess,
                       appUi.getHistoricalDataFailure,
                       data);
  });

};

module.exports = {
  addHandlers,
};
