'use strict';

const app = require('../app-data.js');

const getLocalForecast = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + '/local-current-forecast/',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }).done(success)
    .fail(failure);
};

const getNonLocalForecast = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + '/non-local-current-forecast/',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }).done(success)
    .fail(failure);
};

const getHistoricalData = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + '/historical-forecast/',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }).done(success)
    .fail(failure);
};

const saveQuery = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + '/query/',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }).done(success)
    .fail(failure);
};



module.exports = {
  getLocalForecast,
  getNonLocalForecast,
  getHistoricalData,
  saveQuery,
};
