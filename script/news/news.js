class NewsProcessor {
    constructor(url) {
      this.url = url;
      this.data = null;
    }
  
    async fetchData() {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.data = await response.json();
      } catch (error) {
        console.error("Fetch Error: ", error);
        throw error;
      }
    }
  
    printData(domParent) {
      if (this.data) {
        this.data.forEach((e) => {
          const template = this.createItem();
          const item = this.inputItem(template, e.date, e.text);
          domParent.append(item);
        });
      } else {
        console.log("No data to print.");
      }
    }
  
    createItem() {
      const template = document.createElement("div");
      const divInner = document.createElement("div");
      const aInner = document.createElement("a");
      template.className = "cont-2_news-item";
      divInner.className = "div_date";
      aInner.className = "div_txt";
      aInner.setAttribute("href", "#");
      template.append(divInner);
      template.append(aInner);
    //   const template = `
    //               <div class="cont-2_news-item">
    //           <div class="div_date"></div>
    //           <a class="div_txt" href="#"></a>
    //         </div>
    //   `
      return template;
    }
  
    inputItem(template, date, text) {
      template.childNodes[0].innerHTML = date;
      template.childNodes[1].innerHTML = text;
      return template;
    }
  }
  
  const domNews = document.querySelector(".news-js");
  const url = "../../json/news.json";
  const newsProcessor = new NewsProcessor(url);
  
  newsProcessor.fetchData().then(() => {
    newsProcessor.printData(domNews);
  });