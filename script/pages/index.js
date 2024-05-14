import  functions  from "script/functions.js";
import { NewsProcessor } from "../news/news.js";

functions.slickSlider();

const domNews = document.querySelector(".news-js");
const url = "json/news.json";
const newsProcessor = new NewsProcessor(url);

newsProcessor.fetchData().then(() => {
  newsProcessor.printData(domNews);
});