class Order {
  constructor() {
    this.items = [];
  }

  add(item) {
    const existing = this.items.find((i) => i.key === item.key);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ key: item.key, name: item.name, price: item.price, qty: 1 });
    }
  }

  remove(key) {
    const index = this.items.findIndex((i) => i.key === key);
    if (index === -1) return false;
    if (this.items[index].qty > 1) {
      this.items[index].qty -= 1;
    } else {
      this.items.splice(index, 1);
    }
    return true;
  }

  total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  summary() {
    if (this.isEmpty()) return "  (No hay nada en el pedido todavía)";
    return this.items
      .map(
        (i) =>
          `  • ${i.name}${i.qty > 1 ? ` x${i.qty}` : ""}  →  $${(i.price * i.qty).toLocaleString("es-AR")}`
      )
      .join("\n");
  }

  finalSummary() {
    const lines = ["─".repeat(42)];
    lines.push("  RESUMEN DE TU PEDIDO:");
    lines.push("─".repeat(42));
    lines.push(this.summary());
    lines.push("─".repeat(42));
    lines.push(`  TOTAL:  $${this.total().toLocaleString("es-AR")}`);
    lines.push("─".repeat(42));
    return lines.join("\n");
  }
}

module.exports = Order;
