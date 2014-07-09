
$.get('http://500px.com/popular.rss', function(data){
	console.log(data);
	$(data).find("item").each(function () {
		console.log(this);
	});

});


function saveName(){
	localStorage.setItem("name", $('#greeting input').val());
	$('#greeting').removeClass('prompt');
	displayTime();
	displayGreeting();
	return false;
}

$(document).ready(function() {
	//Load The Background
	$.get('http://'+API_SERVER+'/background', function(data){
		$('body').css('background-image', "url('"+data.url+"')");
		$('#credit').html('<p>Photo Credit - '+data.credit+'</p>');
	})

	if (localStorage.getItem("name"))
	{
		//Build a Clock
	    displayTime();

	    //Show The Greeting Message
	    displayGreeting();

	    //Display Weather
	    displayWeather();

	}
	else
	{
		$('#greeting').addClass('prompt');
		$('#greeting').html('<form>What Is Your Name? <input type="text"></form>');
		
	}

    
});

$(function () {
    $('#greeting form').bind('submit', function (e) {
        e.preventDefault();
        saveName();
    });
});
