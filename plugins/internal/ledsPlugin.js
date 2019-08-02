var resources = require('./../../resources/model');

var actuator;
var interval;

var model = resources.pi.actuators.leds['2'];
var pluginName = model.name;
var localParams = 2000;

var LED_Proxy;

let LED_Proxy_Handler = {
  set:function(model,vValue,value){
    console.info('led handle set function');
    switchOnOff(model.value);
    return true;
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

};

exports.stop = function(){
  actuator.unexport();
  console.info('%s plugin stopped!',pluginName);
};

exports.ledproxy_process = function (params) {
  console.info('in ledproxy_process function');
  console.info(params);
  LED_Proxy.value = params.value;
}

function connectHardware(){
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(model.gpio,'out');

  console.info('Hardware %s actuator started!',pluginName);
};

function switchOnOff(value){
  console.info(value);
  actuator.writeSync(value === true ? 1 : 0);
};

