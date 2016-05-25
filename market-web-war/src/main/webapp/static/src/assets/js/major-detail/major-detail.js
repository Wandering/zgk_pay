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
                $('#container_1').html(template(res.bizData));
                $('#majorIntroduce').html(res.bizData.majorIntroduce.replace('font-size:18px;line-height:100px', ''));
            }
        });
    }
    function getMajorOpenUniversityList() {
        var id = util.getLinkey('id');
        util.ajaxFun(urlConfig.getMajorOpenUniversityList, 'get', {
            majoredId: id
        }, function (res) {
            if (res.rtnCode == '0000000') {
                handlebars.registerHelper('propertyList', function (date) {
                    var propertyListTpl = '';
                    switch (date) {
                        case '985':
                            propertyListTpl += '<span class="type-985">985</span>';
                            break;
                        case '211':
                            propertyListTpl += '<span class="type-211">211</span>';
                            break;
                        case '有研究生院':
                            propertyListTpl += '<span class="type-yan">研</span>';
                            break;
                        case '含国防生':
                            propertyListTpl += '<span class="type-guo">国</span>';
                            break;
                        case '卓越计划':
                            propertyListTpl += '<span class="type-zhuo">卓</span>';
                            break;
                        case '自主招生':
                            propertyListTpl += '<span class="type-zi">自</span>';
                            break;
                    }
                    return propertyListTpl;
                });
                handlebars.registerHelper('rankImg', function (rank) {
                    if (rank && rank < 4) {
                        return '<img class="rank-img" src="/static/dist/img/rank_img_' + rank + '.png">';
                    }
                    return '';
                });
                var source = $('#temp-search-list').html();
                var template = handlebars.compile(source);
                $('.school-list').html(template(res));
                $('.title').on('click', function() {
                    var schoolId = $(this).attr('data-id');
                    window.location.href = '/school-detail?id=' + schoolId + '&action=major-detail&majoredId=' + id;
                });
            }
        });
    }
    $(document).ready(function() {
        $('#header-back').show();
        $('#header-title').text('专业详情');

        $('#header-back').on('click', function() {
            window.location.href = '/major-search';
        });
        var activeId = util.getLinkey('active') || '1';
        $('.tab .item[data-id="' + activeId + '"]').addClass('active');
        $('.tab .item').on('click', function() {
            $('.tab .item').removeClass('active');
            $(this).addClass('active');
            $($('.container').get($(this).attr('data-id') - 1)).removeClass('hidden').siblings().addClass('hidden');
        });

        $($('.container').get($('.tab .item.active').attr('data-id') - 1)).removeClass('hidden');
        getMarjorDetial();
        getMajorOpenUniversityList();
    });
})();
