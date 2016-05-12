/**
 * Created by kepeng on 16/5/10.
 */
(function() {

    var util = require('commonjs');
    var cookie = require('cookie');
    var urlConfig = require('urlConfig');
    var handlebars = require('handlebars');

    function getMarjorDetial() {
        var id = util.getLinkey('id');
        util.ajaxFun(urlConfig.getMajoredInfoById, 'get', {
            majoredId: id
        }, function (res) {
            if (res.rtnCode == '0000000') {
                var source = $('#detile').html();
                var template = handlebars.compile(source);
                $('.container').html(template(res.bizData));
                $('#majorIntroduce').html(res.bizData.majorIntroduce);
            }
        });
    }
    $(document).ready(function() {
        $('#header-back').show();
        $('#header-title').text('专业详情');

        $('#header-back').on('click', function() {
            window.location.href = '/major-search';
        });
        getMarjorDetial();
    });
})();
