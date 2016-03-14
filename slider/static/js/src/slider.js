/* Javascript for SliderXBlock. */
function SliderXBlock(runtime, element) {

//    function updateCount(result) {
//        $('.count', element).text(result.count);
//    }

//    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

//    $('p', element).click(function(eventObject) {
//        $.ajax({
//            type: "POST",
//            url: handlerUrl,
//            data: JSON.stringify({"hello": "world"}),
//            success: updateCount
//        });
//    });

    $(function ($) {
          $('#banner-slide').bjqs({
            animtype      : 'slide',
            height        : 320,
            width         : 620,
            responsive    : true,
            randomstart   : true
          });
        /* Here's where you'd do things on page load. */
    });
}
