var resources = require('./../../resources/model');

var pressureModel = resources.pi.sensors.pressure;

var temperatureModel = resources.pi.sensors.temperature;

var altitudeModel = resources.pi.sensors.altitude;

var pressurePluginName = resources.pi.sensors.pressure.name;

var bmp180 = require('bmp180-sensor');

var pressurelocalParams;

exports.start = function (params) {
    pressurelocalParams = params;

    connectHardware();

    setInterval(function () {
        readBmp180();
    },2000);
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

    const data = await sensor.read();

    console.log(data);

    pressureModel.value = data.pressure.toFixed(2);

    var altitude = 44330 * (1 - Math.pow((pressureModel.value / 101325.0),(1.0 / 5.255)));

    altitudeModel.value = altitude.toFixed(2);

    temperatureModel.value   = data.temperature;

    await sensor.close();
};
