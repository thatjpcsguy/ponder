

$(document).ready(function() {
	//Load The Background
	display_background();

    //TODO: check chrome sync for setting changes?
	if (localStorage.getItem("user_name")) {
        display_all();
	} else {
        get_name();
	}

	$("#background").dblclick(function(){
        if ($("#background").hasClass('blur'))
        {
        	$("#credit").removeClass('hide');
        	$("#greeting").addClass('small');
        	$("#clock").addClass('small');
            $("#background").removeClass('blur');
            _gaq.push(['_trackEvent', 'Background', 'dblclick', 'sharp']);
        }
        else {
            $("#background").addClass('blur');
            $("#credit").addClass('hide');
            $("#greeting").removeClass('small');
            $("#clock").removeClass('small');
             _gaq.push(['_trackEvent', 'Background', 'dblclick', 'blur']);
        }
    });

    init_sync_listener();
});


