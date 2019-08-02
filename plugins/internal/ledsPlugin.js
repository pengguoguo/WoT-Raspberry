var resources = require('./../../resources/model');

var actuator;
var interval;

var model = resources.pi.actuators.leds['2'];
var pluginName = model.name;
var localParams = 2000;

var LED_Proxy;

let LED_Proxy_Handler = {
  set:function(model,value){
    console.info(model);
    switchOnOff(model.value);
  };
  get:function(model,value){
    console.info(odel.value);
    return model.value;
  };
};

exports.start = function(params){
  localParams = params;

  //Observe the model for the LEDs

  LED_Proxy = new Proxy(model,LED_Proxy_Handler);

  connectHardware();

  return LED_Proxy;
};

exports.stop = function(){
  actuator.unexport();
  console.info('%s plugin stopped!',pluginName);
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

