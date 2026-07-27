---
sidebar_position: 1
---

# Qué es Vast.ai

[Vast.ai](https://vast.ai) es un **marketplace de GPUs**: en lugar de tener sus propios datacenters, pone en contacto a gente que tiene GPUs paradas (desde un particular con una RTX 4090 en casa hasta un datacenter profesional) con gente que necesita cómputo por horas.

El efecto es un precio muy por debajo de los grandes proveedores cloud —una RTX 4090 desde ~0,34 $/hora, una H100 80GB desde ~1,87 $/hora en hosts verificados— a cambio de aceptar que la calidad del proveedor es variable.

## Cómo funciona

1. Los **hosts** ofertan sus máquinas con un precio por hora.
2. Tú **buscas ofertas** filtrando por GPU, VRAM, velocidad de red, fiabilidad, precio.
3. **Creas una instancia** a partir de una oferta, indicando una imagen Docker.
4. Te conectas por **SSH o Jupyter**, trabajas, y **destruyes** la instancia.

Se factura por segundos de uso. No hay cuota mensual ni compromiso.

## Los tres modos de alquiler

| Modo | Cómo se paga | Riesgo | Cuándo usarlo |
| ---- | ------------ | ------ | ------------- |
| **On-demand** | Precio fijo que marca el host | La instancia es tuya hasta que la destruyas | Trabajo que no puede interrumpirse |
| **Interruptible** | Pujas un precio; corre quien más puja | Otro puede superar tu puja y pausar tu instancia | Entrenamientos con checkpoints, batch tolerante a fallos |
| **Reserved** | Compromiso a plazo con descuento | Pagas aunque no uses | Cargas sostenidas |

Las instancias interruptibles suelen costar un **30-50% menos** que las on-demand del mismo host. Solo compensan si tu proceso guarda checkpoints y puede reanudarse.

## Verificado vs. comunidad

Vast.ai marca como **verified** a los hosts que mantienen equipo de servidor en un datacenter gestionado profesionalmente: alimentación redundante, mejor red, menos sorpresas. Los hosts de **comunidad** suelen ser máquinas domésticas: más baratas, pero pueden desconectarse porque a alguien se le fue la luz.

Cada máquina expone además un **DLPerf**, una puntuación de rendimiento real medida en cargas de deep learning. La relación `dlperf / precio` es el indicador que de verdad conviene ordenar al buscar.

## Experimento: qué información expone realmente una oferta

**Contexto:** entender el vocabulario del marketplace antes de gastar dinero evita alquilar una GPU rapidísima detrás de una conexión de 30 Mbps.

```bash
# Buscar RTX 4090 disponibles, ordenadas por rendimiento por dólar
vastai search offers 'gpu_name=RTX_4090 num_gpus=1 rentable=true' -o 'dlperf_usd-' --limit 5
```

**Resultado:**
```
ID       CUDA  N  Model      PCIE  vCPUs  RAM   Storage  $/hr    DLP    DLP/$   Net_up  Net_down  R      Max_Days
19284471 12.4  1x RTX_4090  24.3  16.0   64.4  280      0.342   28.1   82.1    412.6   735.2     99.2   14.7
20117903 12.8  1x RTX_4090  25.1  12.0   48.0  120      0.361   27.8   77.0    88.4    301.7     98.7   9.2
18992045 12.4  1x RTX_4090  12.7  8.0    32.0   90      0.330   24.9   75.5    31.2     94.8     96.1   5.4
20443118 12.8  1x RTX_4090  25.9  24.0   96.0  500      0.398   29.0   72.9    621.3   918.4     99.6   30.0
19776250 12.2  1x RTX_4090  11.4  8.0    32.0   60      0.310   21.7   70.0    22.8     71.5     93.4   3.1
```

**Qué aprender:** la oferta más barata (0,310 $/h) es la peor por dólar: PCIe x4 en lugar de x16, poca RAM y 22 Mbps de subida. Si vas a mover un dataset de 50 GB, esa "ganga" te cobra media hora extra solo en transferencia. Mira siempre `DLP/$`, `Net_up/Net_down` y `R` (fiabilidad) antes que `$/hr`.

## Cuándo Vast.ai es buena idea (y cuándo no)

**Sí:**
- Fine-tuning y entrenamiento con presupuesto ajustado
- Experimentar con modelos grandes sin comprar hardware
- Generación de imagen/vídeo por lotes
- Aprender: por 2 $ pruebas una H100

**No:**
- Datos sensibles o regulados: el host tiene acceso físico a la máquina
- Producción con SLA estricto
- Cargas que no toleran ninguna interrupción y necesitan soporte 24/7

## Referencias

- [Vast.ai — Sitio oficial](https://vast.ai)
- [Vast.ai — Documentación](https://docs.vast.ai)
- [Vast.ai — Precios de GPU](https://vast.ai/pricing)
- [Instalación del CLI](/notes/tools/gpu-cloud/vast-ai/instalacion) — Siguiente paso
- [Alquilar GPUs por horas](/notes/tools/gpu-cloud/intro) — Cuándo compensa frente a local o API
