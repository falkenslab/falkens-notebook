---
sidebar_position: 1
---

# Panorama de modelos

El ecosistema de modelos de IA crece a un ritmo acelerado. Esta sección recoge los modelos más relevantes organizados por tipo y proveedor, con información práctica sobre cuándo usar cada uno.

## Cómo se clasifican los modelos

### Por acceso

| Tipo                  | Descripción                                                                                   | Ejemplos                       |
| --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------ |
| **Comerciales (API)** | Se usan a través de una API de pago. No se puede ver ni modificar el modelo.                  | GPT-4o, Claude 3.5, Gemini 1.5 |
| **Open weights**      | Los pesos se publican y se pueden descargar, pero la licencia puede restringir uso comercial. | Llama 3, Gemma, Phi-4          |
| **Open source**       | Código y pesos disponibles con licencia permisiva.                                            | Mistral, Qwen, DeepSeek        |

### Por tamaño y capacidad

| Categoría       | Parámetros aproximados    | Perfil                                                                  |
| --------------- | ------------------------- | ----------------------------------------------------------------------- |
| **Frontier**    | >100B (o MoE equivalente) | Máxima capacidad, alto coste, uso en API                                |
| **LLM mediano** | 30B–70B                   | Buen equilibrio calidad/coste, ejecutable en local con hardware potente |
| **SLM**         | 1B–14B                    | Ligeros, rápidos, ideales para uso local o en dispositivos              |

### Por modalidad

- **Solo texto**: entrada y salida en texto. La mayoría de LLMs de primera generación.
- **Multimodal**: procesan texto + imágenes (y en algunos casos audio o vídeo). GPT-4o, Claude 3, Gemini, LLaVA.
- **Embeddings**: transforman texto en vectores numéricos para búsqueda semántica y RAG.
- **Código**: especializados en generar y entender código. Qwen2.5-Coder, DeepSeek-Coder, CodeLlama.
- **Razonamiento**: optimizados para tareas lógicas y matemáticas con técnicas como chain-of-thought. o1, DeepSeek-R1.

## Cómo elegir un modelo

Algunas preguntas que orientan la decisión:

1. **¿Los datos pueden salir de tu infraestructura?** Si no, necesitas un modelo ejecutable en local (open weights + Ollama).
2. **¿Qué tarea vas a hacer?** Código → Qwen2.5-Coder o GPT-4o. Razonamiento → o1 o DeepSeek-R1. Texto general → Claude o GPT-4o.
3. **¿Cuál es el presupuesto?** Los modelos de API cobran por token. Los modelos en local tienen coste cero por token pero requieren hardware.
4. **¿Necesitas velocidad o calidad?** Modelos pequeños responden más rápido; los grandes razonan mejor.
5. **¿Hay requisitos de contexto?** Documentos muy largos requieren ventanas de contexto grandes (≥128K tokens).

## Benchmarks de referencia

Los benchmarks más usados para comparar modelos:

| Benchmark               | Qué mide                                       |
| ----------------------- | ---------------------------------------------- |
| **MMLU**                | Conocimiento general (57 materias)             |
| **HumanEval / MBPP**    | Generación de código                           |
| **GSM8K / MATH**        | Razonamiento matemático                        |
| **GPQA**                | Preguntas de nivel experto (ciencia, medicina) |
| **MT-Bench**            | Calidad en conversaciones multiturn            |
| **LMSYS Chatbot Arena** | Preferencia humana (votación ciega)            |

:::caution
Los benchmarks pueden estar "contaminados" si el modelo se entrenó con datos que incluyen los tests. Úsalos como orientación, no como verdad absoluta. La mejor evaluación es probar el modelo en tu caso de uso real.
:::

## Experimento: elegir modelo para una tarea concreta

**Contexto:** aplicar el árbol de decisión anterior a un caso real — revisar un fragmento de código Python y sugerir mejoras.

```python
import ollama

tarea = """
Revisa este código y sugiere una mejora concreta:

def suma(lista):
    total = 0
    for i in range(len(lista)):
        total = total + lista[i]
    return total
"""

# Opción A: modelo local pequeño (sin internet, sin coste)
resp_local = ollama.chat(model='qwen2.5-coder:7b', messages=[
    {'role': 'user', 'content': tarea}
])
print("=== qwen2.5-coder:7b (local) ===")
print(resp_local['message']['content'])
```

**Resultado:**

```
=== qwen2.5-coder:7b (local) ===
Puedes simplificar usando la función built-in `sum()` y list comprehension:

def suma(lista):
    return sum(lista)

O si necesitas mantener la lógica explícita, usa enumerate en lugar de range(len()):

def suma(lista):
    total = 0
    for elemento in lista:
        total += elemento
    return total
```

**Qué aprender:** para tareas de código simples, un modelo de 7B en local da resultados excelentes sin coste ni latencia de red. Solo merece la pena escalar a un modelo frontier cuando la tarea requiere contexto extenso, razonamiento complejo o conocimiento especializado.

## Secciones de esta guía

- [Modelos de embeddings](./embeddings) — Modelos para búsqueda semántica y RAG
