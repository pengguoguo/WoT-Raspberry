var express = require('express');
var router  = express.Router();

exports.create = function(model) {

    // Let's create the routes
    createRootRoute(model);

    return router;
};

function createRootRoute(model) {
    router.route('/').get(function(req,res,next)){
        req.model = model;
        req.type  = 'root';

        res.links({

        });
        next();
    }
}

