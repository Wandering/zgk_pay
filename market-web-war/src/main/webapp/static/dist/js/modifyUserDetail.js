webpackJsonp([10],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by kepeng on 16/3/31.
	 */
	(function () {

	    var util = __webpack_require__(1);
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    $('#header-title').text('修改个人信息');

	    var token = cookie.getCookieValue('token');

	    $('#header-back').show().on('click', function () {
	        window.location.assign('user-detail?state=user-detail&menu=1');
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
	            $('.sex[data-value="' + sexTxt + '"]').addClass('active');
	            var subjectTxt = personListData.subjectType;
	            $('.subject').removeClass('active');
	            $('.subject[data-value="' + subjectTxt + '"]').addClass('active');
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

	    $(document).ready(function () {
	        initUserInfo();
	        //清除input里面的值
	        $('.clear').on('click', function () {
	            $(this).parent().find('input').val('');
	        });
	        $('.sex, .subject').on('click', function () {
	            $(this).addClass('active');
	            $(this).siblings().removeClass('active');
	        });
	        //修改提交
	        $('.submit-btn').on('click', function () {
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
	            if (name.length > 14) {
	                util.drawToast('用户名不能大于14个字');
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
	            var img_url = $('#uploadify_img').val() || $('#avatar-img').attr('src');
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
	                    $('#userName').html(name);
	                    cookie.setCookie("avatar", $('#uploadify_img').val(), 4, "");
	                    cookie.setCookie("userName", name, 4, "");
	                    cookie.setCookie("sexType", sex, 4, "");
	                    cookie.setCookie("subjectType", subject, 4, "");
	                    util.drawToast('信息更新成功');
	                    window.location.href = "user-detail?state=user-detail&token="+token;
	                } else {
	                    util.drawToast(res.msg || '信息更新失败');
	                }
	            });

	        });


	        /***************************上传头像*************************************/

	        var timestamp = parseInt(new Date().getTime() / 1000);

	        var noncestr = 'U5iQqjfV123NT5du';

	        function getSign() {
	            $.ajaxSettings.async = false;
	            var signStr = '';
	            $.getJSON('/pay/getAccessToken', function (res) {
	                if (res.rtnCode == "0000000") {
	                    var ticket = res.bizData.ticket;
	                    var string1 = "jsapi_ticket=" + ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url="+window.location.href;

	                    var sign = CryptoJS.SHA1(string1);
	                    signStr = sign.toString();
	                }
	            })
	            $.ajaxSettings.async = true;
	            return signStr;
	        }
	        wx.config({
	            debug: false,
	            appId: 'wx552f3800df25e964',
	            timestamp: timestamp,
	            nonceStr: noncestr,
	            signature: getSign(),
	            jsApiList: [
	                'checkJsApi',
	                'chooseImage',
	                'uploadImage'
	            ]
	        });
	        wx.ready(function () {

	            wx.checkJsApi({
	                jsApiList: [
	                    'chooseImage'
	                ],
	                success: function (res) {
	                }
	            });
	            $('.upload-btn').click(function() {
	                var images = {
	                    localId: [],
	                    serverId: []
	                };
	                wx.chooseImage({
	                    count: 1,
	                    success: function (res) {
	                        //alert('已选择 ' + JSON.stringify(res) + ' 图片');
	                        images.localId = res.localIds
	                        if (images.localId.length == 0) {
	                            //alert('请先使用 chooseImage 接口选择图片');
	                            return;
	                        }
	                        var i = 0, length = images.localId.length;
	                        images.serverId = [];
	                        function upload() {
	                            wx.uploadImage({
	                                localId: images.localId[0],
	                                success: function (res) {
	                                    //alert(JSON.stringify(res));
	                                    //i++;
	                                    alert(res.serverId)
	                                    images.serverId.push(res.serverId);
	                                    util.ajaxFun(interfaceUrl.uploadifyUserImg, 'get', {
	                                        mediaId: res.serverId
	                                    }, function (res) {
	                                        alert(res.rtnCode)
	                                        if (res.rtnCode == '0000000') {
	                                            try {
	                                                $('#uploadify_img').val(res.bizData.bizData.file.fileUrl);
	                                                $('#avatar-img').attr('src', res.bizData.bizData.file.fileUrl);
	                                            } catch(e) {
	                                                util.drawToast('上传头像失败！');
	                                            }

	                                        } else {
	                                            util.drawToast('上传头像失败！');
	                                        }
	                                    });
	                                    //$('#avatar-img').attr('src', res.serverId);
	                                    //cookie.setCookie("avatar", res.serverId, 4, "");
	                                    //if (i < length) {
	                                    //    upload();
	                                    //}
	                                },
	                                fail: function (res) {
	                                    //alert(JSON.stringify(res));
	                                    util.drawToast('上传头像失败！');
	                                }
	                            });
	                        }
	                        upload();
	                    }
	                });
	            });
	        });

	        wx.error(function (res) {
	        });
	    });
	})();




/***/ }
]);