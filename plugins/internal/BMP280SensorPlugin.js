var resources = require('./../../resources/model');

var pressureModel = resources.pi.sensors.pressure;

var pressurePluginName = resources.pi.sensors.pressure.name;

var pressurelocalParams;

var bme280;

exports.start = function (params) {
    pressurelocalParams = params;

    connectHardware();
};

exports.stop = function(params) {
    //sensor.unexport();
};

function connectHardware(){
    const BME280 = require('bme280-sensor');

    const options = {
        i2cBusNo : 1,
        i2cAddress : BME280.BME280_DEFAULT_I2C_ADDRESS()
    };

    bme280 = new BME280();

    bme280.init()
        .then(() => {
        console.log('BME280 initialization succeeded');
        readSensorData();
        })
        .catch((err) =>console.error('BME280 initialization failed:${err}'));
};

const readSensorData = () => {
    bme280.readSensorData()
        .then((data) => {
            data.temperature_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
            data.pressure_inHg = BME280.convertHectopascalToInchesOfMercury(data.pressure_hPa);
            console.log('data = ${JSON.stringify(data,null,2)}');
            setTimeout(readSensorData,2000);
        })
        .catch((err) => {
            console.log('BME280 read error: ${err}');
            setTimeout(readSensorData,2000);
        });
};
