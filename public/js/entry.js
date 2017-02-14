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

    $("#edit-button").hide();
    $("#delete-button").show();
    $("#cancel-button").show();
    $("#save-button").show();
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

    $("#edit-button").show();
    $("#delete-button").hide();
    $("#cancel-button").hide();
    $("#save-button").hide();
}

function save(e) {
    e.preventDefault();
    console.log("save!!");
    close_edit(e);
    
}

function choose_emoji(e) {
    e.preventDefault();
    $(this).addClass("selected");
    $("#emoji-modal").modal("toggle");
    $("#entry-emoji").attr("src", $(this).attr("src"));
}