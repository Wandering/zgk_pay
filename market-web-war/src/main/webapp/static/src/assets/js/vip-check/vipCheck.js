var urlConfig = require('urlConfig');
var cookie = require('cookie');
var timeFormat = require('timeFormat');
$(function () {
    $('#header-title').text('VIP');
    $('#header-menu').show();
    var vipActiveDate = cookie.getCookieValue('vipActiveDate');
    var vipEndDate = cookie.getCookieValue('vipEndDate');

    $('#startDate').text(timeFormat(vipActiveDate).substr(0, 10));
    $('#endDate').text(timeFormat(vipEndDate).substr(0, 10));
});






