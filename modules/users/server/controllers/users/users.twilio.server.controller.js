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
  if(!process.env.ACCOUNTSID){
    var env = require(path.resolve('./config/env/twilio.js'));
  }
  var accountSid = process.env.ACCOUNTSID;
  var authToken = process.env.AUTHTOKEN;
  // TODO: Find a place in the process where a boolean can be set that will only be set to true if the message has been sent.  Actually it seems to just start from beginning, that might not work.
  var client = require('twilio')(accountSid, authToken); 

  if(req.body.code){
    client.messages.create({ 
      to: req.body.number, 
      from: '+13525599283', 
      body: 'Confirmation Code: ' + req.body.code, 
    }, function(err, message) { 
      console.log(message.sid); 
    });
    console.log('bing');
  }
  /*
  client.messages.create({ 
    to: '+13522155781', 
    from: '+13525599283', 
    body: 'CHRIS IT\'S CHRIS I JUST SENT YOU A TEXT FROM MY WEBSITE WOOOOOO', 
  }, function(err, message) { 
    console.log(message.sid); 
  });
  console.log('bing');*/
};