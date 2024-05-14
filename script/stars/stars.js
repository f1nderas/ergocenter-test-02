export class Stars {
  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  create() {
    this.wrapper.forEach((wrapper) => {
      const totalStars = 5;
      wrapper.innerHTML = "";

      for (let i = 1; i <= totalStars; i++) {
        const starItem = `
          <div class="rating_star">
            <svg width="16" height="16">
              <use href="img/sprite.svg#gray-star"></use>
            </svg>
          </div>
            `;
        wrapper.insertAdjacentHTML("beforeend", starItem);
      }
      const rating = +wrapper.getAttribute("data-rating");
      this.updateDisplay(wrapper, rating);
      this.addListener(wrapper);
    });
  }

  updateDisplay(wrapper, rating) {
    const starsUse = wrapper.querySelectorAll("use");

    starsUse.forEach((use, index) => {
      if (index < rating) {
        use.setAttribute("href", "img/sprite.svg#filled-star");
      } else if (index === Math.floor(rating) && rating % 1 !== 0) {
        use.setAttribute("href", "img/sprite.svg#half-filled-star");
      } else {
        use.setAttribute("href", "img/sprite.svg#gray-star");
      }
    });
  }

  addListener(wrapper) {
    const stars = wrapper.querySelectorAll("svg");

    stars.forEach((starSvg, index) => {
      starSvg.addEventListener("click", () => {
        if (wrapper.classList.contains("_edit")) {
          let currentRating = +wrapper.getAttribute("data-rating");
          if (index + 1 === currentRating) {
            currentRating -= 1;
          } else {
            currentRating = index + 1;
          }
          wrapper.setAttribute("data-rating", currentRating);
          this.updateDisplay(wrapper, currentRating);
          this.toggleBlock(currentRating);
        }
      });
    });
  }

  toggleBlock(rating) {
    const block = document.querySelector(".feedback-form-js");
    if (!block) return;
    const inputs = block.querySelectorAll("input");
    const buttons = block.querySelectorAll("button");
    const classNameToToggle = "blocked";

    if (rating === 0) {
      block.classList.add(classNameToToggle);
    } else {
      block.classList.remove(classNameToToggle);
    }
    inputs.forEach((input) => {
      input.disabled = rating === 0;
    });
    buttons.forEach((button) => {
      button.disabled = rating === 0;
    });
  }
}

