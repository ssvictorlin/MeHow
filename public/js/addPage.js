'use strict';
var lastEmojiId = 0;
var text ="";
$(document).ready(function() {
    // ADD: emoji table selection
    $(".emoji_ADDPAGE").click(function(){
    	//Draw the clicked one.
		$(this).attr("class","selected");
		var EmojiId = $(this).attr("id");
		//Undraw the last one.
		if(EmojiId!=lastEmojiId)
             $("#"+lastEmojiId).attr("class","emoji_ADDPAGE");

    	//Update EmojiId
    	lastEmojiId = EmojiId;
    	console.log(EmojiId);
    });

    $("#memoButton").click(function(){
    	// console.log("memoButton clicked");  
    	$("#textareaAtAdd").toggle();
        $("#audioAreaAtAdd").hide();
        $("#cameraAreaAtAdd").hide();
    	goToBottom();
    });

    $("#cameraButton").click(function(){
        var video = document.getElementById('video');
        // Get access to the camera!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                video.src = window.URL.createObjectURL(stream);
            });
        }
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
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        $("#camera-canvas").show();
        goToBottom();
    });

    $("#gallery").click(function(){
        console.log("gallery clicked");
        var x = document.createElement("INPUT");
        x.setAttribute("type", "file");
        x.setAttribute("accept", "image/*");
        x.click();
        x.onchange = function() {
            readImage(this);
        };
    });

    $("#recorderButton").click(function(){
    	// console.log("recorderButton clicked");
        $('#audioAreaAtAdd').toggle();
        $("#textareaAtAdd").hide();
        $("#cameraAreaAtAdd").hide();
        goToBottom();
    });

    $("#textareaAtAdd").hide();
    $("#cameraAreaAtAdd").hide();
    $("#audioAreaAtAdd").hide();

    $('#datetime24').combodate();
});

function goToBottom() {
	// var documentHeight=document.documentElement.offsetHeight;
	// var viewportHeight=window.innerHeight;
	// window.scrollTo(0,documentHeight-viewportHeight);
    window.scrollTo(0,document.body.scrollHeight);
}

function readImage(input) {
    console.log("change image!!");
    if (input.files && input.files[0]) {
        console.log("draw image!!");
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function(){
                var canvas = document.getElementById('camera-canvas');
                var context = canvas.getContext('2d');
                console.log(canvas.width + " " + canvas.height);
                canvas.height = canvas.width / img.width * img.height;
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }

    $('#camera-modal').modal('toggle');
    goToBottom();
}