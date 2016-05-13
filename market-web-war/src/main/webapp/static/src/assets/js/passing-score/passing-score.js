/**
 * Created by kepeng on 16/5/10.
 */

(function() {

    $(document).ready(function() {

        $('#header-title').text('省批次线');
        $('#header-menu').show();
        $('.container-header').on('click', function(){
            if($(this).hasClass('open-drop-list')){
                $(this).removeClass('open-drop-list');

                $('.containert-content').removeClass('hidden');
                $('.backdrop').addClass('hidden');
                $('.province-option-list').addClass('hidden');
            } else {
                $(this).addClass('open-drop-list');

                $('.containert-content').addClass('hidden');
                $('.backdrop').removeClass('hidden');
                $('.province-option-list').removeClass('hidden');
            }
        });
        $('.backdrop').on('click', function(){
            $('.container-header').trigger('click');
        });
        $('.province-item').on('click', function(){
            $('.province-item').removeClass('active');
            $(this).toggleClass('active');
            $('.container-header span').text($(this).text());
            $('.container-header').trigger('click');
            var index = $(this).index();
            $($('.containert-content').get(index)).show().siblings().hide();
        });

        var index = $('.province-item.active').index();
        $($('.containert-content').get(index)).show().siblings().hide();
    });
})();
