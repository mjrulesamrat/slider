/* JavaScript for Slider XBlock, Studio Side.
   Written by : Jay Modi
*/
function SliderXBlockStudio(runtime, xblock_element){

    var sHeight = 0;
    var sWidth = "70%";
    var sTop = "15.5%";
    var sLeft = "15%";
    var csxColor = ["#009FE6", "black"];

    // Adjust Editor dialog to edX's standard settings
    function xblock_minimize() {

        var h = 0.55 * $(window).height();

        $('.modal-window').css({"top": sTop, "left": sLeft, "width": sWidth});
        $('.modal-content').css({"height": 0.6 * $(window).height()});

    }

    // Send current code and settings to the backend
    function studio_submit(commit) {

        commit = commit === undefined ? false : commit;

        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(xblock_element, 'studio_submit'),
            data: JSON.stringify({
                "commit": commit.toString(),
                "silder_display_name": $('.slider_display_name').val(),
                "slider_description": $('.slider_description').html(),
            }) // add success state that appends preview to the DOM
        });

    }

$(function($) {

        // Add Save Button
        $('ul', '.modal-actions')
            .append(
                $('<li>', {class: "action-item"}).append(
                    $('<a />', {class: "action-primary", id: "slider_submit", text: "Save"})
                )
            );

        for (var b in studio_buttons) {
            $('.editor-modes')
                .append(
                    $('<li>', {class: "action-item"}).append(
                        $('<a />', {class: "action-primary", id: b, text: studio_buttons[b]})
                    )
                );
        }

        // Adjust the modal window
        xblock_minimize();

        // Readjust modal window dimensions in case the browser window is resized
        window.addEventListener('resize', function() {
            xblock_minimize();
        });

        // Clicked Save button
        $('#slider_submit').click(function(eventObject) {
            studio_submit(true);
            setTimeout(function(){location.reload();},200);
        });

    });



}