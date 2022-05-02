const floorOneBtn = document.getElementById("floor-1-btn");
const floorTwoBtn = document.getElementById("floor-2-btn");

floorOneBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setFloorLayer(map, 0);
});

floorTwoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setFloorLayer(map, 1);
});

function setFloorLayer(map, floorNumber) {
  const floors = [
    {
      storesMap: [
        {
          name: "Casas Bahia",
          coords: [
            [-0.0043506622314453125, 0.008514404296875],
            [-0.0043544769287109375, 0.009805679321289062],
            [-0.006993509933118629, 0.009808141667584916],
            [-0.006987787887220192, 0.008511144597272416],
          ],
        },
        {
          name: "Centauro",
          coords: [
            [-0.010824203491210938, 0.0066814422607421875],
            [-0.010824203491210938, 0.009799957275390625],
            [-0.011887626598467078, 0.009805301850977433],
            [-0.011884387157599492, 0.006680093766037745],
          ],
        },
        {
          name: "C&A",
          coords: [
            [-0.009410858632074783, 0.0031185150504817807],
            [-0.009420394897460938, 0.0055446624755859375],
            [-0.011401807917658671, 0.005546558211602434],
            [-0.011399900569025859, 0.005224216292657122],
            [-0.011869108332697734, 0.005222308944024309],
            [-0.011870268371401285, 0.0031200984896553674],
          ],
        },
        {
          name: "Lojas Americanas",
          coords: [
            [-0.0069751739501953125, 0.003116607666015625],
            [-0.0069751739501953125, 0.0052165985107421875],
            [-0.0074443817138671875, 0.0052204132080078125],
            [-0.007442474365234375, 0.0055179595947265625],
            [-0.007928848266601562, 0.005527496337890625],
            [-0.007930755615234375, 0.005935428256863611],
            [-0.00838470458984375, 0.006006000156277673],
            [-0.008398056030273438, 0.005546329135769861],
            [-0.00941599744350583, 0.005541157676883556],
            [-0.009418487548828125, 0.0031147003173828125],
          ],
        },
        {
          name: "Rihappy",
          coords: [
            [-0.011890411376953125, 0.008558273315429688],
            [-0.01189422607421875, 0.009801864624023438],
            [-0.014513015747070312, 0.00980377197265625],
            [-0.014514923095703125, 0.008562088012695312],
          ],
        },
        {
          name: "Renner",
          coords: [
            [-0.014513015747070312, 0.008563995361328125],
            [-0.01691436767578125, 0.008558273315429688],
            [-0.0169028915863259, 0.012226781500366914],
            [-0.01620670933534934, 0.012226781500366914],
            [-0.016210524032614963, 0.011591634405640351],
            [-0.015869140625, 0.01158905029296875],
            [-0.015872955322265625, 0.011821746826171875],
            [-0.015756607055664062, 0.011821746826171875],
            [-0.015756607055664062, 0.012216567993164062],
            [-0.015626907348632812, 0.012216567993164062],
            [-0.015626907348632812, 0.0133819580078125],
            [-0.014507293701171875, 0.013385772705078125],
            [-0.01450557547885183, 0.011152264044350156],
            [-0.014091680825531517, 0.011154171392982968],
            [-0.013889501870453392, 0.010787960455482968],
            [-0.013889501870453392, 0.009803768560951718],
            [-0.014507482827484642, 0.009799953863686093],
          ],
        },
        {
          name: "Magazine Luiza",
          coords: [
            [-0.00872039794921875, 0.013393402099609375],
            [-0.010126195017269999, 0.013396123243747492],
            [-0.010128102365902811, 0.014036992384372492],
            [-0.01150202341562046, 0.01404543610345257],
            [-0.01150202341562046, 0.014550883491147883],
            [-0.01125025339608921, 0.014569956977476008],
            [-0.011240005493164062, 0.01509857177734375],
            [-0.009420394897460938, 0.015193939208984375],
            [-0.007598876953125, 0.015100479125976562],
            [-0.00759124755859375, 0.014581680297851562],
            [-0.007335662841796875, 0.014560699462890625],
            [-0.0073413848876953125, 0.0140228271484375],
            [-0.008719260175638477, 0.014013939957365598],
          ],
        },
        {
          name: "Riachuelo",
          coords: [
            [-0.0019702911376953125, 0.008535385131835938],
            [-0.001972198486328125, 0.012205123901367188],
            [-0.002674102783203125, 0.012212753295898438],
            [-0.00267791748046875, 0.013401031494140625],
            [-0.0043329447740063885, 0.013408262442787242],
            [-0.0043354034423828125, 0.010982513427734375],
            [-0.004811888261901206, 0.010991454880048386],
            [-0.004953032060729331, 0.010793090622235886],
            [-0.004951124712096518, 0.009808898727704636],
            [-0.0043506622314453125, 0.009805679321289062],
            [-0.00435638427734375, 0.008508682250976562],
            [-0.0031185152394149944, 0.008514404411100627],
            [-0.0031147005421493694, 0.008930206413053752],
            [-0.0029773714405868694, 0.008932113761686565],
            [-0.002975464091954057, 0.009159088248991252],
            [-0.0026531221730087444, 0.009159088248991252],
            [-0.002651214824375932, 0.008537292594694377],
          ],
        },
      ],
      imageURL:
        "https://shoppingparangaba.com.br/data/files/44/02/D5/AF/BF0767105619E667A51BF9C2/L2.jpg",
    },
    {
      storesMap: [
        {
          name: "Lojas Americanas",
          coords: [
            [-0.00135040283203125, 0.00205230712890625],
            [-0.0013484954833984375, 0.0061798095703125],
            [-0.0023193359375, 0.0061969757080078125],
            [-0.002315521240234375, 0.008388519287109375],
            [-0.003675911587450685, 0.008390094504618553],
            [-0.0036816336333491224, 0.0075394170143841775],
            [-0.00412986056206006, 0.0075356023171185525],
            [-0.004135101537020968, 0.004923463509082533],
            [-0.0032157594960053426, 0.004919648811816908],
            [-0.003217666844638155, 0.003973603889941908],
            [-0.0041294097900390625, 0.0039730072021484375],
            [-0.00412750244140625, 0.0020491395604903912],
          ],
        },
        {
          name: "Leader",
          coords: [
            [-0.0097198486328125, 0.001125335693359375],
            [-0.009721755981445312, 0.00292205810546875],
            [-0.013216018676757812, 0.0029239654541015625],
            [-0.013225555419921875, 0.002399444580078125],
            [-0.012996673583984375, 0.002391815185546875],
            [-0.0129852294921875, 0.0011348724365234375],
          ],
        },
        {
          name: "C&A",
          coords: [
            [-0.0069522857666015625, 0.0035400390625],
            [-0.006954193115234375, 0.00443267822265625],
            [-0.007415771484375, 0.004436492919921875],
            [-0.007419586181640625, 0.0053386688232421875],
            [-0.0097198486328125, 0.005340576171875],
            [-0.009710311889648438, 0.0048732757568359375],
            [-0.010278701782226562, 0.004871368408203125],
            [-0.01027679443359375, 0.004207611083984375],
            [-0.009716033935546875, 0.00420379638671875],
            [-0.009714875209508474, 0.0027002236552727465],
            [-0.0074367523193359375, 0.0027008056640625],
            [-0.0074367523193359375, 0.003528594970703125],
          ],
        },
        {
          name: "Riachuelo",
          coords: [
            [-0.006954193115234375, 0.008878707885742188],
            [-0.006954193115234375, 0.0093231201171875],
            [-0.0073833465576171875, 0.009756088256835938],
            [-0.010198593139648438, 0.009752273559570312],
            [-0.010202407836914062, 0.008882522583007812],
            [-0.009717941284179688, 0.008876800537109375],
            [-0.0097198486328125, 0.007976531982421875],
            [-0.007427245828325771, 0.00797844520992885],
            [-0.007436782571489833, 0.00887871376461635],
          ],
        },
        {
          name: "Kalunga",
          coords: [
            [-0.005306243896484375, 0.012859344482421875],
            [-0.00530242919921875, 0.013479232788085938],
            [-0.0072956085205078125, 0.013490676879882812],
            [-0.0072956085205078125, 0.012096405029296875],
            [-0.0058498382568359375, 0.012098312377929688],
            [-0.0058612823486328125, 0.012769699096679688],
            [-0.0058002471923828125, 0.012859344482421875],
          ],
        },
        {
          name: "Pão de Açúcar",
          coords: [
            [-0.001739501953125, 0.011980056762695312],
            [-0.0017375946044921875, 0.013296127319335938],
            [-0.00223541259765625, 0.013296127319335938],
            [-0.0026264190673828125, 0.013484954833984375],
            [-0.003993988037109375, 0.013484954833984375],
            [-0.003993945992990868, 0.011981098504903202],
            [-0.003387409127756493, 0.011977283807637577],
            [-0.0033817291259765625, 0.010639190673828125],
            [-0.003330230712890625, 0.010570526123046875],
            [-0.0027599334716796875, 0.010564804077148438],
            [-0.0026836395263671875, 0.0106353759765625],
            [-0.002681732177734375, 0.011978215205747624],
          ],
        },
      ],
      imageURL:
        "https://shoppingdabahia.com.br/data/files/75/E5/CE/AE/CC616610329C4F5653DBF9C2/bahia_1andar.jpg",
    },
  ];

  const { storesMap, imageURL } =
    floors[floorNumber] ?? console.error(`Floor ${floorNumber} dont exist`);

  // Map Image

  var w = 5000;
  var h = 5000;
  var url = imageURL;
  var southWest = map.unproject([0, h], map.getMaxZoom() - 1);
  var northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
  var bounds = new L.LatLngBounds(southWest, northEast);
  map.setMaxBounds(bounds);

  L.imageOverlay(url, bounds).addTo(map);

  // Map Layers

  const layersContainer = document.querySelector(
    "div.leaflet-top:nth-child(2)"
  );
  layersContainer.textContent = "";

  function getLocation(coords) {
    const Location = L.polygon(coords);
    const location = new L.FeatureGroup();
    location.addLayer(Location);
    return location;
  }

  const overlayMaps = storesMap.reduce(
    (last, { name, coords }) => ({ ...last, [name]: getLocation(coords) }),
    {}
  );

  map.on("layeradd", function () {
    // Create new empty bounds
    let bounds = new L.LatLngBounds();
    map.eachLayer(function (layer) {
      // Check if layer is a featuregroup
      if (layer instanceof L.FeatureGroup) {
        // Extend bounds with group's bounds
        bounds.extend(layer.getBounds());
      }
    });

    // Check if bounds are valid (could be empty)
    if (bounds.isValid()) {
      // Valid, fit bounds
      map.flyToBounds(bounds);
    } else {
      // Invalid, fit world
      // map.fitWorld();
    }
  });

  L.Control.CustomButtons = L.Control.Layers.extend({
    onAdd: function () {
      this._initLayout();
      this._removePolygons();
      this._update();
      return this._container;
    },
    _removePolygons: function () {
      this.createButton("remove", "Remove all polygons");
    },
    createButton: function (type, className) {
      const elements = this._container.getElementsByClassName(
        "leaflet-control-layers-list"
      );
      const button = L.DomUtil.create(
        "button",
        `btn-markers ${className}`,
        elements[0]
      );
      button.textContent = className;

      L.DomEvent.on(button, "click", function (e) {
        const checkbox = document.querySelectorAll(
          ".leaflet-control-layers-overlays input[type=checkbox]"
        );

        // Remove/add all layer from map when click on button
        [].slice.call(checkbox).map((el) => {
          el.checked = type === "add" ? false : true;
          el.click();
        });
      });
    },
  });

  new L.Control.CustomButtons(null, overlayMaps, {
    collapsed: false,
  }).addTo(map);
}

const map = L.map("map", {
  minZoom: 19 - 6,
  maxZoom: 19,
  center: [0, 0],
  zoom: 19 - 3,
  crs: L.CRS.Simple,
});

setFloorLayer(map, 0);

let sides = 0;
let coords = [];
let final = [];
function getArray(lat, lng) {
  coords.push([lat, lng]);
  if (coords.length >= sides) {
    const name = prompt("nome: ");
    console.log(JSON.stringify(coords));
    final.push({ name, coords });
    coords = [];
    sides = 0;
  }
}

let latitude = 0;
let longitude = 0;
map.addEventListener("mousemove", function (ev) {
  latitude = ev.latlng.lat;
  longitude = ev.latlng.lng;
});

map.addEventListener("contextmenu", () => {
  if (!sides) {
    sides = prompt("Insira a quantidade de lados: ");
  }
  getArray(latitude, longitude);
});

// 4 lados
