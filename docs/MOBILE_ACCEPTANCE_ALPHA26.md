# Gate móvil y museográfico — alpha.26

Dispositivo prioritario: Xiaomi/Android real. Este gate no puede sustituirse por tests unitarios.

## A. Identificación y portada
- [ ] La cabecera muestra `alpha.26`.
- [ ] La portada muestra **3 historias**: Vino, Pan y Fermentación.
- [ ] Vino y Pan se abren y conservan su aspecto/comportamiento previo.
- [ ] Fermentación se identifica como recorrido de 5 escenas y no como un alimento nuevo.

## B. Historia de Fermentación
- [ ] Abrir `#historia/story_fermentation/0`.
- [ ] Escena 1: Jiahu se entiende y el mapa muestra su pin.
- [ ] Escena 2: se entiende la comparación Georgia/Xiaohe; Gadachrili puede cartografiarse y la ausencia de pin de Xiaohe no parece un fallo.
- [ ] Escena 3: Pasteur 1857 puede leerse aunque el development no tenga un punto único.
- [ ] Escena 4: el salto al vino 1863–1865 y su control tecnológico resulta comprensible.
- [ ] Escena 5: Hansen 1883 cierra el recorrido sin forzar un pin geográfico no sustentado.
- [ ] Anterior/siguiente recorre exactamente 5 escenas y mantiene el progreso correcto.
- [ ] Abrir directamente `#historia/story_fermentation/4` lleva a la última escena.

## C. Navegación real Android
- [ ] Historia Fermentación → Ver en Atlas → Atrás Android vuelve a la misma escena.
- [ ] Historia → Atlas → Historia no duplica estados ni pierde el scroll de forma absurda.
- [ ] Atrás/Adelante del sistema funciona entre Vino, Pan, Fermentación y Atlas.

## D. Atlas y búsqueda
- [ ] Buscar `vino` mantiene el baseline esperado de 5 evidencias.
- [ ] Buscar `pan` mantiene el baseline esperado de 7 evidencias y no incluye trigo por coincidencia semántica indebida.
- [ ] Buscar `Jiahu` localiza la nueva evidencia y permite enfocarla.
- [ ] Buscar `fermentada` devuelve resultados coherentes sin rebautizar Jiahu como cerveza.
- [ ] En 1857/1883 los developments sin punto se comunican como no puntuales, no desaparecen silenciosamente.
- [ ] `Mundo` sigue recuperando el encuadre global.

## E. Gate museográfico
Tras leer las 5 escenas sin mirar datos técnicos:
- [ ] Se puede explicar que la fermentación alimentaria existía mucho antes de la teoría microbiana.
- [ ] Se entiende que «fermentación» agrupa procesos diferentes y no un único invento.
- [ ] Se entiende qué cambia con Pasteur.
- [ ] Se entiende qué añade Hansen respecto a Pasteur.
- [ ] Ninguna escena transmite falsamente «primera cerveza», «invención de la fermentación» o «primer pan fermentado».
- [ ] La densidad de texto es aceptable en móvil y no exige esfuerzo desproporcionado para completar el recorrido.

## Criterio de salida
- **PASS:** no hay defectos bloqueantes y la historia se comprende. → congelar contrato después del gate conjunto Vino/Pan/Fermentación.
- **FAIL UX:** registrar defectos concretos para alpha.27 sin ampliar corpus.
- **FAIL contenido:** corregir escena/fuente afectada antes de continuar expansión editorial.
