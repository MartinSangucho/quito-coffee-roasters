# Quito Coffee Roasters ☕

Aplicación web interactiva para una tostadería artesanal de café de especialidad ubicada en el Centro Histórico de Quito, Ecuador.

## Descripción

Plataforma web que permite a los clientes explorar el catálogo de cafés de especialidad, calcular costos de pedido según zona de entrega, y acceder a información en tiempo real (clima, cotizaciones de divisas, frases inspiracionales).

## Funcionalidades

- **Hero interactivo**: Frase inspiracional diaria (API Quotable) y clima actual en Quito (API Open-Meteo)
- **Catálogo de cafés**: 10 productos con filtros por origen y búsqueda por nombre
- **Carrito de compras**: Agregar/eliminar productos, selector de cantidad
- **Calculadora de pedido**: Subtotal, envío por zona (Norte/Centro/Sur/Valles), total
- **Conversión de divisas**: USD → EUR en tiempo real (API ExchangeRate-API)
- **Formulario de contacto**: Validación en tiempo real con mensajes de error específicos
- **Diseño responsive**: Adaptado a móvil, tablet y desktop
- **Accesibilidad**: Atributos ARIA, roles semánticos, contenido para lectores de pantalla

## APIs Integradas

| API | Uso |
|-----|-----|
| [Open-Meteo](https://open-meteo.com) | Clima actual en Quito |
| [Quotable](https://github.com/lukePeavey/quotable) | Frases inspiracionales del día |
| [ExchangeRate-API](https://open.er-api.com) | Conversión USD → EUR |

## Tecnologías

- **HTML5** semántico con atributos ARIA
- **CSS3** con Flexbox, CSS Grid, variables CSS, media queries, animaciones
- **JavaScript ES6+** con módulos (import/export), async/await, arrow functions, desestructuración, spread/rest, métodos de array (map, filter, reduce, find)

## Estructura del Proyecto

```
Quito Coffee Roasters/
├── index.html          # Página principal
├── README.md           # Documentación
├── css/
│   ├── styles.css      # Estilos principales y variables CSS
│   └── responsive.css  # Media queries responsivas
├── js/
│   ├── app.js          # Punto de entrada e inicialización
│   ├── api.js          # Consumo de APIs públicas
│   ├── catalog.js      # Catálogo de productos y filtros
│   ├── cart.js         # Carrito y calculadora de envío
│   └── form.js         # Validación de formulario
└── assets/
    └── img/            # Imágenes del proyecto
```

## Despliegue

El proyecto está desplegado en GitHub Pages.

**URL**: `https://<usuario>.github.io/<repositorio>/`

## Desarrollo Local

1. Clonar el repositorio
2. Abrir `index.html` en un navegador moderno
3. Los módulos ES6+ requieren un servidor local (usar Live Server en VS Code)

## Autor

**Leandro** - Desarrollador Web

## Uso de IA

Este proyecto fue desarrollado con la asistencia de inteligencia artificial (opencode/big-pickle) como copiloto durante todo el proceso de desarrollo, desde la planificación de la arquitectura hasta la implementación de cada módulo.
