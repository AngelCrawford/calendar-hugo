// $(document).ready(function () {

  console.log("Ready...");


  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid', 'list' ],
      timeZone: 'Europe/Berlin',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,listWeek'
      },
      defaultDate: '2020-05-12',
      eventLimit: false,
      weekNumbers: true,
      eventSources: [
        {
          url: '/parties/index.json',
          color: 'yellow',
          textColor: 'black'
        },
        {
          url: '/concerts/index.json',
          color: 'orange',
          textColor: 'black'
        }
      ],
      eventTimeFormat: { // like '14:30:00'
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
    });

    calendar.render();
  });
  

// });