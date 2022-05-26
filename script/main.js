async function getSelectedShoppingId() {
  var select = document.querySelector("#shopping-id");
  var optionValue = select.options[select.selectedIndex];
  var shopping_id = optionValue.id;
  const { data } = await getShoppingDataByID(shopping_id);
  console.log("loaded shopping: ", { shopping_id, data });

  setChangeFloorButtons(data);
  setFloor(data[0]);
}

let getShoppingDataByID = async (shopping_id) => {
  const URL = "https://shopping-json-map.herokuapp.com/shoppings";
  const response = await fetch(`${URL}/${shopping_id}`);
  const data = await response.json();
  return data;
};

const DEFAULT_ZOOM_LEVEL = 9;

var map = L.map("map", {
  minZoom: 9,
  maxZoom: 12,
  center: [0, 0],
  zoom: DEFAULT_ZOOM_LEVEL,
  crs: L.CRS.Simple,
});

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

//

function popupMessage(id) {
  const suc = idFeatureMapList.getIdFeatureMap(id)?.suc;
  return `<h4>id: ${id}</h4><h4>suc: ${suc ?? "loja não mapeada"}</h4>`;
}

async function setFloor(featureCollection) {
  const { image: imageUrl } = featureCollection;
  map.eachLayer((layer) => layer.removeFrom(map));

  const { width, height } = await getImageSize(imageUrl);

  const southWest = [0, 1];
  const northEast = [(1 * height) / width, 0];
  const bounds = new L.LatLngBounds(southWest, northEast);

  const floorImageOverlay = L.imageOverlay(imageUrl, bounds);

  function zoomToFeatureAndShowPopup(e) {
    (() => {
      const id = e.target.feature.properties.name;
      if (idFeatureMapList.has(id)) {
        const oldSuc = idFeatureMapList.getIdFeatureMap(id)?.suc;
        const promptResponse = prompt(
          `lojá já tem um suc: ${oldSuc}\nDeseja continuar?`
        );
        if (promptResponse[0].toUpperCase() !== "S") return;
      }
      const suc = prompt("suc: ");
      idFeatureMapList.add(id, suc);
      localStorage.setItem(KEY_LIST, JSON.stringify(idFeatureMapList.list));
    })();
    setFloor(featureCollection);
  }

  function addMarker(e) {
    const center = e.target.getCenter();
    const marker = new L.marker(center);
    marker.bindPopup(popupMessage(e.target.feature.properties.name));
    marker.addTo(map);
    e.target.feature.marker = marker;
  }

  function onEachFeature(_feature, layer) {
    layer.on({
      click: zoomToFeatureAndShowPopup,
      add: addMarker,
    });
  }

  function style(feature) {
    const id = feature.properties.name;
    const mapped = idFeatureMapList.has(id);
    return {
      weight: 0,
      opacity: 1,
      fillOpacity: 0.4,
      fillColor: mapped ? "#0f0" : "#f00",
    };
  }

  const geojson = L.geoJson(featureCollection, {
    style,
    onEachFeature,
  });

  floorImageOverlay.addTo(map);
  geojson.addTo(map);
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
      button.classList.add("active-button");
      setFloor(locationsData[i]);
    });
    buttonContainer.appendChild(button);
  }
}
