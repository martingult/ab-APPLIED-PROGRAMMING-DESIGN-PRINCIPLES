# Guía de Contribución 

¡Gracias por tu interés en contribuir a este proyecto de análisis de precios de combustibles! Para mantener el código limpio y organizado, te pedimos que sigas estas pautas.

## Cómo contribuir
1. Haz un **Fork** de este repositorio.
2. Clona tu fork en tu máquina local: `git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git`
3. Instala las dependencias ejecutando: `npm install`
4. Crea una nueva rama para tu nueva funcionalidad o corrección: `git checkout -b feature/nueva-funcionalidad`

## Reglas de Código (Clean Code)
Este proyecto sigue los principios **SOLID**. Por favor, asegúrate de que:
- **Single Responsibility:** Cada clase debe tener un único propósito. Si creas una nueva funcionalidad, valora si necesitas crear un nuevo servicio en la carpeta `src/service/`.
- **No Magic Strings/Numbers:** Cualquier valor fijo (URLs, IDs, etc.) debe ir en `src/config/constant.ts`.
- **Tipado Estricto:** Usa siempre interfaces explícitas (en `src/models`) para los datos. Evita usar el tipo `any`.

## Pull Requests
- Asegúrate de que tu código funciona ejecutando `npx tsx src/index.ts` antes de subirlo.
- Explica claramente qué problema resuelve tu Pull Request y qué cambios has realizado.

¡Gracias por ayudar a mejorar esta herramienta!