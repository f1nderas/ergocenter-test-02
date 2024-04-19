const ergocenterCoordinate = [35.904323, 56.883135];
const newCoordinate = [0,0]
const ergocenter = ol.proj.fromLonLat(ergocenterCoordinate);

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const overlay = new ol.Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});


const view = new ol.View({
  center: ergocenter,
  zoom: 6,
});

const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM({
        url: "//192.168.25.214:8012/wmts/osm900913/osm_grid/{z}/{x}/{y}.png",
        preload: 4,
      }),
    }),
  ],
  target: "map",
  view: view,
  overlays: [overlay],
});

const iconFeature = new ol.Feature({
  geometry: new ol.geom.Point(ergocenter),
});

const iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: "img/marker.svg",
  }),
});

iconFeature.setStyle(iconStyle);

const vectorSource = new ol.source.Vector({
  features: [iconFeature],
});

const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
});

map.addLayer(vectorLayer);

const navWrapper = document.querySelector(".ol-overlaycontainer-stopevent");
const button = document.createElement("button");
const image = document.createElement("img");

button.classList.add("ol-geo");
button.id = "ol-geo";
image.src = "../img/geo.svg";

button.appendChild(image);
navWrapper.appendChild(button);

function onClick(id, callback) {
  document.getElementById(id).addEventListener("click", callback);
}

function flyTo(location, done) {
  const duration = 2000;
  const zoom = view.getZoom();
  let parts = 2;
  let called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  view.animate(
    {
      center: location,
      duration: duration,
    },
    callback
  );
  view.animate(
    {
      zoom: zoom - 1,
      duration: duration / 2,
    },
    {
      zoom: zoom,
      duration: duration / 2,
    },
    callback
  );
}

onClick("ol-geo", function () {
  view.animate({
    center: ergocenter,
    duration: 1000,
  });
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


map.on("click", function (evt) {
  console.log(evt.coordinate);
  map.forEachFeatureAtPixel(evt.pixel, (feature) => {
    content.innerHTML = `Тверь
    СВЕРДЛОВСКИЙ ПЕРЕУЛОК, 12
    ОФИС 112`
    console.log(evt);
    console.log();
    console.log(feature);
    overlay.setPosition(evt.coordinate);
  });
});
