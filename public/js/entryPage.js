'use strict';

var current_data = {
    "memo": "",
    "date": {"month": "", "day": "", "year": ""},
    "time": {"hour": "", "minute": ""},
    "imageURL": "",
    "emoji": "",
    "emojiImageURL": "",
    "audioURL": ""
};

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
    console.log($("#entry-container").data("entryid"));

    // save initial data
    current_data.memo = $("#edit-text").val();
    current_data.time.hour = $("#entry-time").text().substr(0, 2);
    current_data.time.minute = $("#entry-time").text().substr(3, 2);
    current_data.date.month = $("#entry-time").data("month");
    current_data.date.day = $("#entry-time").text().substr(15, 2);
    current_data.date.year = $("#entry-time").text().substr(19, 4);
    current_data.imageURL = $("#entry-image").attr("src");
    current_data.emoji = $("#entry-emoji").data("emojiid");
    current_data.emojiImageURL = $("#entry-emoji").attr("src");
    // current_data.audioURL;
    console.log(current_data.memo);
    console.log(current_data.time);
    console.log(current_data.date);
    console.log(current_data.imageURL);
    console.log(current_data.emoji);
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
    $('#entry-time').show();

    show_content();
}

function save(e) {
    e.preventDefault();
    console.log("save!!");
    current_data.memo = $("#edit-text").val();
    current_data.time.hour = $('#datetime24').val().substr(0, 2);
    current_data.time.minute = $('#datetime24').val().substr(3, 2);
    current_data.date.month = $('#datetime24').val().substr(6, 2);
    current_data.date.day = $('#datetime24').val().substr(9, 2);
    current_data.date.year = $('#datetime24').val().substr(12, 4);
    current_data.imageURL = $("#entry-image").attr("src");
    current_data.emoji = $("#entry-emoji").data("emojiid");
    current_data.emojiImageURL = $("#entry-emoji").attr("src");
    // current_data.audioURL;
    console.log(current_data.memo);
    console.log(current_data.time);
    console.log(current_data.date);
    console.log(current_data.imageURL);
    console.log(current_data.emoji);
    console.log(current_data.emojiImageURL);
    close_edit(e);
}

function choose_emoji(e) {
    e.preventDefault();
    $("#emoji-modal").modal("toggle");
    $("#entry-emoji").data("emojiid", $(this).attr("id"));
    $("#entry-emoji").attr("src", $(this).attr("src"));
}

function show_content() {
    $("#edit-text").val(current_data.memo);
    $("#edit-text").height( $("#edit-text")[0].scrollHeight );
    $("#entry-time").text(current_data.time.hour + ":" + current_data.time.minute + " " + getWeekday(current_data.date) + " " + monthToString(current_data.date.month) + " " + current_data.date.day + ", " + current_data.date.year);
    $("#entry-image").attr("src", current_data.imageURL);
    $("#entry-emoji").attr("src", current_data.emojiImageURL);
    // current_audioURL;
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

function monthToString(month) {
    month = parseInt(month);
    switch(month) {
        case 1:
            return "Mon";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Apr";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aug";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
    }
}

function getWeekday(date) {
    console.log(date);
    var day = new Date(date.year, date.month - 1, date.day);
    console.log(day.getDay());
    switch(day.getDay()) {
        case 1:
            return "Mon.";
        case 2:
            return "Tue.";
        case 3:
            return "Wed.";
        case 4:
            return "Thu.";
        case 5:
            return "Fri.";
        case 6:
            return "Sat.";
        case 0:
            return "Sun.";
    }
}