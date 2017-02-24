'use strict';
var lastEmojiId = 0;
var text ="";

//Used for audio recorder 
var recording = false;
var audioRecord ="";

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

        navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

        if (navigator.getUserMedia){
            // console.log('getUserMedia supported.');
            var chunks = []; // The container for the audio             
            var soundClips = document.querySelector('.sound-clips');
            var record = document.getElementById('recordButton');

            var onSuccess = function(stream) {
                var mediaRecorder = new MediaRecorder(stream);
                visualize(stream);

                record.onclick = function() {
                    
                    if(soundClips.childElementCount != 0){
                        soundClips.removeChild(soundClips.childNodes[1]);
                    }
                    if(recording==false){
                        mediaRecorder.start();
                        // console.log(mediaRecorder.state);
                        // console.log("recorder started");
                        record.style.background = "red";
                        record.textContent = "Stop"
                    }else{
                        mediaRecorder.stop();
                        // console.log(mediaRecorder.state);
                        // console.log("recorder stopped");
                        record.style.background = "";
                        record.style.color = "";
                        record.textContent = "Record"    
                    }
                    recording =!recording;
                  }

                mediaRecorder.onstop = function(e) {
                    // console.log("data available after MediaRecorder.stop() called.");
                    // var clipName = prompt('Enter new name for your sound clip?','My clip');

                    var clipContainer = document.createElement('article');
                    var clipLabel = document.createElement('p');
                    var audio = document.createElement('audio');
                    var deleteButton = document.createElement('button');

                    clipContainer.classList.add('clip');
                    audio.setAttribute('controls', '');
                    deleteButton.textContent = 'Delete';
                    deleteButton.className = 'delete';

                    // if(clipName === null) {
                    //     clipLabel.textContent = 'My unnamed clip';
                    // } else {
                    //     clipLabel.textContent = clipName;
                    // }

                    clipContainer.appendChild(audio);
                    // clipContainer.appendChild(clipLabel);
                    clipContainer.appendChild(deleteButton);
                    soundClips.appendChild(clipContainer);

                    audio.controls = true;
                    var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                    chunks = [];
                    var audioURL = window.URL.createObjectURL(blob); 
                    audio.src = audioURL;
                    
                    //Save to global var.
                    audioRecord = blob;

                    goToBottom();

                    deleteButton.onclick = function(e) {
                        saveAudio(audioRecord);
                        audioRecord = "";
                        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                    }

                    // clipLabel.onclick = function() {
                    //     var existingName = clipLabel.textContent;
                    //     var newClipName = prompt('New name for your sound clip');
                    //     if(newClipName === null) {
                    //       clipLabel.textContent = existingName;
                    //     } else {
                    //       clipLabel.textContent = newClipName;
                    //     }
                    // }
                }

                mediaRecorder.ondataavailable = function(e) {
                    chunks.push(e.data);
                }
            }

            var onError = function(err) {
                console.log('The following error occured: ' + err);
            }

            navigator.getUserMedia({ audio: true }, onSuccess, onError);
        
        } else {
            console.log('getUserMedia not supported!');
            alert('getUserMedia not supported!');
        }

        $('#audioAreaAtAdd').toggle();
        $("#textareaAtAdd").hide();
        $("#cameraAreaAtAdd").hide();
        goToBottom();
    });

    $("#textareaAtAdd").hide();
    $("#cameraAreaAtAdd").hide();
    $("#audioAreaAtAdd").hide();

    $('#datetime24').combodate({
        value:  moment().format('hh:mm')
    });
});

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


function goToBottom() {
    window.scrollTo(0,document.body.scrollHeight);
}

function saveAudio(blob){
    var formData = new FormData();
    formData.append('data', blob);
    var reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
        var base64data = reader.result;         
        var context = {'data':base64data};
        $.post( '/test', context);
    }
}


//Functions for audio player drawing
function visualize(stream) {

    var canvas = document.querySelector('.visualizer');
    var audioCtx = new (window.AudioContext || webkitAudioContext)();
    var canvasCtx = canvas.getContext("2d");
    var audioCtx = new (window.AudioContext || webkitAudioContext)();
    var canvasCtx = canvas.getContext("2d");
    var source = audioCtx.createMediaStreamSource(stream);
    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    
    source.connect(analyser);
    draw()
    function draw() {

        requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();
        var sliceWidth = canvas.width * 1.0 / bufferLength;
        var x = 0;
        for(var i = 0; i < bufferLength; i++) {
     
            var v = dataArray[i] / 128.0;
            var y = v * canvas.height/2;
            if(i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
    }
}