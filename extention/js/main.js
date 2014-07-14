function saveName(){
	localStorage.setItem("name", $('#greeting input').val());
	$('#greeting').removeClass('prompt');
	displayTime();
	displayGreeting();
	return false;
}

function displayPhabTicketsNaive() {
	$.get('phab.html', function(data){
		// console.log(data);
		$('#phab').html(data);
	});

	setTimeout(displayPhabTicketsNaive, 300000);

}


function displayBackground() {

	// localStorage.setItem("background_date", 'lol');

	var reddit = false;

	if (localStorage.getItem("background_date") == moment().format('DDMMyy'))
	{
		$('body').css('background-image', "url('"+localStorage.getItem("background_url")+"')");
		$('#background').css('background-image', "url('"+localStorage.getItem("background_url")+"')");
		$('#credit').html(localStorage.getItem("background_credit"));
	}
	else {
		
		$.get('http://www.reddit.com/r/earthporn.json', function(data) {
			var re = /(https?:\/\/.*.jpg)/i; 
			for (var i = 0; i < data.data.children.length; i++) {
			  	// console.log(data.data.children[i]);
			  	if (re.exec(data.data.children[i].data.url))
			  	{
			  		
			  		reddit = true;	
			  		$('#background').css('background-image', "url('"+ data.data.children[i].data.url + "')");

			  		$('body').css('background-image', "url('"+data.data.children[i].data.url+"')");
					
					$('#credit').html('<p>Photo Source - /r/'+data.data.children[i].data.subreddit+'</p>');
					localStorage.setItem("background_date", moment().format('DDMMyy'));
					localStorage.setItem("background_url", data.data.children[i].data.url);
					localStorage.setItem("background_credit", '<p>Photo Source - /r/'+data.data.children[i].data.subreddit+'</p>');

					return;
			  	}
			}
			if (reddit == false) {

				$.get('http://'+API_SERVER+'/background', function(data){
					$('body').css('background-image', "url('"+data.url+"')");
					$('#background').css('background-image', "url('"+data.url+"')");
					$('#credit').html('<p>Photo Credit - '+data.credit+'</p>');
					localStorage.setItem("background_date", moment().format('DDMMyy'));
					localStorage.setItem("background_url", data.url);
					localStorage.setItem("background_credit", '<p>Photo Credit - '+data.credit+'</p>');
				});
			}	
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
