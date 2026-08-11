# G2-C — Historia longitudinal del maíz

## Objetivo

Crear el segundo recorrido histórico automático y probar un patrón distinto al vino:

- domesticación;
- expansión precolombina;
- consumo;
- desplazamiento continental;
- evento histórico transatlántico;
- adopción regional;
- incertidumbre historiográfica explícita.

El recorrido se deriva de datos canónicos. No existe un `tour` escrito a mano.

---

## Hitos incorporados

### 1. Xihuatoxtla / Balsas
Se conserva el registro ya verificado de domesticación temprana.

### 2. San Andrés, Tabasco
`occ_maize_san_andres_7300_calbp`

PNAS documenta fitolitos que confirman expansión del cultivo de maíz hacia la costa tropical del Golfo de México hacia 7300 cal BP.

Tipo:
`cultivation`

No se interpreta como un segundo origen independiente.

### 3. Paredones / costa norte del Perú
`occ_maize_paredones_6775_6504_calbp`

Macro y microrestos documentan maíz en contextos precerámicos de ca. 6775–6504 cal BP.

Tipo:
`archaeological_presence`

Se usa para documentar difusión y adaptación, no domesticación de novo.

### 4. Consumo en Paredones
`occ_maize_paredones_consumption_6500_6000_calbp`

Isótopos estables y microdesgaste dental muestran consumo regular de maíz en Paredones ca. 6500–6000 cal BP.

Es un registro independiente del simple hallazgo de restos.

Tipo:
`consumption`

### 5. Grandes Lagos inferiores
`occ_maize_lower_great_lakes_540_1030`

Cinco fechas AMS de maíz del Grand Banks site sitúan presencia entre cal d.C. 540–1030.

Contexto:
`princess_point_complex`

No se extrapola automáticamente a agricultura intensiva en toda la región.

### 6. Transferencia transatlántica
`event_maize_transatlantic_exchange_1492_1700`

Primer `event` canónico integrado en Historia del elemento.

El evento representa un proceso macrohistórico:
- conexión sostenida entre América y el Viejo Mundo;
- traslado del maíz;
- difusión durante los siglos XVI–XVII.

No significa:
- que todo ocurriera en 1492;
- que existiese una única ruta;
- que introducción y adopción fueran simultáneas.

El viejo:
`event_columbian_exchange_demo`

queda:
`deprecated → supersededBy`.

### 7. África atlántica tropical
`occ_maize_atlantic_africa_16c`

La historiografía documenta cultivo costero de maíz en el siglo XVI, pero advierte que el modo y las rutas exactas de introducción no pueden establecerse.

Por eso:
`certainty: medium`

La incertidumbre se muestra también dentro de Historia del elemento.

### 8. Región cantábrica
`occ_maize_cantabrian_adoption_late_16c`

La investigación histórica documenta expansión del cultivo para consumo humano desde finales del siglo XVI.

Tipo:
`adoption`

No se confunde:
- llegada inicial;
- cultivo;
- adopción;
- conversión posterior en cultivo dominante.

---

# Cambio del motor de historias

`subjectHistoryItems(subjectId)` combina ahora tres clases:

1. `occurrence`;
2. `event`;
3. `development`.

Orden:
cronológico por `period.start` y `period.end`.

El evento aparece visualmente como:
`EVENTO`

y no como evidencia.

---

# Regla de incertidumbre

Una historia museográfica no homogeneiza la certeza.

Si un occurrence tiene:
`certainty: medium`

la tarjeta lo indica y explica que conserva incertidumbre.

Esto permite representar debates reales sin eliminar el caso ni presentarlo como hecho cerrado.

---

# Cartografía

Los nuevos lugares permanecen sin punto mientras no exista una procedencia espacial que justifique una coordenada canónica:

- San Andrés;
- Paredones;
- región de Grandes Lagos;
- región cantábrica;
- costas atlánticas de África tropical.

No se usan centroides modernos para simular precisión histórica.

---

# Fuentes principales

- Pohl et al., PNAS 2007, San Andrés.
- Grobman et al., PNAS 2012, Paredones/Huaca Prieta.
- Tung et al., PNAS 2020, dieta de Paredones.
- Crawford et al., American Antiquity 1997, Grandes Lagos.
- Aragón-Ruano, Rural History 2021, región cantábrica.
- Miracle, Journal of African History 1965, África.
- Messer, Cambridge World History of Food, maíz.
- U.S. National Park Service, Columbian Exchange.

