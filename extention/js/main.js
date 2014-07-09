
var API_SERVER = "jpcs.me:54321";


// var now = 
// var hour = now.getHours();
// var period;
// if (hour >= 3 && hour < 12) period = 'morning';
// if (hour >= 12 && hour < 17) period = 'afternoon';
// if (hour >= 17 || hour < 3) period = 'evening';
   



// chrome.tabs.update({
//     url:'chrome://apps'
// });


$.get('http://'+API_SERVER+'/background', function(data){
	console.log(data);
	$('body').css('background-image', "url('"+data.url+"')");
})


function displayTime() {
    var time = moment().format('HH:mm:ss');
    $('#clock').html(time);
    setTimeout(displayTime, 1000);
}
 
$(document).ready(function() {
    displayTime();
});

