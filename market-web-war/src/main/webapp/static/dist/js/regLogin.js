webpackJsonp([9],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	// 切换
	__webpack_require__(7);

	// 登录
	__webpack_require__(8);

	// 注册
	__webpack_require__(9);




/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

		/**
		 * jQuery MD5 hash algorithm function
		 * 
		 * 	<code>
		 * 		Calculate the md5 hash of a String 
		 * 		String $.md5 ( String str )
		 * 	</code>
		 * 
		 * Calculates the MD5 hash of str using the » RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash. 
		 * MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data.
		 * MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1.
		 * This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
		 * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
		 * 
		 * Example
		 * 	Code
		 * 		<code>
		 * 			$.md5("I'm Persian."); 
		 * 		</code>
		 * 	Result
		 * 		<code>
		 * 			"b8c901d0f02223f9761016cfff9d68df"
		 * 		</code>
		 * 
		 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
		 * @link http://www.semnanweb.com/jquery-plugin/md5.html
		 * @see http://www.webtoolkit.info/
		 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
		 * @param {jQuery} {md5:function(string))
		 * @return string
		 */
		(function($){
			var rotateLeft = function(lValue, iShiftBits) {
				return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
			}
			var addUnsigned = function(lX, lY) {
				var lX4, lY4, lX8, lY8, lResult;
				lX8 = (lX & 0x80000000);
				lY8 = (lY & 0x80000000);
				lX4 = (lX & 0x40000000);
				lY4 = (lY & 0x40000000);
				lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
				if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
				if (lX4 | lY4) {
					if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
					else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ lX8 ^ lY8);
				}
			}
			var F = function(x, y, z) {
				return (x & y) | ((~ x) & z);
			}
			var G = function(x, y, z) {
				return (x & z) | (y & (~ z));
			}
			var H = function(x, y, z) {
				return (x ^ y ^ z);
			}
			var I = function(x, y, z) {
				return (y ^ (x | (~ z)));
			}
			var FF = function(a, b, c, d, x, s, ac) {
				a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
				return addUnsigned(rotateLeft(a, s), b);
			};
			var GG = function(a, b, c, d, x, s, ac) {
				a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
				return addUnsigned(rotateLeft(a, s), b);
			};
			var HH = function(a, b, c, d, x, s, ac) {
				a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
				return addUnsigned(rotateLeft(a, s), b);
			};
			var II = function(a, b, c, d, x, s, ac) {
				a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
				return addUnsigned(rotateLeft(a, s), b);
			};
			var convertToWordArray = function(string) {
				var lWordCount;
				var lMessageLength = string.length;
				var lNumberOfWordsTempOne = lMessageLength + 8;
				var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
				var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
				var lWordArray = Array(lNumberOfWords - 1);
				var lBytePosition = 0;
				var lByteCount = 0;
				while (lByteCount < lMessageLength) {
					lWordCount = (lByteCount - (lByteCount % 4)) / 4;
					lBytePosition = (lByteCount % 4) * 8;
					lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
					lByteCount++;
				}
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
				lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
				lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
				return lWordArray;
			};
			var wordToHex = function(lValue) {
				var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
				for (lCount = 0; lCount <= 3; lCount++) {
					lByte = (lValue >>> (lCount * 8)) & 255;
					WordToHexValueTemp = "0" + lByte.toString(16);
					WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
				}
				return WordToHexValue;
			};
			var uTF8Encode = function(string) {
				string = string.replace(/\x0d\x0a/g, "\x0a");
				var output = "";
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						output += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						output += String.fromCharCode((c >> 6) | 192);
						output += String.fromCharCode((c & 63) | 128);
					} else {
						output += String.fromCharCode((c >> 12) | 224);
						output += String.fromCharCode(((c >> 6) & 63) | 128);
						output += String.fromCharCode((c & 63) | 128);
					}
				}
				return output;
			};
			$.extend({
				md5: function(string) {
					var x = Array();
					var k, AA, BB, CC, DD, a, b, c, d;
					var S11=7, S12=12, S13=17, S14=22;
					var S21=5, S22=9 , S23=14, S24=20;
					var S31=4, S32=11, S33=16, S34=23;
					var S41=6, S42=10, S43=15, S44=21;
					string = uTF8Encode(string);
					x = convertToWordArray(string);
					a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
					for (k = 0; k < x.length; k += 16) {
						AA = a; BB = b; CC = c; DD = d;
						a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
						d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
						c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
						b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
						a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
						d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
						c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
						b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
						a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
						d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
						c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
						b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
						a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
						d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
						c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
						b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
						a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
						d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
						c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
						b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
						a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
						d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
						c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
						b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
						a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
						d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
						c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
						b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
						a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
						d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
						c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
						b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
						a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
						d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
						c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
						b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
						a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
						d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
						c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
						b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
						a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
						d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
						c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
						b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
						a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
						d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
						c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
						b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
						a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
						d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
						c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
						b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
						a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
						d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
						c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
						b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
						a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
						d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
						c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
						b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
						a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
						d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
						c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
						b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
						a = addUnsigned(a, AA);
						b = addUnsigned(b, BB);
						c = addUnsigned(c, CC);
						d = addUnsigned(d, DD);
					}
					var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
					return tempValue.toLowerCase();
				}
			});
		})(jQuery);


