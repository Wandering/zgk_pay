/**
 * Created by pdeng on 16/3/31.
 */
var util = require('commonjs');
var handlebars = require('handlebars');
var interfaceUrl = require('urlConfig');
$(function () {
    var id = util.getLinkey('id');
    util.ajaxFun(interfaceUrl.getGkHotInfo, 'get', {
        "id":id
    }, function (res) {
        if (res.rtnCode == '0000000') {
            var dataJson = res.bizData;
            var template = handlebars.compile($('#policy-detail-tpl').html());
            $('#policy-detail').html(template(dataJson));
        }
    });
});