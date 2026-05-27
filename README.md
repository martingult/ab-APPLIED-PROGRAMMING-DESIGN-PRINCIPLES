# Análisis de Precios de Combustible 

Este proyecto es una herramienta de línea de comandos (CLI) desarrollada en **TypeScript** que procesa los datos públicos emitidos por el Ministerio de Transición Ecológica relativos a los precios de combustible en España.

## Objetivo (Hito 2)
La aplicación descarga los datos diarios y genera un informe de mercado para las provincias en las que opera nuestra compañía (Madrid, A Coruña, Santa Cruz de Tenerife y Badajoz), calculando:
- Media de los precios de **Gasóleo A** y **Gasolina 95 E5**.
- Top 5 de estaciones de servicio más baratas y más caras para dichos combustibles.

## Arquitectura y Clean Code
En esta versión se ha refactorizado el código para cumplir con los **principios SOLID**:
- **Single Responsibility:** Separación estricta entre la descarga de datos (`ApiService`) y los cálculos matemáticos (`ReportService`).
- **Clean Code:** Eliminación de *magic strings/numbers* centralizando las configuraciones en `src/config/constant.ts`.
- **Estructura Modular:** Cada interfaz y clase reside en su propio fichero dentro del directorio `src/`.

##  Cómo ejecutar el proyecto
Primero hay que instalar dependencias: `npm install`
Segundo hay que ejecutar el programa: `npm start`
Tercero hay que ejecutar los tests: `npm test`

### Requisitos previos
- Node.js instalado en el sistema.

### 2. Instalación de dependencias
Abre la terminal en la raíz del proyecto y ejecuta:
```bash
npm install
npm install -D tsx

Bibliografía y Referencias

Ministerio para la Transición Ecológica y el Reto Demográfico (2026). Geoportal: Consulta de precios de carburantes en estaciones de servicio. [En línea]. Disponible en: https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/ [Accedido el 27 de mayo de 2026].

QuickChart (2026). QuickChart: Web API for generating chart images. [En línea]. Disponible en: https://quickchart.io/ [Accedido el 27 de mayo de 2026].

Martin, R.C. (2008). Clean Code: A Handbook of Agile Software Craftsmanship. Prentice Hall. (Principios aplicados en la estructura de servicios).