# Aceptación móvil · alpha.35 · G4 Pilot A

## Identidad
- [ ] La interfaz muestra `alpha.35`.
- [ ] Historias y Atlas siguen funcionando como en alpha.34.

## Capa G4
- [ ] Abrir `Atlas → Capas`.
- [ ] Existe `Vínculos documentados · piloto G4` y está activada.
- [ ] Desactivarla oculta por completo el panel G4.
- [ ] Activarla recupera el panel sin recargar la página.

## Lectura del piloto
- [ ] El panel muestra exactamente 2 vínculos.
- [ ] Patata: Gran Canaria → Amberes · noviembre de 1567 · comercio documentado.
- [ ] Café: costa de Malabar → Batavia · 1696 y 1699 · transferencia de material vegetal.
- [ ] Ambos indican `Sin geometría proyectable`.
- [ ] No aparece ninguna flecha/línea en el mapa.
- [ ] La ausencia de línea se entiende como cautela cartográfica y no como error de carga.

## Evidencia
- [ ] `Abrir evidencia` en Patata lleva al registro canónico de 1567.
- [ ] Atrás de Android devuelve al Atlas sin perder estado útil.
- [ ] `Abrir evidencia` en Café enfoca el development Malabar→Batavia 1696–1699.
- [ ] Las fuentes siguen accesibles desde las fichas canónicas.

## Fecha y búsqueda
- [ ] En 1567, la tarjeta de Patata se marca `EN ESTA FECHA`.
- [ ] En 1696–1699, Café se marca `EN ESTA FECHA`.
- [ ] Buscar `patata` reduce el panel al vínculo de Patata.
- [ ] Buscar `café` o `coffee` reduce el panel al vínculo de Café.
- [ ] Limpiar búsqueda recupera los 2 vínculos.

## Regresión
- [ ] `vino` y `pan` conservan búsquedas correctas.
- [ ] Historia → Atlas → Atrás Android sigue funcionando.
- [ ] `Mundo`, autoencuadre, filtros y timeline no presentan regresiones.
- [ ] No hay overflow horizontal ni panel ilegible en vertical.

## Criterio de PASS
El visitante debe comprender que **un vector histórico puede estar documentado aunque no pueda dibujarse responsablemente como ruta**. Si el panel induce a pensar que “falta cargar el mapa”, alpha.35 necesita ajuste UX antes de Pilot B.
