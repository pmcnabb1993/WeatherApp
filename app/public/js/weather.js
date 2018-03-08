$(document).ready(function() {
    getWeather();
    getTime();
    getIcon();
  
    $("#search-box").keyup( event => {
      if (event.keyCode == 13) {
        $("#search-button").click();
      }
    });
  });

//Function I got from Google Maps to style the map//
  function initMap( lat, long ) {
    let uluru = { lat: lat, lng: long };
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru,
      //Night mode style
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
      
       
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });

    let marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
  
  console.log(getWeather);
  
  function searchWeather() {
    let searchQuery = $('.search').val(); // grab value from search input
    getWeather(searchQuery);
  }
  
  function getWeather( searchQuery ) {
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
    let params = {
      APPID: apiKey,
      units: 'imperial'
    };
    if (searchQuery) {
      params.q = searchQuery;
    } else {
      params.id = 4930956
    }
  
    $.ajax(url + $.param( params ), {
      success: ( data ) => onSuccess( data ),
      error: function (error) {
        $('.error-message').text('City not found, try again!');
      }
    });
  
    function onSuccess( data ) {
  
      $('.error-message').empty();
  
      let temp = Math.round(data.main.temp);
      let max = Math.round(data.main.temp_max);
      let min = Math.round(data.main.temp_min);
  
      if ( data.weather[0].description === 'clear sky') {
        data.weather[0].description = 'clear skies';
      }
  
      $('.city').text(data.name);
      $('.country').text(data.sys.country);
      $('.description').text(data.weather[0].description);
      $('.temp').text(temp);
      $('.max').text(max);
      $('.min').text(min);
      $('.humidity').text('Humidity: ' + data.main.humidity + '%');
      $('.wind').text('Wind: ' + data.wind.speed + ' mph');
      
  
      getIcon( data.weather[0].icon );

      let lat = parseFloat(data.coord.lat);
      let long = parseFloat(data.coord.lon);
    initMap( lat, long );
  
      
    }
  }
  
  function getTime() {
    let currentdate = new Date();
    let hours = currentdate.getHours();
    let minutes = currentdate.getMinutes();
    let ampm;
  
    if ( hours > 12 ) {
      ampm = 'PM'
      hours -= 12;
    } else {
      ampm = 'AM';
    }
  
    if ( minutes < 10 ) {
      minutes = '0' + minutes;
    }
  
    let time = hours + ":" + minutes;
    $('.time').text(time);
    $('.ampm').text(ampm);
  }

  
  function getIcon( data ) {
  
    let $icon = $('.icon');
  
    switch (data) {
      // day
      case '01d':
      $icon.addClass('wi wi-day-sunny');
      break;
      case '02d':
      $icon.addClass('wi wi-day-cloudy');
      break;
      case '03d':
      $icon.addClass('wi wi-cloud');
      break;
      case '04d':
      $icon.addClass('wi wi-cloudy');
      break;
      case '09d':
      $icon.addClass('wi wi-day-rain');
      break;
      case '10d':
      $icon.addClass('wi wi-day-rain-mix');
      break;
      case '11d':
      $icon.addClass('wi wi-day-lightning');
      break;
      case '13d':
      $icon.addClass('wi wi-day-snow-wind');
      break;
      case '50d':
      $icon.addClass('wi wi-fog');
      break;
      // night
      case '01n':
      $icon.addClass('wi wi-night-clear');
      break;
      case '02n':
      $icon.addClass('wi wi-night-alt-cloudy');
      break;
      case '03n':
      $icon.addClass('wi wi-cloud');
      break;
      case '04n':
      $icon.addClass('wi wi-cloudy');
      break;
      case '09n':
      $icon.addClass('wi wi-showers');
      break;
      case '10n':
      $icon.addClass('wi wi-night-alt-showers');
      break;
      case '11n':
      $icon.addClass('wi wi-storm-showers');
      break;
      case '13n':
      $icon.addClass('wi wi-wi-night-alt-snow');
      break;
      case '50n':
      $icon.addClass('wi wi-fog');
      break;
    }
  }  

  