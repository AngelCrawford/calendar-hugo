// $(document).ready(function () {

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
      googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
      eventSources: [
        {
          type: 'party',
          url: '/parties/index.json',
          color: 'yellow',
          textColor: 'black'
        },
        {
          type: 'concert',
          url: '/concerts/index.json',
          color: 'orange',
          textColor: 'black'
        },
        { 
          eventDataTransform: function(eventData) {
            eventData.rendering = 'background';
          },
          type: 'holiday',
          url: 'de.german#holiday@group.v.calendar.google.com' 
        }        
      ],

      eventRender : function(info) {
        const props = info.event.extendedProps, rendering = info.event.rendering;
        
        if (rendering == "background" && info.el.innerHTML.length == 0) {
            $(info.el).text(info.event.title);
          
            console.log(info.el);
        }
      },
      
      eventTimeFormat: { // like '14:30:00'
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
    });

    calendar.render();
  });
  

// });