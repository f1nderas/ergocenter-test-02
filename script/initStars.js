export default function initStars(stars) {
  let starActive, starValue;
  const initStarVars = (star) => {
    starActive = star.querySelector(".stars_active");
    starValue = document.querySelector(".reviews-rating_num");
  };
  const setStarActiveWidth = (i = starValue.innerHTML) => {
    const starActiveWidth = i / 0.05;
    starActive.style.width = `${starActiveWidth}%`;
  };
  const setStar = (star) => {
    const starItems = star.querySelectorAll(".stars_item");
    for (let i = 0; i < starItems.length; i++) {
      const starItem = starItems[i];
      starItem.addEventListener("mouseenter", (e) => {
        initStarVars(star);
        setStarActiveWidth(starItem.value);
      });
      starItem.addEventListener("mouseleave", (e) => {
        setStarActiveWidth();
      });
    }
  };
  const initStar = (star) => {
    initStarVars(star);
    setStarActiveWidth();
    if (star.classList.contains("stars_set")) {
      setStar(star);
    }
  };
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    initStar(star);
  }
}
