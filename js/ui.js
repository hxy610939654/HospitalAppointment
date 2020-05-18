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

$(function(){
    $('.ui_search').UiSearch();
})