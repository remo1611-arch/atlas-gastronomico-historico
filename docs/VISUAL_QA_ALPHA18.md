# QA visual — alpha.18 Focused Exploration

Fecha: 2026-08-11

## Método

Render real con Chromium headless usando los recursos exactos de la build local.

Viewports:
- escritorio: 1440 × 1000;
- móvil: 393 × 852.

Se comprobó:
- carga completa del corpus;
- cambio Explorar ↔ Historias;
- ausencia de errores de consola/pageerror;
- overflow horizontal;
- estado inicial de disclosures;
- ubicación de Evidence Lens en Filtros;
- render de Historias;
- drawer móvil de Filtros.

## Resultado alpha.18

### Escritorio
- scrollWidth: 1440;
- clientWidth: 1440;
- sin overflow horizontal;
- altura Explorar: 1803 px;
- Historias cambia correctamente;
- volver a Explorar funciona;
- Procesos y cambios: cerrado por defecto;
- Evidence Lens: dentro de Filtros;
- errores de consola: 0.

### Móvil
- scrollWidth: 393;
- clientWidth: 393;
- sin overflow horizontal;
- altura Explorar: 2119 px;
- Historias cambia correctamente;
- volver a Explorar funciona;
- Procesos y cambios: cerrado por defecto;
- Evidence Lens: dentro de Filtros;
- errores de consola: 0.

## Comparación alpha.17 → alpha.18

### Escritorio
- alpha.17: 3667 px;
- alpha.18: 1803 px;
- reducción: 1864 px;
- reducción relativa: **50,8 %**.

### Móvil
- alpha.17: 5827 px;
- alpha.18: 2119 px;
- reducción: 3708 px;
- reducción relativa: **63,6 %**.

La comparación se hizo con el mismo corpus, fecha inicial y tamaño de viewport.

## Lectura visual

La jerarquía resultante es inequívoca:

`Tiempo → Mapa → En esta fecha`

En móvil:
- el hero sigue actuando como portada;
- Tiempo ocupa una tarjeta compacta;
- Mapa y sus tres acciones son legibles sin overflow;
- En esta fecha queda separado y ligero;
- Procesos y cambios no compite con las evidencias;
- Historias funciona como experiencia aparte.

No se detectaron roturas visuales evidentes en tema oscuro durante esta pasada.

## Pendiente

Validar táctilmente en Xiaomi 15:
- comodidad de la timeline;
- tamaño real de targets;
- sticky/scroll natural;
- drawer de filtros;
- cambio Explorar/Historias;
- modo claro en dispositivo real.
