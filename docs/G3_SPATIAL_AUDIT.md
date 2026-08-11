# G3-D — Auditoría espacial rigurosa

Release: `0.1.0-alpha.19`

## Objetivo

Auditar los 18 registros públicos que en alpha.18 carecían de punto cartográfico.

El objetivo **no** es alcanzar 100 % de pines.

El objetivo es distinguir:

1. lugares concretos con punto defendible;
2. regiones amplias que no deben reducirse a un centroide;
3. lugares concretos cuya localización todavía no está resuelta con suficiente procedencia.

---

# Resultado

Baseline alpha.18:

- 24 occurrences públicas;
- 6 con punto;
- 18 sin punto.

Después de la auditoría alpha.19:

- **15 con punto**;
- **9 sin punto**.

Decisiones sobre las 18 auditadas:

- **9 `point_documented` → mapped**;
- **5 `broad_region` → remain_unmapped**;
- **4 `specific_site_unresolved` → remain_unmapped**.

Las cuatro occurrences `specific_site_unresolved` corresponden a tres lugares:
- San Andrés, Tabasco;
- Paredones, Perú — dos occurrences;
- Ein Zippori.

---

# 1. Puntos incorporados

## Ganj Dareh
Punto de referencia de resolución gruesa.

`precision: reference`

Se conserva explícitamente que el punto orienta el mapa y no pretende ser una coordenada submétrica de excavación.

## Areni-1
Coordenadas publicadas institucionalmente.

`precision: exact_from_publication`

## Tel Kabri
Coordenadas de gazetteer arqueológico académico.

`precision: exact_from_publication`

## Jerusalem · City of David ridge
Punto arqueológico de referencia.

`precision: reference`

La occurrence reúne material de más de un área de excavación; por eso no se presenta como coordenada exacta de cada hallazgo.

## San Bartolo
Coordenadas institucionales publicadas.

`precision: exact_from_publication`

## La Corona
Banco de marca de la Plaza Central publicado en actas arqueológicas.

`precision: exact_from_publication`

## Kfar Samir
Coordenada de sector publicada para el asentamiento sumergido.

`precision: exact_from_publication`

La nota espacial recuerda que el punto no representa todo el perímetro del asentamiento.

## Monte Testaccio
Ubicación institucional del monumento.

`precision: reference`

No se interpreta como centro geométrico exacto de todo el depósito.

## Berenike
Coordenadas publicadas en síntesis arqueológica.

`precision: exact_from_publication`

---

# 2. Regiones que permanecen sin punto

## Kuyavia
La occurrence resume una región.

Un pin central produciría una falsa localización puntual.

## Inglaterra de Ricardo II
Funciona como contexto histórico del recetario, no como coordenada única del objeto o de su producción.

## Lower Great Lakes region
El registro resume evidencia multisitio regional.

## Cantabrian region
La adopción de maíz es un proceso regional.

## Tropical Atlantic Africa coasts
La evidencia cubre múltiples costas e introducciones; no existe un único punto de entrada documentado.

---

# 3. Sitios concretos todavía sin punto

## San Andrés, Tabasco
El sitio está históricamente identificado, pero las fuentes espaciales localizadas ofrecen cobertura/bounding box o topónimos homónimos, no una coordenada puntual inequívoca que el Atlas pueda adoptar.

## Paredones, Perú
La literatura sitúa el mound aproximadamente al norte de Huaca Prieta, pero G3 no convierte una relación espacial textual en una coordenada derivada sin una procedencia puntual publicada.

Las dos occurrences de Paredones comparten esta decisión.

## Ein Zippori
Existen referencias de cuadrícula de excavación, pero G3 no transforma coordenadas de otro sistema a WGS84 sin documentar y validar formalmente el procedimiento de transformación.

---

# Política de procedencia espacial

Un `place.point` debe declarar:

```json
{
  "lat": 0,
  "lon": 0,
  "precision": "reference | exact_from_publication | approximate",
  "sourceRefs": ["src_..."],
  "note": "..."
}
```

`sourceRefs` documenta **la procedencia del punto**.

No debe confundirse con las fuentes que sustentan la afirmación histórica de la occurrence.

---

# Criterios adoptados

## `exact_from_publication`
Se usa cuando una publicación o institución proporciona explícitamente las coordenadas adoptadas.

No significa:
- GPS submétrico;
- coordenada exacta de cada objeto excavado;
- exactitud absoluta del lugar histórico.

Significa:
“el Atlas reproduce una coordenada publicada”.

## `reference`
Se usa cuando existe una ubicación publicada y defendible para orientar el mapa, pero no debe interpretarse como coordenada exacta de la evidencia concreta.

## Región amplia
Permanece sin punto.

La cobertura del mapa nunca justifica inventar un centroide.

## Transformaciones de coordenadas
No se realizan ad hoc.

Si en el futuro es necesario convertir una cuadrícula arqueológica a WGS84, el procedimiento deberá:
1. identificar CRS de origen;
2. documentar transformación;
3. conservar la referencia original;
4. registrar método y precisión;
5. tener test reproducible.

---

# Conclusión

G3 no requiere 100 % de ocurrencias cartografiadas.

Requiere que la ausencia o presencia de geometría sea **explicable, trazable y honesta**.

Con esta auditoría:

- la cobertura puntual aumenta de 6 a 15 occurrences;
- 9 occurrences permanecen sin punto por decisión explícita;
- ninguna región amplia recibe un centroide ficticio;
- ninguna coordenada dudosa se adopta para completar métricas.

Esto satisface el gate espacial de G3.
