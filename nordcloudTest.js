

const points = [
  [
    0, 0
  ],
  [
    100, 100
  ],
  [
    15, 10
  ],
  [18, 18]
];


/*
two dimentions distance calculation reference
https://en.wikipedia.org/wiki/Euclidean_distance
var dist = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
*/

function calculateDistance(coordinateX, coordinateY) {
  return Math.sqrt(Math.pow(Math.abs(coordinateX[0] - coordinateY[0]), 2) + Math.pow(Math.abs(coordinateX[1] - coordinateY[1]), 2));
}

/*
power = (reach - device's distance from link station)^2 if distance > reach power = 0
*/
function calculatePower(distance, reach) {
  if (distance > reach) {
    return 0;
  } else {
    return Math.pow((reach - distance), 2)
  }

}

 function mostPowerFullLinkStation(point) {
   const linkStations = [
     {
       coordinates: [
         0, 0
       ],
       reach: 10
     }, {
       coordinates: [
         20, 20
       ],
       reach: 5
     }, {
       coordinates: [
         10, 0
       ],
       reach: 12
     }
   ];

  var bestlinkStations = linkStations.map(function(station) {
  var distance = calculateDistance(point,station.coordinates);
  var stationPower = Object.assign({},station);
  stationPower.power = calculatePower(distance, station.reach);
  return stationPower;
  }).filter(function(station) {
    return station.power > 0;
  }).sort(function(stationA, stationB) {
    return stationA.power > stationB.power;
  }).pop();

  return {point: point, station: bestlinkStations};
}

points.map(mostPowerFullLinkStation).map(function(value) {
  if (!value.station) {
    console.log("No link station within reach for point", value.point[0], ',', value.point[1])
  } else {
    console.log("Best link station for point", value.point[0], ',', value.point[1], " is ", value.station.coordinates[0], ',', value.station.coordinates[1], " with power ", value.station.power.toFixed(2));
  }
});
