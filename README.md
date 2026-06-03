# 🔥 Bot de Pedidos — La Parrilla del Barrio

Bot de pedidos interactivo para parrilla argentina, ejecutado directamente en consola. Construido con Node.js puro usando el módulo `readline` nativo — sin dependencias externas en runtime.

## Características

- **Interfaz de consola** conversacional en español rioplatense informal
- **Menú completo** por categorías: entradas, parrilla, guarniciones y bebidas
- **Gestión de pedido en memoria**: agregar, quitar ítems y ver el resumen en cualquier momento
- **Validación de horario** en tiempo real (zona horaria Argentina, UTC-3)
- **Restricciones de negocio**: no toma reservas ni pagos en línea
- **Manejo de errores** amigable con sugerencias ante entradas inválidas

## Requisitos

- Node.js ≥ 18.0.0
- pnpm (recomendado) o npm

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/LucaGMB/bot-parrilla.git
cd bot-parrilla

# Instalar dependencias de desarrollo (solo ESLint)
pnpm install

# Iniciar el bot
pnpm start
# o directamente:
node index.js
```

## Comandos disponibles durante el pedido

| Comando | Descripción |
|---|---|
| `<nombre o número del ítem>` | Agrega el ítem al pedido |
| `ver pedido` | Muestra el resumen y el total parcial |
| `quitar <ítem>` | Quita una unidad del ítem del pedido |
| `listo` | Confirma el pedido y muestra el resumen final |
| `menú` / `carta` | Vuelve a mostrar la carta |

## Menú

| Categoría | Ítem | Precio |
|---|---|---|
| **Entradas** | Achuras | $3.500 / porción |
| | Morcilla | $2.800 / porción |
| | Provoleta | $3.200 / porción |
| **Parrilla** | Asado de tira | $8.500 / kg |
| | Vacío | $9.000 / kg |
| | Pollo entero | $7.500 / unidad |
| **Guarniciones** | Ensalada mixta | $2.200 / porción |
| | Papas fritas | $2.500 / porción |
| | Chimichurri | $800 / porción |
| **Bebidas** | Agua 500ml | $1.200 / unidad |
| | Gaseosa 500ml | $1.500 / unidad |
| | Vino de la casa copa | $2.800 / copa |

## Horario de atención

Lunes a domingo: **12:00–16:00** y **20:00–23:30** (hora Argentina, UTC-3).

Fuera de ese horario, el bot informa el cierre y no toma pedidos.

## Restricciones de negocio

- **Sin reservas de mesa**: el bot solo gestiona pedidos para llevar o delivery.
- **Sin pagos en línea**: el pago se realiza al retirar o al recibir el delivery.

## Estructura del proyecto

```
bot-parrilla/
├── index.js          # Punto de entrada
├── src/
│   ├── bot.js        # Lógica conversacional y manejo de input
│   ├── menu.js       # Configuración del menú y helpers de formato
│   ├── order.js      # Clase Order — gestión del pedido en memoria
│   └── schedule.js   # Validación de horario de atención
├── package.json
└── eslint.config.js
```

## Licencia

MIT
