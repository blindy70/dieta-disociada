# Dieta Disociada — App de gestión

Aplicación web estática (HTML + CSS + JS puro, sin dependencias) para gestionar la dieta disociada.

## Funcionalidades
- 📅 **Hoy**: menú del día según fase/semana/día activos, con casillas para marcar como hecho.
- 🗓️ **Planificar**: elegir fase (Desintoxicante / Clásica 14 semanas / Mantenimiento) y día.
- 🛒 **Lista de la compra**: genera ingredientes del día o de la semana completa, con tachado al comprar.
- 🔍 **Buscador**: clasifica alimentos en hidrato / proteína / verdura / fruta e indica si están permitidos.
- 📖 **Recetas**: instrucciones de preparación extraídas de los PDFs.
- ⚖️ **Peso**: registro y gráfico de evolución.
- 🔔 **Avisos**: recordatorios de desayuno/comida/cena (API de notificaciones).
- ✍️ **Notas**: anotaciones manuscritas de los PDFs, editables.

## Datos
Los datos de la dieta (fases, menús, alimentos, recetas y notas) están en `js/dieta-data.js`, extraídos de los PDFs escaneados mediante OCR.

El progreso, peso, lista de compra y correcciones de notas se guardan **localmente** en cada dispositivo (localStorage). No hay backend.

## Uso
1. Abre `index.html` en cualquier navegador, o
2. Despliega la carpeta en cualquier hosting estático (Netlify, GitHub Pages, etc.).

## Despliegue en Netlify
Conecta este repositorio desde **app.netlify.com** → *Add new site* → *Import an existing project* → selecciona este repo. El build es estático; el `index.html` está en la raíz (build directory: `.`).
