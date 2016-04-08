var urlConfig = require('urlConfig');
var cookie = require('cookie');
var getTime = require('timeFormat');
var token = cookie.getCookieValue('token');
var isLogin = cookie.getCookieValue('isLogin');
$(function () {
    $('#header-title').text('VIP');
    $('#header-menu').show();
    var vipActiveDate = cookie.getCookieValue('vipActiveDate');
    var vipEndDate = cookie.getCookieValue('vipEndDate');
    var vipActiveDateV = getTime(vipActiveDate,'yyyy-MM-dd').substr(0, 10);
    var vipEndDateV = getTime(vipEndDate,'yyyy-MM-dd').substr(0, 10);
    $('#startDate').text(vipActiveDateV);
    $('#endDate').text(vipEndDateV);
    if(isLogin){
        $('#vip-buy').attr('href','/vip-buy?token='+token);
    }
});







