---
title: {{ replace .Name "-" " " | title }}
subtitle: Ein Subtitle zum Testen in einem Event
authors: angel
summary: Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet
filter:
  kind: concert # concert, party, festival, other, holiday
  state: hh # hh, sh, further
dates:
  start: {{ .Date }}
  end: {{ .Date }}
  entry: {{ .Date }}
  allDay: true
location:
  venue: Name of club
  address: Eine Straße 25, 24118 Hamburg
  showMap: false
  virtual: false
price:
  preSale: 15,00
  boxOffice: 20.00
info:
  corona: 2G • Keine Maskenpflicht
  status: cancelled # possible: cancelled, soldout
  reason: Abgesagt wegen Covid-19
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
