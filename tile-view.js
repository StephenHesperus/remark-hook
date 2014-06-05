$(document).ready(function() {
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
        var T = 84;
        if (event.which == T) {
            tile_view.toggle();
            slide_show.toggle();
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
        var tile_container_width = slide_width * scale;
        var tile_container_height = slide_height * scale;

        // loop all slides and set the scale and container
        var slides = slides_area.find('.remark-slide-container');
        slides.each(function (index) {
            var tile_container = $('<div class="tile-container">');

            tile_container.width(tile_container_width);
            tile_container.height(tile_container_height);
            var remark_slide_scaler = $(this).find('.remark-slide-scaler');
            remark_slide_scaler.css('top', '0px')
                .css('left', '0px')
                .css('transform', 'scale(' + scale + ')');
            remark_slide_scaler.parent().addClass('remark-visible');

            $(this).appendTo(tile_container);
            tile_container.appendTo(tile_view);
        });

        tile_view.appendTo($('body'));
    }
});
