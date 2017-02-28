'use strict';
$(document).ready(function() {
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
            var name = textfield.val();
            console.log("before post");

            $.post('/login', {"userName": name})
            .done(function( data ) {
                setTimeout(function(){ window.location="/index"; } , 2000);
            })
            .fail(function() {
                alert( "error" );
            });
            //redirect();
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

// function that capitalize the first letter for each word. e.q. victor lin => Victor Lin
function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function redirect() {
    setTimeout(function(){ window.location="/index"; } , 3000);
}


