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
      right: 'prev,today,next'
    },
    initialView: 'listMonth',
    // googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
    displayEventTime: false,
    eventContent: function(arg) {
      createDiv = document.createElement('div');
      // createDiv.href = arg.event.url;
      // createDiv.title = arg.event.title;
   
      var flyerCopyright = (arg.event.extendedProps.flyerCopyright) ? '<figcaption>' + arg.event.extendedProps.flyerCopyright + '</figcaption>' : '';
      var flyer = (arg.event.extendedProps.flyer) ? '<div class="column is-2"><figure class="image is-1by1"><img src="' + arg.event.extendedProps.flyer + '" alt="' + arg.event.title + '" loading="lazy" />' + flyerCopyright + '</figure></div>' : '';
      var subtitle = (arg.event.extendedProps.subtitle) ? '<h4>' + arg.event.extendedProps.subtitle + '</h4>' : '';
      var statusLabel = (arg.event.extendedProps.statusLabel) ? arg.event.extendedProps.statusLabel : '';
      var statusReason = (arg.event.extendedProps.statusReason) ? '<div>' + arg.event.extendedProps.statusReason + '</div>' : '';
      var desc = (arg.event.extendedProps.summary) ? '<p>' + arg.event.extendedProps.summary + '</p>' : '';

      var location = '';
      if (arg.event.extendedProps.location) {
        var argloc = arg.event.extendedProps.location;
        location = '<li class="event-location"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#map-pin-line"></use></svg><span>';

        if (arg.event.extendedProps.locationMap != false ) {
          location = location + '<a href="https://maps.google.com/?q=' + argloc + '" title="' + argloc + '" target="_blank">' + argloc + '</a>';
        } else {
          location = location + argloc;
        }
        location = location + '</span></li>';
      }

      var entryTime = (arg.event.extendedProps.entryTime) ? '<li class="event-entry"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#time-line"></use></svg><span>' + moment(arg.event.extendedProps.entryTime).format('HH:mm') + ' Uhr</span></li>' : '';
      
      var preSale = (arg.event.extendedProps.preSale) ? '<li class="event-presale"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#coupon-3-line"></use></svg><span>' + arg.event.extendedProps.preSale + ' €</span></li>' : '';
      var boxOffice = (arg.event.extendedProps.boxOffice) ? '<li class="event-boxoffice"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#price-tag-3-line"></use></svg><span>' + arg.event.extendedProps.boxOffice + ' €</span></li>' : '';

      var corona = (arg.event.extendedProps.corona) ? '<li class="event-corona"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#surgical-mask-line"></use></svg><span>' + arg.event.extendedProps.corona + '</span></li>' : '';

      var facebook = (arg.event.extendedProps.facebook) ? '<a href="' + arg.event.extendedProps.facebook + '" title="FaceBook Link" target="_blank"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#facebook-circle-line"></use></svg></a>' : '';
      var homepage = (arg.event.extendedProps.homepage) ? '<a href="' + arg.event.extendedProps.homepage + '" title="Homepage Link" target="_blank"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#links-fill"></use></svg></a>' : '';
      var links = (facebook.length != '' || homepage.length != '') ? '<div class="event-links">' + facebook + homepage + '</div>' : '';

      if (location.length != '' || entryTime.length != '' || preSale.length != '' || boxOffice.length != '' || corona.length != '') {
        var eventFooter = '<div class="event-footer"><ul>' + location + entryTime + preSale + boxOffice + corona +'</ul></div>';
      } else {
        var eventFooter = '';
      }
      
      var startTime = moment(arg.event.start).format('HH:mm');
      var endTime = (arg.event.end) ? moment(arg.event.end).format('HH:mm') : '00:00';

      var startDate = moment(arg.event.start, 'YYYY/MM/DD HH:mm');
      var endDate = moment(arg.event.end, 'YYYY/MM/DD HH:mm');
      var hoursDiff = endDate.diff(startDate, 'hours', true);

      if (hoursDiff >= 24 || arg.event.allDay || arg.event.end == null) {
        string = '<span>Ganz</span><br />- tägig';
      } else {
        string = '<span>' + startTime + '</span><br />- ' + endTime + ' Uhr';
      }

      createDiv.innerHTML = '<div class="fc-list-event-time ' + statusLabel + '">' + string + '</div>' + 
                            '<div class="fc-list-event-body columns is-gapless ' + statusLabel + '">' + 
                              eventFooter +
                              '<div class="column event-wrapper">' +
                                '<h3>' + arg.event.title + '</h3>' + statusReason + subtitle +  
                                desc +
                              '</div>' +
                              links +
                              flyer +
                            '</div>';
      
      let arrayOfDomNodes = [ createDiv ];
      return { domNodes: arrayOfDomNodes };
    },
    eventSources: [{
      url: '/events/index.json'
    }],
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