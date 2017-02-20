'use strict';
var lastEmojiId = 0;
var text ="";
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

    var video = document.getElementById('video');
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
        });
    }
    $("#camera-canvas").hide();

    $("#memoButton").click(function(){
    	// console.log("memoButton clicked");  
    	$("#textareaAtAdd").toggle();
        $("#audioAreaAtAdd").hide();
        $("#cameraAreaAtAdd").hide();
    	goToBottom();
    });

    $("#cameraButton").click(function(){
    	console.log("cameraButton clicked");
        $("#cameraAreaAtAdd").show();
        // $("#cameraAreaAtAdd").toggle();
        $('#audioAreaAtAdd').hide();
        $("#textareaAtAdd").hide();
        video.play();
    });

    $("#snap").click(function(){
        console.log("snap clicked");
        $('#camera-modal').modal('toggle');

        var canvas = document.getElementById('camera-canvas');
        var context = canvas.getContext('2d');
        var video = document.getElementById('video');
        canvas.height = canvas.width / video.videoWidth * video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        $("#camera-canvas").show();
        goToBottom();
    });

    $("#recorderButton").click(function(){
    	// console.log("recorderButton clicked");
        $('#audioAreaAtAdd').toggle();
        $("#textareaAtAdd").hide();
        $("#cameraAreaAtAdd").hide();
        goToBottom();
    });

    $("#textareaAtAdd").hide();
    $("#audioAreaAtAdd").hide();
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
            redirect();
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

function goToBottom() {
	// var documentHeight=document.documentElement.offsetHeight;
	// var viewportHeight=window.innerHeight;
	// window.scrollTo(0,documentHeight-viewportHeight);
    window.scrollTo(0,document.body.scrollHeight);
} 
// function that capitalize the first letter for each word. e.q. victor lin => Victor Lin
function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function redirect() { 
            setTimeout(function(){ window.location="/index"; } , 3000); 
}
