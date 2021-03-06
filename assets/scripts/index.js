'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
const appEvents = require('../app/events.js');
const authEvents = require('../auth/events.js');


$(() => {
  appEvents.addHandlers();
  authEvents.addHandlers();
});
