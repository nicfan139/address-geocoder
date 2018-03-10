import Typed from 'typed.js';
import GMaps from 'gmaps';

// Set typing animation on user input
const options = {
  strings: ["Enter an address here!"],
  typeSpeed: 80
}

const typed = new Typed("#query", options);


// Set default map view on Canada
let map = new GMaps({ el: '#map', lat: 57.6916805, lng: -92.0008971, zoom: 3 });


// Select the form area in HTML
const query = document.getElementById("form");


// Display them in new line in HTML
const appendData = (lat, long) => {
  const formEnd = document.getElementById("form-container");
  const line = `<div id="result"><div><h2>"${document.getElementById("query").value}"</h2></div><div>Latitude: ${lat}</div><div>Longitude: ${long}</div></div>`;
  formEnd.insertAdjacentHTML("beforeend", line);
  // Show corresponding pin on Google Map
  map = new GMaps({ el: '#map', lat: lat, lng: long, zoom: 14 });
  map.addMarkers([ { lat: lat, lng: long } ])
};


// Method to grab data from Google API
const myKey = config.MY_KEY
const grabData = (address) => {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${myKey}`)
    .then(response => response.json())
    .then((data) => {
      // Extract lattitude and longtitude
      data.results.forEach((item) => {
        const lat = item.geometry.location.lat;
        const long = item.geometry.location.lng;
        appendData(lat, long);
      });
    });
};


// Event Listener for when submit button is triggered
query.addEventListener("submit", (e) => {
  let address = document.getElementById("query").value;
  address = address.replace(" ", "%20");
  grabData(address);
});




