# Reglas canónicas

1. **El tiempo es el eje principal.**
2. **El espacio es el segundo eje.**
3. **Aplicación y corpus permanecen separados.**
4. `subject` describe qué se estudia; no prueba dónde/cuándo existió.
5. `occurrence` contiene la evidencia espacio-temporal.
6. No usar un único campo `origin` como verdad histórica.
7. “Primera evidencia conocida” ≠ “invención”.
8. “Domesticación” ≠ “primera recolección” ≠ “primer cultivo”.
9. “Difusión” debe sustentarse mediante ocurrencias/eventos, no con flechas dibujadas libremente.
10. Un plato puede tener antecedentes y variantes sin una fecha exacta de nacimiento.
11. Una receta textual no prueba por sí sola consumo generalizado.
12. Una evidencia arqueológica no prueba por sí sola una receta concreta.
13. Las denominaciones modernas deben distinguirse de las históricas.
14. Las regiones modernas del mapa son contexto, no fronteras gastronómicas históricas.
15. No inventar geometría histórica.
16. Las fechas aproximadas conservan su incertidumbre editorial.
17. No convertir siglos o rangos en años falsamente exactos para la interfaz.
18. Cada afirmación importante debe poder rastrearse a una o más fuentes.
19. `reviewed` y `verified` requieren fuentes.
20. Diferenciar evidencia, inferencia y tradición.
21. Las relaciones son datos independientes.
22. Las fuentes primarias históricas deben identificarse como tales y contextualizarse.
23. Las traducciones de textos históricos deben indicar edición/fuente cuando se incorporen.
24. Las imágenes necesitan procedencia y licencia.
25. No cargar masivamente el corpus antes de cerrar el contrato con casos heterogéneos.
26. Los IDs son estables.
27. Los cambios de contrato requieren decisión arquitectónica registrada.
28. Cada release pasa validación y manifiesto SHA-256.
29. GitHub Pages es la distribución principal.
30. Todas las rutas web críticas deben ser relativas y funcionar bajo `usuario.github.io/repositorio/`.
31. La exportación offline futura será derivada, nunca fuente canónica.
32. Nunca declarar “completo” el atlas: el corpus histórico es necesariamente abierto.

33. Las civilizaciones/culturas son **contexto**, no sujetos gastronómicos.
34. Asociar una evidencia a una civilización no implica atribuirle invención u origen.
35. Ciencia, tecnología, higiene y regulación se modelan como `development`.
36. La adopción de una tecnología puede ser gradual y regional: no asumir universalidad.
37. Un aparato o proceso tecnológico requiere separar invención, comercialización, adopción y generalización cuando las fuentes lo exijan.
38. Seguridad alimentaria debe distinguir descubrimiento científico, norma, sistema de control y práctica real.
39. Las capas visuales no alteran el significado de los datos.
40. Toda release debe versionar las URLs de CSS, JavaScript, JSON y GeoJSON para evitar mezclar recursos en caché.

41. En móvil se prohíbe el overflow horizontal de página; solo se admite en componentes declarados como carrusel/leyenda.
42. El modo claro debe conservar identidad museográfica propia y contraste suficiente; no será una inversión automática del modo oscuro.

43. `reviewed` exige fuentes válidas también en `subject` y `place`, no solo en occurrences.
44. `verified` requiere segunda revisión explícita; no equivale a “tiene una fuente”.
45. Una fuente cartográfica auxiliar no sustenta por sí sola una afirmación histórica.
46. Los registros `deprecated` permanecen en los datos pero no se muestran al público.
47. La migración de un ID seed a un ID canónico usa `supersededBy`; no se borra silenciosamente.
48. Un intervalo convertido desde `cal BP` conserva también la notación original.

