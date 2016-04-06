var cookie = require('cookie');
$(function(){
    $('#header-title').text('VIP');
    $('#header-back').show().on('click',function(){
        window.location.href = '/vip';
    });
    var vipActiveDate = cookie.getCookieValue('vipActiveDate');
    var vipEndDate = cookie.getCookieValue('vipEndDate');

    $('#startDate').text(vipActiveDate.substr(0,10));
    $('#endDate').text(vipEndDate.substr(0,10));
});






