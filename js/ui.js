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

$.fn.UiSlider = function(){
    var ui = $(this),
        btn_prev = $('.ui_home_slider_arrow .left',ui),
        btn_next = $('.ui_home_slider_arrow .right',ui),
        items = $('.ui_home_slider_warp .item',ui),
        points = $('.ui_home_slider_points .item',ui),
        warp = $('.ui_home_slider_warp',ui),
        arrow = $('.ui_home_slider_arrow',ui);
    var current = 0,
        size = items.length,
        width = items.eq(0).width(),
        enableAuto = true;
    arrow
    .on('mouseover',function(){
        enableAuto = false;
    })
    .on('mouseout',function(){
        enableAuto = true;
    })
    warp
    .on('mouseover',function(){
        enableAuto = false;
    })
    .on('mouseout',function(){
        enableAuto = true;
    })

    warp
    .on('move_to',function(event,index){
        warp.css('left',index*width*-1);
        points.removeClass('item_active').eq(index).addClass('item_active');
    })
    .on('move_prev',function(){
        if(current<=0){
            current = size;
        }
        current = current -1;
        warp.triggerHandler('move_to',current);
    })
    .on('move_next',function(){
        if(current>=size-1){
            current = -1;
        }
        current = current +1;
        warp.triggerHandler('move_to',current);
    })
    .on('auto_move',function(){
        setInterval(function(){
        enableAuto && warp.triggerHandler('move_next');
        },2000);
    })
    .triggerHandler('auto_move');

    btn_prev.on('click',function(){
        warp.triggerHandler('move_prev');
    })
    btn_next.on('click',function(){
        warp.triggerHandler('move_next');
    })
    points.on('click',function(){
        var index = $(this).index();
        warp.triggerHandler('move_to',index);
    })
}

$.fn.UiCascading = function(){
    var ui = $(this),
        selects = $('select',ui);
        console.log(this);
        selects
        .on('change',function(){
            var val = $(this).val(),
                index = selects.index(this),
                where = $(this).attr('data-where');
                where = where ? where.split(',') : [];
                where.push($(this).val());

                selects.eq(index+1)
                .attr('data-where', where.join(','))
                .triggerHandler('reloadOptions'); 


                ui.find('select:gt('+ (index+1) +')').each(function() {
                $(this)
                .attr('data-where','')
                .triggerHandler('reloadOptions'); 
                })
                    

        })
        .on('reloadOptions',function(){
            var method = $(this).attr('data-search'),
                args = $(this).attr('data-where').split(','),
                data = RemoteGetData[method].apply(this,args),
                selects = $(this);
            selects.empty();
            $.each(data,function(index, el) {
                var item = $('<option value="'+el+'">'+el+'</option>');
                selects.append(item);
            });

        })
        selects.eq(0).triggerHandler('reloadOptions');

}



$(function(){
    $('.ui_search').UiSearch();
    
    $('.page').UiTab('.nav_caption','.page_item');
    $('.content_home_tab').UiTab('.caption > .caption_item','.block > .item');
    $('.district').UiTab('.district_caption > .district_caption_item','.hospitalList > .list');

    $('body').UiBackToTop();

    $('.ui_home_slider').UiSlider();
    $('.ui_casecading').UiCascading();
})