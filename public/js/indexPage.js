'use strict';
var lastEmojiId = 0;
$(document).ready(function() {
 	// Home: calendar function
    $("#datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
    })
    .hide()
    .click(function() {
      $(this).hide();
    });

    $("#calendar-button").click(function() {
       $("#datepicker").toggle(); 
    });
});