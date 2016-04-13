$(function(){
    var md5=require('md5');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var util = require('commonjs');
    var token = cookie.getCookieValue('token');
    var toUrl = util.getLinkey('toUrl');
    var isLogin = cookie.getCookieValue('isLogin');
    if(toUrl=='user-detail'){
        if(!isLogin){
            window.location.href='/login?toUrl=user-detail';
        }else{
            var menuV = util.getLinkey('menu');
            if(menuV=="1"){
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if(flag=="0"){
                cookie.setCookie("flag", "1", 4, "/");
                window.location.assign('/user-detail?toUrl=user-detail&token=' + token);
            }
        }
    }



    $('#header-title').text('个人信息');
    $('#header-menu').show();


    function initUserInfo() {
        var avatar = cookie.getCookieValue('avatar');
        if (!avatar) avatar = '/static/dist/img/icons/avatar.png';
        $('#avatar-img').attr('src', avatar);

        var userName = cookie.getCookieValue('userName');
        $('#header-user-name').text(userName || '');

        var phone = cookie.getCookieValue('phone');
        $('#number').text('账号：' + (phone || ''));

        var schoolName = cookie.getCookieValue('schoolName');
        $('#school-name').text(schoolName || '');

        var sexType = cookie.getCookieValue('sexType');
        if(sexType){
            if(sexType=="0"){
                $('#sex').text("女");
            }else{
                $('#sex').text("男");
            }
        }else{
            $('#sex').text("");
        }


        var subjectType = cookie.getCookieValue('subjectType');
        if(subjectType){
            if(sexType=="0"){
                $('#subject').text("文史");
            }else{
                $('#subject').text("理工");
            }
        }else{
            $('#subject').text("");
        }

        var province = cookie.getCookieValue('proName');
        $('#province').text(province || '');

        var city = cookie.getCookieValue('countyName');
        $('#city').text(city || '');

        var email = cookie.getCookieValue('email');
        $('#email').text(email || '');

        var qrcodeUrl = cookie.getCookieValue('qrcodeUrl');
        if(!qrcodeUrl){
            $('#code-item').hide();
        }
        $('#qrcodeUrl').attr('src', qrcodeUrl || '/static/dist/img/icons/code.png');
    }

    util.ajaxFun(interfaceUrl.getUserInfo, 'GET', {}, function (res) {
        console.log(res)
        if (res.rtnCode == '0000000') {
            var personListData = res.bizData;
            $('#header-user-name').text(personListData.name);
            $('#school-name').text(personListData.schoolName);
            $('#email').text(personListData.mail);
            var sexTxt = personListData.sex;
            sexTxt == "0" ? $('#sex').text('女生') : $('#sex').text('男生');
            var subjectTypeTxt = personListData.subjectType;
            subjectTypeTxt == "0" ? $('#subject').text('文史') : $('#subject').text('理工');

        }
    });


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
        util.ajaxFun(interfaceUrl.getOpenId, 'get', {
            code: code
        }, function (res) {
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

    if (isWeiXin()) {
        var obj = getQueryObject(window.location.href);
        cookie.setCookie("code", obj.code, 4, "/");
        getOpenId(obj.code);
    }
    initUserInfo();
    $('.modify-btn').on('click', function () {
        window.location.href = '/modify-user-detail?token='+token;
    });
    $('.change-password-btn').on('click', function () {
        var subHtml = ''
            + '<input id="current-psd" type="password" placeholder="当前密码">'
            + '<input id="new-psd" type="password" placeholder="新密码">'
            + '<input id="confirm-psd" type="password" placeholder="确认新密码">'
        util.confirmLayer('修改密码', subHtml);

    });

    $('body').on('click', '#close-modal', function () {
        $(this).removeClass('show');
    });

    var userId = cookie.getCookieValue('userId');
    $('#share-links').attr('href', '/code?userId=' + userId)

    $('body').on('click', '#confirm-btn', function () {
        var currentPsd = $.trim($('#current-psd').val());
        var newPsd = $.trim($('#new-psd').val());
        var confirmPsd = $.trim($('#confirm-psd').val());
        if (currentPsd == '') {
            util.drawToast('当前密码不能为空');
            return false;
        }
        if (currentPsd.length > 16 && currentPsd.length < 6) {
            util.drawToast('密码输入有误，6-16位');
            return false;
        }
        if (newPsd == '') {
            util.drawToast('新密码不能为空');
            return false;
        }
        if (newPsd.length > 16 && newPsd.length < 6) {
            util.drawToast('新密码输入有误，6-16位');
            return false;
        }
        if (confirmPsd == '') {
            util.drawToast('确认密码不能为空');
            return false;
        }
        if (newPsd != confirmPsd) {
            util.drawToast('两次密码输入不一致');
            return false;
        }
        util.ajaxFun(interfaceUrl.postModifyPassword, 'POST', {
            oldPassword: currentPsd,//旧密码
            password: newPsd//新密码'
        }, function (res) {
            console.log(res)
            if (res.rtnCode == '0000000') {
                cookie.deleteCookie('city', '');
                cookie.deleteCookie('county', '');
                cookie.deleteCookie('icon', '');
                cookie.deleteCookie('isLogin', '');
                cookie.deleteCookie('isReported', '');
                cookie.deleteCookie('isSurvey', '');
                cookie.deleteCookie('phone', '');
                cookie.deleteCookie('province', '');
                cookie.deleteCookie('qrcodeUrl', '');
                cookie.deleteCookie('subjectType', '');
                cookie.deleteCookie('token', '');
                cookie.deleteCookie('userKey', '');
                cookie.deleteCookie('userName', '');
                cookie.deleteCookie('vipStatus', '');
                cookie.deleteCookie('userId', '');
                cookie.deleteCookie('proName', '');
                cookie.deleteCookie('cityName', '');
                cookie.deleteCookie('countyName', '');
                cookie.deleteCookie('vipActiveDate', '');
                cookie.deleteCookie('vipEndDate', '');
                window.location.href = '/login';
            } else {
                util.drawToast(res.msg);
            }
        });
    });


});

