/**
 * Created by pdeng on 16/3/31.
 */
var util = require('commonjs');
var interfaceUrl = require('urlConfig');
var cookie = require('cookie');
$(function () {
    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        //alert(ua);
        if(ua.indexOf('micromessenger') > -1){
            return true;
        }else{
            return false;
        }
    }


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
        if (isWeiXin()) {
            $('.mask').addClass('show');
        }

    });
    $('body').on('click','.mask',function () {
        $(this).removeClass('show');
    });

    $('#header-title').text('二维码');
    $('#header-back').show().on('click',function(){
        window.location.href = '/user-detail';
    });




});