$(function () {
    var urlConfig = require('urlConfig');
    var cookie = require('cookie');
    var token = cookie.getCookieValue('token');
    var isLogin = cookie.getCookieValue('isLogin');
    $('#header-title').text('VIP');
    $('#header-menu').show();
    var vipActiveDate = cookie.getCookieValue('vipActiveDate');
    var vipEndDate = cookie.getCookieValue('vipEndDate');
    var vipActiveDateV = getTime(vipActiveDate).substr(0,10);
    var vipEndDateV = getTime(vipEndDate).substr(0,10);
    $('#startDate').text(vipActiveDateV);
    $('#endDate').text(vipEndDateV);
    $('#vip-buy').attr('href','/vip-buy?token='+token);
});









