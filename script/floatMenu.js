export default function floatMenuScript(){
    
    const floatMenu = document.querySelector(".float-menu-js");
    const checkbox = document.querySelector(".burger-checkbox-js");
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
}