document.addEventListener('DOMContentLoaded', function() {

  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'local',
    locale: 'de',
    height: 'auto',
    // aspectRatio: 2,
    headerToolbar: {
      left: 'title',
      center: '',
      // right: 'prev,today,next dayGridWeek,listWeek'
      right: 'prev,today,next'
    },
    // weekNumbers: true,
    initialView: 'listWeek',
    // googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
    // eventTimeFormat: {
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   hour12: false,
    //   meridiem: false
    // },
    displayEventTime: false,
    dayHeaderContent: function(args) {
        args.sideText = moment(args.date).format('DD.MM.YY');
    },
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

      var desc = (arg.event.extendedProps.summary) ? '<p>' + arg.event.extendedProps.summary + '</p>' : '';
      var location = (arg.event.extendedProps.location) ? '<span class="event-location"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#map-pin-line"></use></svg>' + arg.event.extendedProps.location + '</span>' : '';
      
      var imageCopyright = (arg.event.extendedProps.imageCopyright) ? '<figcaption>' + arg.event.extendedProps.imageCopyright + '</figcaption>' : '';
      var image = (arg.event.extendedProps.image) ? '<div class="column is-2"><figure class="image is-1by1"><img src="' + arg.event.extendedProps.image + '" alt="' + arg.event.title + '" loading="lazy" />' + imageCopyright + '</figure></div>' : '';

      var subtitle = (arg.event.extendedProps.subtitle) ? '<h4>' + arg.event.extendedProps.subtitle + '</h4>' : '';
      
      var preSale = (arg.event.extendedProps.preSale) ? '<span class="event-presale"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#coupon-3-line"></use></svg>' + arg.event.extendedProps.preSale + ' €</span>' : '';
      var boxOffice = (arg.event.extendedProps.boxOffice) ? '<span class="event-boxoffice"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#price-tag-3-line"></use></svg>' + arg.event.extendedProps.boxOffice + ' €</span>' : '';

      var corona = (arg.event.extendedProps.corona) ? '<span class="event-corona"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#surgical-mask-line"></use></svg>' + arg.event.extendedProps.corona + '</span>' : '';
      var startTime = moment(arg.event.start).format('HH:mm');
      var endTime = moment(arg.event.end).format('HH:mm');

      var startDate = moment(arg.event.start, 'YYYY/MM/DD HH:mm');
      var endDate = moment(arg.event.end, 'YYYY/MM/DD HH:mm');
      var hoursDiff = endDate.diff(startDate, 'hours', true);

      console.log();

      if (hoursDiff >= 24 || arg.event.allDay) {
        // string = '<span>00:00</span><br />- 00:00 Uhr';
        string = '<span>Ganz</span><br />- tägig';
      } else {
        string = '<span>' + startTime + '</span><br />- ' + endTime + ' Uhr';
      }

      createDiv.innerHTML = '<div class="fc-list-event-time">' + string + '</div>' + 
                            '<div class="fc-list-event-body columns is-gapless">' + 
                              '<div class="column event-wrapper">' +
                                '<h3>' + arg.event.title + '</h3>' + subtitle +  
                                desc +  '<div class="event-footer">' + location + preSale + boxOffice + corona + '</div>' +
                              '</div>' +
                              image +
                            '</div>';
      
      let arrayOfDomNodes = [ createDiv ];
      return { domNodes: arrayOfDomNodes };
    },
    eventSources: [{
      url: '/events/index.json'
    }],
    eventDidMount: function(info) {
      // var tooltip = "<strong>" + info.event.title + "</strong><br />" + info.event.extendedProps.content;

      // if(info.event.extendedProps.kind != "holiday") {
      //   tippy(info.el, {
      //     content: tooltip,
      //     allowHTML: true
      //   });
      // }

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

    // windowResize: function(view) {
    //   var current_view = view.type;
    //   var expected_view = $(window).width() > 800 ? 'dayGridMonth' : 'listWeek';
    //   if (current_view !== expected_view) {
    //     calendar.changeView(expected_view);
    //   }
    // },
  });

  calendar.render();

  // if ($(window).width() < 800) {
  //   calendar.changeView('listWeek');
  // }

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