/**
 * Created by kepeng on 16/4/1.
 */

(function() {

    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');

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
        var sex = ['女生', '男生'];
        $('#sex').text(sex[sexType || 1]);

        var subjectType = cookie.getCookieValue('subjectType');
        var subject = ['文科', '理科'];
        $('#subject').text(subject[subjectType || 1]);

        var province = cookie.getCookieValue('proName');
        $('#province').text(province || '');

        var city = cookie.getCookieValue('cityName');
        $('#city').text(city || '');

        var email = cookie.getCookieValue('email');
        $('#email').text(email || '');

        var qrcodeUrl = cookie.getCookieValue('qrcodeUrl');
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
            sexTxt == "0" ? $('#sex').text('女生'):$('#sex').text('男生');
            var subjectTypeTxt = personListData.subjectType;
            subjectTypeTxt == "0" ? $('#subject').text('文史'):$('#subject').text('理工');

        }
    });


    //修改密码
    function changePwd() {
        var currentPsd = $('#current-psd');
        var newPsd = $('#new-psd');
        var confirmPsd = $('#confirm-psd');
        if (currentPsd.val() == '') {
            util.drawToast('当前密码不能为空');
            return false;
        }
        if ($.trim(currentPsd.val()).length > 16 && $.trim(currentPsd.val()).length < 6) {
            util.drawToast('密码输入有误，6-16位');
            return false;
        }
        if (newPsd.val() == '') {
            util.drawToast('新密码不能为空');
            return false;
        }
        if ($.trim(newPsd.val()).length > 16 && $.trim(newPsd.val()).length < 6) {
            util.drawToast('新输入有误，6-16位');
            return false;
        }
        if (confirmPsd.val() == '') {
            util.drawToast('确认密码不能为空');
            return false;
        }
        if ($.trim(confirmPsd.val()).length > 16 && $.trim(confirmPsd.val()).length < 6) {
            util.drawToast('新输入有误，6-16位');
            return false;
        }
        if ($.trim(confirmPsd.val()) != $.trim(newPsd.val())) {
            util.drawToast('两次密码输入不一致');
            return false;
        }
        util.ajaxFun(interfaceUrl.postModifyPassword, 'POST', {
            oldPassword: currentPsd.val(),//旧密码
            password: newPsd.val()//新密码
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
                window.location.href = '/login';
            } else {
                util.drawToast(res.msg);
            }
        });
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
        util.ajaxFun(interfaceUrl.getOpenId, 'get', {
            code: code
        }, function (res) {
            if (res.rtnCode == '0000000') {
                cookie.setCookie("openId", res.bizData.openId, 4, "/");
            }
        });
    }

    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.indexOf('micromessenger') > -1){
            return true;
        }else{
            return false;
        }
    }

    $(document).ready(function() {

        if (isWeiXin()) {
            var obj = getQueryObject(window.location.href);
            cookie.setCookie("code", obj.code, 4, "/");
            getOpenId(obj.code);
        }

        initUserInfo();

        $('.modify-btn').on('click', function() {
            window.location.href = '/modify-user-detail';
        });






        $('body').on('click','.mask', function() {
            $(this).removeClass('show');
        });

        $('.change-password-btn').on('click', function() {
            //$('.mask').addClass('show');

            var subHtml = '' +
                '' +
                '<p class="reg-center">进入智高网站，</br>注册之后地域不可修改</p>';
            util.confirmLayer('修改密码',subHtml);


            $('#confirm_pwd_btn').off('click');
            $('#confirm_pwd_btn').on('click', function() {
                changePwd();
            })
        });

        var userId = cookie.getCookieValue('userId');
        $('#share-links').attr('href','/code?userId='+userId)
    });

})();
