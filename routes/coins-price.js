'use strict';
const express = require('express');
const router = express.Router();
var config = require('./coins-config');
const defaultURL = 'https://coinranking1.p.rapidapi.com/coin/'
var request = require("request");
const coinsId = [1, 2, 8, 3, 59, 4, 71983,
    7, 4875, 10296, 9, 14, 5, 11,
    18, 1760, 6, 1524, 10, 15, 14755,
    4966, 71, 14585, 17, 69380, 19, 12,
    71246, 13, 227, 16, 21, 70838, 24,
    22, 10883, 96, 26, 274, 422, 46,
    20, 64962, 25, 62569, 57612, 1694, 68589, 30];
var coinsPrice = Array(50);

function getCoinsPrice() {
    for (let i = 0; i < 50; i++) {
        config.options.url = defaultURL + coinsId[i];
        request(config.options, function (error, response, body) {
            if (error) throw new Error(error);
            let coinsInfoJSON = JSON.parse(body);
            //console.log(coinsInfoJSON)
            coinsPrice[i] = JSON.parse(body).data.coin.price;
        });
    }
    return coinsPrice;
}

router.get('/', (req, res, next) => {
    res.send(getCoinsPrice());
});

module.exports = router;
