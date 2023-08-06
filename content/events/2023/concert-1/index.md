---
title: "Concert #1"
filter:
  kind: concert # concert, party, festival other
  state: sh # hh, sh, further
dates:
  start: 2023-08-18T10:58:08
  end: 2023-08-18T20:00:08
  entry: 2023-08-18T09:00:08
  allDay: false
location:
  venue: Name of club
  address: Eine Straße 25, 24118 Hamburg
  showMap: true
price:
  preSale: 15,00
  boxOffice: 20,00
info:
  status: soldout # possible: cancelled, soldout
link:
  facebook: https://www.facebook.com
  homepage: https://www.livingdead.de
flyer:
  img: /flyer.jpg
  copyright: "Lorem ipsum dolor sit amet"
resources:
  - src: "flyer.jpg"
    params:
      licence: MIT
      caption: "Fotograf Namen und Webseite"
_build:
  render: false # no permalink/single-page, we WANT THIS
  list: true # but render on the list pages
---

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.