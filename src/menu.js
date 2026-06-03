const MENU = {
  entradas: {
    label: "Entradas",
    items: {
      achuras: { name: "Achuras", price: 3500, unit: "porción" },
      morcilla: { name: "Morcilla", price: 2800, unit: "porción" },
      provoleta: { name: "Provoleta", price: 3200, unit: "porción" },
    },
  },
  parrilla: {
    label: "Parrilla",
    items: {
      "asado de tira": { name: "Asado de tira", price: 8500, unit: "kg" },
      vacío: { name: "Vacío", price: 9000, unit: "kg" },
      "pollo entero": { name: "Pollo entero", price: 7500, unit: "unidad" },
    },
  },
  guarniciones: {
    label: "Guarniciones",
    items: {
      "ensalada mixta": { name: "Ensalada mixta", price: 2200, unit: "porción" },
      "papas fritas": { name: "Papas fritas", price: 2500, unit: "porción" },
      chimichurri: { name: "Chimichurri", price: 800, unit: "porción" },
    },
  },
  bebidas: {
    label: "Bebidas",
    items: {
      "agua 500ml": { name: "Agua 500ml", price: 1200, unit: "unidad" },
      "gaseosa 500ml": { name: "Gaseosa 500ml", price: 1500, unit: "unidad" },
      "vino de la casa copa": { name: "Vino de la casa copa", price: 2800, unit: "copa" },
    },
  },
};

function getAllItems() {
  const items = {};
  for (const category of Object.values(MENU)) {
    for (const [key, item] of Object.entries(category.items)) {
      items[key] = item;
    }
  }
  return items;
}

function buildNumberedIndex() {
  const index = {};
  let counter = 1;
  for (const category of Object.values(MENU)) {
    for (const key of Object.keys(category.items)) {
      index[counter] = key;
      counter++;
    }
  }
  return index;
}

function formatMenu() {
  const lines = [];
  const numberedIndex = buildNumberedIndex();
  const reverseIndex = {};
  for (const [num, key] of Object.entries(numberedIndex)) {
    reverseIndex[key] = Number(num);
  }

  for (const category of Object.values(MENU)) {
    lines.push(`\n  📌 ${category.label}`);
    for (const [key, item] of Object.entries(category.items)) {
      const num = reverseIndex[key];
      lines.push(
        `    ${num}. ${item.name.padEnd(22)} $${item.price.toLocaleString("es-AR")} / ${item.unit}`
      );
    }
  }
  return lines.join("\n");
}

module.exports = { MENU, getAllItems, buildNumberedIndex, formatMenu };
