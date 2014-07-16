

$(document).ready(function() {
	//Load The Background
	display_background();
	// display_quote();
	//Display Weather
	display_weather();
	displayPhabTicketsNaive();


	if (localStorage.getItem("user_name"))
	{
		//Build a Clock
	    display_time();

	    //Show The Greeting Message
	    display_greeting();
	}
	else
	{
		$('#greeting').addClass('prompt');
		$('#greeting').html('<form>What Is Your Name? <input type="text"></form>');

		$(function () {
		    $('#greeting form').bind('submit', function (e) {
		        e.preventDefault();
		        saveName();

		    });
		});

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


});


