///<reference path="../node_modules/pcf8574/typings/index.d.ts" />
///<reference path="../node_modules/pcf8574/typings/ipcf8574.d.ts" />

var resources = require('./../../resources/model');

var PCF8574   = require('pcf8574').PCF8574;
//import PCF8574  from 'pcf8574';

var i2cBus    = require('i2c-bus').openSync(1);

var pcf8574Addr = 0x20;

var pcf       = new PCF8574(i2cBus,pcf8574Addr,true);

pcf.outputPin(4,true,true);
pcf.outputPin(7,true,false);

var actuator;

var model      = resources.pi.actuators.beep['1'];
var pluginName = model.name;

var beepProxy;

var beepProxyHandler = {
    set:function(model,vValue,value){
        switchOnOff(model.value);
        return true;
    },
    get:function(model,value){
        return model.value;
    }
};

exports.start = function(){
    //Observe the model for the LEDs
    console.info(model);

    beepProxy = new Proxy(model,beepProxyHandler);

    connectHardware();

};

exports.stop = function(){
    actuator.unexport();
    console.info('%s plugin stopped!',pluginName);
};

exports.beepProxyHandleProcess = function (params) {
    console.info('in beepProxyProcess function');
    console.info(params);
    beepProxy.value = params.value;
}

function connectHardware(){

    const RaspiIO = require('raspi-io').RaspiIO;

    const five    = require('johnny-five');

    const board = new five.Board({
        io: new RaspiIO(),
        repl:false
    });

    board.on('ready',function() {

        console.info("RaspiIO board is ready");
        var led = new five.Led('P1-37');
        led.on();

        pcf.setPin(4,true);
        pcf.setPin(7,true);

        });

    console.info('Hardware %s actuator started!',pluginName);
};

function switchOnOff(value){
    console.info(value);
    actuator.writeSync(value === true ? 1 : 0);
};