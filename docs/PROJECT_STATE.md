# Estado actual

## Proyecto
Atlas Gastronómico Histórico

## Versión
0.1.0-alpha.10

## Gates
- G0: CERRADO.
- G1: CERRADO.
- G2: EN CURSO.
- G3+: no iniciados.

## Corpus
Se conserva íntegramente alpha.9:
- 17 subjects;
- 25 places;
- 28 occurrences;
- 3 events;
- 3 relationships;
- 7 contexts;
- 6 developments;
- 48 sources.

## Historias longitudinales
- vino;
- maíz.

## Alpha.10 — navegador temporal

Se añade un mapa temporal alineado con el slider.

### Evidencias
- solo reviewed/verified;
- densidad adaptativa;
- verified con marcador individual;
- uncertainty conservada.

### Events
- capa independiente;
- rangos representados como bandas;
- seleccionables.

### Developments
- capa independiente;
- rangos representados como bandas;
- seleccionables.

### Navegación
- cursor sincronizado con el año;
- hito anterior;
- hito siguiente;
- preview compacto del hito más próximo/seleccionado.

### Escalabilidad
Bins de densidad:
- 38 móvil;
- 68 tablet;
- 120 escritorio.

Esto evita convertir el timeline en una acumulación de puntos cuando el corpus crezca.

### Accesibilidad
- botones reales;
- aria-label descriptivo;
- targets táctiles mayores que el marcador visual;
- reduced-motion.

## Decisión de secuencia
G2-D (nixtamalización + disputed) se aplaza una iteración para resolver primero la navegación temporal, antes de añadir más contenido.

## Próxima acción
G2-D:
1. nixtamalización canónica;
2. relación explícita técnica ↔ maíz;
3. primer caso disputed;
4. validar cómo aparecen técnica/disputa en Historia del elemento y navegador temporal.

