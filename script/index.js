// $(document).ready(function () {
//   $(".cont-1_car-list-slider").slick({
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     nextArrow:
//       '<button type="button" class="slick-next"><img src="img/arrow.png" alt="next"></button>',
//     prevArrow:
//       '<button type="button" class="slick-prev"><img src="img/arrow.png" alt="prev"></button>',
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   });
// });

let news;
fetch("json/news.json")
  .then((response) => response.json()) // или .text() для текста
  .then((data) => (news = data))
  .then(()=>{
    const domNews = document.querySelector("#news");
    news.forEach((e) => {
      let domItem = createItem();
      let item = inputItem(domItem, e.date, e.text);
      domNews.append(item);
    });
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });

const createItem = () => {
  let wrapper = document.createElement("div");
  wrapper.className = "cont-2_news-item";
  let domDate = document.createElement("div");
  domDate.className = "div_date";
  let domText = document.createElement("a");
  domText.className = "div_txt";
  domText.setAttribute("href", "#");

  wrapper.append(domDate);
  wrapper.append(domText);
  return wrapper;
};

const inputItem = (wrapper, date, text) => {
  wrapper.childNodes[0].innerHTML = date;
  wrapper.childNodes[1].innerHTML = text;
  return wrapper;
};

window.onload = function () {
  const header = document.querySelector(".header");
  const floatMenu = document.querySelector('#float-menu')
  const headerHigh = header.clientHeight;
  let scrollPosition = 0;
  window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;
    if (headerHigh < scrollPosition) {
      floatMenu.style.opacity = 1;
    } else{
      floatMenu.style.opacity = 0;
    }
  });

};
