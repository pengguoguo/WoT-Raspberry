var resources = require('./../../resources/model');

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
    pcf.setPin(7,true);
    pcf.disableInterrupt();
};

exports.beepProxyHandleProcess = function (params) {
    console.info('in beepProxyProcess function');
    console.info(params);
    beepProxy.value = params.value;
}

function connectHardware(){

    //const RaspiIO = require('raspi-io').RaspiIO;

    //const five    = require('johnny-five');

    //const board = new five.Board({
    //    io: new RaspiIO(),
    //    repl:false
    //});

    //board.on('ready',function() {

    //    console.info("RaspiIO board is ready");

        //var led = new five.Led('P1-37');
        //led.on();

        //pcf.setPin(4,true);

    //    });

    var PCF8574     = require('pcf8574').PCF8574;

    var i2cBus      = require('i2c-bus').openSync(1);

    var pcf8574Addr = 0x20;

    //initialState pin :
    var pcf         = new PCF8574(i2cBus,pcf8574Addr,0b00001110);

    // Enable interrupt detection on BCM pin
    pcf.enableInterrupt(29);

    pcf.outputPin(4,true,true);
    pcf.outputPin(7,true,false);

    console.info('Hardware %s actuator started!',pluginName);
};

function switchOnOff(value){
    console.info(value);
    pcf.setPin(7,value);
};