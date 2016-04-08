var util = require('commonjs');
//var domain = util.domain; // 正式
$('#header-title').text('盈利规则');
$('#header-back').show().on('click',function(){
    window.location.assign('/consumer-list');
});