export const functions = {
  onClick: function (className, callback) {
    document.querySelector(`.${className}`).addEventListener("click", callback);
  },
  hideMenuScript: function () {
    const header = document.querySelector(".header");
    const headerHigh = header.clientHeight;
    let scrollPosition = 0;
    window.addEventListener("scroll", function () {
      scrollPosition = window.scrollY;
      if (headerHigh < scrollPosition) {
        document.body.classList.remove("hide_menu");
      } else {
        document.body.classList.add("hide_menu");
      }
    });
  },
  floatMenuScript: function () {
    const floatMenu = document.querySelector(".float-menu-js");
    const checkbox = document.querySelector(".burger-checkbox-js");
    const burderWrapper = document.querySelector(".burger-wrapper-js");
    const floatNav = document.querySelector(".float-nav");
    const floatMenuHigh = floatMenu.clientHeight;
    floatNav.style.top = floatMenuHigh + "px";
    checkbox.addEventListener("change", handleCheckboxChange);

    function handleCheckboxChange() {
      if (checkbox.checked) {
        burderWrapper.style.backgroundColor = "#dfe1ea";
        floatNav.classList.add("float-nav-active");
      } else {
        burderWrapper.style.backgroundColor = "#2b3671";
        floatNav.classList.remove("float-nav-active");
      }
    }
  },
  zoomIn: function (map) {
    const view = map.getView();
    const currentZoom = view.getZoom();
    if (currentZoom < view.getMaxZoom()) {
      view.animate({
        zoom: currentZoom + 1,
        duration: 500,
      });
    }
  },
  zoomOut: function (map) {
    const view = map.getView();
    const currentZoom = view.getZoom();
    if (currentZoom > view.getMinZoom()) {
      view.animate({
        zoom: currentZoom - 1,
        duration: 500,
      });
    }
  },
  slickSlider: function () {
    $(document).ready(function () {
      $(".cont-1_car-list-slider").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow:
          '<button type="button" class="slick-next"><img src="/img/arrow.png" alt="next"></button>',
        prevArrow:
          '<button type="button" class="slick-prev"><img src="/img/arrow.png" alt="prev"></button>',
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
  },
  photoEventListener: function () {
    document
      .getElementById("photo")
      .addEventListener("change", function (event) {
        const previewContainer = document.querySelector(
          ".preview-container-js"
        );

        for (let i = 0; i < event.target.files.length; i++) {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(event.target.files[i]);
          img.classList.add("photo-preview");

          const previewDiv = document.createElement("div");
          previewDiv.appendChild(img);
          previewContainer.appendChild(previewDiv);
        }
      });
  },
  customCheckbox: function () {
    const checkboxes = document.querySelectorAll(".custom-checkbox");

    checkboxes.forEach(function (checkbox) {
      const span = document.createElement("span");
      span.className = "custom-checkbox-button";
      checkbox.insertBefore(span, checkbox.firstChild);

      if (checkbox.querySelector("input").checked) {
        checkbox.classList.add("checked");
      }

      checkbox.addEventListener("change", function () {
        const input = this.querySelector("input");
        this.classList.toggle("checked", input.checked);
      });
    });
  },
  checkInputText: function () {
    const inputElements = document.querySelectorAll(".custom-input .div_input");
    
    inputElements.forEach(function (input) {
      input.addEventListener("input", (event)=>{
        const inputElement = event.target;
        const inputText = inputElement.value.trim();
  
        if (inputText === "") {
          inputElement.classList.add("is-empty");
        } else {
          inputElement.classList.remove("is-empty");
        }
      });
    });
  },
  toggleClassBtn: function () {
    const sort = document.querySelector(".sort-js");
    const btns = sort.querySelectorAll(".div_btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
      });
    });
  },
  generateHeader: function () {

    const links = [
      { text: "О компании", href: "index.html" },
      {
        text: "Пасажирские перевозки",
        href: "passenger-transportation.html",
      },
      { text: "Контакты", href: "contacts.html" },
      { text: "Заказ автобуса", href: "order-bas.html" },
    ];
    const currentUrl = window.location.pathname;

    let headerHtml = `
      <header class="header">
        <div class="header-line">
          <img class="div_img" src="img/line.png" alt="" />
        </div>
        <div class="container">
          <div class="header-top">
            <img class="div_logo" src="img/logo.png" alt="" />
            <a class="div_phone" href="tel:89106423810">8 (910) 642-38-10</a>
          </div>
          <div class="header-nav_list">
    `;

    links.forEach((link) => {
      const activeClass = currentUrl.endsWith(link.href)
        ? "div_item-active"
        : "";
      headerHtml += `<a class="div_item ${activeClass}" href="${link.href}">${link.text}</a>`;
    });

    headerHtml += `
          </div>
        </div>
      </header>
    `;

    const body = document.querySelector("body");
    body.insertAdjacentHTML("afterbegin", headerHtml);

    const heightHeader = document.querySelector(".header").offsetHeight;
    document.querySelector(".main").style.paddingTop = heightHeader + "px";
  },
  generateFloatMenu: function () {
    const links = [
      { text: "О компании", href: "index.html" },
      {
        text: "Пасажирские перевозки",
        href: "passenger-transportation.html",
      },
      { text: "Контакты", href: "contacts.html" },
      { text: "Заказ автобуса", href: "order-bas.html" },
    ];
    const currentUrl = window.location.pathname;

    let headerHtml = `
    <div class="float-menu-wrapper float-menu-js">
    <div class="float-menu container">
      <div class="burger-wrapper burger-wrapper-js">
        <input id="burger-checkbox" class="burger-checkbox burger-checkbox-js" type="checkbox" />
        <label class="burger" for="burger-checkbox" ></label>
      </div>
      <div class="float-nav float-nav-js">
    `;

    links.forEach((link) => {
      const activeClass = currentUrl.endsWith(link.href)
        ? "div_item-active"
        : "";
      headerHtml += `<a class="div_item ${activeClass}" href="./${link.href}">${link.text}</a>`;
    });

    headerHtml += `
    </div>
      <a class="float-logo" href="./index.html">
        <img class="div_logo" src="./img/logo.png" alt="" />
      </a>
      <a class="float-phone" href="tel:89106423810">8 (910) 642-38-10</a>
    </div>
  </div>
    `;

    document.body.insertAdjacentHTML("beforeend", headerHtml);
  },
};
