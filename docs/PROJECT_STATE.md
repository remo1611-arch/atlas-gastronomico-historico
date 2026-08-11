# Estado actual

## Proyecto
Atlas Gastronómico Histórico

## Versión
0.1.0-alpha.3

## Gate
- G0: CERRADO.
- G1.1 Museum polish: implementado.
- G1.2 capas de contexto/transformación: contrato implementado.
- G1: pendiente de prueba visual real en GitHub Pages/Xiaomi 15.
- G2+: no iniciados.

## Arquitectura activa
Núcleo:
- subject;
- occurrence;
- place;
- event;
- relationship;
- source.

Capas nuevas:
- context: civilizaciones, culturas, pueblos, entidades políticas, instituciones;
- development: ciencia, tecnología, equipamiento, conservación, frío, industria, higiene, regulación, calidad y logística.

## Regla estructural
El Atlas sigue siendo gastronómico.
Las civilizaciones aportan contexto y los developments explican transformaciones; ninguno sustituye a `occurrence` como unidad de evidencia gastronómica.

## Interfaz alpha.3
- menos cajas tipo dashboard;
- métricas convertidas en franja editorial;
- mapa con mayor jerarquía;
- panel “Transformaciones”;
- drawer de capas;
- ficha preparada para contextos y developments;
- URLs CSS/JS versionadas para evitar caché cruzada.

## Datos
- 10 subjects seed;
- 8 places seed;
- 11 occurrences seed;
- 2 events seed;
- 3 relationships seed;
- 0 contexts;
- 0 developments.

Los dos últimos están deliberadamente vacíos hasta G2.

## Próximo gate
Publicar alpha.3 y auditar en móvil/escritorio. Si la UX es estable, iniciar G2 con un corpus piloto que incluya al menos:
- una cultura/civilización contextual;
- un descubrimiento científico;
- una tecnología de conservación;
- un aparato/equipamiento;
- un hito de higiene/seguridad;
- una norma o sistema de control.

