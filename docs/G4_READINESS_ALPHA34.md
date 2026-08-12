# G4 Readiness · alpha.34

## Veredicto

**G4 PILOT-READY · FULL NETWORK: NO**

Alpha.34 alcanza la referencia mínima de densidad editorial fijada en la hoja de ruta, pero todavía no justifica una red extensa de flechas.

## Métricas

- 50 occurrences públicas.
- 10 historias / 55 escenas.
- 2 occurrences `introduction`.
- 4 occurrences `adoption`.
- 2 occurrences `trade`.
- 1 relationship canónica (`maize → uses_technique → nixtamalization`).
- 21 occurrences con punto / 29 sin punto.

## Qué ha mejorado

La historia «Cultivos americanos, cocinas europeas» añade casos donde se pueden distinguir explícitamente:

1. presencia o atestiguación;
2. introducción;
3. cultivo;
4. adopción;
5. generalización.

Los filtros del runtime combinan la taxonomía G2 congelada con los valores realmente observados en el corpus. Esto evita perder tipos específicos publicados sin modificar `data/taxonomy.json` ni su fingerprint G2.

## Por qué no abrir todavía una red completa

Una red geográfica exige evidencia del **vector**, no solo evidencia en los extremos. Compartir un subject entre dos lugares no autoriza a dibujar una línea.

Actualmente hay pocos candidatos directos de alta calidad:

- **Patata · Gran Canaria → Amberes · 1567**: envío notarial documentado.
- **Café · costa de Malabar → Batavia · 1696/1699**: envíos de semillas descritos por la historia varietal seleccionada.

Otros casos permiten afirmar presencia, adopción o expansión regional, pero no el itinerario preciso entre nodos.

## Condición para G4 Pilot A

El piloto podrá abrirse tras aceptación de alpha.34 y deberá:

- usar únicamente vectores explícitamente sustentados;
- distinguir `trade`, `plant_transfer`, `introduction`, `adoption` y `generalization` a nivel editorial;
- no inferir rutas mediante proximidad temporal o coincidencia de subject;
- permitir vínculos sin geometría cuando la fuente sostenga el proceso pero no una trayectoria cartografiable;
- ser aditivo: ningún cambio destructivo de los 10 schemas congelados.

## Condición para red G4 amplia

No ampliar hasta disponer de suficientes vectores independientes para que el mapa no sea una colección de dos o tres flechas vistosas. El criterio será calidad y cobertura, no un porcentaje artificial.
