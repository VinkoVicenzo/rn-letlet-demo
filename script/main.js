function isOpen({ close, open }) {
  const currentDate = new Date();
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
  return open <= currentTime && currentTime < close;
}

const URL =
  "https://shoppingparangaba.com.br/data/files/44/02/D5/AF/BF0767105619E667A51BF9C2/L2.jpg";

var map = L.map("map", {
  minZoom: 7,
  maxZoom: 13,
  center: [-0.25, 0.25],
  zoom: 10,
  crs: L.CRS.Simple,
});

var southWest = map.unproject([0, 896]);
var northEast = map.unproject([824, 0]);
var bounds = new L.LatLngBounds(southWest, northEast);

L.imageOverlay(URL, bounds).addTo(map);

// // let sides = 0;
// // let coords = [];

// // function getArray(lng, lat) {
// //   coords.push([lng, lat]);
// //   if (coords.length >= sides) {
// //     const name = prompt("nome: ");
// //     const feature = {
// //       type: "Feature",
// //       id: `${statesData.features.length + 1}`,
// //       properties: { name, aberto: true },
// //       geometry: {
// //         type: "Polygon",
// //         coordinates: [coords],
// //       },
// //     };
// //     coords = [];
// //     sides = 0;
// //     console.log(JSON.stringify(feature));
// //   }
// // }

// // map.addEventListener("contextmenu", ({ latlng: { lat, lng } }) => {
// //   if (!sides) {
// //     sides = prompt("vertices: ");
// //   }
// //   getArray(lng, lat); // Invertido, pois é assim no geoJSON
// // });

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML =
    "<h4>Loja selecionada: </h4>" +
    (props ? "<b>" + props + "</b>" : "Selecione uma loja.");
};

info.addTo(map);

function getOpenColor(openTime) {
  return isOpen(openTime) ? "#0f0" : "#f00";
}

function style(feature) {
  return {
    opacity: 0,
    fillOpacity: 0,
  };
}

function highlightFeature(e) {
  const layer = e.target;
  const openColor = getOpenColor(layer.feature.properties.openTime);
  layer.setStyle({
    weight: 1,
    opacity: 1,
    color: openColor,
    fillColor: openColor,
    fillOpacity: 0.4,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties.name);
}

var geojson;

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}

/* global statesData */
geojson = L.geoJson(locationsData, {
  style: style,
  onEachFeature: onEachFeature,
}).addTo(map);
