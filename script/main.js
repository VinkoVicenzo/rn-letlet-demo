const DEFAULT_ZOOM_LEVEL = 9;

let currentFloor = "nenhum";

function isOpen({ close, open }) {
  const currentDate = new Date();
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
  return open <= currentTime && currentTime < close;
}

function minutesToHoursMinutes(rawMinutes) {
  const hours = Math.floor(rawMinutes / 60);
  const minutes = rawMinutes % 60;
  return `${hours}:${minutes}`;
}

var map = L.map("map", {
  minZoom: 8,
  maxZoom: 13,
  center: [-0.25, 0.25],
  zoom: DEFAULT_ZOOM_LEVEL,
  crs: L.CRS.Simple,
});

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

function infoDisplay(name, openTime, floorLevel) {
  if (!name) return "<h3>Selecione uma loja</h3>";

  const floorText = `<h3>Andar atual: ${floorLevel} </h3>`;
  const storeText = `<h3>${name}</h3>`;
  const openTimeText = `<h3>${
    isOpen(openTime)
      ? `Aberto</h3><h3>Fecha as ${minutesToHoursMinutes(openTime.close)}</h3>`
      : `Fechado</h3><h3>Abre as ${minutesToHoursMinutes(openTime.open)}</h3>`
  }`;

  return floorText + storeText + openTimeText;
}

info.update = function (name, openTime) {
  this._div.innerHTML = infoDisplay(name, openTime, currentFloor) ?? "Teste";
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
    const {
      _northEast: { lat: neLat, lng: neLng },
      _southWest: { lat: swLat, lng: swLng },
    } = e.target.getBounds();
    const bounds = new L.LatLngBounds([
      [neLat, neLng].map((c) => c + 0.025),
      [swLat, swLng].map((c) => c - 0.025),
    ]);

    map.fitBounds(bounds);
    console.log(bounds);
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

    info.update(
      layer.feature.properties.name,
      layer.feature.properties.openTime
    );
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

  map.flyTo(floorImageOverlay.getCenter(), DEFAULT_ZOOM_LEVEL);
}

const buttonContainer = document.querySelector("#button-container");
for (let i in locationsData) {
  const floorNumber = Number(i) + 1;
  const button = document.createElement("button");
  button.id = `floor-${floorNumber}-btn`;
  button.textContent = floorNumber;
  button.addEventListener("click", (e) => {
    e.preventDefault();
    for (let i = 0; i < buttonContainer.children.length; i++) {
      const child = buttonContainer.children[i];
      child.classList.remove("active-button");
    }
    button.classList.add("active-button");
    currentFloor = floorNumber;
    setFloor(locationsData[i].image, locationsData[i]);
  });
  buttonContainer.appendChild(button);
}
