/**
 * Created by pdeng on 16/3/31.
 */
var util = require('commonjs');
var interfaceUrl = require('urlConfig');
var cookie = require('cookie');
$(function () {
    var userId = util.getLinkey('userId');
    util.ajaxFun(interfaceUrl.getCaptchaImg, 'get', {
        'userId': userId
    }, function (res) {
        console.log(res);
        if (res.rtnCode = '0000000') {
            var dataJson = res.bizData;
            $('.name').text(dataJson.name);
            $('.tel').text(dataJson.account);
            $('#captchImg').attr('src', dataJson.qrcodeUrl);
        }
    });
    //分享
    $('.share-btn').click(function () {
        $('.mask').show();
    });
    $('.mask').click(function () {
        $(this).hide();
    })
});