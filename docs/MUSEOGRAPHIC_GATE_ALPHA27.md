# Gate museográfico conjunto — alpha.27

## Alcance
Revisión de las 18 escenas publicadas de Vino, Pan y Fermentación después de la aceptación funcional de alpha.26 en Xiaomi.

No se amplía corpus ni se añaden historias.

## Criterios revisados
- progresión narrativa;
- claridad de la pregunta de cada escena;
- separación entre relato, método, límites y fuentes;
- contexto espacial;
- densidad de lectura;
- honestidad de la duración anunciada;
- utilidad del mapa de escena;
- coherencia de subjects declarados en historias transversales;
- cierre de cada recorrido.

## Hallazgos corregidos

### M-01 · Duraciones infraestimadas
Las estimaciones de alpha.26 (Vino 5 min, Pan 6 min, Fermentación 6 min) no eran compatibles con el volumen de texto visible.

Alpha.27 fija:
- Vino: ~10 min;
- Pan: ~10 min;
- Fermentación: ~7 min.

El test `test_museographic_gate.py` impide anunciar una duración inferior a la lectura visible calculada a 240 palabras/minuto. Método, límites y fuentes —capas voluntarias— no entran en ese mínimo.

### M-02 · Subject relacionado no cubierto
Fermentación declaraba `bread_like_flatbread` en `relatedSubjectRefs` pese a no contener una escena de Pan.

Alpha.27 limita la relación a los subjects efectivamente representados por evidencias del recorrido:
- `mixed_fermented_beverage`;
- `wine`;
- `cheese`.

### M-03 · Contexto geográfico duplicado
Cada escena repetía la misma información en:
1. encabezado: Dónde estás / Región / Quién vive aquí;
2. tarjeta lateral «Contexto en 30 segundos».

La tarjeta duplicada se elimina por completo de HTML, JS y CSS.

### M-04 · Cobertura cartográfica parcial silenciosa
Si una escena contenía varias referencias y solo algunas tenían punto, el mapa dibujaba las cartografiables sin avisar de las restantes.

Caso real: Fermentación, escena 2, Georgia + Xiaohe.

Alpha.27 diferencia:
- cobertura completa;
- cobertura parcial: aviso visible `Mapa parcial: X de Y referencias...`;
- ausencia total de punto: explicación neutral que admite localización no resuelta o proceso no reducible a un único punto.

No se añaden coordenadas artificiales.

### M-05 · Última escena mal rotulada
El bloque final seguía llamándose «Siguiente pregunta» aunque ya no existía escena siguiente.

Alpha.27 usa «Idea para llevarte» en la última escena y conserva «Siguiente pregunta» en las anteriores.

### M-06 · Portada con tres historias
La rejilla de historias pasa de dos columnas rígidas a `auto-fit`, para evitar una tarjeta huérfana en escritorio cuando hay tres visitas publicadas. En móvil sigue siendo una sola columna.

## Resultado editorial
Las tres historias tienen funciones diferenciadas:

- **Vino**: enseña cómo cambia el tipo de evidencia y el significado social de un mismo alimento.
- **Pan**: combate la idea de una evolución técnica lineal y combina alimento, herramientas, regulación e industria.
- **Fermentación**: demuestra que una historia transversal puede conectar matrices y periodos diferentes sin convertir el proceso en un subject ficticio.

No se detecta una necesidad adicional de modificar el contrato de datos o el renderer para sostener estas tres visitas.

## Gate
**MUSEOGRAPHIC_GATE: PASS**

La arquitectura de producto puede congelarse formalmente en alpha.27.
