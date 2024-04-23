export default class DataFetcher {
  constructor(url) {
    this.url = url;
  }
  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
}
