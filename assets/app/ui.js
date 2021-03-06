'use strict';

const app = require('../app-data.js');
const appApi = require('./api.js');
const currentWeatherTemp = require('../templates/current-weather.handlebars');
const forecastTemp = require('../templates/forecast.handlebars');
const multipleResultsTemp = require('../templates/multiple-results.handlebars');
const historicalMultipleResultsTemp = require('../templates/historical-request-multiple-results.handlebars');
const displayQueriesTemp = require('../templates/display-queries.handlebars');
const displayHistoricalQueriesTemp = require('../templates/display-historical-queries.handlebars');
const googleCharts = require('./google-charts.js');
const moment = require('moment');

const getForecastSuccess = (data) => {

  //IF MORE THAN ONE RESULTS FOR LOCATIONS FROM SERVER
  // DISPLAY SO USER CAN CHOOSE WHICH LOCATION THEY WANT
  if(data.results) {
    let result = data.results;
    app.results = data.results;
    $('#non-local-forecast-loading-notification').addClass('hidden');
    $('#local-forecast-loading-notification').addClass('hidden');
    $('#multiple-search-results').html('<h4 class="multiple-search-results-heading">Your search results for "' + app.query + '" had multiple results. <br>Choose which youd like to see.</h4>');
    $('#multiple-search-results').append(multipleResultsTemp({result}));
    $('html, body').animate({
      scrollTop: $("#multiple-search-results").offset().top
    }, 1000);
  }else{

    //FORMAT DATA FOR PRESENTATION
    data = formatForecast(data);
    data.currently.location = app.query;
    console.log(data);
    let currentWeather = data.currently;
    let forecast = data.daily.data;

    $('#non-local-forecast-loading-notification').addClass('hidden');
    $('#local-forecast-loading-notification').addClass('hidden');
    //SCROLL TO FORECAST DISPLAY
    $('html, body').animate({
      scrollTop: $("#forecast-results").offset().top
    }, 1000);


    //DISPLAY FORECAST
    $('#forecast-results').html('');
    $('#forecast-results').prepend(currentWeatherTemp({currentWeather}));
    $('#extended-forecast-results').html('');
    $('#extended-forecast-results').append(forecastTemp({forecast}));

    //SAVE DATA THAT WAS SUCCESSFULLY RETRIEVED TO THE SERVER
    appApi.saveQuery(saveQuerySuccess, saveQueryFailure, {'response': data,
                                                          'identifier': 'not historical',
                                                          'location': app.query});
  }
};

const getForecastFailure = (data) => {
  console.log(data);
};

const saveQuerySuccess = (data) => {
  console.log(data);
};

const saveQueryFailure = (data) => {
  console.log(data);
};

const getHistoricalDataSuccess = (data) =>{
  console.log(data);
  app.startDate = data.startDate;
  app.endDate = data.endDate;

  // IF MULTIPLE RESULTS FROM SERVER DISPLAY SO USER CAN CHOOSE DESIRED LOCATION
  if(data.locations) {
    console.log('more than one result');
    let result = data.locations.results;
    app.results = data.locations.results;
    $('#multiple-historical-search-results').html('<h4 class="multiple-search-results-heading">Your search results for "' + app.query + '" had multiple results. <br>Choose which youd like to see.</h4>');
    $('#multiple-historical-search-results').append(historicalMultipleResultsTemp({result}));
    $('html, body').animate({
      scrollTop: $('#multiple-historical-search-results').offset().top
    }, 1000);
  }else {
    // OTHERWISE GRAPH DATA
    $('#chart-div').removeClass('hidden');
    googleCharts.drawTempChart(data);

    $('html, body').animate({
      scrollTop: $('#chart-div').offset().top
    }, 1000);

    let identifier = guid();
    data.results.forEach(function(query){
      appApi.saveQuery(saveQuerySuccess,
                       saveQueryFailure,
                       {'response': query,
                        'identifier': identifier,
                        'location': app.query});
    });
  }
};

const getHistoricalDataFailure = (data) =>{
  console.log(data);
};

const success = (data) =>{
  console.log(data);
  data = consolidateQueries(data);
  console.log(data);
  $('#queries-table > tbody').html('');

  let historicalQueries = data.filter(function(query){
                            return Array.isArray(query);
                          });
  historicalQueries.forEach(function(query){
    query = query[0];
    query.createdAt = moment(query.createdAt).format('LLLL');
    $('#queries-table > tbody').append(displayHistoricalQueriesTemp({query}))
  })

  console.log(historicalQueries);
  $('#queries-table > tbody').append(displayQueriesTemp({data}));
};

const failure = (data) =>{
  console.log(data);
};

module.exports = {
  getForecastSuccess,
  getForecastFailure,
  saveQuerySuccess,
  saveQueryFailure,
  getHistoricalDataSuccess,
  getHistoricalDataFailure,
  success,
  failure,
};
