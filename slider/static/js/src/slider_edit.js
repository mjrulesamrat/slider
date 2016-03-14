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

        var $fileDict = []
        $.each($master.find('div'), function(index,value){
            console.log(index, value);
            var slider_name = $(this).find(".slider_name").val();
            var slider_description = $(this).find(".slider_description").val();
            var image_url = $(this).find(".image_url").val();
            // var title = $(this).find(".MultiFile-title").html();
            var tempdict = { "slider_name":slider_name , "slider_description":slider_description, "image_url":image_url};
            if(slider_name || slider_description || image_url){
                $fileDict.push(tempdict);
            }
        });

        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(xblock_element, 'studio_submit'),
            data: JSON.stringify({
                "commit": commit.toString(),
                "silder_display_name": $('.slider_display_name').val(),
                "slider_description": $('.slider_description').val(),
                "slider_data": $fileDict,
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

    //        for (var b in studio_buttons) {
    //            $('.editor-modes')
    //                .append(
    //                    $('<li>', {class: "action-item"}).append(
    //                        $('<a />', {class: "action-primary", id: b, text: studio_buttons[b]})
    //                    )
    //                );
    //        }

            // Added by Jay Modi
			$('#WithEvents').MultiFile({
			    afterFileAppend: function(element, value, master_element) {
			    	$master = master_element.list;
			    	$master.find("div").addClass("add-element");
			    	var htmlElement = '<span><input type="text" class="slider_name" name="slider_name"/></span>';
			    	htmlElement+='<span><textarea row=3 class="slider_description" name="slider_description"/></span>';
			    	htmlElement+='<span><input type="hidden" name="image_url" class="image_url"/></span> 	';
			    	$master.find('.add-element').last().append(htmlElement);

			    	$master.find(".slider_name, .slider_description").focusout(function(){
			    		getListOfFile($master);
				    });
			    },
			    afterFileRemove: function(element, value, master_element) {
					$master.find(".text").focusout();
				},
			});

			function getListOfFile($master){
				console.log("aiiiii");
				var $fileDict = []
		    	$.each($master.find('div'), function(index,value){
		    		console.log(index, value);
		    		var slider_name = $(this).find(".slider_name").val();
		    		var slider_description = $(this).find(".slider_description").val();
//		    		var image_url = $(this).find(".image_url").val();
		    		var image_url = "Jay Modi";
		    		// var title = $(this).find(".MultiFile-title").html();
		    		var tempdict = { "slider_name":slider_name , "slider_description":slider_description, "image_url":image_url};
		    		if(slider_name || slider_description || image_url){
		    			$fileDict.push(tempdict);
		    		}
		    	});
		    	console.log($fileDict);
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

            $('body').on('ajaxSend', function(elm, xhr, s) {
                  // Pass along the Django-specific CSRF token.
                  xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
            });

        });



}