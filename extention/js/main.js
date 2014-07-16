

$(document).ready(function() {
	//Load The Background
	display_background();
	display_quote();
	//Display Weather
	display_weather();
	displayPhabTicketsNaive();


	if (localStorage.getItem("name"))
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
            $("#background").removeClass('blur');
        }
        else {
            $("#background").addClass('blur');
        }
    });


});


