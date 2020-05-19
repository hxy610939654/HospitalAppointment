$.fn.UiSearch = function(){
    var ui = $(this);

    $('.ui_search_selected',ui).on('click',  function() {
        $('.ui_search_selectList').show();
        return false;
    });
    $('.ui_search_selectList_item',ui).on('click', function() {
        $('.ui_search_selected').text($(this).text());
        $('.ui_search_selectList').hide();
        return false;
    });
    $('body').on('click', function() {
        $('.ui_search_selectList').hide();
    });
}

$.fn.UiTab = function(header,content){
    var ui = $(this),
        tabs = $(header,ui),
        items = $(content,ui);
        tabs.on('click',function(){
            var index = $(this).index();
            tabs.removeClass('active').eq(index).addClass('active');
            items.hide().eq(index).show();
        });
}

$.fn.UiBackToTop = function(){
    var ui = $(this),
        el = $('<a class="ui_backToTop" href="#8"></a>');
    ui.append(el);

    var windowHeight = $(window).height();

    $(window).on('scroll',function(){
        var top = $('body,html').scrollTop();
        if(top > windowHeight){
            el.show();
        }else {
            el.hide();
        }
    })
    el.on('click',function(){
        $('body,html').stop().animate({scrollTop:0}, 500);
    })
}

$(function(){
    $('.ui_search').UiSearch();
    
    $('.content_tab').UiTab('.caption > .caption_item','.block > .item');
    $('.district').UiTab('.district_caption > .district_caption_item','.hospitalList > .list');

    $('body').UiBackToTop();
})