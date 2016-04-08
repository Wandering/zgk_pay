$(function(){
    var cookie = require('cookie');
    var token = cookie.getCookieValue('token');
    $('#header-title').text('盈利规则');
    $('#header-back').show().on('click',function(){
        window.location.assign('/consumer-list?token='+token);
    });
});


