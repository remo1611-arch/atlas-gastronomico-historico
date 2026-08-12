# Estado actual

## Versión
0.1.0-alpha.36

## Producto
- **Historias = comprender.**
- **Atlas = descubrir.**
- **Evidencia = verificar.**

Alpha.36 ejecuta **G4 Pilot B**: conserva los dos vínculos documentados no proyectables de Pilot A y añade la primera conexión cartográfica legítima, Café · Ámsterdam → Jardin du roi/Jardin des Plantes (París) · 1714. La línea conecta extremos documentados; no representa el trayecto histórico.

## Gates
- G0/G1/G2/G3: CERRADOS.
- Museographic Gate alpha.27: PASS.
- **Product Contract Freeze alpha.27: ACTIVE.**
- Expansión editorial alpha.28–alpha.34: QA automatizado PASS.
- **G4 Pilot A alpha.35: PASS y preservado como regresión.**
- **G4 Pilot B alpha.36: IMPLEMENTADO · QA automatizado PASS · aceptación móvil pendiente.**
- **G4 Full Network: BLOQUEADO.**

## Corpus
22 subjects · 67 places · 50 occurrences · 1 event · 1 relationship · **3 transfers** · 7 contexts · 31 developments · 166 sources · 10 stories · 55 escenas · 50 términos de glosario.

## G4 Pilot B
Vectores publicados:
1. Patata · Gran Canaria → Amberes · noviembre de 1567 · `trade` · verified/high · sin geometría.
2. Café · costa de Malabar → Batavia · 1696/1699 · `plant_transfer` · reviewed/high · sin geometría.
3. Café · Ámsterdam → Jardin du roi/Jardin des Plantes (París) · 1714 · `plant_transfer` · verified/high · **conexión cartográfica**.

La conexión 1714 usa una referencia urbana de Ámsterdam y el Jardin des Plantes como extremos. El origen y la punta de flecha hacen visible la dirección. La línea no reconstruye calles, puerto, barco ni itinerario.

## Contrato
- Los diez schemas congelados de alpha.27 permanecen intactos.
- `transfer.schema.json` sigue siendo contrato aditivo G4.
- `relationship`: subject → subject.
- `transfer`: lugar → lugar sobre un subject, con vector documental explícito.
- `mapMode=endpoint_connection` requiere opt-in editorial, dos puntos sustentados, fuentes y nota cartográfica limitadora.

## Criterio para ampliar G4
Una primera línea legítima demuestra viabilidad, **no madurez de red**. Full Network seguirá bloqueada hasta disponer de más vectores independientes y variedad suficiente de subjects, periodos, regiones y tipos de transferencia.

## Próximo paso
Validar alpha.36 en Xiaomi: dirección de la flecha, lectura del estado 3 vínculos/1 conexión, acceso a evidencia y comprensión inequívoca de que la línea no es una ruta. Después auditar Pilot C o volver a expansión editorial según el valor real de la capa.
