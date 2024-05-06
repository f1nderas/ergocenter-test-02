import { functions } from "../functions.js";

const ergocenterCoordinate = [35.904323, 56.883135];
const ergocenter = ol.proj.fromLonLat(ergocenterCoordinate);

const container = document.querySelector("#popup");
const content = document.querySelector(".popup-content-js");
const closer = document.querySelector(".popup-closer-js");

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
  zoom: 14,
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
    src: "/img/marker.svg",
    anchor: [0.5, 1],
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
const controlsView = document.querySelector(".controls-view_wrapper");

navWrapper.appendChild(controlsView);

functions.onClick("btn_zoom-in-js", () => functions.zoomIn(map));
functions.onClick("btn_zoom-out-js", () => functions.zoomOut(map));

functions.onClick("btn-geo-js", () => {
  view.animate({
    center: ergocenter,
    duration: 1000,
    zoom: 16,
  });
  loadCoordinates();
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

map.on("click", function (evt) {
  map.forEachFeatureAtPixel(evt.pixel, (feature) => {
    content.innerHTML = `Тверь
    СВЕРДЛОВСКИЙ ПЕРЕУЛОК, 12
    ОФИС 112`;
    overlay.setPosition(evt.coordinate);
  });
});

const url = "/json/mapCoordinateList.json";

async function loadCoordinates() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const coordinates = await response.json();
    const lineFeature = createLineFromCoordinates(coordinates, "bussStop2");
    // Создание векторного слоя для линии
    const lineLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [lineFeature],
      }),
    });
    // Добавление слоя на карту
    map.addLayer(lineLayer);
    // Центрирование карты на линии
    // map.getView().fit(lineFeature.getGeometry().getExtent(), {
    //   size: map.getSize(),
    //   duration: 500,
    // });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Функция для создания линии из координат
function createLineFromCoordinates(coordinates, stopName) {
  var lineCoordinates = coordinates[stopName].map(function (coord) {
    return ol.proj.fromLonLat(coord);
  });
  var lineGeometry = new ol.geom.LineString(lineCoordinates);
  var lineFeature = new ol.Feature({
    geometry: lineGeometry,
  });
  return lineFeature;
}
