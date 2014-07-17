var API_SERVER = "jpcs.me:54321";

var ONE_SECOND = 1000;
var ONE_MINUTE = ONE_SECOND * 60;
var ONE_HOUR = ONE_MINUTE * 60;
var DEFAULT_TIME_FORMAT = 'HH:mm';


function saveName(){
    localStorage.setItem("user_name", $('#greeting input').val());

    _gaq.push(['_trackEvent', 'Name', 'Save', localStorage.getItem("user_name")]);

    $('#greeting').removeClass('prompt');

    display_time();
    display_greeting();

    return false;
}

function displayPhabTicketsNaive() {
    $.get('phab.html', function(data){
        // console.log(data);
        $('#phab').html(data);
    });

    setTimeout(displayPhabTicketsNaive, ONE_MINUTE);

}

/*
 * Translate open weather map icons into meteocons
 */
function get_weather_icon(x) {
    var look = {'01d': 'B', '01n': 'B', '02d': 'H', '02n': 'I', '03d': 'N', '03n': 'N', '04d': 'Y', '04n': 'Y', '09d': 'R', '09n': 'R', '10n': 'R', '10d': 'R', '11d': 'O', '11n': 'O', '13d': 'W', '13n': 'W', '50d': 'M', '50n': 'M'};
    if (x in look) {
        return look[x];
    }
    return '';
}

function get_day_period() {
    var now = new Date();
    var hour = now.getHours();
    var period;
    if (hour >= 3 && hour < 12) period = 'Morning';
    if (hour >= 12 && hour < 17) period = 'Afternoon';
    if (hour >= 17 || hour < 3) period = 'Evening';
    return period;
}


/*
 * Get current longitude and latitude from IP
 */
function geo_ip() {
    $.get('http://freegeoip.net/json/', function(nav) {
        localStorage.setItem("location_lat", nav.latitude);
        localStorage.setItem("location_lon", nav.longitude);
        get_weather_info();
    });
}



function display_time() {
    var time_format = localStorage.getItem("time_format") || DEFAULT_TIME_FORMAT;

    $('#clock').html(moment().subtract('hours', 2).format(time_format));
    if (time_format !== localStorage.getItem("time_format")) {
        localStorage.setItem("time_format", time_format);
    }

    setTimeout(display_time, ONE_SECOND);
}



function get_weather_info() {
    _gaq.push(['_trackEvent', 'Weather', 'Get', localStorage.getItem("location_lat")+', '+localStorage.getItem("location_lon")]);

    $.get('http://api.openweathermap.org/data/2.5/weather?&units=metric&lat=' + localStorage.getItem("location_lat") + '&lon=' + localStorage.getItem("location_lon") + '&mode=json', function(data) {
        localStorage.setItem("weather_icon", get_weather_icon(data.weather[0].icon));
        localStorage.setItem("weather_temp", Math.round(data.main.temp)+'&deg;c');
        localStorage.setItem("weather_desc", data.weather[0].main);
        localStorage.setItem("weather_cache", moment().format('DDMMHH'));
        _gaq.push(['_trackEvent', 'Weather', 'Show', localStorage.getItem("weather_temp")+' '+localStorage.getItem("weather_desc")]);

        set_weather_on_page();
    });
}

function get_weather_location(){
    if (localStorage.getItem("location_cache") != moment().format('DDMM'))
    {
        localStorage.setItem("location_cache", moment().format('DDMM'));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (data) {
                    localStorage.setItem("location_lat", data.coords.latitude);
                    localStorage.setItem("location_lon", data.coords.longitude);
                    get_weather_info();
                },
                function (data) {
                    geo_ip();
                }
            );
        } else {
            geo_ip();
        }
    }
    else {
        get_weather_info();
    }
}

function set_weather_on_page() {
    $("#weather-icon").html(localStorage.getItem("weather_icon"));
    $("#weather-temp").html(localStorage.getItem("weather_temp"));
    $("#weather-desc").html(localStorage.getItem("weather_desc"));
}

function display_weather() {
    if (localStorage.getItem("weather_cache") != moment().format('DDMMHH')) {

        get_weather_location();
    }
    else {
        set_weather_on_page();
    }
    setTimeout(display_weather, ONE_HOUR);
}


function display_greeting()
{
    $('#greeting').html('Good '+ get_day_period() + ', ' + localStorage.getItem("user_name"));


    setTimeout(display_greeting, ONE_MINUTE);
}

function display_quote() {
    if (localStorage.getItem("quote_cache") != moment().format('DDMM')+get_day_period())
    {
        $.get('http://www.iheartquotes.com/api/v1/random?max_lines=1&source=codehappy&show_source=false&show_permalink=false&max_characters=256', function(data){
            localStorage.setItem("quote_text", '"'+data+'"');
            localStorage.setItem("quote_cache", moment().format('DDMM')+get_day_period());
            $('#quote').html(localStorage.getItem("quote_text"));
        });
    }
    else {
        $('#quote').html(localStorage.getItem("quote_text"));
    }

    setTimeout(display_quote, ONE_MINUTE);
}

function set_background() {

    $('body').css('background-image', "url('"+localStorage.getItem("background_url")+"')");
    $('#background').css('background-image', "url('"+localStorage.getItem("background_url")+"')");
    $('#credit').html(localStorage.getItem("background_credit"));
}

function display_background() {
    if (localStorage.getItem("background_cache") != moment().format('DDMM')+get_day_period())
    {
        $.get('http://www.reddit.com/r/earthporn.json', function(data) {
            var re = /(https?:\/\/.*.jpg)/i;
            var i = 0;
            var reddit = false;

            while (i < data.data.children.length && reddit != true ) {
                if (re.exec(data.data.children[i].data.url))
                {
                    localStorage.setItem("background_cache", moment().format('DDMM')+get_day_period());
                    localStorage.setItem("background_url", data.data.children[i].data.url);
                    localStorage.setItem("background_credit", 'Photo Source - /r/'+data.data.children[i].data.subreddit);

                    _gaq.push(['_trackEvent', 'Background', 'Show', localStorage.getItem("background_url")]);
                    set_background();
                    return;
                }
                i++;
            }
        });
    }
    else {
        set_background();
    }

    setTimeout(display_background, ONE_MINUTE);
}
