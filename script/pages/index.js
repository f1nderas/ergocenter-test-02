import DataFetcher from "./components/fetch.js";
import DataPrinter from "./components/print.js";
import { functions } from "/script/functions.js";

functions.slickSlider();

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
const url = "/json/news.json";
const dataFetcher = new DataFetcher(url);
const dataProcessor = new DataProcessor(dataFetcher);
const dataPrinter = new DataPrinter();

dataProcessor
  .setData()
  .then(() => dataProcessor.printData())
  .catch((error) => console.error("Error:", error));
