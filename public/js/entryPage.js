'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

function initializePage() {
    console.log("entry connected!");
    $("#edit-text").height( $("#edit-text")[0].scrollHeight );
    $("#edit-button").click( edit );

    $("#delete-button").hide();
    $("#delete-button").click( delete_entry );

    $("#cancel-button").hide();
    $("#cancel-button").click( close_edit );

    $("#save-button").hide();
    $("#save-button").click( save );

    $(".emojis").click( choose_emoji );
    $("#emoji-modal").modal("hide");

    $("#entry-image").attr("data-target", "#image-modal");
    $("#gallery").click( readImageFile );
    $("#snap").click( snapImage );

    $('#datetime24').hide();
}

function edit(e) {
    e.preventDefault();
    console.log("edit!!");
    $("#edit-text").attr("disabled", false);
    $("#edit-text").addClass("inputShadow");
    $("#entry-time").addClass("inputShadow");
    $("#entry-emoji").addClass("inputShadow");
    $("#entry-image").addClass("inputShadow");

    $("#entry-emoji").attr("data-target", "#emoji-modal");
    $("#entry-image").attr("data-target", "#camera-modal");

    $("#edit-button").hide();
    $("#delete-button").show();
    $("#cancel-button").show();
    $("#save-button").show();

    $('#datetime24').show();
    $('#datetime24').combodate();
    $('#entry-time').hide();

    previewCamera();
}

function delete_entry(e) {
    e.preventDefault();
    console.log("delete!!");
}

function close_edit(e) {
    e.preventDefault();
    $("#edit-text").attr("disabled", true);
    $("#edit-text").removeClass("inputShadow");
    $("#entry-time").removeClass("inputShadow");
    $("#entry-emoji").removeClass("inputShadow");
    $("#entry-image").removeClass("inputShadow");

    $("#edit-text").height( "auto" );
    $("#edit-text").height( $("#edit-text")[0].scrollHeight );

    $("#entry-emoji").attr("data-target", "");
    $("#entry-image").attr("data-target", "#image-modal");

    $("#edit-button").show();
    $("#delete-button").hide();
    $("#cancel-button").hide();
    $("#save-button").hide();

    $('#datetime24').combodate('destroy');
    $('#datetime24').hide();
    // console.log($('#datetime24').val());
    parseCombodate($('#datetime24').val());
    $('#entry-time').show();

    var video = document.getElementById('video');
    // video.pause();
}

function save(e) {
    e.preventDefault();
    console.log("save!!");
    close_edit(e);
    
}

function choose_emoji(e) {
    e.preventDefault();
    $("#emoji-modal").modal("toggle");
    $("#entry-emoji").attr("src", $(this).attr("src"));
}

function previewCamera() {
    var video = document.getElementById('video');
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
        });
    }
    video.play();
}

function snapImage() {
    console.log("snap clicked");
    $('#camera-modal').modal('toggle');
    var canvas = document.createElement('canvas');
    canvas.setAttribute("width", $("#entry-image").width);
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    canvas.setAttribute("height", canvas.width / video.videoWidth * video.videoHeight);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    $("#entry-image").attr("src", canvas.toDataURL(""));
    // $("#camera-canvas").show();
}

function readImageFile() {
    console.log("gallery clicked");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("accept", "image/*");
    x.click();
    x.onchange = function() {
        readImage(this);
    };
}

function readImage(input) {
    console.log("change image!!");
    if (input.files && input.files[0]) {
        console.log("draw image!!");
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.getElementById('entry-image');
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }

    $('#camera-modal').modal('toggle');
}

function parseCombodate(input) {
    console.log("parse " + input);
    var time = {"hour": "", "minute": ""}, date = {"month": "", "day": "", "year": ""};
    time.hour = parseInt(input.substr(0, 2));
    time.minute = parseInt(input.substr(3, 2));
    date.month = parseInt(input.substr(6, 2));
    date.day = parseInt(input.substr(9, 2));
    date.year = parseInt(input.substr(12, 4));
    console.log(time);
    console.log(date);
}