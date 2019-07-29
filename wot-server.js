var httpServer = require('./servers/http');
var resources  = require('./resources/model');

var server     = httpServer.listen(resources.pi.port,function () {
    console.info('WoT Pi is up and running on port %s',resources.pi.port);
});
