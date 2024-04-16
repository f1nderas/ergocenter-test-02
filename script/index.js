import DataFetcher from "./fetch.js";
import DataPrinter from "./print.js";

$(document).ready(function () {
  $(".cont-1_car-list-slider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow:
      '<button type="button" class="slick-next"><img src="img/arrow.png" alt="next"></button>',
    prevArrow:
      '<button type="button" class="slick-prev"><img src="img/arrow.png" alt="prev"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

window.onload = function () {
  const header = document.querySelector(".header");
  const floatMenu = document.querySelector("#float-menu");
  const headerHigh = header.clientHeight;
  let scrollPosition = 0;
  window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;
    if (headerHigh < scrollPosition) {
      floatMenu.classList.add('active')
    } else {
      floatMenu.classList.remove('active')
    }
  });

  const checkbox = document.querySelector("#burger-checkbox");
  const burderWrapper = document.querySelector(".burger-wrapper-js");
  const floatNav = document.querySelector(".float-nav");
  const floatMenuHigh = floatMenu.clientHeight;
  floatNav.style.top = floatMenuHigh +'px';
  checkbox.addEventListener("change", handleCheckboxChange);

  function handleCheckboxChange() {
    if (checkbox.checked) {
      burderWrapper.style.backgroundColor = "#dfe1ea";
      floatNav.classList.add('float-nav-active')
    } else {
      burderWrapper.style.backgroundColor = "#2b3671";
      floatNav.classList.remove('float-nav-active')
    }
  }

  class DataProcessor {
    constructor(dataFetcher) {
      this.dataFetcher = dataFetcher;
      this.data = null;
    }
    async setData() {
      try {
        this.data = await this.dataFetcher.fetchData();
        return this.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
    printData() {
      if (this.data) {
        dataPrinter.print(this.data, domNews);
      } else {
        console.log("No data to print.");
      }
    }
  }

  const domNews = document.querySelector("#news");
  const url = "json/news.json";
  const dataFetcher = new DataFetcher(url);
  const dataProcessor = new DataProcessor(dataFetcher);
  const dataPrinter = new DataPrinter();

  function hasClass(element, className) {
    return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
  }

  if (hasClass(document.body, "news")) {
    dataProcessor
      .setData()
      .then(() => dataProcessor.printData())
      .catch((error) => console.error("Error:", error));
  }
};
