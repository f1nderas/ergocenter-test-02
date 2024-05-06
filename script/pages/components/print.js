export default class DataPrinter {
  print(data,domParent) {
    const copyDomParent = domParent;
    data.forEach((e) => {
      const template = this.createItem();
      const item = this.inputItem(template, e.date, e.text);
      copyDomParent.append(item);
    });
    return copyDomParent
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
    return template;
  }
  inputItem(template, date, text) {
    template.childNodes[0].innerHTML = date;
    template.childNodes[1].innerHTML = text;
    return template;
  }
}
