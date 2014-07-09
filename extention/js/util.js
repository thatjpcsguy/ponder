var API_SERVER = "jpcs.me:54321";


function getWeather(latitude, longitude) {
    $.get('http://api.openweathermap.org/data/2.5/weather?&units=metric&lat=' + latitude + '&lon=' + longitude + '&mode=json', function(data) {      
        var icon = "";
        switch (data.weather[0].icon) {
	        case "01d":
	            icon = "B";
	            break;
	        case "01n":
	            icon = "C";
	            break;
	        case "02d":
	            icon = "H";
	            break;
	        case "02n":
	            icon = "I";
	            break;
	        case "03d" || "03n":
	            icon = "N"; 
	           	break;         
	        case "04d" || "04d": 
	            icon = "Y";  
	            break;          
	        case "09d" || "09n":
	            icon = "R";
	            break;
	        case "10d" || "10n":
	            icon = "R";
	            break;
	        case "11d" || "11n":
	            icon = "O";
	            break;
	        case "13d" || "13n":
	            icon = "W";
	            break;
	        case "50d" || "50n":
	            icon = "M";
	            break;
	        case "":
	            console.log('no weather icon found');
	            break;
	        default:
	            icon = ")";
    	}
    	$("#weather .icon").html(icon);
    	$("#weather .temp").html(data.main.temp+'&deg;c');
    	$("#weather-desc").html(data.weather[0].description);

    });
}


function showPosition(position) {
    getWeather(position.coords.latitude, position.coords.longitude)
}

function geoIP() {
    console.log('geoip');
    $.get('http://freegeoip.net/json/', function(data) {
        getPrediction(data.latitude, data.longitude);
    });
}

function showError(error) {
    geoIP();
}




function displayTime() {
    var time = moment().format('HH:mm');
    $('#clock').html(time);
    setTimeout(displayTime, 1000);
}


function displayWeather() {
	//Load The Weather
    if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
	    geoIP();
	}
}


function displayGreeting()
{
	var now = new Date();
	var hour = now.getHours();
	var period;
	if (hour >= 3 && hour < 12) period = 'Morning';
	if (hour >= 12 && hour < 17) period = 'Afternoon';
	if (hour >= 17 || hour < 3) period = 'Evening';
    $('#greeting').html('Good '+period + ', ' + localStorage.getItem("name"));
}
