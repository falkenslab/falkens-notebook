---
sidebar_position: 1
---

# Alquilar GPUs por horas

Tarde o temprano el portátil se queda corto. Un modelo de 70B no entra en 16 GB de VRAM, un fine-tuning que en local tardaría tres días en una H100 tarda dos horas, y comprar la GPU cuesta lo que 2.000 horas de alquiler.

Alquilar GPU en la nube es la opción intermedia entre **ejecutar en local** (gratis pero limitado, ver [LLM Runtimes](/notes/tools/llm-runtimes/ollama/intro)) y **pagar una API por token** (cómodo pero sin control del modelo ni de los pesos).

## Cuándo compensa cada opción

| Escenario | Opción recomendada | Por qué |
| --------- | ------------------ | ------- |
| Chat ocasional, prototipos, privacidad | Local (Ollama, LM Studio) | Coste cero, datos en casa |
| Producción con volumen bajo/medio | API por token | Sin ops, escala sola |
| Fine-tuning, entrenamiento, batch grande | **GPU alquilada por horas** | Control total, pagas solo el tiempo de cómputo |
| Servir un modelo propio 24/7 con carga alta | GPU reservada / dedicada | El precio por hora baja con compromiso |

La regla de oro: si tu trabajo tiene **principio y fin** (entrenar, evaluar, generar un dataset), alquilar por horas casi siempre gana. Si es un servicio siempre encendido con poca carga, una API por token sale más barata que una GPU parada.

## El eje que lo cambia todo: marketplace vs. datacenter

Los proveedores se dividen en dos familias:

- **Marketplace descentralizado** — [Vast.ai](/notes/tools/gpu-cloud/vast-ai/intro) es el caso canónico: cualquiera con una GPU la pone en alquiler y los precios los fija la oferta y la demanda. Muy barato, calidad variable.
- **Cloud tradicional** — Lambda, RunPod, CoreWeave, AWS/GCP. Precio más alto y estable, SLA, hardware homogéneo.

## Experimento: cuánto cuesta realmente un fine-tuning

**Contexto:** antes de elegir proveedor conviene traducir "$/hora" a "$/trabajo", que es lo único que importa.

```python
# Coste estimado de un fine-tuning LoRA sobre un modelo 7B
# Referencias de precio: Vast.ai (marketplace), julio 2026

escenarios = [
    # (nombre, $/hora, horas estimadas)
    ("RTX 4090 - comunidad",     0.34,  6.0),
    ("RTX 4090 - verificado",    0.45,  6.0),
    ("A100 80GB - verificado",   1.10,  2.5),
    ("H100 80GB - verificado",   1.87,  1.2),
]

print(f"{'GPU':<26}{'$/h':>7}{'horas':>8}{'coste':>9}")
for nombre, precio_hora, horas in escenarios:
    print(f"{nombre:<26}{precio_hora:>7.2f}{horas:>8.1f}{precio_hora * horas:>9.2f}")
```

**Resultado:**
```
GPU                           $/h   horas    coste
RTX 4090 - comunidad         0.34     6.0     2.04
RTX 4090 - verificado        0.45     6.0     2.70
A100 80GB - verificado       1.10     2.5     2.75
H100 80GB - verificado       1.87     1.2     2.24
```

**Qué aprender:** la GPU más cara por hora no es la más cara por trabajo. La H100 cuesta 5,5× más por hora que una 4090 de comunidad, pero termina el mismo fine-tuning por un precio casi idéntico y en la quinta parte de tiempo. Compara siempre **coste por trabajo terminado**, no coste por hora.

## Cuidado con los costes ocultos

El precio por hora de la GPU nunca es el precio total:

- **Almacenamiento** — se cobra aunque la instancia esté parada (~0,10–0,15 $/GB/mes en Vast.ai). Una imagen Docker de 40 GB olvidada durante un mes cuesta más que el entrenamiento.
- **Ancho de banda** — subir un dataset de 100 GB y bajar los checkpoints tiene precio en muchos proveedores.
- **Tiempo de arranque** — descargar la imagen y los pesos del modelo puede llevar 10-20 minutos, y se factura.

## Referencias

- [Vast.ai](/notes/tools/gpu-cloud/vast-ai/intro) — Guía completa del marketplace
- [Alternativas a Vast.ai](/notes/tools/gpu-cloud/alternativas) — RunPod, Lambda, Together y compañía
- [Ollama](/notes/tools/llm-runtimes/ollama/intro) — La alternativa local y gratuita
- [Hugging Face](/notes/tools/huggingface/intro) — De dónde saldrán los modelos y datasets que ejecutes en esas GPUs
- [Glosario](/notes/glossary) — Conceptos básicos
