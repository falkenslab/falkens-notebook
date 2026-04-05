Añade el concepto "$ARGUMENTS" al glosario del cuaderno siguiendo estos pasos:

## 1. Comprueba que no existe ya

Lee el fichero `notes/glossary.md` y busca si ya hay una entrada para "$ARGUMENTS". Si existe, infórmame y para.

## 2. Redacta la entrada

Escribe una definición clara y concisa del término "$ARGUMENTS" en el contexto de la inteligencia artificial aplicada, siguiendo exactamente este formato:

```
### $ARGUMENTS

[Definición en 2-4 líneas. Lenguaje claro, sin jerga innecesaria. Primera frase: qué es. Segunda frase: para qué sirve o cómo funciona.]

- [Punto relevante opcional, ej: variantes, ejemplos, matices]
- [Otro punto si aplica]

Ver también: [enlaces a otros términos del glosario si los hay]
```

No añadas "Ver también:" si no hay términos relacionados en el propio glosario.

## 3. Inserta la entrada en el lugar correcto

La entrada debe ir:
- Bajo la sección `## [LETRA]` correspondiente a la primera letra de "$ARGUMENTS".
- En orden alfabético dentro de esa sección.
- Si la sección `## [LETRA]` no existe, créala en el lugar correcto entre las secciones existentes, con `---` antes y después igual que las demás.

Edita `notes/glossary.md` con la entrada final. No cambies nada más del fichero.

## 4. Busca menciones en el cuaderno y enlaza al glosario

Busca menciones del término "$ARGUMENTS" (y variantes obvias, como plurales o formas en minúscula) en estos directorios:
- `experiments/` — posts de experimentos
- `notes/` — notas de referencia (excepto el propio `notes/glossary.md`)
- `ideas/` — ideas

Para cada aparición encontrada, sustituye la primera ocurrencia del término en cada fichero por un enlace al glosario con esta forma:

```
[$ARGUMENTS](/notes/glossary#anchor)
```

Donde `anchor` es el slug que Docusaurus genera automáticamente a partir del título de la entrada: el texto del `###` en minúsculas, sin acentos, con espacios reemplazados por guiones y sin caracteres especiales (por ejemplo, `### Large Language Model (LLM)` → `#large-language-model-llm`).

Solo enlaza la primera aparición del término en cada fichero. No toques las siguientes. No toques ficheros donde el término ya aparezca enlazado.

## 5. Confirma

Dime qué entrada has añadido y en qué posición, y cuántas referencias has encontrado.
