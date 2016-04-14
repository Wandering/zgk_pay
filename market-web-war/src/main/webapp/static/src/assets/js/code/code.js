$(function () {
    $('#header-title').text('二维码');
    var util = require('commonjs');

    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var isLogin = cookie.getCookieValue('isLogin');
    var token = cookie.getCookieValue('token');
    var userId = cookie.getCookieValue('userId');
    $('#header-back').show().on('click', function () {
        window.location.href = 'user-detail?state=user-detail&token='+token;
    });
    var toUrl = util.getLinkey('state');
    if(toUrl=='code'){
        if(!isLogin){
            window.location.href='/login?state=code';
        }else{
            var menuV = util.getLinkey('menu');
            if(menuV=="1"){
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if(flag=="0"){
                cookie.setCookie("flag", "1", 4, "/");
                window.location.assign('code?state=code&userId=' + userId+'&token=' + token + "&code="+getQueryObject(window.location.href).code);
            }
            if(flag=="1"){
                function getQueryObject(url) {
                    url = url == null ? window.location.href : url;
                    var search = url.substring(url.lastIndexOf("?") + 1);
                    var obj = {};
                    var reg = /([^?&=]+)=([^?&=]*)/g;
                    search.replace(reg, function (rs, $1, $2) {
                        var name = decodeURIComponent($1);
                        var val = decodeURIComponent($2);
                        val = String(val);
                        obj[name] = val;
                        return rs;
                    });
                    return obj;
                }

                function getOpenId(code) {

                    $.get(interfaceUrl.getOpenId,{code: code},function(res){
                        if (res.rtnCode == '0000000') {
                            cookie.setCookie("openId", res.bizData.openId, 4, "/");
                        }
                    });
                }


                function isWeiXin() {
                    var ua = window.navigator.userAgent.toLowerCase();
                    if (ua.indexOf('micromessenger') > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }
                var openId = cookie.getCookieValue('openId');


                if (isWeiXin()) {
                    if(!openId){
                        var obj = getQueryObject(window.location.href);
                        cookie.setCookie("code", obj.code, 4, "/");
                        getOpenId(obj.code);
                    }
                }
            }
        }
    }

    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') > -1) {
            return true;
        } else {
            return false;
        }
    }


    function getCaptchaImg(){
        $.ajaxSettings.async = false;
        var getCaptchaImg = '';
        util.ajaxFun(interfaceUrl.getCaptchaImg, 'get', {
            'userId': userId
        }, function (res) {
            if (res.rtnCode = '0000000') {
                var dataJson = res.bizData;
                $('.name').text(dataJson.name);
                $('.tel').text(dataJson.account);
                $('#captchImg').attr('src', dataJson.qrcodeUrl);
                getCaptchaImg = dataJson.qrcodeUrl;
            }
        });
        $.ajaxSettings.async = true;
        return getCaptchaImg;
    }



    //分享
    if (isWeiXin()) {
        $('.share-btn').click(function () {
            $('.mask').addClass('show');
        });
    } else {
        $('.share-btn').hide();
    }

    $('body').on('click', '.mask', function () {
        $(this).removeClass('show');
    });




    /***************************自定义二维码*************************************/







});