var util = require('commonjs');
var cookie = require('cookie');
var md5 = require('md5');
var urlConfig = require('urlConfig');

//var dialog = require('dialog');
var domain = util.domain; // 正式
$(function () {
    //省市地区
    var province = '';
    var city = '';
    var county = '';
    var Area = {
        data: [],
        init: function () {
            var that = this;
            util.ajaxFun(urlConfig.getAllRegion, 'GET', {}, function (ret) {
                if ('0000000' === ret.rtnCode) {
                    that.data = ret.bizData;
                    $('#province').html(that.render(that.data, true));
                    var currentProvinceId = $('#province option:checked').val();
                    that.changeProvince(currentProvinceId);
                    var currentCityId = $('#city option:checked').val();
                    that.changeCity(currentCityId);

                } else {

                }
            });
        },
        render: function (data, flag) {
            var html = [];
            if (flag) {
                html.push('<option value="00">省份</option>');
            }
            $.each(data, function (i, value) {
                if (
                    value.id != "150000" &&
                    value.id != "540000" &&
                    value.id != "630000" &&
                    value.id != "710000" &&
                    value.id != "810000" &&
                    value.id != "820000"
                ) {
                    html.push('<option value="' + value.id + '">' + value.name + '</option>');
                }
            });
            return html.join('');
        },
        changeProvince: function (value) {
            var provinceId = $('#province').val();
            if (value) {
                var city = this.getCity(value);
                if (city && city.length > 0) {
                    $('#city').html(this.render(city));
                    this.changeCity(city[0].id);
                    $('#areaSel-result').show().html($('#province option:checked').text() + $('#city option:checked').text() + $('#county option:checked').text());
                } else {
                    $('#city').html('<option value="00">市</option>');
                }

                if (provinceId != "00" && !city) {
                    $('#city').parent().hide();
                    $('#county').parent().hide();
                    $('#areaSel-result').show().html($('#province option:checked').text());
                } else {
                    $('#city').parent().show();
                    $('#county').parent().show();
                }
                if (value == "00") {
                    $('#areaSel-result').hide();
                    $('#county').html('<option value="00">区(县)</option>');
                }
            }
        },
        changeCity: function (value) {

            var provinceId = $('#province').val();

            if (value && provinceId) {
                var countyList = this.getCounty(provinceId, value);
                if (countyList && countyList.length > 0) {
                    $('#county').html(this.render(countyList));
                    $('#areaSel-result').html($('#province option:checked').text() + $('#city option:checked').text() + $('#county option:checked').text());
                } else {
                    $('#county').html('<option value="00">区(县)</option>');
                }
                if (provinceId != "00" && !countyList) {
                    $('#county').parent().hide();
                    $('#areaSel-result').html($('#province option:checked').text() + $('#city option:checked').text());
                } else {
                    $('#county').parent().show();
                }

            }
            ;
        },
        changeCounty: function (value) {
            $('#areaSel-result').html($('#province option:checked').text() + $('#city option:checked').text() + $('#county option:checked').text());
        },
        addEventForArea: function () {
            var that = this;
            $('#province').change(function (e) {
                var value = this.value;
                that.changeProvince(value);
            });
            $('#city').change(function (e) {
                var value = this.value;
                that.changeCity(value);
            });
            $('#county').change(function (e) {
                var value = this.value;
                that.changeCounty(value);
            });

        },
        getCity: function (id) {
            for (var i = 0, len = this.data.length; i < len; i++) {
                if (this.data[i].id == id) {
                    return this.data[i].cityList;
                }
            }
        },
        getCounty: function (provinceId, cityId) {
            for (var i = 0, len = this.data.length; i < len; i++) {
                if (this.data[i].id == provinceId) {
                    var cityList = this.data[i].cityList;
                    if (cityList.length <= 0) {
                        return null;
                    }
                    var j = 0, jlen = cityList.length;
                    for (; j < jlen; j++) {
                        if (cityList[j].id == cityId) {
                            return cityList[j].countyList;
                        }
                    }

                }
            }
        }
    };

    Area.init();
    Area.addEventForArea();
    // 登录提交
    $('#register-btn').on('click', function () {

        var registerPhoneV = $.trim($('#register-phone').val()),
            verificationCodeV = $.trim($('#verification-code').val()),
            registerPwdV = $.trim($('#register-pwd').val()),
            registerPwdRepeatV = $.trim($('#register-pwd-repeat').val()),
            provinceV = $('#province option:checked').val(),
            provinceTxt = $('#province option:checked').text();
        var provinceId = $('#province').val(),
            cityId = $('#city').val(),
            countyId = $('#county').val();




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
        if ($('.type-res:visible').attr('typeRes') == "1") {
            if (provinceV == "00") {
                util.drawToast('请选择高考报名地区');
                return false;
            }
            if (provinceV == "00") {
                util.drawToast('请选择高考报名地区');
                return false;
            }
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
        var sharerId = util.getLinkey('sharerId');
        var shareType = util.getLinkey('shareType');
        var subHtml = '<p class="reg-center">进入智高考"'+ provinceTxt +'"网站，</br>注册之后地域不可修改</p>';
        util.confirmLayer('注册',subHtml);
        $('body').on('click', '#confirm-btn', function () {
            var md5RegisterPwdV = $.md5(registerPwdV);
            util.ajaxFun('/register/account', 'POST', {
                account: registerPhoneV, //用户账号
                captcha: verificationCodeV, //验证码
                password: md5RegisterPwdV, //密码
                provinceId: provinceId, //省份
                cityId: cityId,//市
                countyId: countyId,//县
                sharerId: sharerId || "0",
                shareType: shareType || "0"
            }, function (res) {
                console.log(res)
                $('#confirm-btn').attr('disabled', 'disabled');
                if (res.rtnCode === "0000000") {
                    var token = res.bizData.token;  // token
                    var userName = res.bizData.userInfo.name; // 用户名称
                    var userId = res.bizData.userInfo.id;  // userId
                    var vipStatus = res.bizData.userInfo.vipStatus; // VIP状态
                    var phone = res.bizData.userInfo.account; // 用户账号
                    var userKey = res.bizData.userInfo.userKey; // 省份userKey
                    var province = res.bizData.userInfo.province; // 选择省份
                    var proName = res.bizData.userInfo.proName; // 选择省份
                    var city = res.bizData.userInfo.city; // 选择城市
                    var cityName = res.bizData.userInfo.cityName; // 选择城市
                    var county = res.bizData.userInfo.county; // 选择县区
                    var countyName = res.bizData.userInfo.countyName; // 选择县区
                    var qrcodeUrl = res.bizData.userInfo.qrcodeUrl;  // 二维码
                    var isReported = res.bizData.userInfo.isReported; // 智能填报次数
                    var isSurvey = res.bizData.userInfo.isSurvey; // 专家测试次数
                    cookie.setCookie("isLogin", "true", 4, "/");
                    cookie.setCookie("token", token, 4, "/");
                    cookie.setCookie("userId", userId, 4, "/");
                    cookie.setCookie("userName", userName, 4, "/");
                    cookie.setCookie("vipStatus", vipStatus, 4, "/");
                    cookie.setCookie("phone",phone, 4, "/");
                    cookie.setCookie("userKey",userKey, 4, "/");
                    cookie.setCookie("proName",proName, 4, "/");
                    cookie.setCookie("cityName",cityName, 4, "/");
                    cookie.setCookie("countyName",countyName, 4, "/");
                    cookie.setCookie("province",province, 4, "/");
                    cookie.setCookie("city",city, 4, "/");
                    cookie.setCookie("county",county, 4, "/");
                    cookie.setCookie("qrcodeUrl",qrcodeUrl, 4, "/");
                    cookie.setCookie("isReported",isReported, 4, "/");
                    cookie.setCookie("isSurvey",isSurvey, 4, "/");
                    window.location.assign('http://'+ domain +'/user-detail?userKey='+userKey);
                } else {
                    util.drawToast(res.msg);
                }
            });
        });
    });



    var captchaType = '0'; //0.注册标志  1 找回密码
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
