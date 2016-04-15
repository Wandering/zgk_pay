webpackJsonp([16],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);
	(function() {
	    $('#header-menu').show();
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    var util = __webpack_require__(1);
	    var token = cookie.getCookieValue('token');
	    var toUrl = util.getLinkey('state');
	    var isLogin = cookie.getCookieValue('isLogin');
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
	        $.get(interfaceUrl.getOpenId,{code: code},function(res){
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

	    var openId = cookie.getCookieValue('openId');
	    if(toUrl=='vip-buy'){
	        if(!isLogin){
	            window.location.href='/login?state=vip-buy';
	        }else{
	            var menuV = util.getLinkey('menu');
	            if(menuV=="1"){
	                cookie.setCookie("flag", "0", 4, "/");
	            }
	            var flag = cookie.getCookieValue('flag');
	            if(flag=="0"){
	                cookie.setCookie("flag", "1", 4, "/");
	                window.location.assign('vip-buy?state=vip-buy&token=' + token + "&code="+getQueryObject(window.location.href).code);
	            }
	            if(flag=="1"){
	                if (isWeiXin()) {
	                    alert('存在openId')
	                    if(!openId){
	                        var obj = getQueryObject(window.location.href);
	                        cookie.setCookie("code", obj.code, 4, "/");
	                        alert(obj.code)
	                        getOpenId(obj.code);
	                    }
	                }
	            }
	        }
	    }









	    /**
	     * 在线购买初始化
	     */
	    function getOrderInfo() {
	        util.ajaxFun(interfaceUrl.getBuyInfo, 'POST', {
	            userId: cookie.getCookieValue('userId') || 13
	        }, function (res) {
	            if (res.rtnCode == '0000000') {
	                $('#price').html('价格：' + res.bizData.salePrice + '元');
	                $('#price').attr('data-price', res.bizData.salePrice);
	            }
	        })
	    }
	    /**
	     * 订单确定
	     */
	    function commitOrder() {
	        util.ajaxFun(interfaceUrl.commitOrder, 'POST', {
	            userId: cookie.getCookieValue('userId') || '13',
	            price: $('#price').attr('data-price') || '200'
	        }, function (res) {
	            if (res.rtnCode == '0000000') {
	                var department = res.bizData.department;
	                $('#orderNo').html('订单ID：' + res.bizData.orderNo);
	                $('#orderNo').attr('orderNo', res.bizData.orderNo);
	                $('#order_time').html('订单创建日期：' + department.createDateAsDate);
	                $('#service_price').html('服务价格：' + department.salePrice + '元');
	                $('#pay_price').html('应付费用：' + department.salePrice  + '元');
	                $('#pay_price').attr('data-price', department.salePrice);
	                $.pgwModal({
	                   title: '订单确认',
	                   content: $('.modal').html()
	                });
	                $('.confirm-btn').off('click');
	                $('.confirm-btn').click(function(){
	                    payOrder();
	                });
	            }
	        })
	    }

	    function orderPayStatus(msg) {
	        util.drawToast(msg);
	        setTimeout(function() {
	            window.location.href = '/order?state=order';
	        }, 1000);
	    }



	    /**
	     * 支付
	     */
	    //var orderFlag = false;
	    function payOrder() {
	        //if (orderFlag) {
	        //    return;
	        //}
	        //orderFlag = true;
	        $('#confirm-btn').html('正在支付...');
	        var amount = parseFloat($('#pay_price').attr('data-price') || '200');
	        var openId = cookie.getCookieValue('openId');

	        var channel = 'wx_pub';
	        if (!isWeiXin()) {
	            channel = 'alipay_wap';
	        }



	        //util.ajaxFun(interfaceUrl.payOrder+'?token='+token, 'POST', {
	        util.ajaxFun(interfaceUrl.payOrder, 'POST', {
	            orderNo: $('#orderNo').attr('orderNo'),
	            userId: cookie.getCookieValue('userId'),
	            amount: amount,
	            channel: channel,
	            openId: openId
	        }, function (res) {
	            //orderFlag = false;
	            $('#confirm-btn').html('确认支付');
	            $.pgwModal('close');
	            if (res.rtnCode == '0000000') {
	                var charge = res.bizData;
	                charge.credential = JSON.parse(charge.credential);
	                pingpp.createPayment(charge, function(result, error){
	                    if (result == "success") {
	                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
	                        orderPayStatus('支付成功');
	                    } else if (result == "fail") {
	                        // charge 不正确或者微信公众账号支付失败时会在此处返回
	                        orderPayStatus('支付失败');
	                    } else if (result == "cancel") {
	                        // 微信公众账号支付取消支付
	                        orderPayStatus('已取消支付');
	                    }
	                });
	            } else {
	                orderPayStatus('支付失败');
	            }
	        })
	    }

	    $(document).ready(function() {
	        $('#header-title').text('在线购买');

	        getOrderInfo();

	        $('.vip-buy-btn').on('click', function() {
	            commitOrder();
	        });

	    });

	})();

/***/ },

/***/ 3:
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

/***/ 11:
/***/ function(module, exports) {

	/**
	 * PgwModal - Version 2.0
	 *
	 * Copyright 2014, Jonathan M. Piat
	 * http://pgwjs.com - http://pagawa.com
	 * 
	 * Released under the GNU GPLv3 license - http://opensource.org/licenses/gpl-3.0
	 */
	(function(a){a.pgwModal=function(i){var c={};var g={mainClassName:"pgwModal",backdropClassName:"pgwModalBackdrop",maxWidth:500,titleBar:true,closable:true,closeOnEscape:true,closeOnBackgroundClick:true,closeContent:'<span class="pm-icon"></span>',loadingContent:"Loading in progress...",errorContent:"An error has occured. Please try again in a few moments."};if(typeof window.pgwModalObject!="undefined"){c=window.pgwModalObject}if((typeof i=="object")&&(!i.pushContent)){if(!i.url&&!i.target&&!i.content){throw new Error('PgwModal - There is no content to display, please provide a config parameter : "url", "target" or "content"')}c.config={};c.config=a.extend({},g,i);window.pgwModalObject=c}var k=function(){var o='<div id="pgwModalBackdrop"></div><div id="pgwModal"><div class="pm-container"><div class="pm-body"><span class="pm-close"></span><div class="pm-title"></div><div class="pm-content"></div></div></div></div>';a("body").append(o);a(document).trigger("PgwModal::Create");return true};var l=function(){a("#pgwModal .pm-title, #pgwModal .pm-content").html("");a("#pgwModal .pm-close").html("").unbind("click");return true};var f=function(){angular.element('body').injector().invoke(function($compile){var scope=angular.element($('#pgwModal .pm-content')).scope();$compile($('#pgwModal .pm-content'))(scope);scope.$digest()});return true};var d=function(o){a("#pgwModal .pm-content").html(o);if(c.config.angular){f()}m();a(document).trigger("PgwModal::PushContent");return true};var m=function(){a("#pgwModal, #pgwModalBackdrop").show();var q=a(window).height();var o=a("#pgwModal .pm-body").height();var p=Math.round((q-o)/3);if(p<=0){p=0}a("#pgwModal .pm-body").css("margin-top",p);return true};var h=function(){return c.config.modalData};var e=function(){var o=a('<div style="width:50px;height:50px;overflow:auto"><div></div></div>').appendTo("body");var q=o.children();if(typeof q.innerWidth!="function"){return 0}var p=q.innerWidth()-q.height(90).innerWidth();o.remove();return p};var b=function(){return a("body").hasClass("pgwModalOpen")};var n=function(){a("#pgwModal, #pgwModalBackdrop").removeClass().hide();a("body").css("padding-right","").removeClass("pgwModalOpen");l();a(window).unbind("resize.PgwModal");a(document).unbind("keyup.PgwModal");a("#pgwModal").unbind("click.PgwModalBackdrop");try{delete window.pgwModalObject}catch(o){window.pgwModalObject=undefined}a(document).trigger("PgwModal::Close");return true};var j=function(){if(a("#pgwModal").length==0){k()}else{l()}a("#pgwModal").removeClass().addClass(c.config.mainClassName);a("#pgwModalBackdrop").removeClass().addClass(c.config.backdropClassName);if(!c.config.closable){a("#pgwModal .pm-close").html("").unbind("click").hide()}else{a("#pgwModal .pm-close").html(c.config.closeContent).click(function(){n()}).show()}if(!c.config.titleBar){a("#pgwModal .pm-title").hide()}else{a("#pgwModal .pm-title").show()}if(c.config.title){a("#pgwModal .pm-title").text(c.config.title)}if(c.config.maxWidth){a("#pgwModal .pm-body").css("max-width",c.config.maxWidth)}if(c.config.url){if(c.config.loadingContent){a("#pgwModal .pm-content").html(c.config.loadingContent)}var o={url:i.url,success:function(q){d(q)},error:function(){a("#pgwModal .pm-content").html(c.config.errorContent)}};if(c.config.ajaxOptions){o=a.extend({},o,c.config.ajaxOptions)}a.ajax(o)}else{if(c.config.target){d(a(c.config.target).html())}else{if(c.config.content){d(c.config.content)}}}if(c.config.closeOnEscape&&c.config.closable){a(document).bind("keyup.PgwModal",function(q){if(q.keyCode==27){n()}})}if(c.config.closeOnBackgroundClick&&c.config.closable){a("#pgwModal").bind("click.PgwModalBackdrop",function(s){var r=a(s.target).hasClass("pm-container");var q=a(s.target).attr("id");if(r||q=="pgwModal"){n()}})}a("body").addClass("pgwModalOpen");var p=e();if(p>0){a("body").css("padding-right",p)}a(window).bind("resize.PgwModal",function(){m()});a(document).trigger("PgwModal::Open");return true};if((typeof i=="string")&&(i=="close")){return n()}else{if((typeof i=="string")&&(i=="reposition")){return m()}else{if((typeof i=="string")&&(i=="getData")){return h()}else{if((typeof i=="string")&&(i=="isOpen")){return b()}else{if((typeof i=="object")&&(i.pushContent)){return d(i.pushContent)}else{if(typeof i=="object"){return j()}}}}}}}})(window.Zepto||window.jQuery);


/***/ }

});