/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	var UI ={
	    $tabContent:$('.tab-content')
	};

	$('#header-menu').show();
	$('.tab-list').on('click','.tab', function(){
	    $(this).addClass('active').siblings().removeClass('active');
	    $('#header-title').text($(this).text());
	    var index = $(this).index();
	    UI.$tabContent.removeClass('active').eq(index).addClass('active');
	});
	$('.tab-list .tab').eq(0).click();






/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var util=__webpack_require__(1);
	var cookie=__webpack_require__(2);
	var md5=__webpack_require__(4);
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
	            util.ajaxFun('/login/login', 'GET', {
	                account: loginPhoneV,
	                password: md5loginPwdV
	            }, function (res) {
	                console.log(res)
	                if (res.rtnCode === "0000000") {
	                    var token = res.bizData.token;  // token
	                    var userId = res.bizData.userInfo.id;  // userId
	                    var userName = res.bizData.userInfo.name; // 用户名称
	                    var vipStatus = res.bizData.userInfo.vipStatus; // VIP状态
	                    var phone = res.bizData.userInfo.account; // 用户账号
	                    var userKey = res.bizData.userInfo.userKey; // 省份userKey
	                    var province = res.bizData.userInfo.proName; // 选择省份
	                    var city = res.bizData.userInfo.cityName; // 选择城市
	                    var county = res.bizData.userInfo.countyName; // 选择县区
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
	                    cookie.setCookie("province",province, 4, "/");
	                    cookie.setCookie("city",city, 4, "/");
	                    cookie.setCookie("county",county, 4, "/");
	                    cookie.setCookie("qrcodeUrl",qrcodeUrl, 4, "/");
	                    cookie.setCookie("isReported",isReported, 4, "/");
	                    cookie.setCookie("isSurvey",isSurvey, 4, "/");
	                    var url = 'http://' + domain +'/user-detail';
	                    url = encodeURIComponent(url);
	                    var rUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx552f3800df25e964&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=' + $.trim(userKey) + '#wechat_redirect';
	                    window.location.href = rUrl;
	                    //window.location.assign('http://' + $.trim(userKey) + '.'+ domain +'/user-detail');
	                } else {
	                    util.drawToast(res.msg);
	                }
	            });
	        });
	    });

















/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1);
	var cookie = __webpack_require__(2);
	var md5 = __webpack_require__(4);
	var urlConfig = __webpack_require__(3);

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
	                    var city = res.bizData.userInfo.city; // 选择城市
	                    var county = res.bizData.userInfo.county; // 选择县区
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
	                    cookie.setCookie("province",province, 4, "/");
	                    cookie.setCookie("city",city, 4, "/");
	                    cookie.setCookie("county",county, 4, "/");
	                    cookie.setCookie("qrcodeUrl",qrcodeUrl, 4, "/");
	                    cookie.setCookie("isReported",isReported, 4, "/");
	                    cookie.setCookie("isSurvey",isSurvey, 4, "/");
	                    window.location.assign('http://' + $.trim(userKey) + '.' + domain + '/user-detail');
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


/***/ }
]);