webpackJsonp([5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by kepeng on 16/3/31.
	 */
	(function() {

	    var util = __webpack_require__(1);
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    $('#header-title').text('修改个人信息');
	    $('#header-back').show().on('click',function(){
	        window.location.assign('/user-detail');
	    });

	    util.ajaxFun(interfaceUrl.getUserInfo, 'GET', {}, function (res) {
	        console.log(res)
	        if (res.rtnCode == '0000000') {
	            var personListData = res.bizData;
	            $('#name').val(personListData.name);
	            $('#school_name').val(personListData.schoolName);
	            $('#email').val(personListData.mail);
	            var sexTxt = personListData.sex;
	            $('.sex').removeClass('active');
	            $('.sex[data-value="'+ sexTxt +'"]').addClass('active');
	            var subjectTxt = personListData.subjectType;
	            $('.subject').removeClass('active');
	            $('.subject[data-value="'+ subjectTxt +'"]').addClass('active');


	        }
	    });







	    function initUserInfo() {
	        var avatar = cookie.getCookieValue('avatar');
	        if (!avatar) avatar = '/static/dist/img/icons/avatar.png';
	        $('#avatar-img').attr('src', avatar);

	        var userName = cookie.getCookieValue('userName');
	        $('#name').text(userName || '');

	        var schoolName = cookie.getCookieValue('schoolName');
	        $('#school_name').text(schoolName || '');

	        var sexType = cookie.getCookieValue('sexType');

	        var subjectType = cookie.getCookieValue('subjectType');

	        $('.sex[data-value="' + (sexType || 1) + '"]').addClass('active');
	        $('.subject[data-value="' + (subjectType || 1) + '"]').addClass('active');


	        var email = cookie.getCookieValue('email');
	        $('#email').text(email || '');
	    }
	    $(document).ready(function() {
	        initUserInfo();
	        //清除input里面的值
	        $('.clear').on('click', function() {
	            $(this).parent().find('input').val('');
	        });
	        $('.sex, .subject').on('click', function() {
	            $(this).addClass('active');
	            $(this).siblings().removeClass('active');
	        });
	        //修改提交
	        $('.submit-btn').on('click', function() {
	            var name = $.trim($('#name').val()),//姓名
	                sex = $('.sex.active').attr('data-value'),//性别
	                school = $.trim($('#school_name').val()), //学校名字
	                subject = $('.subject.active').attr('data-value'),//科目选择
	                email = $.trim($('#email').val()),//邮箱
	                birthdayDate = cookie.getCookieValue('birthdayDate'),
	                qq = cookie.getCookieValue('qq');
	            if (name.length == 0) {
	                util.drawToast('用户名不能为空');
	                return false;
	            }
	            if (name.length > 10) {
	                util.drawToast('用户名不能大于10个字');
	                return false;
	            }
	            if (school.length == 0) {
	                util.drawToast('学校名不能为空');
	                return false;
	            }
	            if (school.length > 20) {
	                util.drawToast('学校名不能大于20个字');
	                return false;
	            }
	            var img_url = $('#avatar-img').attr('src');
	            var provinceId = cookie.getCookieValue('province'),
	                cityId = cookie.getCookieValue('city'),
	                countyId = cookie.getCookieValue('county');
	            util.ajaxFun(interfaceUrl.postUpdateUserInfo, 'POST', {
	                name: name,
	                provinceId: provinceId,
	                cityId: cityId,
	                countyId: countyId,
	                schoolName: school,
	                sex: sex,
	                birthdayDate: birthdayDate || "0",
	                subjectType: subject,
	                mail: email,
	                icon: img_url,
	                qq: qq
	            }, function (res) {
	                if (res.rtnCode == '0000000') {
	                    util.drawToast('信息更新成功');
	                    window.location.href = "/user-detail";
	                } else {
	                    util.drawToast(res.msg || '信息更新失败');
	                }
	            });

	        });
	    });






	})();


/***/ }
]);