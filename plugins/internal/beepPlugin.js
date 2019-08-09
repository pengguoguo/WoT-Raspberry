var resources = require('./../../resources/model');

var model      = resources.pi.actuators.beep['1'];

var pluginName = model.name;


var pcf;

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
    pcf         = new PCF8574(i2cBus,pcf8574Addr,0b11110000);

    // Enable interrupt detection on BCM pin
    pcf.enableInterrupt(29);

    pcf.outputPin(4,true,false);
    pcf.outputPin(7,true,true);

};

function switchOnOff(value){
    pcf.setPin(7,value);
};