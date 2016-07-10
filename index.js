'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests
// scripts
require('./assets/scripts/index.js');

// styles
require('./assets/styles/index.scss');

// attach jQuery globally
require('expose?$!jquery');
require('expose?jQuery!jquery');

// attach getFormFields globally

require('expose?getFormFields!./lib/get-form-fields.js');
require('expose?guid!./lib/guid.js');
require('expose?getPosition!./lib/get-client-location.js');
require('expose?formatForecast!./lib/format-forecast-for-display.js');
require('expose?consolidateQueries!./lib/consolidate-queries.js');

// require('./assets/app/google-charts.js');
