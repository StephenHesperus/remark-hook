// highlight mark: a '!' at the start of a line
$(document).ready(function() {
    // format custom highlighted lines
    /* a custom highlighted line starts with a '!' */
    $('pre code div.remark-code-line').each(function(i, e) {
        var line = $(this).html();
        if (line[0] == '!') {
            // compensate the space used by '!'
            var s = (line[1] != ' ' ? '' : ' ');
            var highlight_line = line.replace('!', s);
            $(this).html(highlight_line);
            $(this).addClass('remark-code-line-highlighted');
        }
    });


    // format custom highlighted tokens
    $('pre code.remark-code .remark-code-line').each(function() {
        var line = $(this).html();

        var hl_regex = /([^\\`]|^)`([^`]+?)`/g;
        if (line.search(hl_regex) != -1) {
            var hl_html = '$1<span class="remark-code-token-highlighted">'
                          + '$2' // strings
                          + '</span>';
            line = line.replace(hl_regex, hl_html);
        }

        /* trim escape ` accent quote string */
        var escape_regex = /\\`([^`]+?)\\`/g;
        if (line.search(escape_regex) != -1) {
            line = line.replace(escape_regex, '`$1`');
        }

        $(this).html(line);
    });
});
