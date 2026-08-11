# Archivo de seeds y demos

Desde `0.1.0-alpha.15`, los datos demostrativos anteriores a G2 no forman parte del corpus runtime.

Archivo:

`data/archive/demo_records_pre_g2.json`

## Motivo

Los seeds:
- no tienen el nivel documental del corpus G2;
- contienen rangos deliberadamente demostrativos;
- no deben aparecer en mapas, filtros, métricas o historias públicas.

## Política

El archivo:
- se distribuye para trazabilidad;
- no se carga desde `js/app.js`;
- no se usa para métricas;
- no se usa en Historia del elemento;
- no participa en la timeline;
- conserva migraciones `deprecated → supersededBy`.

No debe utilizarse como fuente histórica.

