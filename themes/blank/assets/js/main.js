document.addEventListener('DOMContentLoaded', function() {

  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'Europe/Berlin',
    locale: 'de',
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,today,next dayGridMonth,dayGridWeek,listWeek'
    },
    weekNumbers: true,
    initialView: 'dayGridMonth',
    googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    views: {
      dayGridWeek: {
        titleFormat: '{DD.{MM.}}YYYY'
      },
      listWeek: {
        titleFormat: '{DD.{MM.}}YYYY'
      }
    },
    eventSources: [
      {
        className: 'party',
        url: '/parties/index.json',
        color: 'yellow',
        textColor: 'black',
      },
      {
        className: 'concert',
        url: '/concerts/index.json',
        color: 'orange',
        textColor: 'black',
      },
      {
        className: 'festival',
        url: '/festivals/index.json',
        color: 'brightblue',
        textColor: 'white'
      },
      {
        className: 'other',
        url: '/others/index.json',
        color: 'red',
        textColor: 'white'
      },
      { 
        eventDataTransform: function(eventData) {
          eventData.display = 'background';
          eventData.kind = 'holiday';
          eventData.groupId = 'holiday';
          eventData.allDay = true;
        },
        className: 'holiday',
        url: 'de.german#holiday@group.v.calendar.google.com' 
      }        
    ],
    eventDidMount: function(info) {
      var tooltip = "<strong>" + info.event.title + "</strong><br />" + info.event.extendedProps.content;
      tippy(info.el, {
        content: tooltip,
        allowHTML: true
      });

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
      
      console.log(kinds);
      
      // If there are locations to check
      if (states.length) {
        result = result && states.indexOf(info.event.extendedProps.state) >= 0;
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