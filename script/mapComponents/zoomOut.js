// Функция для плавного отдаления карты
export default function zoomOut(map) {
  const view = map.getView();
  const currentZoom = view.getZoom();
  if (currentZoom > view.getMinZoom()) {
    view.animate({
      zoom: currentZoom - 1,
      duration: 500 // Длительность анимации в миллисекундах
    });
  }
}