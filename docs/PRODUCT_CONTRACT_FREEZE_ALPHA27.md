# Congelación del contrato de producto — alpha.27

## Decisión
A partir de alpha.27 queda congelado el contrato funcional y editorial del museo:

- **Historias = comprender**
- **Atlas = descubrir**
- **Evidencia = verificar**

La congelación no significa que el corpus esté completo. Significa que una nueva historia o evidencia debe poder incorporarse sin rediseñar la arquitectura.

## Contrato narrativo

### Historia monográfica
- `storyType = "subject"`
- `primarySubjectRef` obligatorio
- `primarySubjectRef` incluido en `relatedSubjectRefs`

### Historia transversal
- `storyType = "transversal"`
- `primarySubjectRef = null`
- al menos dos `relatedSubjectRefs`
- los subjects declarados deben estar realmente cubiertos por evidencias de la visita

No existe `story.subjectRef` legacy.

## Navegación congelada
- Historias es la entrada principal de comprensión.
- Atlas mantiene exploración libre por tiempo, mapa, búsqueda y filtros.
- Una evidencia puede llevar al Atlas y volver a la misma escena mediante historial.
- Desde un subject se prioriza la historia monográfica; una transversal solo se autoelige si no hay monográfica y es la única candidata.
- Los deep links siguen siendo parte del contrato público.

## Política espacial
- punto solo con procedencia suficiente;
- registros regionales o multiterritoriales pueden permanecer sin punto;
- una escena con cobertura parcial debe declararlo;
- nunca se crean centroides solo para rellenar el mapa.

## Evidencia y fuentes
La narrativa nunca sustituye a occurrence/event/development/source. Cada escena referencia objetos canónicos y fuentes trazables.

## Control de cambios
`docs/PRODUCT_CONTRACT_FINGERPRINT.json` fija SHA-256 de los diez schemas canónicos.

`tools/test_product_contract_freeze.py` falla si un schema cambia sin una migración explícita.

Una necesidad futura puede justificar romper el contrato, pero debe hacerlo mediante:
1. decisión documentada;
2. migración de datos;
3. tests de compatibilidad;
4. actualización deliberada del fingerprint.

No se cambiará el modelo para resolver necesidades editoriales que ya pueden expresarse con el contrato actual.

## Próxima fase
La prioridad pasa de ingeniería de producto a expansión editorial:

1. Cacao/chocolate;
2. Café;
3. Azúcar;
4. Patata;
5. Especias/conservación.

El objetivo operativo pasa a aproximadamente **20 % ingeniería / 80 % investigación, redacción y curación**.
