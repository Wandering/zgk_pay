

$(function () {



    $('#header-menu').show();
    $('#header-title').text('我的钱包');
    var cookie = require('cookie');
    var interfaceUrl = require('urlConfig');
    var getTime = require('timeFormat');

    var util = require('commonjs');
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

    if(toUrl=='consumer-list'){
        if(!isLogin){
            window.location.href='/login?state=consumer-list';
        }else{
            var menuV = util.getLinkey('menu');
            if(menuV=="1"){
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if(flag=="0"){
                cookie.setCookie("flag", "1", 4, "/");
                window.location.assign('/consumer-list?state=consumer-list&token=' + token+"&code="+getQueryObject(window.location.href).code);
            }
            if(flag=="1"){




                if (isWeiXin()) {
                    if(!openId){
                        var obj = getQueryObject(window.location.href);
                        cookie.setCookie("code", obj.code, 4, "/");
                        getOpenId(obj.code);
                    }
                }
            }
        }
    }








    var userId = cookie.getCookieValue('userId');
    util.ajaxFun(interfaceUrl.getSplitPriceInfo, 'get', {
        'accountId': userId
    }, function (res) {
        var objData = res.bizData;
        var totalSum = 0;
        for (var i in objData) {
            var totalPrice = 0;
            var list = '<ul class="detail-list">';
            list += '<li><span class="month-txt" id="month-txt">' + i + '</span>月共计收入￥<span class="total-txt" id="total-txt-' + i + '">' + totalPrice.toFixed(2) + '</span>元，明细如下</li>'
            for (var j = 0; j < objData[i].length; j++) {
                console.log(objData[i][j].createTime)
                totalPrice += parseFloat(objData[i][j].price);
                list += '<li>'
                    + '<span>收入 + ' + objData[i][j].price + '</span>'
                    + '<span class="right">' + getTime(objData[i][j].createTime) + '</span>'
                    + '</li>';
            }
            list += '</ul>';
            $('#detail-list').append(list);
            $("#total-txt-" + i).text(totalPrice.toFixed(2));
            totalSum += parseFloat($("#total-txt-" + i).text());
        }
        $('#total-sum').text(totalSum);
    });
















});













