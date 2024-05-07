import { functions } from "../functions.js";
import { Stars } from "../stars/stars.js";

const variable = document.querySelectorAll(".rating-stars_js");
const star = new Stars(variable);
star.create();

functions.photoEventListener();
functions.checkInputText();
functions.customCheckbox();
functions.toggleClassBtn();
