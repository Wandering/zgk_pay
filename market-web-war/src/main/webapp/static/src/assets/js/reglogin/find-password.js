var util=require('commonjs');
var cookie=require('cookie');
var md5=require('md5');
var urlConfig=require('urlConfig');




$(function () {
    // 登录提交
    $('#register-pwd-btn').on('click', function () {
        var registerPhoneV = $.trim($('#register-phone').val()),
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
            if (res.rtnCode === "0000000") {
                console.log(res.bizData.userInfo.icon)
                var token = res.bizData.token;
                var userName = res.bizData.userInfo.name;
                var account = res.bizData.userInfo.account;
                var icon = res.bizData.userInfo.icon;
                var vipStatus = res.bizData.userInfo.vipStatus;
                var subjectType = res.bizData.userInfo.subjectType;
                var userKey = res.bizData.userInfo.userKey;
                var avatar='';
                var imgIco = "";
                if (icon == '' || icon == null) {
                    avatar = imgIco;
                } else {
                    avatar = icon;
                }
                window.localStorage.icon = avatar;
                cookie.setCookie("token", token, 4, "");
                cookie.setCookie("isLogin", "true", 4, "");
                cookie.setCookie("phone", account, 4, "");
                cookie.setCookie("userName", userName, 4, "");
                cookie.setCookie("icon", icon, 4, "");
                cookie.setCookie("vipStatus", vipStatus, 4, "");
                cookie.setCookie("subjectType",subjectType, 4, "");
                cookie.setCookie("userKey",userKey, 4, "");
                $('#submitBtn').attr('disabled','disabled');
                //window.location.assign('http://' + $.trim(userKey) + '.'+ domain +'/user-account-info.html');
            } else {
                util.drawToast(res.msg);
            }

        });
    });

    var captchaType = '1'; //0.注册标志  1 找回密码
    // 验证码获取
    $('#verification-btn').on('click', function () {
        var _this = $(this);
        var registerPhoneV = $.trim($('#register-phone').val());
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
