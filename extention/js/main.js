
// $.get('http://500px.com/popular.rss', function(data){
// 	console.log(data);
// 	$(data).find("item").each(function () {
// 		console.log(this);
// 	});

// });


function saveName(){
	localStorage.setItem("name", $('#greeting input').val());
	$('#greeting').removeClass('prompt');
	displayTime();
	displayGreeting();
	return false;
}

function displayPhabTicketsNaive() {
	$.get('phab.html', function(data){
		console.log(data);
		$('#phab').html(data);
	});

	setTimeout(displayPhabTicketsNaive, 300000);

}


function displayBackground() {

	if (localStorage.getItem("background_date") == moment().format('DDMMyy'))
	{
		$('body').css('background-image', "url('"+localStorage.getItem("background_url")+"')");
		$('#background').css('background-image', "url('"+localStorage.getItem("background_url")+"')");
		$('#credit').html('<p>Photo Credit - '+localStorage.getItem("background_credit")+'</p>');
		$('#quote').html('"'+ localStorage.getItem("background_quote") +'"');
	}
	else {
		$.get('http://'+API_SERVER+'/background', function(data){
			$('body').css('background-image', "url('"+data.url+"')");
			$('#background').css('background-image', "url('"+data.url+"')");
			$('#credit').html('<p>Photo Credit - '+data.credit+'</p>');
			localStorage.setItem("background_date", moment().format('DDMMyy'));
			localStorage.setItem("background_url", data.url);
			localStorage.setItem("background_credit", data.credit);
		})

		$.get('http://www.iheartquotes.com/api/v1/random?max_lines=1&source=codehappy&show_source=false&show_permalink=false&max_characters=256', function(data){
			$('#quote').html('"'+ data +'"');
			localStorage.setItem("background_quote", data);
		})
	}

	$("#background").dblclick(function(){
		if ($("#background").hasClass('blur'))
		{
			$("#background").removeClass('blur');
		}
		else {
			$("#background").addClass('blur');
		}
	})


}

$(document).ready(function() {
	//Load The Background
	displayBackground();




	if (localStorage.getItem("name"))
	{
		//Build a Clock
	    displayTime();

	    //Show The Greeting Message
	    displayGreeting();

	    //Display Weather
	    displayWeather();

	    displayPhabTicketsNaive();

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
