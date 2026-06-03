const readline = require("readline");
const { getAllItems, buildNumberedIndex, formatMenu } = require("./menu");
const { isOpen, getScheduleMessage } = require("./schedule");
const Order = require("./order");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const allItems = getAllItems();
const numberedIndex = buildNumberedIndex();
const order = new Order();

function print(msg) {
  console.log(msg);
}

function bot(msg) {
  console.log(`\n🤖  ${msg}\n`);
}

function prompt() {
  rl.question("Vos > ", handleInput);
}

function resolveItemKey(input) {
  const normalized = input.trim().toLowerCase();

  // By number
  const asNumber = parseInt(normalized, 10);
  if (!isNaN(asNumber) && numberedIndex[asNumber]) {
    return numberedIndex[asNumber];
  }

  // Exact match
  if (allItems[normalized]) return normalized;

  // Partial match
  const keys = Object.keys(allItems);
  const partial = keys.find((k) => k.includes(normalized) || normalized.includes(k));
  return partial || null;
}

function showMenu() {
  print(formatMenu());
  print(
    "\n  ℹ️  Escribí el nombre o número del ítem para agregarlo al pedido."
  );
  print("  ℹ️  Comandos: «ver pedido», «quitar [ítem]», «listo»\n");
}

function handleInput(input) {
  const raw = input.trim();
  const lower = raw.toLowerCase();

  // --- Reservas ---
  if (
    lower.includes("reserva") ||
    lower.includes("mesa") ||
    lower.includes("reservar")
  ) {
    bot(
      "Solo gestionamos pedidos para llevar o delivery, no hacemos reservas."
    );
    return prompt();
  }

  // --- Ver pedido ---
  if (lower === "ver pedido" || lower === "ver") {
    bot(
      `Tu pedido hasta ahora:\n\n${order.summary()}\n\n  Total parcial: $${order.total().toLocaleString("es-AR")}`
    );
    return prompt();
  }

  // --- Quitar ítem ---
  if (lower.startsWith("quitar ") || lower.startsWith("sacar ")) {
    const term = raw.replace(/^(quitar|sacar)\s+/i, "");
    const key = resolveItemKey(term);
    if (!key) {
      bot(
        `No encontré "${term}" en tu pedido. Escribí «ver pedido» para ver qué tenés.`
      );
    } else {
      const removed = order.remove(key);
      if (removed) {
        bot(
          `Listo, saqué ${allItems[key]?.name ?? key} del pedido. Tu total ahora es $${order.total().toLocaleString("es-AR")}.`
        );
      } else {
        bot(`Ese ítem no estaba en tu pedido.`);
      }
    }
    return prompt();
  }

  // --- Confirmar pedido ---
  if (lower === "listo" || lower === "confirmar" || lower === "terminar") {
    if (order.isEmpty()) {
      bot(
        "¡Ey, tu pedido está vacío! Agregá algo primero. ¿Qué se te antoja? 🍖"
      );
      return prompt();
    }
    print("\n" + order.finalSummary());
    bot(
      "¡Pedido confirmado! 🔥\n\n" +
        "  💳 El pago lo realizás al retirar o cuando llegue el delivery.\n" +
        "  🙌 ¡Gracias por elegirnos! Que lo disfruten."
    );
    rl.close();
    return;
  }

  // --- Menú / ayuda ---
  if (
    lower === "menú" ||
    lower === "menu" ||
    lower === "carta" ||
    lower === "ayuda" ||
    lower === "help"
  ) {
    showMenu();
    return prompt();
  }

  // --- Agregar ítem ---
  if (raw.length > 0) {
    const key = resolveItemKey(raw);
    if (key && allItems[key]) {
      order.add({ key, ...allItems[key] });
      bot(
        `Agregaste ${allItems[key].name} — tu total hasta ahora es $${order.total().toLocaleString("es-AR")} 💪`
      );
    } else {
      bot(
        `No encontré "${raw}" en la carta. Revisá las opciones disponibles:`
      );
      showMenu();
    }
    return prompt();
  }

  prompt();
}

function start() {
  print("\n" + "═".repeat(50));
  print("    🔥  LA PARRILLA DEL BARRIO — BOT DE PEDIDOS  🔥");
  print("═".repeat(50));

  if (!isOpen()) {
    bot(
      "¡Hola! Por ahora estamos cerrados.\n\n  " +
        getScheduleMessage()
    );
    rl.close();
    return;
  }

  bot(
    "¡Buenas! Bienvenido/a a La Parrilla del Barrio. 🥩\n" +
      "  Acá te tomo el pedido para llevar o delivery.\n\n" +
      "  Nuestro menú de hoy:"
  );
  showMenu();
  prompt();
}

module.exports = { start };
