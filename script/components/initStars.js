export default function initStars(stars) {
  const setStarActiveWidth = (star, value) => {
    const starActive = star.querySelector(".stars_active");
    const starActiveWidth = (value / 5) * 100; 
    starActive.style.width = `${starActiveWidth}%`;
  };

  const setStar = (star) => {
    const starItems = star.querySelectorAll(".stars_item");
    for (let i = 0; i < starItems.length; i++) {
      const starItem = starItems[i];
      starItem.addEventListener("click", (e) => {
        if (star.classList.contains("stars_set")) {
          const value = parseInt(starItem.value, 10);
          star.setAttribute("data-rating", value); 
          setStarActiveWidth(star, value); 
        }
      });
    }
  };

  const initStar = (star) => {
    const starValue = parseFloat(star.getAttribute("data-rating")) || 0;
    setStarActiveWidth(star, starValue); 
    setStar(star); 
  };

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    initStar(star);
  }
}
