// Функция для плавного приближения карты
export default function zoomIn(map) {
  const view = map.getView();
  const currentZoom = view.getZoom();
  if (currentZoom < view.getMaxZoom()) {
    view.animate({
      zoom: currentZoom + 1,
      duration: 500 // Длительность анимации в миллисекундах
    });
  }
}