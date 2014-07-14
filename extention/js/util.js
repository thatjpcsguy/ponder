var API_SERVER = "jpcs.me:54321";


function getWeather(latitude, longitude) {
	// console.log('Lat: '+latitude);
	// console.log('Lon: '+longitude);

    $.get('http://api.openweathermap.org/data/2.5/weather?&units=metric&lat=' + latitude + '&lon=' + longitude + '&mode=json', function(data) {      
        var icon = "";
        console.log(data.weather[0].icon);
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
	        case "03d":
	        case "03n":
	            icon = "N"; 
	           	break;         
	        case "04d":
	        case "04d": 
	            icon = "Y";  
	            break;          
	        case "09d":
	        case "09n":
	        case "10n":
	        case "10d":
	        	icon = "R";
	        	break;
	        case "11d":
	        case "11n":
	            icon = "O";
	            break;
	        case "13d":
	        case "13n":
	            icon = "W";
	            break;
	        case "50d":
	        case "50n":
	            icon = "M";
	            break;
	        case "":
	            console.log('no weather icon found');
	            break;
	        default:
	            icon = "";
    	}
    	$("#weather-icon").html(icon);
    	$("#weather-temp").html(Math.round(data.main.temp)+'&deg;c');
    	$("#weather-desc").html(data.weather[0].main);
    	// console.log(data.name);

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
    setTimeout(displayTime, 5000);
}


function displayWeather() {
	//Load The Weather
    if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
	    geoIP();
	}

	setTimeout(displayWeather, 5000);
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

    setTimeout(displayGreeting, 5000);
}
