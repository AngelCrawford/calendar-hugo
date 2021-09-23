document.addEventListener('DOMContentLoaded', function() {

  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'Europe/Berlin',
    locale: 'de',
    height: 'auto',
    // aspectRatio: 2,
    headerToolbar: {
      left: 'title',
      center: '',
      // right: 'prev,today,next dayGridWeek,listWeek'
      right: 'prev,today,next'
    },
    weekNumbers: true,
    initialView: 'listWeek',
    googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    // dayHeaderContent: function(args) {
    //     console.log(args);
    //     return "<span>" + moment(args.date).format('dd') + "</span>" + moment(args.date).format('DD.MM.');
    // },
    views: {
      dayGridWeek: {
        titleFormat: '{DD.{MM.}}YYYY'
      },
      listWeek: {
        titleFormat: '{DD.{MM.}}YYYY'
      }
    },
    eventContent: function(arg) {
      createDiv = document.createElement('a');
      createDiv.href = arg.event.url;
      createDiv.title = arg.event.title;

      var desc = (arg.event.extendedProps.summary) ? arg.event.extendedProps.summary : '';
      
      createDiv.innerHTML = '<strong>' + arg.event.title + '</strong><br/>' + desc;
      
      let arrayOfDomNodes = [ createDiv ];
      return { domNodes: arrayOfDomNodes };
    },
    eventSources: [
      {
        eventDataTransform: function(eventData) {
          if(eventData.kind == "concert") {
            eventData.className = "concert";
            eventData.backgroundColor = "#009688";
          }
          if(eventData.kind == "party") {
            eventData.className = "party";
            eventData.backgroundColor = "#53c0a2";
          }
          if(eventData.kind == "festival") {
            eventData.className = "festival";
            eventData.backgroundColor = "#005f5c";
          }
          if(eventData.kind == "other") {
            eventData.className = "other";
            eventData.backgroundColor = "#7fb4a6";
          }
          if(eventData.kind == "holiday") {
            eventData.className = "holiday";
            eventData.allDay = true;
            eventData.backgroundColor = "red";
          }
        },
        url: '/events/index.json'
      },
      {
        eventDataTransform: function(eventData) {
          eventData.display = 'background';
          eventData.kind = 'holiday';
          eventData.groupId = 'holiday';
          eventData.allDay = true;
        },
        className: 'holiday',
        // url: 'de.german#holiday@group.v.calendar.google.com' 
        // url: '/data/holidays.json'
      }        
    ],
    eventDidMount: function(info) {
      var tooltip = "<strong>" + info.event.title + "</strong><br />" + info.event.extendedProps.content;

      if(info.event.extendedProps.kind != "holiday") {
        tippy(info.el, {
          content: tooltip,
          allowHTML: true
        });
      }

      // Past Event, add a class
      var d = new Date();
      if (info.event.end < d) {
        $(info.el).addClass("past-event");
      }
    },
    eventClassNames: function(info) {
        
      var result = true;
      var states = [];
      var kinds = [];
      
      // Show holiday events always 
      kinds.push('holiday');
      
      // Find all checkbox that are event filters and enabled and save the values.
      $("input[name='event_filter_sel']:checked").each(function () {
        // Saving each type separately
        if ($(this).data('type') == 'state') {
          states.push($(this).val());
        }
        else if ($(this).data('type') == 'kind') {
          kinds.push($(this).val());
        }
      });
      
      // console.log(info.event.title + " - " + info.event.extendedProps.state + " - " + states.length);
      
      // If there are locations to check
      if (states.length) {
        result = result && states.indexOf(info.event.extendedProps.state) >= 0 || info.event.extendedProps.state === null;
      }
      // If there are specific types of events
      if (kinds.length) {
        result = result && kinds.indexOf(info.event.extendedProps.kind) >= 0 || info.event.extendedProps.kind == 'holiday';
      }
      
      if (!result) {
        result = "hidden";
      }
      
      return result;
    },

    windowResize: function(view) {
      var current_view = view.type;
      var expected_view = $(window).width() > 800 ? 'dayGridMonth' : 'listWeek';
      if (current_view !== expected_view) {
        calendar.changeView(expected_view);
      }
    },
  });

  calendar.render();

  if ($(window).width() < 800) {
    calendar.changeView('listWeek');
  }

  $('input[class=event_filter]').change(function() {
    calendar.render();
  });
  

  // Bulma Navbar Header Toggle
  
  // ***************** Navigation
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
  
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
  
  
  $(".navbar-item.has-dropdown").click(function () { 
    $(this).children('.navbar-dropdown').toggle();
  });
  
  if ($(window).width() <= 1023) {
    $(".navbar-item.has-dropdown a.navbar-link").removeAttr("href");
  }
  
});