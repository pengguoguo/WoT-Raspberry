var httpServer = require('./servers/http');
var resources  = require('./resources/model');


//Internal plugins
var ledsPlugin = require('./plugins/internal/ledsPlugin');

var led_proxy = ledsPlugin.start(1000);

var server     = httpServer.listen(resources.pi.port,function () {
    console.info('WoT Pi is up and running on port %s',resources.pi.port);
});

exports led_proxy;
