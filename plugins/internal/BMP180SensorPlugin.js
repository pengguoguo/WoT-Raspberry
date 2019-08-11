var resources = require('./../../resources/model');

var pressureModel = resources.pi.sensors.pressure;

var pressurePluginName = resources.pi.sensors.pressure.name;

var bmp180 = require('bmp180-sensor');

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
    readBmp180();
};

async function readBmp180(){
    const sensor = await bmp180({
        address: 0x77,
        mode: 1,
    })

    const data = await sensor.read()

    console.log(data)

    await sensor.close();
};
