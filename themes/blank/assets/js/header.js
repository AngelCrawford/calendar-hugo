
// ***************** Sky Background Function
// THANKS: https://codepen.io/ellimccale/pen/wxzJMx
function dayNightSky() {
  
    var $sky = $(".brand-logo.sky");
  
    var location = {lat:"53.551086", long:"9.993682"};
    var now = new Date();
    var times = SunCalc.getTimes(now, location.lat, location.long);

    // console.log("2021-09-14T18:17:46.660Z");
    // console.log(SunCalc.getTimes(now, location.lat, location.long));
  
    var nightStart = [ times.night.getHours(), times.night.getMinutes() + 1 ];
    var nightEnd = [ times.nightEnd.getHours(), times.nightEnd.getMinutes() ];
  
    var dawnStart = [ times.nightEnd.getHours(), times.nightEnd.getMinutes() + 1 ];
    var dawnEnd = [ times.sunrise.getHours(), times.sunrise.getMinutes() ];
  
    var dayStart = [ times.sunrise.getHours(), times.sunrise.getMinutes() + 1 ];
    var dayEnd = [ times.sunset.getHours(), times.sunset.getMinutes() ];
  
    var duskStart = [ times.sunset.getHours(), times.sunset.getMinutes() + 1 ];
    var duskEnd = [ times.night.getHours(), times.night.getMinutes() ];
  
    var timeBlocks = [
        { start: nightStart, end: nightEnd, class: "night" },
        { start: dawnStart, end: dawnEnd, class: "dawn" },
        { start: dayStart, end: dayEnd, class: "day" },
        { start: duskStart, end: duskEnd, class: "night" }
    ]
  
    // Start by looping through the objects in the timeBlocks array
    for ( var i = 0; i < timeBlocks.length; i++ ) {
        // Select the current timeBlock
        var timeOfDay = timeBlocks[i];
        // console.log("Time of Day: ", timeOfDay);
  
        if ( isTimeBetween(timeOfDay.start, timeOfDay.end) ) {
            $sky.addClass(timeOfDay.class);
        }
    }

    if ( $sky.hasClass("night") ) {
        $("#sky-stars-wrapper").css("display", "block");
    } else {
        $("#sky-stars-wrapper").css("display", "none");
    }

    if ( $sky.hasClass("day") || $sky.hasClass("dusk") ) {
        $("#hotairballoon").css("display", "block");
    } else {
        $("#hotairballoon").css("display", "none");
    }
    
    var dateObject = new Date();
    var month = dateObject.getMonth() + 1;
    var day = dateObject.getDate();
    var nowDate = dateObject.getFullYear() + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day;
  
    var xmasStart = dateObject.getFullYear() + "-12-01";
    var xmasEnd = dateObject.getFullYear() + "-12-27";
    if (nowDate >= xmasStart && nowDate <= xmasEnd) {
        $("#santahat").css("display", "block");
    } else {
        $("#santahat").css("display", "none");
    }
  
    var halloweenStart = dateObject.getFullYear() + "-10-07";
    var halloweenEnd = dateObject.getFullYear() + "-10-31";
    if (nowDate >= halloweenStart && nowDate <= halloweenEnd) {
        $("#ghosty").css("display", "block");
    } else {
        $("#ghosty").css("display", "none");
    }
  
}
  

function compare(a, b) {
    if (a.commentsCount < b.commentsCount)
        return 1;
    if (a.commentsCount > b.commentsCount)
        return -1;
    return 0;
}
  
function isTimeBetween(startTimeAsArray, endTimeAsArray) {
    // THANKS: https://stackoverflow.com/a/25958232
  
    var startTime = startTimeAsArray;
    var endTime = endTimeAsArray;
  
    // We've got the two start times as an array of hours/minutes values.
    var dateObj = new Date(); 
    // var now = [23, 0]; // For testing purpose, set now time here
    var now = [dateObj.getHours(), dateObj.getMinutes()]; // Gets the current Hours/Minutes
  
    // If startTime is bigger than endTime
    if ( endTime[0] < startTime[0] && now[0] < startTime[0] ) {
        startTime[0] -= 24; // This is something I came up with because I do a lot of math.
    } else if ( startTime[0] > endTime[0] ) {
        endTime[0] += 24;
    }
  
    // the time strings converted to a string format. Made comparisons easier.
    var startString = to_hm_string(startTime);
    var endString = to_hm_string(endTime);
    var nowString = to_hm_string(now);
  
    // console.log("Now:", nowString, "Start:", startString, "End:", endString);
  
    var status = (startString <= nowString && nowString <= endString) ? true : false;
    // console.log(status);
    return status;
}
  
// Numbers to String, if startTime bigger than endTime, set startTime to minus
// startTime(18:18) endTime(06:26) = startTime(-06:18) endTime(06:26)
function to_hm_string(timearr){ 
    var hours = "";
    var minutes = timearr[1];
  
    if ( Math.abs(timearr[0]) < 10 ) {
        hours = "0";
    }
    hours = ( timearr[0] < 0 ) ? "-" + hours + Math.abs(timearr[0]) : hours + timearr[0];
    minutes = (minutes < 10 ? '0' : '') + minutes;
  
    // console.log(hours + ":" + minutes);
    return hours + ":" + minutes;
}

document.addEventListener('DOMContentLoaded', function() {
    // ***************** Night Sky Funktion einmal aufrufen
    dayNightSky();
});