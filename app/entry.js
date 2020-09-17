'use strict';
const $ = require('jquery');
var coinsPrice = {};
var coinsId = Array(50);
$.get('/coins-info', {}, data => {
    coinsId = Object.values(data).map(coinInfo => coinInfo.id);
});
var coinsPriceArray = Array(50);

import Vue from 'vue'
import App from "../views/App.vue"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(ElementUI, { locale })

new Vue({
    render: h => h(App)
}).$mount('#app');

$(function () {
    for (let i = 0; i < 50; i++) {
        coinsPrice[coinsId[i]] = $('.' + coinsId[i]);
    }
    $.get('/coins-price', {}, (data) => {
        for (let i = 0; i < 50; i++) {
            coinsPrice[coinsId[i]].text(String('$ ' + data[i]));
            coinsPriceArray[i] = parseFloat(data[i]);
        }
    });

    // poling with ajax
    // load data from /coins-price
    setInterval(() => {
        for (let i = 0; i < 50; i++) {
            coinsPrice[coinsId[i]] = $('.' + coinsId[i]);
        }
        $.get('/coins-price', {}, (data) => {
            for (let i = 0; i < 50; i++) {
                coinsPrice[coinsId[i]].text(String('$ ' + data[i]));
                if (parseFloat(data[i]) > coinsPriceArray[i]) {
                    coinsPrice[coinsId[i]].css('color', 'green');
                } else {
                    coinsPrice[coinsId[i]].css('color', 'red');
                }
                coinsPriceArray[i] = parseFloat(data[i]);
            }
        });
    }, 5000);
});

