var cookie = require('cookie');
$(function(){
    $('#header-title').text('VIP');
    $('#header-menu').show();
    var vipActiveDate = cookie.getCookieValue('vipActiveDate');
    var vipEndDate = cookie.getCookieValue('vipEndDate');

    $('#startDate').text(vipActiveDate.substr(0,10));
    $('#endDate').text(vipEndDate.substr(0,10));
});






