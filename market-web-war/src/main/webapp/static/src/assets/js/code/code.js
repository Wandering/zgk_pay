$(function () {

    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var isLogin = cookie.getCookieValue('isLogin');
    var token = cookie.getCookieValue('token');
    var cookieUserId = cookie.getCookieValue('userId');
    var userId = util.getLinkey('userId');
    var toUrl = util.getLinkey('state');
    var uc = util.getLinkey('uc');
    if(uc=="1"){
        document.title = '二维码';
        $('#header-title').text('二维码');
        $('#header-back').show().on('click', function () {
            window.location.href = 'user-detail?state=user-detail&token='+token;
        });
    }else{
        document.title = '邀请好友';
        $('#header-title').text('邀请好友');
        $('#header-menu').show();
    }
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

    if(toUrl=='code'){
        //if(!isLogin){
        //    //window.location.href='/login?state=code';
        //}else{
        //
        //}
        var menuV = util.getLinkey('menu');
        if(menuV=="1"){
            if(!isLogin){
                window.location.href='/login?state=code?userId='+userId;
            }else{
                cookie.setCookie("flag", "0", 4, "/");
                console.log("cookieUserId=="+cookieUserId)
                window.location.assign('code?state=code&userId=' + cookieUserId+'&token=' + token + "&code="+getQueryObject(window.location.href).code);
            }
        }
        var flag = cookie.getCookieValue('flag');
        if(flag=="0"){
            cookie.setCookie("flag", "1", 4, "/");
            console.log("userId=="+userId)
            window.location.assign('code?state=code&userId=' + cookieUserId+'&token=' + token + "&code="+getQueryObject(window.location.href).code);
        }
        if(flag=="1"){

            if (isWeiXin()) {
                if(!openId){
                    var obj = getQueryObject(window.location.href);
                    cookie.setCookie("code", obj.code, 4, "/");
                    getOpenId(obj.code);
                }
            }
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
    getCaptchaImg();



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