'use strict';

const app = require('../app-data.js');

const getForecast = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + '/geolocation/',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }).done(success)
    .fail(failure);
};

module.exports = {
  getForecast,
};
