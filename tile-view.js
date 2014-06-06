$(document).ready(function() {
    // keycode of 'T' on keyboard
    var T = 84;

    if ($('div#tile_view').length > 0) {
        var tile_view = $('div#tile-view-mode');
    } else {
        var tile_view = $('<div id="tile-view-mode">');
        create_tile_view();
    }
    var slide_show = $('div.remark-slides-area');

    // bind keyboard 't' to toggle tile_view
    tile_view.hide();
    $('body').keyup(function (event) {
        if (event.which == T) {
            tile_view.toggle();
            slide_show.toggle();

            // mark displayed and current tiles
            var index = slide_show.find('.remark-visible').index();
            var current_tile = tile_view.find('.remark-slide-container')
                                        .eq(index).parent().parent();
            var displayed_tiles = tile_view.find(
                // current tile and those before it
                '.remark-slide-container:lt(' + (index+1) + ')')
                    .parent().parent().parent();

            tile_view.find('.tile-bg').removeClass('displayed-tile');
            tile_view.find('.tile').removeClass('current-tile');
            displayed_tiles.addClass('displayed-tile');
            current_tile.addClass('current-tile');
            current_tile.get(0).scrollIntoView();
        }
    });

    function create_tile_view() {
        // min length of width and height
        var TILE_MIN_SIZE = 250;

        // Set header
        var h1 = $('<h1 id="tile-view-header">Slide Tile View Mode</h1>');
        h1.appendTo(tile_view);

        // get slides
        var orig_slides_area = $('div.remark-slides-area');
        var slides_area = orig_slides_area.clone();

        // calculate slide scale and tile container size
        var slide_scaler = slides_area.find('.remark-slide-scaler');
        var slide_width = slide_scaler.width();
        var slide_height = slide_scaler.height();
        var scale = TILE_MIN_SIZE / Math.min(slide_width, slide_height);
        var tile_container_width = Math.round(slide_width * scale);
        var tile_container_height = Math.round(slide_height * scale);

        // loop all slides and set the scale and container
        var slides = slides_area.find('.remark-slide-container');
        slides.each(function (index) {
            var tile = $('<div class="tile-bg">'
                         + '<div class="tile">'
                         + '<div class="tile-container">');
            var tile_container = tile.find('.tile-container');

            tile_container.width(tile_container_width);
            tile_container.height(tile_container_height);
            var remark_slide_scaler = $(this).find('.remark-slide-scaler');
            remark_slide_scaler.css('top', '0px')
                .css('left', '0px')
                .css('transform', 'scale(' + scale + ')');
            remark_slide_scaler.parent().addClass('remark-visible');

            $(this).appendTo(tile_container);
            tile.appendTo(tile_view);
        });

        // bind click to play from here
        slides.click(function() {
            // exit from tile view mode
            $('body').trigger($.Event('keyup', { which: T }));

            var index = slides.index($(this));
            slideshow.gotoSlide(index + 1);
        });

        tile_view.appendTo($('body'));
    }
});
