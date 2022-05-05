let sides = 0;
let coords = [];

function getArray(lng, lat) {
  coords.push([lng, lat]);
  if (coords.length >= sides) {
    const name = prompt("nome: ");
    const feature = {
      type: "Feature",
      properties: {
        name,
        openTime: {
          open: 510,
          close: 1230,
        },
      },
      geometry: {
        type: "Polygon",
        coordinates: [coords],
      },
    };
    coords = [];
    sides = 0;
    console.log(JSON.stringify(feature));
  }
}

map.addEventListener("contextmenu", ({ latlng: { lat, lng } }) => {
  if (!sides) {
    sides = prompt("vertices: ");
  }
  getArray(lng, lat); // Invertido, pois é assim no geoJSON
});
