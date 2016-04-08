var urlConfig = require('urlConfig');
var cookie = require('cookie');
var timeFormat = require('timeFormat');
var token = cookie.getCookieValue('token');
$(function () {
    $('#header-title').text('VIP');
    $('#header-menu').show();
    var vipActiveDate = cookie.getCookieValue('vipActiveDate');
    var vipEndDate = cookie.getCookieValue('vipEndDate');
    $('#startDate').text(vipActiveDate);
    $('#endDate').text(vipEndDate);
    window.location.href = '/vip-buy?token='+token;
});


