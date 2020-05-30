document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'dayGrid', 'list', 'googleCalendar' ],
    timeZone: 'Europe/Berlin',
    locale: 'de',
    header: {
      left: 'prev today next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,listWeek'
    },
    eventLimit: false,
    weekNumbers: true,
    defaultView: 'dayGridMonth',
    googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
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
          eventData.rendering = 'background';
          eventData.kind = 'holiday';
        },
        className: 'holiday',
        url: 'de.german#holiday@group.v.calendar.google.com' 
      }        
    ],
    eventRender : function(info) {


      // Holiday Background, add event title
      if (info.event.rendering == "background") {
        $(info.el).text(info.event.title);
      }

      // Past Event, add a class
      var d = new Date();
      if (info.event.end < d) {
        $(info.el).addClass("past-event");
      }

      var display = true;
      var states = [];
      var kinds = [];
      kinds.push('holiday');
      // Find all checkbox that are event filters that are enabled and save the values.
      $("input[name='event_filter_sel']:checked").each(function () {
        // Saving each type separately
        if ($(this).data('type') == 'state') {
          states.push($(this).val());  
        }
        else if ($(this).data('type') == 'kind') {
          kinds.push($(this).val());
        }
      });
      
      // If there are locations to check
      if (states.length) {
        display = display && states.indexOf(info.event.extendedProps.state) >= 0;
      }
      // If there are specific types of events
      if (kinds.length) {
        display = display && kinds.indexOf(info.event.extendedProps.kind) >= 0 || info.event.extendedProps.kind == 'holiday';
      }
      // If all filters are deselected, show all
      if(kinds.length == 1 && !states.length) {
        display = true;
      }

      return display;
    },

    windowResize: function(view) {
      var current_view = view.type;
      var expected_view = $(window).width() > 700 ? 'dayGridMonth' : 'listWeek';
      if (current_view !== expected_view) {
        calendar.changeView(expected_view);
      }
    },
  });

  calendar.render();

  if ($(window).width() < 700) {
    calendar.changeView('listWeek');
  }

  $('input[name="event_filter_sel"]').change(function() {
    calendar.rerenderEvents();
  });
});
  