webpackJsonp([14],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function(){
	    var md5=__webpack_require__(5);
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    var util = __webpack_require__(1);
	    var token = cookie.getCookieValue('token');

	    var toUrl = util.getLinkey('state');

	    console.log(toUrl)


	    var isLogin = cookie.getCookieValue('isLogin');
	    if(toUrl=='user-detail'){
	        if(!isLogin){
	            window.location.href='/login?state=user-detail';
	        }else{
	            var menuV = util.getLinkey('menu');
	            if(menuV=="1"){
	                cookie.setCookie("flag", "0", 4, "/");
	            }
	            var flag = cookie.getCookieValue('flag');
	            if(flag=="0"){
	                cookie.setCookie("flag", "1", 4, "/");
	                window.location.assign('/user-detail?state=user-detail&token=' + token);
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
	            if(sexTxt == ''){
	                sexTxt == "0" ? $('#sex').text('女生') : $('#sex').text('男生');
	            }else{
	                $('#sex').text('');
	            }
	            var subjectTypeTxt = personListData.subjectType;
	            if(subjectTypeTxt){
	                subjectTypeTxt == "0" ? $('#subject').text('文史') : $('#subject').text('理工');
	            }else{
	                $('#subject').text('');
	            }


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



/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	/*
	 * url配置文件
	 * */
	var BASE_URL = 'http://s1.service.zhigaokao.cn'; //正式
	//var BASE_URL = 'http://10.136.21.171:8080';  //正式环境
	//var BASE_URL = 'http://10.136.13.233:8080';  //测试环境
	//var BASE_URL = 'http://172.16.160.31:8080';  //小文本地
	//var BASE_URL = 'http://172.16.160.72:8089';  //左浩本地
	//var BASE_URL2 = 'http://10.254.130.33:8080';  //测试环境(智能填报)
	//var BASE_URL = 'http://10.136.56.195:8080';  //开发环境
	//var BASE_URL = 'http://172.16.180.150:8086';  //yyp
	//var BASE_URL = 'http://127.0.0.1:8080';


	var interfaceUrl = {
	    /*
	     * ==================================================
	     * new  interface
	     * ==================================================
	     * */
	    getCaptchaImg: 'user/getUserProfile',//分享二维码


	    /**
	     * 在线购买初始化
	     */
	    getBuyInfo: '/order/getBuyInfo',
	    /**
	     * 确认订单
	     */
	    commitOrder: '/order/commitOrder',
	    /**
	     * 订单支付
	     */
	    payOrder: '/pay/payOrder',
	    /**
	     * 获取订单列表
	     */
	    getUserOrderList: '/order/getUserOrderList',
	    /**
	     * 获取openId
	     */
	    getOpenId: '/pay/getOpenId',
	    /*
	     * 高考咨询
	     * */
	    getGkTopList: BASE_URL + '/gkhot/getGkHotList.do', //头条1
	    getGkHotList: BASE_URL + '/gkhot/getGkHotList.do?type=0',//热点0
	    getGkHotInfo: BASE_URL + '/gkhot/getGkHotInfo.do',      //咨询详情


	    /*
	     * 高考日程
	     * */
	    getScheduleList: BASE_URL + '/schedule/getScheduleList.do', //  高考日程列表
	    getScheduleInfo: BASE_URL + '/schedule/getScheduleInfo.do', //  高考日程详情


	    /*
	     * 政策解读|招办电话
	     * */
	    getPolicyList: BASE_URL + '/policy/getPolicyList.do',//获取政策解读摘要列表
	    getPolicyInfo: BASE_URL + '/policy/getPolicyInfo.do',//根据主键获取政策解读详情
	    getGkTelList: BASE_URL + '/phone/getGkPhoneList.do',//获取招办电话列表

	    /*
	     * 院校信息
	     * */
	    getProvinceList: BASE_URL + '/university/getRemoteProvinceList.do',   // 省份
	    getCollegeList: BASE_URL + '/university/getRemoteDataDictList.do',   // 院校分类type=PROPERTY（院校分类）|type=EDULEVEL（学历层次）|type=FEATURE（院校特征）| type=BATCHTYPE(院校批次)
	    getSearchList: BASE_URL + '/university/getRemoteUniversityList.do',  // 院校信息(筛选)查询
	    getSchoolDetail: BASE_URL + '/university/getRemoteUniversityById.do', //院校信息详情?universityId=51
	    getOpenProfessional: BASE_URL + '/university/getRemoteUniversityMajorListByUniversityId.do',//开设专业
	    getRemoteDataDictList: BASE_URL + '/university/getRemoteDataDictList.do?type=UNIVERSITY_MAJOR_TYPE',
	    getUniversityMajorEnrollingPlanList: BASE_URL + '/university/getUniversityMajorEnrollingPlanList.do',//院校招生计划列表
	    getQueryUniversityPlanChart: BASE_URL + '/university/queryUniversityPlanChart.do',//院校招生计划图标展示(暂时只有2015年数据)
	    queryUniversityEnrollingChartList: BASE_URL + '/university/queryUniversityEnrollingChart.do',//录取情况 (院校录取详情)
	    getUniversityMajorEnrollingSituationList: BASE_URL + '/university/getUniversityMajorEnrollingSituationList.do',//录取情况 (院校专业录取详情)


	    /*
	     * 收藏
	     * */
	    getUserCollectList: BASE_URL + '/userCollection/getUserCollectList.do',   // 收藏列表
	    saveUserCollect: BASE_URL + '/userCollection/saveUserCollect.do',//添加收藏
	    deleteUserCollect: BASE_URL + '/userCollection/deleteUserCollect.do',//取消收藏
	    getIsUniversityCollect: BASE_URL + '/userCollection/isUniversityCollect.do',//判断是否已收藏 1已收藏,0未收藏


	    /*
	     * 院校招生信息
	     * */
	    getAdmissionline: BASE_URL + '/admissionline/getYears.do', //院校招生年份
	    getLineList: BASE_URL + '/admissionline/getGkAdmissionLineList.do',//招生分数线

	    /*
	     * 登录|注册
	     * */
	    postLogin: '/login/login',   // 登录
	    postRegisterLogin: BASE_URL + '/register/account.do',   // 注册
	    postConfirmAccountCode: '/register/confirmAccount',  // 确认是否注册
	    postVerificationCode: '/captcha/captcha',   // 获取手机验证码
	    postRetrievePassword: '/register/retrievePassword',   // 获取手机验证码


	    /**
	     * 提交个人设置中心
	     */
	    postUpdateUserInfo: BASE_URL + '/info/updateUserInfo.do',   // 获取手机验证码

	    /*
	     * 在线互动
	     * */
	    getOnlineInteractive: BASE_URL + '/question/newQuestion.do',//在线互动?startSize=0&endSize=10
	    getOnlineHot: BASE_URL + '/question/hotQuestion.do',//热门解答?startSize=0&endSize=10
	    getQuestionDetail: BASE_URL + '/question/questionDetail.do',//问题详情?id=3356

	    /*
	     * 评测
	     * */
	    postQueryApeskUrl: BASE_URL + '/apesk/queryApeskUrl.do', //专家测评


	    /*
	     * 高考学堂
	     * */
	    getTeacherLectureList: BASE_URL + '/video/getGkVideoList.do',//获取高考学堂列表?isIgnore=&page=&rows=&type=
	    getMentalityList: BASE_URL + '/video/getGkVideoList.do',//获取心理讲堂列表?isIgnore=&page=&rows=&type=
	    getVolunteerForumList: BASE_URL + '/video/getGkVideoList.do',//获取志愿讲堂列表?isIgnore=&page=&rows=&type=
	    getRecommendList: BASE_URL + '/video/getGkVideoList.do',//获取推荐学习列表?isIgnore=&page=&rows=&type=


	    /*
	     * 用户信息
	     *
	     * */
	    getAllRegion: BASE_URL + '/region/getAllRegion.do', //省市区
	    getUserInfo: BASE_URL + '/info/getUserInfo.do', //获取用户信息


	    /*
	     * 高考学堂
	     * */
	    getVideoDetail: BASE_URL + '/video/getGkVideoInfo.do',//根据id获取视屏详情
	    postHitInCount: BASE_URL + '/video/hitInc.do', //视屏访问量?id=
	    postUserVideoCollect: BASE_URL + '/userCollection/saveUserCollect.do?type=2', //视屏收藏添加 id

	    /*
	     * 高考词条
	     * */
	    getGkEntryList: BASE_URL + '/entry/getGkEntryList.do',//获取高考词条列表page：页rows:条
	    getGkEntryInfo: BASE_URL + '/entry/getGkEntryInfo.do',//根据主键获取高考词条详情  id

	    //getMapData:'../../mock/zgk-data.json'//智高考首页map地图数据


	    /**
	     * 职业信息
	     */
	    getProfessionalList: BASE_URL + '/professional/getProfessionalList.do',//获取职业列表
	    getProfessionalInfo: BASE_URL + '/professional/getProfessionalInfo.do',//获取职业详情
	    getProfessionCategory: BASE_URL + '/professional/getProfessionCategory.do',//获取职业分类


	    /**
	     * 志愿填报
	     */
	    getPredictProbability: BASE_URL + '/predict/predictProbability.do',// 录取难易预测
	    getPredictSchoolList: BASE_URL + '/predict/predictSchoolList.do',// 录取难易预测
	    getTallyPredictProbability: BASE_URL + '/predict/tallyPredictProbability.do',// 目标定位
	    getPredictResults: BASE_URL + '/predict/predictResults.do',// 获取定位结果页


	    /**
	     * VIP
	     */
	    getFindProduct: BASE_URL + '/product/findProduct.do',// 获取商品信息
	    getCreateOrders: BASE_URL + '/orders/createOrders.do',// 创建订单
	    getAccount: BASE_URL + '/vip/getAccount.do',// 获取VIP账户
	    upgradeVipByCard: BASE_URL + '/vip/upgradeVipByCard.do', // 升级VIP


	    /**
	     * 专业信息
	     */
	    getMajoredCategory: BASE_URL + '/majored/getMajoredCategory.do',// 专业门类查询
	    getMajoredCategoryById: BASE_URL + '/majored/getCategoryMajoredList.do',// 单个门类查询
	    getMajoredInfoById: BASE_URL + '/majored/getMajoredInfoById.do',// 专业详情
	    getMajorOpenUniversityList: BASE_URL + '/majored/getMajorOpenUniversityList.do',// 开设院校
	    getMajoredByName: BASE_URL + '/majored/getMajoredByName.do',// 搜索


	    /**
	     * 用户定位
	     */
	    postAddFrecast: BASE_URL + '/forecast/addFrecast.do',// 保存定位
	    getPerformanceDetail: BASE_URL + '/forecast/getPerformanceDetail.do',// 获取当前用户的成绩明细
	    getLastoFrecast: BASE_URL + '/forecast/getLastoFrecast.do',// /forecast/getLastoFrecast.do//获取最后一次目标定位结果
	    getFormerYearsAdmission: BASE_URL + '/forecast/getFormerYearsAdmission.do',// /forecast/getLastoFrecast.do

	    /**
	     * 地区批次线
	     */
	    getGkAreaBatchInfo: BASE_URL + '/areabatch/getGkAreaBatchInfo.do',// 地区批次线


	    postModifyPassword: BASE_URL + '/info/modifyPassword.do',// 修改密码


	    /**
	     * 智能填报
	     */
	    getVolunteerReport: BASE_URL + '/report/get/batch.do', // 智能填报
	    getVolunteerSchool: BASE_URL + '/report/main.do', // 院校清单
	    getSpecialty: BASE_URL + '/report/get/specialty.do', // 获取专业信息
	    volunteerSave: BASE_URL + '/report/save.do', // 保存志愿填报
	    getVolunteerFinalInfo: BASE_URL + '/report/get/info.do', // 志愿报告结果页


	    /**
	     *
	     */

	    getSplitPriceInfo: '/getSplitPriceInfo',



	    /**
	     * 微信分享获取jsapi_ticket
	     */
	    getAccessToken : '/pay/getAccessToken'


	};


	module.exports = interfaceUrl;


/***/ },
/* 4 */,
/* 5 */
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


/***/ }
]);