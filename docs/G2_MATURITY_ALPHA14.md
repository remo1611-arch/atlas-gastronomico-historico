# G2 — Maduración del corpus · alpha.14

## Objetivo

Esta release no persigue volumen. Cierra tres huecos del piloto:

1. segunda revisión de B/C/D;
2. tercer recorrido longitudinal genérico;
3. grasa/aceite + especia.

---

## Segunda revisión

### Promovidos a verified

#### Goat / Ganj Dareh
- `goat`
- `occ_goat_ganj_dareh_8200_bce`

La arqueogenómica inicial se contrasta con un estudio posterior independiente basado en zooarqueología e isótopos estables.

#### The Forme of Cury
- `forme_of_cury`
- `occ_forme_of_cury_1390`

La atribución y cronología institucional se contrastan con Library of Congress y copias manuscritas adicionales catalogadas por British Library.

#### Nixtamalización
- `nixtamalization`
- `rel_maize_uses_nixtamalization_maya_classic`

La técnica como entidad histórica y su relación documentada con maíz se contrastan mediante:
- marcador experimental;
- San Bartolo;
- La Corona.

Las occurrences concretas de San Bartolo y La Corona permanecen `reviewed`: la segunda revisión de la técnica no equivale a una segunda excavación independiente de cada sitio.

### Permanecen reviewed
- `bread_like_flatbread`;
- `cheese`;
- `chicken` y su occurrence disputed;
- Appert;
- Codex;
- los nuevos registros de aceite de oliva y pimienta.

---

# Tercer recorrido longitudinal — aceite de oliva

## Subject
`olive_oil`

El seed:
`olive_oil_demo`

se conserva:
`deprecated → supersededBy: olive_oil`.

El occurrence demo:
`occ_oil_med_demo`

se conserva:
`deprecated → supersededBy: occ_olive_oil_kfar_samir_6500_bp`.

## Hitos

### Kfar Samir
`occ_olive_oil_kfar_samir_6500_bp`

Producción temprana asociada a huesos de aceituna triturados y pulpa en asentamientos sumergidos de la costa del Carmelo.

No se interpreta como origen absoluto.

### Ein Zippori
`occ_olive_oil_ein_zippori_6th_5th_millennia`

GC-MS identifica aceite de oliva en recipientes de niveles del VI–V milenios a.C.

Tipo:
`storage`

### Monte Testaccio
`occ_olive_oil_monte_testaccio_1_3c`

Las ánforas béticas documentan transporte y abastecimiento de aceite hacia Roma en época imperial.

Tipo:
`trade`

## Resultado

El motor de Historia del elemento detecta el recorrido automáticamente por tener >=2 occurrences reviewed/verified.

No existe:
- `renderOliveHistory`;
- una lista editorial duplicada;
- lógica específica por `olive_oil`.

---

# Especia — pimienta negra

## Subject
`black_pepper`

Tipo:
`ingredient`

## Occurrence
`occ_black_pepper_berenike_roman`

Berenike documenta mediante restos arqueobotánicos cantidades extraordinarias de pimienta negra dentro del comercio romano del mar Rojo.

Tipo:
- occurrence: `trade`;
- evidencia: `archaeobotanical`.

No se crea una ruta cartográfica India → Berenike porque las fuentes permiten documentar redes comerciales, pero no cada trayecto individual de los restos excavados.

---

# Cartografía

Los cuatro nuevos lugares permanecen sin punto canónico:
- Kfar Samir;
- Ein Zippori;
- Monte Testaccio;
- Berenike.

Esto es intencional en esta release.

No se introducen centroides modernos o coordenadas aproximadas sin procedencia espacial explícita.

---

# Estado de G2 tras alpha.14

Cumplido:
- corpus heterogéneo;
- verified gate;
- disputed;
- técnica canónica;
- events/developments;
- tres historias longitudinales;
- grasa/aceite;
- especia;
- cronología magnética/unificada;
- ausencia de rutas inventadas.

Pendiente para cierre formal:
- resolver los seeds demostrativos restantes que todavía pueden mostrarse en modo seed;
- decidir qué seeds se convierten en casos canónicos y cuáles desaparecen de la experiencia pública;
- auditoría final del gate G2 completo.
