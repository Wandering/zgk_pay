/**
 * Created by pdeng on 16/3/31.
 */
var util = require('commonjs');
var interfaceUrl = require('commonjs');
$(function () {
    //util.ajaxFun(interfaceUrl.getCaptchaImg, 'get', {}, function (res) {
    var res = {
        bizData: {
            'captchImg': 'http://pic.baike.soso.com/p/20131211/20131211091752-393669037.jpg',
            'name': 'pdeng',
            'account': '18710921676'
        },
        rtnCode: '0000000'
    };
    if (res.rtnCode = '0000000') {
        var dataJson = res.bizData;
        $('.name').text(dataJson.name);
        $('.tel').text(dataJson.account);
        $('.captchImg').attr('src', dataJson.captchImg);
    }
    //});
    //分享
    $('.share-btn').click(function () {
        $('.mask').show();
    });
    $('.mask').click(function () {
        $(this).hide();
    })
});