var resources = require('./../../resources/model');

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

    const five  = require('johnny-five');

    const board = new five.Board({
        io: new RaspiIO()
    });

    board.on('ready',function(){

        console.info("in board function when board's status is ready");

        var expander = new five.Expander({
            controller:"PCF8574",
            address:0x20
        });

        expander.digitalWrite(8,0);

    });
    console.info('Hardware %s actuator started!',pluginName);
};

function switchOnOff(value){
    console.info(value);
    actuator.writeSync(value === true ? 1 : 0);
};