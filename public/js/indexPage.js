'use strict';
var lastEmojiId = 0;

$(document).ready(function() {
    var eventDates = {};
    $(".time-bar").each(function(){
       eventDates[ new Date( $(this).attr('id') )] = new Date ( $(this).attr('id') );
    });
 	// Home: calendar function
    $("#datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            beforeShowDay: function(date) {
                var highlight = eventDates[date];
                if( highlight ) {
                     return [true, "event", ''];
                } else {
                     return [true, '', ''];
                }
            },
            onSelect: function() { 
            var dateObject = $(this).datepicker('getDate'); 
            console.log('Month: '+ dateObject.getMonth()+ ', Date: '+ dateObject.getDate()+ ', Year: '+ dateObject.getFullYear());

            var dateText = weekday(dateObject.getDay()) + ' ' + monthToString(dateObject.getMonth()) + ' ' + 
                        dateObject.getDate() + ', ' + dateObject.getFullYear();
            console.log(dateText);
            var ele = $("p:contains("+ dateText +")");
            //console.log('divID found: ' + ele.offset().top);
            if (ele.length) {
                $('html, body').animate({
                    scrollTop: ele.offset().top - 282
                }, 500);
            }
        }
    })
    .hide();

    $("#calendar-button").click(function() {
       $("#datepicker").toggle(); 
       var calendarHeight = $('#datepicker').height();
       if ($('#datepicker').is(':visible')) {
            $('body').css('padding-top', calendarHeight+72+'px');
        }
        else {
            $('body').css('padding-top', 72+'px');
        }
    });

    $('.playButton').click(audioToggle);
    
});


function weekday(day) {
    //console.log(day.getDay());
    var d;
    switch(day) {
        case 1:
            d = "Mon.";
            break;
        case 2:
            d = "Tue.";
            break;
        case 3:
            d = "Wed.";
            break;
        case 4:
            d = "Thu.";
            break;
        case 5:
            d = "Fri.";
            break;
        case 6:
            d = "Sat.";
            break;
        case 0:
            d = "Sun.";
            break;
    }
    return d;
}


function monthToString(m) {
    var monthText;
    switch(m) {
        case 0:
            monthText = "Jan";
            break;
        case 1:
            monthText = "Feb";
            break;
        case 2:
            monthText = "Mar";
            break;
        case 3:
            monthText = "Apr";
            break;
        case 4:
            monthText = "May";
            break;
        case 5:
            monthText = "Jun";
            break;
        case 6:
            monthText = "Jul";
            break;
        case 7:
            monthText = "Aug";
            break;
        case 8:
            monthText = "Sep";
            break;
        case 9:
            monthText = "Oct";
            break;
        case 10:
            monthText = "Nov";
            break;
        case 11:
            monthText = "Dec";
            break;
    }
    return monthText;
}

function audioToggle(e){
    e.stopPropagation();
    if($(this).hasClass("on")){
        $(this).removeClass("on");
        var elements = document.getElementsByClassName($(this).attr('id'));
        elements[0].pause();
        // document.getElementById('player').pause()
        $(this).attr("src", "../images/play.png")        
    }else{
        $(this).addClass("on");
        var elements = document.getElementsByClassName($(this).attr('id'));

        var idx = elements[0].src.indexOf('?');
        if(idx!=-1)
            elements[0].src = elements[0].src.substr(0,idx);
        
        elements[0].src = elements[0].src +"?"+ new Date().getTime();

        elements[0].play();
        // document.getElementById('player').play()
        $(this).attr("src", "../images/pause.png")
    }
}