'use strict';
var express = require('express');
var router = express.Router();
var request = require("request");
var coinsInfoJSON;
var formattedcoinsInfoJSON = [];
var config = require('./coins-config')

request(config.options, function (error, response, body) {
    if (error) throw new Error(error);
    //console.log(body.JSON)
    //console.log(body)
    coinsInfoJSON = JSON.parse(body);
    // formatting coinsInfoJSON
    for (var i = 0; i < coinsInfoJSON.data.coins.length; i++) {
        formattedcoinsInfoJSON.push({
            name: coinsInfoJSON['data']['coins'][i]['name'],
            id: coinsInfoJSON['data']['coins'][i]['id'],
            description: coinsInfoJSON['data']['coins'][i]['description']
        });
    }
});

console.log('accessed coins info');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(formattedcoinsInfoJSON);
});

module.exports = router;
