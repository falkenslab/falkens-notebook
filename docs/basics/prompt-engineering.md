# Prompt Engineering

El **prompt engineering** es el proceso de diseñar y refinar las instrucciones que enviamos a un modelo de lenguaje para obtener los resultados más útiles, precisos y consistentes posibles.

No requiere modificar el modelo ni tener conocimientos de programación: basta con saber cómo estructurar el texto que le mandas.

## Anatomía de un buen prompt

Un prompt efectivo suele combinar algunos de estos elementos:

| Elemento          | Descripción                        | Ejemplo                                                      |
| ----------------- | ---------------------------------- | ------------------------------------------------------------ |
| **Rol**           | Qué papel debe asumir el modelo    | "Actúa como revisor de código senior"                        |
| **Tarea**         | Qué debe hacer exactamente         | "Revisa este código y señala posibles bugs"                  |
| **Contexto**      | Información de fondo relevante     | "El proyecto usa Node.js 18 y TypeScript estricto"           |
| **Formato**       | Cómo debe estructurar la respuesta | "Devuelve una lista con el número de línea y la descripción" |
| **Restricciones** | Qué debe evitar                    | "No reescribas el código, solo señala los problemas"         |

No todos los elementos son necesarios siempre. Añade los que aporten valor real.

## Técnicas principales

### Zero-shot

Pides directamente sin dar ejemplos. Funciona para tareas sencillas o cuando el modelo tiene suficiente contexto general.

```
Clasifica este texto como positivo, negativo o neutro:
"El servicio de atención al cliente tardó mucho pero resolvió el problema."
```

### Few-shot

Incluyes 2–3 ejemplos antes de la pregunta real para que el modelo entienda el patrón esperado.

```
Clasifica el sentimiento:

Texto: "Me encantó el producto, llegó antes de lo esperado." → positivo
Texto: "La batería dura muy poco." → negativo
Texto: "El tamaño es el que esperaba." → neutro

Texto: "La instalación fue complicada pero al final funcionó." → ?
```

### Chain of Thought (CoT)

Pides al modelo que razone paso a paso antes de dar la respuesta. Mejora notablemente tareas de lógica, matemáticas y planificación.

```
Resuelve esto paso a paso:
Una tienda tiene 240 artículos. Vende el 25% el lunes y el 30% de los restantes el martes.
¿Cuántos artículos quedan?
```

La variante más simple es añadir "Piensa paso a paso" al final de cualquier prompt.

### Prompts de sistema vs. de usuario

La mayoría de APIs distinguen entre:

- **System prompt**: instrucciones permanentes que definen el comportamiento general del modelo (rol, tono, restricciones).
- **User prompt**: el mensaje concreto de cada turno.

```
[Sistema]
Eres un asistente técnico especializado en Python.
Responde siempre en español.
Si no sabes algo, dilo claramente en lugar de inventar.

[Usuario]
¿Cuál es la diferencia entre una lista y una tupla?
```

## Buenas prácticas

**Sé específico.** Cuanto más precisa sea la instrucción, más predecible será la respuesta.

| Vago                       | Específico                                                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| "Mejora este texto"        | "Corrige errores gramaticales y reduce el texto a 3 frases sin perder el mensaje principal"                                 |
| "Escribe código para esto" | "Escribe una función Python que reciba una lista de enteros y devuelva los números primos, con docstring y tests unitarios" |

**Indica el formato de salida.** Si necesitas JSON, Markdown, una lista numerada o una tabla, dilo explícitamente.

```
Devuelve la respuesta como un objeto JSON con las claves "nombre", "edad" y "ciudad".
```

**Divide tareas complejas.** En lugar de un prompt enorme, encadena prompts más simples. El resultado intermedio puede revisarse y corregirse antes de seguir.

**Itera.** El primer prompt rara vez es el mejor. Ajusta una variable cada vez para entender qué mejora la respuesta.

## Errores comunes

- **Instrucciones contradictorias**: pedir "respuesta breve" y a la vez "explica con todo detalle".
- **Contexto insuficiente**: asumir que el modelo "sabe" cosas que no están en el prompt.
- **Prompt demasiado largo sin estructura**: el modelo puede perder el hilo. Usa secciones y separadores claros.
- **Depender de la aleatoriedad**: si necesitas resultados reproducibles, baja la [temperatura](./glossary#temperatura) y fija una semilla si la API lo permite.

## Prompting para tareas de código

Algunas técnicas especialmente útiles al trabajar con código:

**Pedir explicación antes del código**

```
Antes de escribir el código, explica el enfoque que vas a usar y por qué.
Luego escribe la implementación.
```

**Dar el contexto del proyecto**

```
Estoy usando FastAPI 0.110, Python 3.12 y SQLAlchemy 2.0 con sesiones asíncronas.
Escribe un endpoint GET /usuarios que devuelva todos los usuarios paginados.
```

**Pedir revisión crítica**

```
Revisa el siguiente código como si fuera una code review. Señala:
1. Posibles bugs
2. Problemas de rendimiento
3. Mejoras de legibilidad

[código aquí]
```

## Referencias

- [Prompt Engineering Guide](https://www.promptingguide.ai/es)
- [OpenAI — Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic — Prompt Engineering](https://docs.anthropic.com/es/docs/build-with-claude/prompt-engineering/overview)
