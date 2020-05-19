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
        })




}

$(function(){
    $('.ui_search').UiSearch();
    $('.content_tab').UiTab('.caption > .caption_item','.block > .item');
    $('.district').UiTab('.district_caption > .district_caption_item','.hospitalList > .list');
})