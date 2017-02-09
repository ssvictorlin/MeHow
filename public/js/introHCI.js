'use strict';

// Call this function when the page loads (the "ready" event)
     $(document).ready(function() {
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
/*
 * Function that is called when the document is ready.
 */


