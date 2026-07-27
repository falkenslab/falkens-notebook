---
sidebar_position: 5
---

# Precios y facturación

Vast.ai es **prepago y se factura por segundos**. Cargas saldo, y mientras haya instancias vivas se va descontando. Si el saldo llega a cero, las instancias se destruyen.

## Qué se cobra exactamente

| Concepto | Cuándo se cobra | Orden de magnitud |
| -------- | --------------- | ----------------- |
| **GPU + CPU + RAM** | Solo mientras la instancia está `running` | 0,30–2,00 $/h según GPU |
| **Almacenamiento** | Siempre que el disco exista, corriendo o parada | 0,10–0,15 $/GB/mes |
| **Ancho de banda** | Por GB transferido, lo fija el host | 0,01–0,10 $/GB |

El precio de referencia (julio 2026, hosts verificados):

| GPU | VRAM | $/hora aprox. | Para qué |
| --- | ---- | ------------- | -------- |
| RTX 3090 | 24 GB | 0,20–0,25 | Inferencia, LoRA de modelos pequeños |
| RTX 4090 | 24 GB | 0,34–0,45 | El caballo de batalla: LoRA 7B-13B, difusión |
| RTX 5090 | 32 GB | 0,70–0,85 | Igual que la 4090 con más margen de VRAM |
| A100 PCIe/SXM | 40/80 GB | 1,00–1,30 | Entrenamiento serio, modelos que no caben en 24 GB |
| H100 SXM | 80 GB | 1,87–2,10 | Máxima velocidad, multi-GPU con NVLink |
| H200 / B200 | 141/192 GB | 2,50–4,50 | Modelos muy grandes, inferencia de alto rendimiento |

Los hosts de comunidad (no verificados) suelen estar un 20-40% por debajo de esas cifras.

## Experimento: la trampa del almacenamiento

**Contexto:** el disco es el coste que más gente subestima, porque se sigue pagando con la instancia apagada y no aparece en el precio que ves al alquilar.

```python
# Instancia parada tras un fine-tuning, con el disco intacto
disco_gb = 200
precio_gb_mes = 0.12

coste_mes = disco_gb * precio_gb_mes
coste_hora = coste_mes / (30 * 24)

print(f"Disco:            {disco_gb} GB")
print(f"Coste por hora:   {coste_hora:.4f} $/h")
print(f"Coste por día:    {coste_hora * 24:.2f} $")
print(f"Coste por mes:    {coste_mes:.2f} $")
print()
# Comparado con las 6 horas de GPU que realmente usaste
coste_gpu = 0.398 * 6
print(f"GPU usada (6 h):  {coste_gpu:.2f} $")
print(f"Disco olvidado 1 mes: {coste_mes:.2f} $  ->  {coste_mes / coste_gpu:.1f}x el coste del trabajo")
```

**Resultado:**
```
Disco:            200 GB
Coste por hora:   0.0333 $/h
Coste por día:    0.80 $
Coste por mes:    24.00 $

GPU usada (6 h):  2.39 $
Disco olvidado 1 mes: 24.00 $  ->  10.0x el coste del trabajo
```

**Qué aprender:** un disco de 200 GB olvidado un mes cuesta diez veces más que el entrenamiento que lo generó. La regla es: **baja los resultados y destruye**. Si necesitas conservar algo, súbelo al [Hub de Hugging Face](/notes/tools/huggingface/hub) o a un bucket, que es mucho más barato que un disco de Vast.ai.

## Experimento: on-demand frente a interruptible con checkpoints

**Contexto:** las instancias interruptibles ahorran ~45%, pero pueden desalojarte. La pregunta real es cuánto trabajo pierdes de media según cada cuánto guardes checkpoint.

```python
horas_totales = 10
precio_on_demand = 0.398
precio_puja = 0.221
prob_desalojo_hora = 0.08   # ~8% por hora, típico si pujas cerca del mínimo

# Trabajo perdido de media al ser desalojado: medio intervalo de checkpoint
for intervalo_min in (10, 30, 60, 120):
    intervalo_h = intervalo_min / 60
    desalojos = horas_totales * prob_desalojo_hora
    horas_perdidas = desalojos * (intervalo_h / 2)
    horas_facturadas = horas_totales + horas_perdidas
    coste = horas_facturadas * precio_puja
    print(f"checkpoint/{intervalo_min:>3} min -> "
          f"{horas_perdidas:.2f} h perdidas, coste {coste:.2f} $ "
          f"(on-demand: {horas_totales * precio_on_demand:.2f} $)")
```

**Resultado:**
```
checkpoint/ 10 min ->  0.07 h perdidas, coste 2.22 $ (on-demand: 3.98 $)
checkpoint/ 30 min ->  0.20 h perdidas, coste 2.25 $ (on-demand: 3.98 $)
checkpoint/ 60 min ->  0.40 h perdidas, coste 2.30 $ (on-demand: 3.98 $)
checkpoint/120 min ->  0.80 h perdidas, coste 2.39 $ (on-demand: 3.98 $)
```

**Qué aprender:** incluso con checkpoints cada 2 horas, la instancia interruptible sale un 40% más barata. El trabajo repetido apenas mueve la aguja frente al descuento del 45%. Lo que sí duele es **no tener checkpoints en absoluto**: ahí un desalojo a la hora 9 cuesta 10 horas de reintento. Guardar cada 30 minutos es el punto dulce.

## Cómo evitar sustos

1. **Automatiza el `destroy`** — un `trap` en el script, como en [Gestionar instancias](/notes/tools/gpu-cloud/vast-ai/instancias).
2. **Pide el disco justo** — no se puede reducir después, y se factura siempre.
3. **Revisa a diario** — `vastai show instances` debería devolver vacío cuando no estés trabajando.
4. **Carga saldo pequeño** — 20-25 $ limitan el daño de cualquier olvido.
5. **Descarga desde la instancia, no desde casa** — la red del datacenter es gratis en tiempo comparada con tu ADSL facturada a precio de GPU.

## Referencias

- [Vast.ai — Precios](https://vast.ai/pricing)
- [Vast.ai — Precio de la RTX 4090](https://vast.ai/pricing/gpu/RTX-4090)
- [Vast.ai — Documentación](https://docs.vast.ai)
- [Gestionar instancias](/notes/tools/gpu-cloud/vast-ai/instancias)
- [Alquilar GPUs por horas](/notes/tools/gpu-cloud/intro) — Comparativa con otras opciones
