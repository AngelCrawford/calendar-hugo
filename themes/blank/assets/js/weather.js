document.addEventListener('DOMContentLoaded', function() {

    getWeather();

    function getWeather() {

        var temperature = document.getElementById("temperature");
        var description = document.getElementById("description");
        var location = document.getElementById("location");
        
        api = "https://api.openweathermap.org/data/2.5/weather";
        apiKey = "be6eb69db32a8acf3f8f046695d75bac";
        city = "Hamburg,DE";

        if (!navigator.geolocation){

            console.log("Geolocation is not supported by your browser");
            url = api + "?q=" + city + "&appid=" + apiKey + "&units=metric";

        } else {

            url = navigator.geolocation.getCurrentPosition(function(position) {
                url = api + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apiKey + "&units=metric";
                // console.log(url);
                return url;
                
            });
            console.log(url);


        }
        console.log(url);

        fetch(url)
        .then(response => response.json())
        .then(data => {
            icon = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" + data.weather[0].icon + ".svg";
      
            console.log(data);

            temperature.innerHTML = data.name + " - " + Math.round(data.main.temp) + "° C";
            description.innerHTML = data.weather[0].description;
            location.innerHTML = "<figure><img src=" + icon + " alt=" + data.weather[0].description + "><figcaption>" +
            data.weather[0].description + "</figcaption></figure>";
        });
    
    }
});