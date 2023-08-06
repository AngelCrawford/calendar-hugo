document.addEventListener('DOMContentLoaded', function() {

  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'local',
    locale: 'de',
    height: 'auto',
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,today,next'
    },
    initialView: 'listMonth',
    // googleCalendarApiKey: 'AIzaSyBHZjQ98m4MH-6XdAJFhA5e2WgbkKhNNjg',
    displayEventTime: false,
    eventContent: function(arg) {
      createDiv = document.createElement('div');
   
      var flyerCopyright = (arg.event.extendedProps.flyerCopyright) ? '<figcaption>' + arg.event.extendedProps.flyerCopyright + '</figcaption>' : '';
      var flyer = (arg.event.extendedProps.flyer) ? '<div class="column is-2"><figure class="image is-1by1"><img src="' + arg.event.extendedProps.flyer + '" alt="' + arg.event.title + '" loading="lazy" />' + flyerCopyright + '</figure></div>' : '';
      var subtitle = (arg.event.extendedProps.subtitle) ? '<h4>' + arg.event.extendedProps.subtitle + '</h4>' : '';
      var infoStatus = (arg.event.extendedProps.infoStatus) ? arg.event.extendedProps.infoStatus : '';
      var infoReason = (arg.event.extendedProps.infoReason) ? '<div>' + arg.event.extendedProps.infoReason + '</div>' : '';
      var desc = (arg.event.extendedProps.description) ? '<p>' + arg.event.extendedProps.description + '</p>' : '';
      var filterKind = (arg.event.extendedProps.filterKind) ? arg.event.extendedProps.filterKind : '';

      // console.log(filterKind);

      var location = '';
      if (arg.event.extendedProps.locationAddress) {
        var argloc = arg.event.extendedProps.locationAddress;
        var arglocV = arg.event.extendedProps.locationVenue;
        location = '<li class="event-location"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#map-pin-line"></use></svg><span>';

        if (arg.event.extendedProps.locationShowMap != false ) {
          location = location + '<a href="https://maps.google.com/?q=' + arglocV + ', ' + argloc + '" title="' + arglocV + ' ' + argloc + '" target="_blank"><b>' + arglocV + '</b><br />' + argloc + '</a>';
        } else {
          location = location + '<b>' + arglocV + '</b><br />' + argloc;
        }
        location = location + '</span></li>';
      }

      var dateEntry = (arg.event.extendedProps.dateEntry) ? '<li class="event-entry"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#time-line"></use></svg><span>' + moment(arg.event.extendedProps.dateEntry).format('HH:mm') + ' Uhr</span></li>' : '';
      
      var pricePreSale = (arg.event.extendedProps.pricePreSale) ? '<li class="event-pricePreSale"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#coupon-3-line"></use></svg><span>' + arg.event.extendedProps.pricePreSale + ' €</span></li>' : '';
      var priceBoxOffice = (arg.event.extendedProps.priceBoxOffice) ? '<li class="event-priceBoxOffice"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#price-tag-3-line"></use></svg><span>' + arg.event.extendedProps.priceBoxOffice + ' €</span></li>' : '';

      var infoCorona = (arg.event.extendedProps.infoCorona) ? '<li class="event-infoCorona"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#surgical-mask-line"></use></svg><span>' + arg.event.extendedProps.infoCorona + '</span></li>' : '';

      locationVirtual = (arg.event.extendedProps.locationVirtual) ? '<li class="event-virtual"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#signal-tower-line"></use></svg><span>Virtuelles Event</span>' : '';

      var linkFacebook = (arg.event.extendedProps.linkFacebook) ? '<a href="' + arg.event.extendedProps.linkFacebook + '" title="linkFacebook Link" target="_blank"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#facebook-circle-line"></use></svg></a>' : '';
      var linkHomepage = (arg.event.extendedProps.linkHomepage) ? '<a href="' + arg.event.extendedProps.linkHomepage + '" title="linkHomepage Link" target="_blank"><svg class="remix"><use xlink:href="/fonts/remixicon/remixicon.symbol.svg#links-fill"></use></svg></a>' : '';
      var links = (linkFacebook.length != '' || linkHomepage.length != '') ? '<div class="event-links">' + linkFacebook + linkHomepage + '</div>' : '';

      if (location.length != '' || dateEntry.length != '' || pricePreSale.length != '' || priceBoxOffice.length != '' || infoCorona.length != '' || locationVirtual.length != '') {
        var eventFooter = '<div class="event-footer"><ul>' + location + dateEntry + pricePreSale + priceBoxOffice + infoCorona + locationVirtual + '</ul></div>';
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

      createDiv.innerHTML = '<div class="fc-list-event-time ' + infoStatus + '">' + string + '</div>' + 
                            '<div class="fc-list-event-body columns is-gapless ' + infoStatus + '">' + 
                              eventFooter +
                              '<div class="column event-wrapper">' +
                                '<h3>' + arg.event.title + '</h3>' + infoReason + subtitle +  
                                desc +
                              '</div>' +
                              links +
                              flyer +
                            '</div>';
      
      let arrayOfDomNodes = [ createDiv ];
      return { domNodes: arrayOfDomNodes };
    },
    googleCalendarApiKey: 'AIzaSyBHZjQ98m4MH-6XdAJFhA5e2WgbkKhNNjg',
    eventSources: [
      // { googleCalendarId: '4ce40c3143709f3fab95d5b714fdd3de717a8ab6297a74e57d073e2db913d2b0@group.calendar.google.com' },
      { url: '/events/index.json'}
    ],
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
        result = result && states.indexOf(info.event.extendedProps.filterState) >= 0 || info.event.extendedProps.filterState === null;
      }
      // If there are specific types of events
      if (kinds.length) {
        result = result && kinds.indexOf(info.event.extendedProps.filterKind) >= 0 || info.event.extendedProps.filterKind == 'holiday';
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