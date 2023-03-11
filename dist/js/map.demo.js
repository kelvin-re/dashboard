const citySelect = document.getElementById("citySelect");
const mapDiv = document.getElementById("map");

var map1,
  map2,
  marker1,
  marker2,
  savedLocations1 = [],
  savedLocations2 = [];

citySelect.addEventListener("change", function () {
  const selectedCity = citySelect.value;
  showSelectedCityOnMap(selectedCity);
});

function showSelectedCityOnMap(city) {
  // Use a library, such as Google Maps API, to show the selected city on the map
  // ...
  mapDiv.innerHTML = `Map of ${city}`;
}

function initMap() {
  getUserLocation1();
  getUserLocation2();
}

function getUserLocation1() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      showMapAndUserPosition(position, 1);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function getUserLocation2() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      showMapAndUserPosition(position, 2);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showMapAndUserPosition(position, mapNumber) {
  var userLatLng = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  if (mapNumber === 1) {
    map1 = new google.maps.Map(document.getElementById("map1"), {
      zoom: 10,
      center: userLatLng,
      mapTypeId: "hybrid",
    });

    marker1 = new google.maps.Marker({
      position: userLatLng,
      map: map1,
    });

    google.maps.event.addListener(map1, "click", function (event) {
      placeMarker(event.latLng, 1);
    });

    loadSavedLocations(1);
  } else {
    map2 = new google.maps.Map(document.getElementById("map2"), {
      zoom: 10,
      center: userLatLng,
    });
    marker2 = new google.maps.Marker({
      position: userLatLng,
      map: map2,
    });

    google.maps.event.addListener(map2, "click", function (event) {
      placeMarker(event.latLng, 2);
    });

    loadSavedLocations(2);
  }
}

function placeMarker(location, mapNumber) {
  if (mapNumber === 1) {
    marker1.setPosition(location);

    var newLocation = { lat: location.lat(), lng: location.lng() };
    savedLocations1.push(newLocation);
    saveSavedLocations(1);
  } else {
    marker2.setPosition(location);

    var newLocation = { lat: location.lat(), lng: location.lng() };
    savedLocations2.push(newLocation);
    saveSavedLocations(2);
  }
}

function loadSavedLocations(mapNumber) {
  if (mapNumber === 1) {
    // Recuperar as localizações salvas para o primeiro mapa
    var savedLocations1String = localStorage.getItem("savedLocations1");
    if (savedLocations1String) {
      savedLocations1 = JSON.parse(savedLocations1String);
      for (var i = 0; i < savedLocations1.length; i++) {
        var location = savedLocations1[i];
        var marker = new google.maps.Marker({
          position: location,
          map: map1,
        });
      }
    }
  } else {
    // Recuperar as localizações salvas para o segundo mapa
    var savedLocations2String = localStorage.getItem("savedLocations2");
    if (savedLocations2String) {
      savedLocations2 = JSON.parse(savedLocations2String);
      for (var i = 0; i < savedLocations2.length; i++) {
        var location = savedLocations2[i];
        var marker = new google.maps.Marker({
          position: location,
          map: map2,
        });
      }
    }
  }
}

function saveSavedLocations(mapNumber) {
  if (mapNumber === 1) {
    // Salvar as localizações para o primeiro mapa
    localStorage.setItem("savedLocations1", JSON.stringify(savedLocations1));
  } else {
    // Salvar as localizações para o segundo mapa
    localStorage.setItem("savedLocations2", JSON.stringify(savedLocations2));
  }
}
