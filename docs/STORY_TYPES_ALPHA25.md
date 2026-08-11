# Alpha.25 · Contrato de Historias monográficas y transversales

## Objetivo
Eliminar la suposición de que toda historia museística pertenece a un único alimento. Vino y Pan siguen siendo historias monográficas; futuras visitas como Fermentación o Conservación podrán cruzar varios subjects sin crear subjects ficticios.

## Contrato

```json
{
  "storyType": "subject",
  "primarySubjectRef": "wine",
  "relatedSubjectRefs": ["wine"]
}
```

```json
{
  "storyType": "transversal",
  "primarySubjectRef": null,
  "relatedSubjectRefs": ["wine", "bread_like_flatbread"]
}
```

### Invariantes
1. `subjectRef` queda eliminado de `story`.
2. `subject` exige un `primarySubjectRef` canónico y presente también en `relatedSubjectRefs`.
3. `transversal` exige `primarySubjectRef: null` y al menos dos `relatedSubjectRefs` canónicos.
4. El motor narrativo continúa siendo genérico por `story.id` y `scene.itemRefs`.
5. La navegación desde un subject prioriza su historia monográfica. Si no existe, abre una transversal solo cuando hay una única candidata; ante varias transversales relacionadas no elige una de forma arbitraria.
6. La portada de Historias muestra todas las historias públicas independientemente del tipo.

## Alcance alpha.25
Solo migración de contrato y robustez. No se incorpora todavía la Historia de Fermentación ni nuevas occurrences.

## Gate
Alpha.25 debe demostrar en Xiaomi que Vino y Pan conservan navegación, Atrás Android, Historia → Atlas → Historia, escenas anterior/siguiente y deep links. Después podrá integrarse Fermentación como primera prueba real de `storyType="transversal"`.
