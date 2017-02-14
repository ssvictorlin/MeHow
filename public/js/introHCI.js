'use strict';
var lastEmojiId = 0;
var text ="";
// Call this function when the page loads (the "ready" event)
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

	    // ADD: emoji table selection
	    $(".emoji_ADDPAGE").click(function(){
	    	//Draw the clicked one.
    		$(this).attr("class","selected");
    		var EmojiId = $(this).attr("id");
    		//Undraw the last one.
    		if(EmojiId!=lastEmojiId)
    			$("#"+lastEmojiId).removeAttr("class","selected");
	    	//Update EmojiId
	    	lastEmojiId = EmojiId;
	    	console.log(EmojiId);
	    });

	    $("#memoButton").click(function(){
	    	console.log("memoButton clicked");
	    	$("#textareaAtAdd").toggle();
	    	goToBottom();
	    });

	    $("#cameraButton").click(function(){
	    	console.log("cameraButton clicled");
	    });

	    $("#recorderButton").click(function(){
	    	console.log("recorderButton clicked");
	    });

	    $("#textareaAtAdd").hide();

	    // LOGIN: sumbit button pressed

	    var textfield = $("input[name=user]");
        $('button[type="submit"]').click(function(e) {
            e.preventDefault();
            //little validation just to check username
            if (textfield.val() != "") {
                //$("#output").addClass("alert alert-success animated fadeInUp").html("Welcome back " + textfield.val());
                $("#output").removeClass(' alert-danger').hide();

                /*$("input").css({
	                "height":"0",
	                "padding":"0",
	                "margin":"0",
	                "opacity":"0"
                });*/
                //change button text 
                $('button[type="submit"]')
                .addClass("alert alert-success animated fadeInUp").html("Welcome back " + toTitleCase(textfield.val()) + " !")
                .removeClass("btn-info");
                
                //show avatar
                $(".avatar").css({
                    "background-image": "url('http://lorempixel.com/200/200/people')"
                });
                /*$('.avatar').load(function() {
  					 window.location.href = "/index";
				});*/

            } else {
                //remove success mesage replaced with error message
                $("#output").removeClass(' alert alert-success');
                $("#output").addClass("alert alert-danger animated fadeInUp").html("Please enter a username ");
            }
        });
	});

    function goToBottom(){
		var documentHeight=document.documentElement.offsetHeight;
		var viewportHeight=window.innerHeight;
		window.scrollTo(0,documentHeight-viewportHeight);
	} 
	// function that capitalize the first letter for each word. e.q. victor lin => Victor Lin
	function toTitleCase(str)
	{
    	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}


