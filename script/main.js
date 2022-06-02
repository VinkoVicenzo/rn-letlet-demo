

async function getSelectedShoppingId() {
  var select = document.querySelector("#shopping-id");
  var optionValue = select.options[select.selectedIndex];
  var shopping_id = optionValue.id;
  console.log(shopping_id);

  const { data } = await getShoppingDataByID(shopping_id);
  console.log(data);
  loadingOn();

  setChangeFloorButtons(data);
  setFloor(data[0]);
  currentFloor = 1;
}

function loadingOn() {
  let loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.display = "flex";
}

function loadingOff() {
  let loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.display = "none";
}

let getShoppingDataByID = async (shopping_id) => {
  const URL = "https://shopping-json-map.herokuapp.com/shoppings";
  const response = await fetch(`${URL}/${shopping_id}`);
  const data = await response.json();
  return data;
};

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
  minZoom: 9,
  maxZoom: 12,
  center: [0, 0],
  zoom: DEFAULT_ZOOM_LEVEL,
  crs: L.CRS.Simple,
});

function popupMessage(name, openTime, floorLevel) {
  const floorText = `<h3>Andar atual: ${floorLevel} </h3>`;
  const storeText = `<h3>${name || "Loja sem nome"}</h3>`;
  const openTimeText = `<h3>${
    isOpen(openTime)
      ? `Aberto</h3><h3>Fecha as ${minutesToHoursMinutes(openTime.close)}</h3>`
      : `Fechado</h3><h3>Abre as ${minutesToHoursMinutes(openTime.open)}</h3>`
  }`;

  return /*floorText +*/   storeText + openTimeText;
}

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

async function setFloor(featureCollection) {
  const { image: imageUrl } = featureCollection;
  map.eachLayer((layer) => layer.removeFrom(map));

  const { width, height } = await getImageSize(imageUrl);

  const southWest = [0, 1];
  const northEast = [(1 * height) / width, 0];
  const bounds = new L.LatLngBounds(southWest, northEast);

  const floorImageOverlay = L.imageOverlay(imageUrl, bounds);

  function getOpenColor(openTime) {
    return isOpen(openTime) ? "#0f0" : "#f00";
  }

  function zoomToFeatureAndShowPopup(e) {
    const {
      _northEast: { lat: neLat, lng: neLng },
      _southWest: { lat: swLat, lng: swLng },
    } = e.target.getBounds();

    const bounds = new L.LatLngBounds([
      [neLat, neLng].map((c) => c + 0.025),
      [swLat, swLng].map((c) => c - 0.025),
    ]);

    map.fitBounds(bounds);
    // Mostra o popup após 0.25s
    // Set timeout é necessário para
    // não cortar a animação do fitBounds que dura 0.25s
    setTimeout(() => {
      const marker = e.target.feature.marker;
      marker.openPopup();
    }, 250);
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
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
  }

  function addMarker(e) {
    const center = e.target.getCenter();
    const marker = new L.marker(center);
    marker.bindPopup(
      popupMessage(
        e.target.feature.properties.name,
        e.target.feature.properties.openTime,
        currentFloor
      )
    );
    marker.addTo(map);
    e.target.feature.marker = marker;
    if (e.target.feature.properties.highlight) {
      highlightFeature(e);
      setTimeout(() => {
        zoomToFeatureAndShowPopup(e);
      }, 0.5);
    }
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeatureAndShowPopup,
      add: addMarker,
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

  loadingOff();
  floorImageOverlay.addTo(map);
  geojson.addTo(map);

  map.flyTo(floorImageOverlay.getCenter(), DEFAULT_ZOOM_LEVEL);
}

function setChangeFloorButtons(locationsData) {
  const buttonContainer = document.querySelector("#button-container");
  buttonContainer.innerHTML = "";
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
      loadingOn();

      button.classList.add("active-button");
      currentFloor = floorNumber;
      setFloor(locationsData[i]);
    });
    buttonContainer.appendChild(button);
  }
}

(async () => {
  const url = window.location.href;
  const rawStringParams = url.split("?");
  if (rawStringParams.length < 2) return; // Não há parâmetros
  const params = Object.fromEntries(
    rawStringParams[1].split("&").map((s) => s.split("=")) // Separa os múltiplos params
  );
  const { UE, SUC } = params;
  const { data, name } = await getShoppingDataByID(UE);
  const floorIndex = data.findIndex(({ features }) =>
    features.some((store) => {
      if (store.properties.suc == SUC) {
        store.properties.highlight = true;
        return true;
      }
    })
  );

  setChangeFloorButtons(data);
  // TODO: se não houver parametro "suc" mostrar o primeiro andar (index: 0)
  document.querySelector("#shopping-id").value = name;
  setFloor(data[floorIndex]);
})();
