# Gate móvil — alpha.25

Objetivo: validar que la migración del contrato de Historias no ha introducido regresiones perceptibles. Alpha.25 no añade contenido; por tanto cualquier diferencia funcional frente a alpha.24.2 debe considerarse sospechosa.

## Identificación
- La cabecera debe mostrar `alpha.25`.
- Inicio por defecto en **Historias**.
- Deben aparecer exactamente **Historia del vino** e **Historia del pan**.

## Vino
1. Abrir Historia del vino.
2. Avanzar al menos tres escenas con Siguiente.
3. Retroceder una escena con Anterior.
4. Abrir una evidencia en Atlas desde la historia.
5. Comprobar cambio de fecha, pin/ficha y contexto.
6. Pulsar Atrás de Android: debe regresar a la misma escena de Vino.

## Pan
1. Volver a Historias y abrir Historia del pan.
2. Navegar anterior/siguiente.
3. Abrir una evidencia en Atlas.
4. Atrás de Android debe recuperar la escena de Pan.

## Atlas
- Buscar `vino`: 5 evidencias.
- Buscar `pan`: 7 evidencias.
- `Mundo` recupera el encuadre global.
- Tap en pin → fecha → ficha sigue sincronizado.
- 1864/Pasteur continúa cartografiable.
- Codex 1961–1963 y APPCC siguen tratados como desarrollos sin punto único cuando corresponda.

## Navegación
- Historia → Atlas → Historia varias veces.
- Botones Historias/Atlas no pierden el estado de forma incoherente.
- Atrás Android no cierra o salta vistas inesperadamente.
- Deep link `#historia/story_wine/3` abre la escena 3 de Vino.
- Deep link `#historia/story_bread/3` abre la escena 3 de Pan.

## Criterio de gate
PASS si Vino y Pan se comportan igual o mejor que alpha.24.2 y no aparece ninguna regresión de navegación/estado. Si pasa, la siguiente versión puede integrar Fermentación como primera historia `transversal`.
