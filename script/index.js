import DataFetcher from "./fetch.js";
import DataPrinter from "./print.js";
import floatMenuScript from "./floatMenu.js";
import hideMenuScript from "./hideMenu.js";
import initStars from "./components/initStars.js";

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
  floatMenuScript();
  hideMenuScript();

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
  const stars = document.querySelectorAll(".stars");
  initStars(stars);

  const checkInputText = (event) => {
    const inputElement = event.target;
    const inputText = inputElement.value.trim();

    if (inputText === "") {
      inputElement.classList.add("is-empty");
    } else {
      inputElement.classList.remove("is-empty");
    }
  };

  const inputElements = document.querySelectorAll(".custom-input .div_input");
  inputElements.forEach(function (input) {
    input.addEventListener("input", checkInputText);
  });


  document.getElementById('photo').addEventListener('change', function(event) {
    const previewContainer = document.querySelector('.preview-container-js');
    // previewContainer.innerHTML = ''; // Очищаем предыдущие превью

    for (let i = 0; i < event.target.files.length; i++) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(event.target.files[i]);
      img.classList.add('photo-preview');

      const previewDiv = document.createElement('div');
      previewDiv.appendChild(img);
      previewContainer.appendChild(previewDiv);
    }
  });

  const checkboxes = document.querySelectorAll('.custom-checkbox');

  checkboxes.forEach(function(checkbox) {
    const span = document.createElement('span');
    span.className = 'custom-checkbox-button';
    checkbox.insertBefore(span, checkbox.firstChild);

    if (checkbox.querySelector('input').checked) {
      checkbox.classList.add('checked');
    }

    checkbox.addEventListener('change', function() {
      const input = this.querySelector('input');
      this.classList.toggle('checked', input.checked);
    });
  });
};
