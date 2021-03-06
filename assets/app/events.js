'use strict';

const app = require('../app-data.js');
const appApi = require('./api.js');
const appUi = require('./ui.js');

const addHandlers = () => {

  // USER REQUESTS LOCAL FORECAST
  $('#jumbotron-btn').on('click', function(event){
    event.preventDefault();
    console.log(!app.user);
    if(!app.user){
      $('#jumbotron-sign-in-notification').removeClass('hidden');
      setTimeout(function(){
        $('#jumbotron-sign-in-notification').addClass('hidden');
      }, 2000);
      return;
    }
    $('#local-forecast-loading-notification').removeClass('hidden');

    //GET USER POSITION
    getPosition()
      .then((position) => {
        //GET FORECAST
        app.query = 'Local Forecast';
        appApi.getLocalForecast(appUi.getForecastSuccess,
                           appUi.getForecastFailure,
                           position);
      })
      .catch((err) => {
        console.error(err.message);
      });
  });

  //USER REQUESTS CURRENT FORECAST FOR NONLOCAL POSITION
  $('#location-search-btn').on('click', function(event){
    event.preventDefault();
    if(!app.user){
      $('#non-local-forecast-sign-in-notification').removeClass('hidden');
      setTimeout(function(){
        $('#non-local-forecast-sign-in-notification').addClass('hidden');
      }, 2000);
      return;
    }

    //GET USER INPUT
    app.query = $('#location-search-input').val();
    let input = $('#location-search-input').val();
    input = input.replace(/ /g,"+");

    //GET FORECAST
    appApi.getNonLocalForecast(appUi.getForecastSuccess,
                       appUi.getForecastFailure,
                       {input});
  });

  //TRACKS CLICKS FROM MULTIPLE RESULTS LIST - NON HISTORICAL
  $(document).on('click', '.multiple-results-list', function(event){
    event.preventDefault();

    //PULL DESIRED LOCATION FROM DATA STORED IN APP-DATA
    let id = $(this).text();
    app.query = id;
    app.results.forEach(function(place){
      if(id === place.formatted_address){
        let coords = {};
        coords.latitude = place.geometry.location.lat;
        coords.longitude = place.geometry.location.lng;

        //ONCE FOUND GET FORECAST
        appApi.getLocalForecast(appUi.getForecastSuccess,
                           appUi.getForecastFailure,
                           {coords});
      }
    });
  });

    //TRACKS CLICKS FROM MULTIPLE RESULTS LIST - HISTORICAL
  $(document).on('click', '.historical-multiple-results-list', function(event){
    console.log('clicked');
    event.preventDefault();

    //PULL DESIRED LOCATION FROM DATA STORED IN APP-DATA
    let id = $(this).text();
    app.query = id;
    app.results.forEach(function(place){
      if(id === place.formatted_address){
        console.log('match');
        console.log(id);
        let data = {};
        data.input = id;
        data.startDate = app.startDate;
        data.endDate = app.endDate;

        //ONCE FOUND GET HISTORICAL DATA
        appApi.getHistoricalData(appUi.getHistoricalDataSuccess,
                           appUi.getHistoricalDataFailure,
                           data);
      }
    });
  });

  //TRACKS FOR HISTORICAL SEARCH CLICK
  $('#historical-location-search-btn').on('click', function(event){
    event.preventDefault();
    if(!app.user){
      $('#historical-query-sign-in-notification').removeClass('hidden');
      setTimeout(function(){
        $('#historical-query-sign-in-notification').addClass('hidden');
      }, 2000);
      return;
    }else if(!$('#forecast-start-date').val()||!$('#forecast-end-date').val()||!$('#historical-location-search-input').val()){
      $('#historical-query-invalid-data-notification').removeClass('hidden');
      setTimeout(function(){
        $('#historical-query-invalid-data-notification').addClass('hidden');
      }, 2000);
      return;
    }

    //COLLECTS USER INPUT
    let startDate = new Date($('#forecast-start-date').val());
    let endDate = new Date($('#forecast-end-date').val());
    app.query = $('#historical-location-search-input').val();
    let input = $('#historical-location-search-input').val();
    input = input.replace(/ /g,"+");

    //FORMATS DATA FOR API CALL
    let data = {};
    data.startDate = (Date.parse(startDate) - 68400000)/1000 + 86400;
    data.endDate = (Date.parse(endDate) - 68400000)/1000 + 86400;
    data.input = input;

    //API CALL TO GET HISTORICAL DATA
    appApi.getHistoricalData(appUi.getHistoricalDataSuccess,
                       appUi.getHistoricalDataFailure,
                       data);
  });

  $('#menu2-tab').on('click', function(event){
    event.preventDefault();
    appApi.getQueries(appUi.success, appUi.failure);
  });

};

module.exports = {
  addHandlers,
};
