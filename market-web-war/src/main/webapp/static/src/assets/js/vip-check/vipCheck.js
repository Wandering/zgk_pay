var urlConfig = require('urlConfig');
var cookie = require('cookie');
var timeFormat = require('timeFormat');
var token = cookie.getCookieValue('token');
var isLogin = cookie.getCookieValue('isLogin');
$(function () {
    $('#header-title').text('VIP');
    $('#header-menu').show();
    var vipActiveDate = cookie.getCookieValue('vipActiveDate');
    var vipEndDate = cookie.getCookieValue('vipEndDate');
    $('#startDate').text(vipActiveDate);
    $('#endDate').text(vipEndDate);
    if(isLogin){
        $('#vip-buy').attr('href','/vip-buy?token='+token);
    }
});





