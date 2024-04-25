export default function onClick(className, callback) {
  document.querySelector(`.${className}`).addEventListener("click", callback);
}
