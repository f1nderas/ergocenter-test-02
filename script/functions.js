export const functions = {
  initStars: function (ratingStarsElements) {
    function createStars(ratingStarsElement) {
      const rating = parseFloat(ratingStarsElement.getAttribute("data-rating"));
      const totalStars = 5;
      ratingStarsElement.innerHTML = "";

      for (let i = 1; i <= totalStars; i++) {
        const starItem = document.createElement("div");
        starItem.className = "rating_star";

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");

        const use = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "use"
        );
        use.setAttribute("href", "img/marker.svg#gray-star");

        svg.appendChild(use);
        starItem.appendChild(svg);
        ratingStarsElement.appendChild(starItem);
      }

      updateStarDisplay(ratingStarsElement, rating);
    }
    function updateStarDisplay(ratingStarsElement, rating) {
      const stars = ratingStarsElement.querySelectorAll(".rating_star svg use");
      stars.forEach((use, index) => {
        if (index < rating) {
          use.setAttribute("href", "img/marker.svg#filled-star");
        } else if (index === Math.floor(rating) && rating % 1 !== 0) {
          use.setAttribute("href", "img/marker.svg#half-filled-star");
        } else {
          use.setAttribute("href", "img/marker.svg#gray-star");
        }
      });
    }
    ratingStarsElements.forEach(createStars);
    ratingStarsElements.forEach((ratingStarsElement) => {
      const stars = ratingStarsElement.querySelectorAll(".rating_star svg");
      stars.forEach((starSvg, index) => {
        starSvg.addEventListener("click", () => {
          if (ratingStarsElement.classList.contains("_edit")) {
            let currentRating = parseFloat(
              ratingStarsElement.getAttribute("data-rating")
            );
            if (index + 1 === currentRating) {
              currentRating -= 1;
            } else {
              currentRating = index + 1;
            }
            ratingStarsElement.setAttribute("data-rating", currentRating);
            updateStarDisplay(ratingStarsElement, currentRating);
          }
        });
      });
    });
  },
  onClick: function (className, callback) {
    document.querySelector(`.${className}`).addEventListener("click", callback);
  },
};
