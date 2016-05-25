/**
 * Created by kepeng on 16/3/31.
 */
(function () {

    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    $('#header-title').text('收货地址');

    var token = cookie.getCookieValue('token');

    $('#header-back').show().on('click', function () {
        var action = util.getLinkey('action')
        var url = '/' + action;
        window.location.assign(url);
    });

    //省市地区
    var province = '';
    var city = '';
    var county = '';
    var Area = {
        data: [],
        init: function () {
            var that = this;
            util.ajaxFun(interfaceUrl.getAllRegion, 'GET', {}, function (ret) {
                if ('0000000' === ret.rtnCode) {
                    that.data = ret.bizData;
                    $('#province_select').html(that.render(that.data, true));
                    var currentProvinceId = $('#province_select option:checked').val();
                    that.changeProvince(currentProvinceId);
                    var currentCityId = $('#city_select option:checked').val();
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
            var provinceId = $('#province_select').val();
            if (value) {
                var city = this.getCity(value);
                if (city && city.length > 0) {
                    $('#city_select').html(this.render(city));
                    this.changeCity(city[0].id);
                } else {
                    $('#city_select').html('<option value="00">市</option>');
                }

                if (provinceId != "00" && !city) {
                    $('#city_select').parent().hide();
                    $('#county_select').parent().hide();
                } else {
                    $('#city_select').parent().show();
                    $('#county_select').parent().show();
                }
                if (value == "00") {
                    $('#county_select').html('<option value="00">区(县)</option>');
                }
            }
        },
        changeCity: function (value) {

            var provinceId = $('#province_select').val();

            if (value && provinceId) {
                var countyList = this.getCounty(provinceId, value);
                if (countyList && countyList.length > 0) {
                    $('#county_select').html(this.render(countyList));
                } else {
                    $('#county_select').html('<option value="00">区(县)</option>');
                }
                if (provinceId != "00" && !countyList) {
                    $('#county_select').parent().hide();
                } else {
                    $('#county_select').parent().show();
                }

            }
            ;
        },
        changeCounty: function (value) {
        },
        addEventForArea: function () {
            var that = this;
            $('#province_select').change(function (e) {
                var value = this.value;
                that.changeProvince(value);
            });
            $('#city_select').change(function (e) {
                var value = this.value;
                that.changeCity(value);
            });
            $('#county_select').change(function (e) {
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

    function addAddress() {
        var province = $('#province_select').val(),
            city = $('#city_select').val(),
            county = $('#county_select').val();
        if (!province || province == '00') {
            util.drawToast('请选择省份');
            return;
        }
        if (!city || city == '00') {
            util.drawToast('请选择市');
            return;
        }
        if (!county || county == '00') {
            util.drawToast('请选择区(县)');
            return;
        }
        var detailAddress = $('#detail_address').val();
        if (!detailAddress) {
            util.drawToast('详细地址不能为空');
            return;
        }
        var regPost = /^[0-9][0-9]{5}$/;
        var postalcode = $('#postalcode').val();
        if (postalcode && !regPost.test(postalcode)) {
            util.drawToast('邮政编码格式错误');
            return;
        }
        var consignee = $('#consignee').val();
        if (consignee.length > 20 || consignee.length <= 0) {
            util.drawToast('收货人长度不超过20个字符,且不为空');
            return;
        }

        var phone = $('#phone').val();
        var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
        var mobileResult = regMobile.test(phone);
        if (mobileResult == false) {
            util.drawToast('手机号有误,请重新输入');
            return;
        }
    }

    $(document).ready(function () {
        Area.init();
        Area.addEventForArea();
        $('.submit-btn').on('click', function() {
            addAddress();
        });
    });
})();



