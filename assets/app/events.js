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
        appApi.getForecast(appUi.getForecastSuccess,
                           appUi.getForecastFailure,
                           startPos);
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };

    getLocation();
  });

};

module.exports = {
  addHandlers,
};
