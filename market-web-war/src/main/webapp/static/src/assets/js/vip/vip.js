var cookie = require('cookie');
var util = require('commonjs');
var urlConfig = require('urlConfig');
var account = cookie.getCookieValue('phone');
$('#account-number').val(account);

$('#header-menu').show();
$('#header-title').text('VIP');

$('.vip-btn').click(function () {
    var cardNum = $.trim($('#card-number').val());
    var cardPsd = $.trim($('#card-psd').val());
    if (cardNum == "") {
        util.drawToast('卡号不能为空');
        return;
    }
    if (cardNum.length != 10 && cardNum.length != 8) {
        util.drawToast('请输入正确的卡号');
        return;
    }
    if (cardPsd == "") {
        util.drawToast('卡密码不能为空');
        return;
    }
    if (cardPsd.length != 10) {
        util.drawToast('请输入正确的卡密码');
        return;
    }
    util.ajaxFun(urlConfig.upgradeVipByCard, 'POST', {
        "cardNumber": cardNum,
        "password": cardPsd
    }, function (res) {
        console.log(res)
        if (res.rtnCode == '0000000') {
            var vipStatus = res.bizData.vipStatus;
            var vipActiveDate = res.bizData.vipActiveDate;
            var vipEndDate = res.bizData.vipEndDate;
            cookie.setCookie("vipStatus", vipStatus, 4, "/");
            cookie.setCookie("vipActiveDate", vipActiveDate, 4, "/");
            cookie.setCookie("vipEndDate", vipEndDate, 4, "/");
            util.drawToast('申请成功');
            window.location.assign('/vip-check')
        } else {
            util.drawToast(res.msg);
        }
        if (res.rtnCode == '0900002' || res.rtnCode == '0900001') {
            util.drawToast(res.msg);
        }
    });
});



