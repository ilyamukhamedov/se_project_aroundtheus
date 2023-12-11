export default class Section {
  constructor(items, renderer) {
    this.items = items;
    this.renderer = renderer;
  }

  renderItems() {
    this.items.forEach((item) => {
      renderer(item);
    });
  }

  addItem() {}
}