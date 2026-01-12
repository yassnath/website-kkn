document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Sabun Kopi", img: "img/sabun.jpeg", price: 10000 },
      { id: 2, name: "Susu Segar", img: "img/susu.jpeg", price: 15000 },
      { id: 3, name: "Kerupuk Lobak", img: "img/kerupuk.jpeg", price: 15000 },
      { id: 4, name: "Mawar Tabur", img: "img/mawar.jpeg", price: 10000 },
    ],
    addToCart(item) {
      Alpine.store("cart").add(item);
    },
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(item) {
      if (!item) {
        return;
      }
      const price = Number(item.price) || 0;
      const existing = this.items.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
      this.total += price;
      this.quantity += 1;
    },
    remove(id) {
      const index = this.items.findIndex((cartItem) => cartItem.id === id);
      if (index === -1) {
        return;
      }
      const item = this.items[index];
      const price = Number(item.price) || 0;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.items.splice(index, 1);
      }
      this.total = Math.max(0, this.total - price);
      this.quantity = Math.max(0, this.quantity - 1);
    },
  });
});
