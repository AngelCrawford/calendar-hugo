
let filter_option = "all";
// console.log(filter_option);
// $(document).ready(function () {
//   $('#' + filter_option).prop('checked', true);
// });

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'dayGrid', 'list', 'googleCalendar' ],
    timeZone: 'Europe/Berlin',
    locale: 'de',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,listWeek'
    },
    defaultDate: '2020-05-12',
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
        eventDataTransform: function(eventData) {
          eventData.rendering = 'background';
        },
        className: 'holiday',
        url: 'de.german#holiday@group.v.calendar.google.com' 
      }        
    ],
    eventRender : function(info) {
      // Holiday Background, add event title
      const props = info.event.extendedProps, rendering = info.event.rendering;
      if (rendering == "background") {
        $(info.el).text(info.event.title);
      }
      // Filter Options
      if (filter_option !== "all") {
        if ( (filter_option == "sh" || filter_option == "hamburg") && info.event.extendedProps.city !== filter_option ) {
          if (rendering != "background") {
            return false;
          }
        }
        if ( (filter_option == "concert" || filter_option == "party" || filter_option == "festival") && info.event.extendedProps.kind !== filter_option ) {
          if (rendering != "background") {
            return false;
          }
        }
      }
      // Past Event, add a class
      var d = new Date();
      if (info.event.end < d) {
        $(info.el).addClass("past-event");
      }
    },
    // TODO: Funktioniert nicht im FF aber im Chrome
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


  $('input[class=event_filter_box]').change(function() {
    filter_option = $(this).val();
    calendar.rerenderEvents();
  });
});
  