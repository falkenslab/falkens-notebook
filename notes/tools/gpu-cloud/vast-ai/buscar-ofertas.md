---
sidebar_position: 3
---

# Buscar ofertas

`vastai search offers` es el comando central de Vast.ai. Acepta una cadena de filtros tipo consulta y un criterio de ordenación:

```bash
vastai search offers 'FILTROS' -o 'ORDEN'
```

## Filtros más útiles

| Filtro | Ejemplo | Qué hace |
| ------ | ------- | -------- |
| `gpu_name` | `gpu_name=RTX_4090` | Modelo exacto de GPU (guiones bajos, no espacios) |
| `num_gpus` | `num_gpus=2` | Número de GPUs en la máquina |
| `gpu_ram` | `gpu_ram>=40` | VRAM por GPU en GB |
| `verified` | `verified=true` | Solo hosts verificados en datacenter |
| `rentable` | `rentable=true` | Solo lo que está libre ahora |
| `dph_total` | `dph_total<0.5` | Precio total por hora (dollars per hour) |
| `reliability` | `reliability>0.98` | Fiabilidad histórica del host |
| `inet_down` | `inet_down>500` | Bajada mínima en Mbps |
| `disk_space` | `disk_space>100` | Disco disponible en GB |
| `cuda_vers` | `cuda_vers>=12.4` | Versión de CUDA del driver |
| `direct_port_count` | `direct_port_count>=1` | Puertos directos (necesario para SSH directo) |

Los filtros se separan por espacios dentro de las comillas y se combinan con AND.

## Criterios de ordenación

El sufijo `-` significa descendente:

- `-o 'dph_total'` — más barato primero
- `-o 'dlperf-'` — más potente primero
- `-o 'dlperf_usd-'` — **mejor rendimiento por dólar primero** (el que casi siempre quieres)
- `-o 'inet_down-'` — mejor red primero

## Experimento: encontrar la mejor relación rendimiento/precio para fine-tuning

**Contexto:** un fine-tuning LoRA de un modelo 7B necesita unos 24 GB de VRAM y descargar varios GB de pesos. Queremos algo fiable, no lo más barato del mercado.

```bash
vastai search offers \
  'gpu_ram>=24 num_gpus=1 verified=true rentable=true reliability>0.98 inet_down>200 cuda_vers>=12.4' \
  -o 'dlperf_usd-' --limit 6
```

**Resultado:**
```
ID       CUDA  N  Model        PCIE  vCPUs  RAM    Storage  $/hr    DLP     DLP/$   Net_up  Net_down  R
20443118 12.8  1x RTX_4090     25.9  24.0   96.0   500      0.398   29.04   72.9    621.3   918.4     99.6
19284471 12.4  1x RTX_4090     24.3  16.0   64.4   280      0.412   28.11   68.2    412.6   735.2     99.2
21005512 12.8  1x RTX_5090     26.1  32.0   128.0  750      0.742   47.80   64.4    884.1  1204.7     99.8
20880431 12.6  1x A100_PCIE    25.0  32.0   128.0  600      1.104   58.20   52.7    712.9   965.3     99.4
21114907 12.8  1x A100_SXM4    25.3  32.0   256.0  1000     1.288   64.15   49.8    901.4  1180.2     99.9
20997315 12.8  1x H100_SXM     25.7  48.0   256.0  1500     1.874   88.30   47.1   1203.6  1876.5     99.9
```

**Qué aprender:** ordenando por `DLP/$` la lista sale invertida respecto a la potencia bruta. La RTX 4090 rinde 72,9 puntos por dólar y la H100 solo 47,1: para un LoRA de 7B que cabe en 24 GB, la 4090 es la elección racional. La H100 solo compensa cuando el modelo **no cabe** en 24 GB o cuando el tiempo vale más que el dinero.

## Experimento: comparar interruptible frente a on-demand

**Contexto:** las instancias interruptibles prometen un 30-50% de ahorro. Vale la pena medir el descuento real antes de aceptar el riesgo de que te pausen el entrenamiento.

```bash
# Precio on-demand
vastai search offers 'gpu_name=RTX_4090 num_gpus=1 verified=true rentable=true' \
  -o 'dph_total' --limit 3

# Mismo hardware, en modo puja
vastai search offers 'gpu_name=RTX_4090 num_gpus=1 verified=true rentable=true' \
  --type interruptible -o 'dph_total' --limit 3
```

**Resultado:**
```
# on-demand
ID       Model      $/hr    DLP     R
19776250 RTX_4090   0.352   26.10   98.9
20117903 RTX_4090   0.361   27.80   98.7
20443118 RTX_4090   0.398   29.04   99.6

# interruptible (min_bid)
ID       Model      $/hr    min_bid  DLP     R
19776250 RTX_4090   0.352   0.183    26.10   98.9
20117903 RTX_4090   0.361   0.194    27.80   98.7
20443118 RTX_4090   0.398   0.221    29.04   99.6
```

**Qué aprender:** el descuento real ronda el 45% (0,398 → 0,221 $/h). En un entrenamiento de 6 horas son 1,06 $ frente a 2,39 $. Merece la pena **solo si guardas checkpoints**: si te superan la puja a la hora 5 y no tienes checkpoint, has tirado 0,88 $ y cinco horas. La columna `min_bid` es la puja mínima para arrancar, no la que garantiza que no te desalojen: puja algo por encima.

## Experimento: máquinas multi-GPU para modelos grandes

**Contexto:** un modelo de 70B en fp16 necesita ~140 GB de VRAM, que no caben en ninguna GPU individual. Hay que buscar por VRAM agregada y, crucialmente, por interconexión.

```bash
vastai search offers 'num_gpus>=4 gpu_ram>=40 verified=true rentable=true' \
  -o 'dph_total' --limit 4
```

**Resultado:**
```
ID       CUDA  N  Model        PCIE  vCPUs  RAM     Storage  $/hr    DLP      R
21114907 12.8  4x A100_SXM4    25.3  64.0   512.0   2000     4.912   251.30   99.9
20880431 12.6  4x A100_PCIE    25.0  64.0   384.0   1500     4.288   228.70   99.4
21229840 12.8  8x H100_SXM     25.7  128.0  1024.0  4000    14.632   698.40   99.9
21301776 12.8  4x RTX_4090     12.4  32.0   192.0   1000     1.664   112.20   98.1
```

**Qué aprender:** las 4x RTX 4090 son 2,6× más baratas que 4x A100 y ofrecen 96 GB de VRAM total, pero están en PCIe x4 (`PCIE 12.4`) y **sin NVLink**: en entrenamiento distribuido, el tráfico entre GPUs se convierte en el cuello de botella y el rendimiento efectivo se desploma. Para inferencia con el modelo particionado por capas, funcionan bien; para entrenamiento paralelo de datos, las A100 SXM4 con NVLink acaban saliendo más baratas por trabajo.

## Referencias

- [Vast.ai — Búsqueda de ofertas](https://docs.vast.ai/cli/commands)
- [Vast.ai — Interfaz web de búsqueda](https://cloud.vast.ai/create/)
- [Gestionar instancias](/notes/tools/gpu-cloud/vast-ai/instancias) — Siguiente paso
- [Precios y facturación](/notes/tools/gpu-cloud/vast-ai/precios)
