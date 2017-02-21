'use strict';
var lastEmojiId = 0;
$(document).ready(function() {
 	// Home: calendar function
    $("#datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            onSelect: function() { 
            var dateObject = $(this).datepicker('getDate'); 
            console.log('Month: '+ dateObject.getMonth()+ ', Date: '+ dateObject.getDate()+ ', Year: '+ dateObject.getFullYear());
            var target = 3;
            $('html, body').animate({
                scrollTop: $('#'+target).offset().top
            }, 500);
        }
    })
    .hide();
    /*.click(function() {
      $(this).hide();
    });*/

    $("#calendar-button").click(function() {
       $("#datepicker").toggle(); 
       var calendarHeight = $('#datepicker').height();
       if ($('#datepicker').is(':visible')) {
            $('body').css('padding-top', calendarHeight+72+'px');
        }
        else {
            $('body').css('padding-top', 72+'px');
        }
    });
});