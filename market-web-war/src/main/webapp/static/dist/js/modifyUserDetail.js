/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * Created by kepeng on 16/3/31.
	 */
	(function() {

	    function initUserInfo() {
	        //获取用户信息
	        util.ajaxFun(util.INTERFACE_URL.getUserInfo, 'GET', {}, function (res) {
	            if (res.rtnCode == '0000000') {
	                var personListData = res.bizData;
	                var avatar = '';
	                var imgIco = '/static/dist/img/icons/avatar.png';
	                if (personListData.icon == '' || personListData.icon == null) {
	                    avatar = imgIco;
	                } else {
	                    avatar = personListData.icon
	                }
	                $('#name').val(personListData.name);
	                $('#avatar-img').attr('src', avatar);
	                $('#school_name').val(personListData.schoolName);
	                $('#email').val(personListData.mail);
	                $('.subject[data-value="' + personListData.sex + '"]').addClass('active');
	                $('.subject[data-value="' + personListData.subjectType + '"]').addClass('active');
	                $('#user-birthday').val(personListData.birthdayDate ? timeFormat(personListData.birthdayDate, 'yyyy-MM-dd') : '1970-01-01');
	                $('#user-qq').val(personListData.qq);
	            }
	        });
	    }

	    $(document).ready(function() {

	        initUserInfo();

	        //清除input里面的值
	        $('.clear').on('click', function() {
	            $(this).parent().find('input').val('');
	        });

	        //修改提交
	        $('.submit-btn').on('click', function() {

	            var name = $.trim($('#name').val()),//姓名
	                sex = $('.sex.active').attr('data-value'),//性别
	                school = $.trim($('#school_name').val()), //学校名字
	                subject = $('.subject.active').attr('data-value'),//科目选择
	                email = $.trim($('#email').val()),//邮箱
	                birthdayDate = $('#user-birthday').val(),
	                qq = $('#user-qq').val();

	            if (name.length == 0) {
	                util.toast('用户名不能为空');
	                return false;
	            }
	            if (name.length > 10) {
	                util.toast('用户名不能大于10个字');
	                return false;
	            }
	            if (school.length == 0) {
	                util.toast('学校名不能为空');
	                return false;
	            }
	            if (school.length > 20) {
	                util.toast('学校名不能大于20个字');
	                return false;
	            }

	            var img_url = $('#avatar-img').attr('src');

	            var provinceId = $('#province').val(),
	                cityId = $('#city').val(),
	                countyId = $('#county').val();
	            util.ajaxFun(util.INTERFACE_URL.postUpdateUserInfo, 'POST', {
	                name: name,
	                provinceId: provinceId,
	                cityId: cityId,
	                countyId: countyId,
	                schoolName: school,
	                sex: sex,
	                birthdayDate: birthdayDate,
	                subjectType: subject,
	                mail: email,
	                icon: img_url,
	                qq: qq
	            }, function (res) {
	                console.log(res)
	                if (res.rtnCode == '0000000') {
	                    util.toast('信息更新成功');
	                    window.location.href = "/user-account-info.html";
	                } else {
	                    util.toast(res.msg);
	                }
	            });

	        });
	    });

	})();


/***/ }
/******/ ]);