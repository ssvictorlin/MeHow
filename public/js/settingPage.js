'use strict';
$(document).ready(function() {
    // Setting

    // Notification times:
    $('#time1, #time2, #time3').combodate({ //show 'hour' and 'minute' string at first item of dropdown
        minuteStep: 5
    });  
});
    

// function that capitalize the first letter for each word. e.q. victor lin => Victor Lin
function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function redirect() {
    setTimeout(function(){ window.location="/index"; } , 3000);
}
