import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { google } from 'google-maps';

var distance = require('google-distance-matrix');
distance.key('AIzaSyAj0bTPi8uCxzt-Fl_u9t4IHLsGpdGRwfU');
distance.units('imperial');

var NodeGeocoder = require('node-geocoder');


// var options = {
//   provider: 'google',
 
//   // Optional depending on the providers
//   httpAdapter: 'https', // Default
//   apiKey: 'AIzaSyAj0bTPi8uCxzt-Fl_u9t4IHLsGpdGRwfU', // for Mapquest, OpenCage, Google Premier
//   formatter: null         // 'gpx', 'string', ...
// };
 
// var geocoder = NodeGeocoder(options);

// geocoder.geocode('29 champs elysée paris', function(err, res) {
//   console.log("res");
//   console.log(res);
//   console.log("err");
//   console.log(err);
// });

// var service = new google.maps.DistanceMatrixService();

// var origin1 = new google.maps.LatLng(55.930385, -3.118425);
// var origin2 = 'Greenwich, England';
// var destinationA = 'Stockholm, Sweden';
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

// var service = new google.maps.DistanceMatrixService();
// service.getDistanceMatrix(
//   {
//     // origins: [origin1, origin2],
//     // destinations: [destinationA, destinationB],
//     origins: ['San Francisco CA'],
//     destinations: ['New York NY', '41.8337329,-87.7321554'],
//     travelMode: 'DRIVING',
//     // transitOptions: TransitOptions,
//     // drivingOptions: DrivingOptions,
//     // unitSystem: UnitSystem,
//     avoidHighways: Boolean,
//     avoidTolls: Boolean,
//   }, callback);

// function callback(response, status) {
//   console.log("response");
//   console.log(response);
//   console.log("status");
//   console.log(status);

// }


// var bounds = new google.maps.LatLngBounds;
// var markersArray = [];

// var origin1 = {lat: 55.93, lng: -3.118};
// var origin2 = 'Greenwich, England';
// var destinationA = 'Stockholm, Sweden';
// var destinationB = {lat: 50.087, lng: 14.421};

// var destinationIcon = 'https://chart.googleapis.com/chart?' +
//     'chst=d_map_pin_letter&chld=D|FF0000|000000';
// var originIcon = 'https://chart.googleapis.com/chart?' +
//     'chst=d_map_pin_letter&chld=O|FFFF00|000000';
// var map = new google.maps.Map(document.getElementById('map'), {
//   center: {lat: 55.53, lng: 9.4},
//   zoom: 10
// });

// var geocoder = new google.maps.Geocoder;


class AddressPage extends React.Component {

  componentWillMount () {
    var origins = ['San Francisco CA'];
    var destinations = ['New York NY', '41.8337329,-87.7321554'];
    
  
    distance.matrix(origins, destinations, function (err, distances) {      
      console.log("AAA");
      console.log(err);
      console.log(distances);
      
    });

  }

  render () {
    return (
      <div>sss</div>
    )
  }

}

export default AddressPage

