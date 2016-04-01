/**
 * Created by kepeng on 16/4/1.
 */

(function() {

    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');

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

        var province = cookie.getCookieValue('province');
        $('#province').text(province || '');

        var city = cookie.getCookieValue('city');
        $('#city').text(city || '');

        var email = cookie.getCookieValue('email');
        $('#email').text(email || '');

        var qrcodeUrl = cookie.getCookieValue('qrcodeUrl');
        $('#qrcodeUrl').attr('src', qrcodeUrl || '/static/dist/img/icons/code.png');
    }

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
            if (res.rtnCode == '0000000') {
                window.location.href = '/login';
            } else {
                util.drawToast(res.msg);
            }
        });
    }
    $(document).ready(function() {
        initUserInfo();

        $('.modify-btn').on('click', function() {
            window.location.href = '/modify-user-detail';
        });

        $('.close-modal').on('click', function() {
            $('.mask').removeClass('show');
        });

        $('.change-password-btn').on('click', function() {
            $('.mask').addClass('show');
            $('#confirm_pwd_btn').off('click');
            $('#confirm_pwd_btn').on('click', function() {
                changePwd();
            })
        });

    });

})();
