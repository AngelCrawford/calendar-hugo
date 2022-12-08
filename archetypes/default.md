---
title: "{{ replace .Name "-" " " | title }}"
subtitle: Ein Subtitle zum Testen in einem Event

date: {{ .Date }}
startDate: {{ .Date }}
endDate: {{ .Date }}
allDay: true

facebook: https://www.facebook.com/events/648460603506862
homepage: https://www.livingdead.de/events/ghostship.html

authors: angel

state: hh # hh, sh
kind: concert # concert, party, festival other

summary: Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

preSale: "15,00"
boxOffice: "20.00"

location: "Kitz • Schauenburgerstr. 116 • 24118 Kiel"
locationMap: false

status:
  label: cancel # possible: cancel, soldout
  reason: Abgesagt wegen Covid-19

corona: "2G • Keine Maskenpflicht"

resources:
  - src: "flyer.jpg"
    params:
      licence: MIT
      caption: "Fotograf Namen und Webseite"

_build:
  render: false # no permalink/single-page, we WANT THIS
  list: true # but render on the list pages
---

Lorem ipsum *dolor* sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
