var util=require('commonjs');
var cookie=require('cookie');
var md5=require('md5');
var getTime=require('timeFormat');
    var domain = util.domain; // 正式

    $(function () {
        // 登录提交
        $('#submit-btn').on('click', function () {
            var loginPhoneV = $.trim($('#login-phone').val()),
                loginPwdV = $.trim($('#login-pwd').val());
            if (loginPhoneV == "") {
                util.drawToast('请输入手机号');
                return false;
            }
            var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
            var mobileResult = regMobile.test(loginPhoneV);
            if (mobileResult == false) {
                util.drawToast('手机号有误,请重新输入');
                return false;
            }
            if (loginPwdV == "") {
                util.drawToast('请输入密码');
                return false;
            }
            var md5loginPwdV = $.md5(loginPwdV);
            util.ajaxFun(util.postLogin, 'POST', {
                account: loginPhoneV,
                password: md5loginPwdV
            }, function (res) {
                if (res.rtnCode === "0000000") {
                    var token = res.bizData.token;
                    var userName = res.bizData.userInfo.name;
                    var icon = res.bizData.userInfo.icon;
                    var vipStatus = res.bizData.userInfo.vipStatus;
                    var subjectType = res.bizData.userInfo.subjectType;
                    var phone = res.bizData.userInfo.account;
                    var userKey = res.bizData.userInfo.userKey;
                    //var imgIco = require('../../../img/icon_default.png');
                    var imgIco = "";
                    if (icon == '' || icon == null || icon== undefined) {
                        localStorage.icon = imgIco;
                    } else {
                        localStorage.icon = res.bizData.userInfo.icon;
                    }
                    if(res.bizData.userInfo.activeDate || res.bizData.userInfo.endDate){
                        var vipActiveDate = getTime(res.bizData.userInfo.activeDate);
                        var vipEndDate = getTime(res.bizData.userInfo.endDate);
                        cookie.setCookie("vipActiveDate", vipActiveDate, 4, "");
                        cookie.setCookie("vipEndDate", vipEndDate, 4, "");
                    }
                    cookie.setCookie("token", token, 4, "");
                    cookie.setCookie("isLogin", "true", 4, "");
                    cookie.setCookie("userName", userName, 4, "");
                    cookie.setCookie("vipStatus", vipStatus, 4, "");
                    cookie.setCookie("phone",phone, 4, "");
                    cookie.setCookie("userKey",userKey, 4, "");
                    window.location.assign('http://' + $.trim(userKey) + '.'+ domain +'/index.html');
                } else {
                    util.drawToast(res.msg);
                }
            });
        });
    });






