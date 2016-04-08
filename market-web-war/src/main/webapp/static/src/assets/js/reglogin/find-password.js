var util=require('commonjs');
var cookie=require('cookie');
var md5=require('md5');
var urlConfig=require('urlConfig');

//var domain = util.domain; // 正式

$('#header-back').show().on('click',function(){
    window.location.assign('/login');
});

$(function () {
    //var urlDomain = window.location.hostname + '';
    //var urlArr = urlDomain.split('.');
    //var provinceKey = urlArr[0];
    // 登录提交
    $('#register-pwd-btn').on('click', function () {
        var registerPhoneV = $.trim($('#register-pwd-phone').val()),
            verificationCodeV = $.trim($('#verification-pwd-code').val()),
            registerPwdV = $.trim($('#register-pwd-code').val()),
            registerPwdRepeatV = $.trim($('#register-pwd-repeat2').val());
        console.log(registerPhoneV)
        if (registerPhoneV == "") {
            util.drawToast('请输入手机号');
            return false;
        }
        var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
        var mobileResult = regMobile.test(registerPhoneV);
        if (mobileResult == false) {
            util.drawToast('手机号有误,请重新输入');
            return false;
        }
        if (verificationCodeV == "") {
            util.drawToast('请输入验证码');
            return false;
        }
        if (verificationCodeV.length != 6) {
            util.drawToast('请输入正确的验证码');
            return false;
        }
        if (registerPwdV == "") {
            util.drawToast('请输入密码');
            return false;
        }
        if (registerPwdRepeatV == "") {
            util.drawToast('请输入确认密码');
            return false;
        }
        if (registerPwdV !== registerPwdRepeatV) {
            util.drawToast('两次密码输入不一致');
            return false;
        }
        var postUrl = urlConfig.postRetrievePassword;
        var md5RegisterPwdV = $.md5(registerPwdV);
        util.ajaxFun(postUrl, 'POST', {
            account: registerPhoneV, //用户账号
            captcha: verificationCodeV, //验证码
            password: md5RegisterPwdV //密码
        }, function (res) {
            console.log(res)
            if (res.rtnCode === "0000000") {
                util.drawToast("密码修改成功!");
                setTimeout(function(){
                    window.location.assign('/login');
                },2000);
            } else {
                util.drawToast(res.msg);
            }
        });
    });
    var captchaType = '1'; //0.注册标志  1 找回密码
    // 验证码获取
    $('#verification-pwd-btn').on('click', function () {
        var _this = $(this);
        var registerPhoneV = $.trim($('#register-pwd-phone').val());
        if (registerPhoneV == "") {
            util.drawToast('请输入手机号');
            return false;
        }
        var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
        var mobileResult = regMobile.test(registerPhoneV);
        if (mobileResult == false) {
            util.drawToast('手机号有误,请重新输入');
            return false;
        }
        util.ajaxFun(urlConfig.postConfirmAccountCode, 'POST', {
            type: captchaType,
            account: registerPhoneV
        }, function (res) {
            if (res.rtnCode === "0000000") {
                util.ajaxFun(urlConfig.postVerificationCode, 'POST', {
                    type: captchaType,
                    account: registerPhoneV
                }, function (res) {
                    if (res.rtnCode === "0000000") {
                        _this.attr({
                            'background-color': '#ccc',
                            'disabled': true
                        });
                        var s = (JSON.parse(res.bizData)).time;
                        var timer = setInterval(function () {
                            s--;
                            _this.text(s + '秒后重新获取');
                            if (s <= 0) {
                                clearInterval(timer);
                                _this.text('重新获取').css('background-color', '#d80c18');
                                _this.attr('disabled', false)
                            }
                        }, 1000);
                    } else {
                        util.drawToast(res.msg);
                    }
                });
            } else {
                util.drawToast(res.msg);
            }
        });

    });

});
