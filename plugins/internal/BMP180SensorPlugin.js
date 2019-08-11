var resources = require('./../../resources/model');

var pressureModel = resources.pi.sensors.pressure;

var pressurePluginName = resources.pi.sensors.pressure.name;

var bmp180 = require('bmp180-sensor');

var bmp180Sensor;

var pressurelocalParams;

exports.start = function (params) {
    pressurelocalParams = params;

    connectHardware();

    readBmp180();
};

exports.stop = function(params) {
    //sensor.unexport();
};

function connectHardware(){
    bmp180Sensor = await bmp180({
        address: 0x77,
        mode: 1,
    })
};

async function readBmp180(){
    const data = await bmp180Sensor.read();
    console.log(data);
};
