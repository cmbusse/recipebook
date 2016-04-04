'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  passport = require('passport'),
  User = mongoose.model('User');

/**
 * Twilio
 */ 
exports.twilioSMS = function (req, res) {
  if(!process.env.ACCOUNT_SID){
    var env = require(path.resolve('./config/env/twilio.js'));
  }
  var accountSid = process.env.ACCOUNT.SID;
  var authToken = process.env.AUTH.TOKEN;

  var client = require('twilio')(accountSid, authToken); 
  client.messages.create({ 
    to: '+13522155781', 
    from: '+13525599283', 
    body: 'CHRIS IT\'S CHRIS I JUST SENT YOU A TEXT FROM MY WEBSITE WOOOOOO', 
  }, function(err, message) { 
    console.log(message.sid); 
  });
  console.log('bing');
};