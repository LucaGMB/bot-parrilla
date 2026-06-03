const OPEN_HOURS = [
  { start: { h: 12, m: 0 }, end: { h: 16, m: 0 } },
  { start: { h: 20, m: 0 }, end: { h: 23, m: 30 } },
];

function isOpen(now = new Date()) {
  // Convert to Argentina time (UTC-3)
  const argOffset = -3 * 60;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const argDate = new Date(utcMs + argOffset * 60000);

  const currentMinutes = argDate.getHours() * 60 + argDate.getMinutes();

  return OPEN_HOURS.some(({ start, end }) => {
    const startMin = start.h * 60 + start.m;
    const endMin = end.h * 60 + end.m;
    return currentMinutes >= startMin && currentMinutes < endMin;
  });
}

function getScheduleMessage() {
  return (
    "⏰ Nuestro horario de atención es:\n" +
    "   Lunes a domingo: 12:00–16:00 y 20:00–23:30 (hora Argentina)\n" +
    "   Volvé en horario y con gusto te tomamos el pedido. 🔥"
  );
}

module.exports = { isOpen, getScheduleMessage };
