'use strict';

const app = require('../app-data.js');
const authApi = require('./api.js');
const appApi = require('../app/api.js');
const appUi = require('../app/ui.js');

const signOutSuccess = (data) => {
  console.log('signed-out', data);
  $('#li-sign-up').removeClass('hidden');
  $('#li-sign-in').removeClass('hidden');
  $('#li-sign-out').addClass('hidden');
  $('#li-change-pw').addClass('hidden');
};

const signInSuccess = (data) => {
  console.log(data);
  console.log('signed-in');
  app.user = data.user;
  $('#sign-in-form').each(function(){
    this.reset();
  });
  $('#signInModal').modal('toggle');
  $('#li-sign-up').addClass('hidden');
  $('#li-sign-in').addClass('hidden');
  $('#li-sign-out').removeClass('hidden');
  $('#li-change-pw').removeClass('hidden');
  appApi.getQueries(appUi.success, appUi.failure);
};

const changePWSuccess = (data) => {
  console.log(data);
  $('#change-password-form').each(function(){
    this.reset();
  });
};

const changePWFail = (error) => {
  console.log(error);
  $('#pw-change-fail-notification').removeClass('hidden');

  setTimeout(function(){
    $('#pw-change-fail-notification').addClass('hidden');
  }, 2000);

};

const regSuccess = (data) => {
  console.log(data);
  app.user = data.user;
  authApi.signIn(signInSuccess, signInFail, app.credentials);
  $('#sign-up-form').each(function(){
    this.reset();
  });
  $('#signUpModal').modal('toggle');
  $('#signInModal').modal('toggle');
  $('#li-sign-up').addClass('hidden');
  $('#li-sign-in').addClass('hidden');
  $('#li-sign-out').removeClass('hidden');
  $('#li-change-pw').removeClass('hidden');
};



const signInFail = (error) => {
  console.log(Error);
  console.log('sign-in-failed');
  $('#sign-in-fail-notification').removeClass('hidden');

  setTimeout(function(){
    $('#sign-in-fail-notification').addClass('hidden');
  }, 2000);
};

const regFailure = (error) => {
  console.log(error);
  $('#sign-up-fail-notification').removeClass('hidden');

  setTimeout(function(){
    $('#sign-up-fail-notification').addClass('hidden');
  }, 2000);
};

const failure = (error) => {
  console.log(error);
};

const success = (data) => {
  console.log(data);
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  changePWSuccess,
  regSuccess,
  signInFail,
  regFailure,
  changePWFail
};
