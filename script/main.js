let currentImageOverlay;
let current;

function isOpen({ close, open }) {
  const currentDate = new Date();
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
  return open <= currentTime && currentTime < close;
}

var map = L.map("map", {
  minZoom: 7,
  maxZoom: 13,
  center: [-0.25, 0.25],
  zoom: 10,
  crs: L.CRS.Simple,
});

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

function getImageSize(imageUrl) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () =>
      resolve({
        width: image.width,
        height: image.height,
      });
  });
}

async function setFloor(imageUrl, featureCollection) {
  map.eachLayer((layer) => layer.removeFrom(map));

  const { width, height } = await getImageSize(imageUrl);

  const southWest = [0, 1];
  const northEast = [(1 * height) / width, 0];
  const bounds = new L.LatLngBounds(southWest, northEast);

  const floorImageOverlay = L.imageOverlay(imageUrl, bounds);

  function getOpenColor(openTime) {
    return isOpen(openTime) ? "#0f0" : "#f00";
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
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

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  }

  function style(feature) {
    return {
      opacity: 0,
      fillOpacity: 0,
    };
  }

  const geojson = L.geoJson(featureCollection, {
    style,
    onEachFeature,
  });

  floorImageOverlay.addTo(map);
  geojson.addTo(map);
}
