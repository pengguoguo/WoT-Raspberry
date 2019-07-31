import {Observable} from './../../node_modules/object-observe/dist/object-observer.js';

var resources = require('./../../resources/model');

var actuator;
var interval;

var model = resources.pi.actuators.leds['2'];
var pluginName = model.name;
var localParams = 2000;


exports.start = function(params){
  localParams = params;

  //Observe the model for the LEDs
  led_observe(model);

  connectHardware();
};

exports.stop = function(){
  actuator.unexport();
  console.info('%s plugin stopped!',pluginName);
};

function led_observe(what){
  Observable.observe(what,function (changes) {
  console.info('Change detected by plugin for %s ...',pluginName);
   switchOnOff(model.value);
  });
};

function switchOnOff(value){
  actuator.write(value == true ? 1 : 0,function(){
    console.info('Changed value of %s to %s',pluginName,value);
  });
};

function connectHardware(){
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(model.gpio,'out');
  console.info('Hardware %s actuator started!',pluginName);
};

