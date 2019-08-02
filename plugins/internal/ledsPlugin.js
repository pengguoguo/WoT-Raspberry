var resources = require('./../../resources/model');

var actuator;
var interval;

var model = resources.pi.actuators.leds['2'];
var pluginName = model.name;
var localParams = 2000;

var LED_Proxy;

let LED_Proxy_Handler = {
  set:function(model,Value,value){
    console.info('led handle set function');
    switchOnOff(model.value);
  },
  get:function(model,value){
    console.info('led handle get function');
    //return model.value;
  }
};

exports.start = function(params){
  localParams = params;

  //Observe the model for the LEDs

  console.info(model);

  LED_Proxy = new Proxy(model,LED_Proxy_Handler);

  connectHardware();

  LED_Proxy.value = true;

  return LED_Proxy;
};

exports.stop = function(){
  actuator.unexport();
  console.info('%s plugin stopped!',pluginName);
};

function connectHardware(){
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(model.gpio,'out');

  console.info('Hardware %s actuator started!',pluginName);
};

function switchOnOff(value){
  actuator.writeSync(value);
};

