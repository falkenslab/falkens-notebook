---
sidebar_position: 4
---

# Gestionar instancias

Una instancia en Vast.ai es un **contenedor Docker** corriendo en la máquina del host, con la GPU pasada al contenedor. Todo lo que sepas de Docker aplica aquí.

## Ciclo de vida

```bash
vastai create instance ID_OFERTA --image IMAGEN --disk GB --ssh --direct
vastai show instances                       # ver estado
vastai ssh-url ID_INSTANCIA                 # obtener la URL de conexión
vastai stop instance ID_INSTANCIA           # parar (¡sigue cobrando disco!)
vastai destroy instance ID_INSTANCIA        # destruir de verdad
```

**`stop` no es `destroy`.** Parar una instancia libera la GPU pero conserva el disco, y el disco se factura. Solo `destroy` detiene el cobro por completo.

## Crear una instancia

```bash
vastai create instance 20443118 \
  --image pytorch/pytorch:2.4.0-cuda12.4-cudnn9-runtime \
  --disk 40 \
  --ssh --direct
```

| Opción | Para qué sirve |
| ------ | -------------- |
| `--image` | Imagen Docker. Si no la especificas, no arranca nada útil |
| `--disk` | GB de disco. Se factura aunque la instancia esté parada |
| `--ssh` | Modo de arranque SSH (en vez del entrypoint de la imagen) |
| `--direct` | Conexión SSH directa al host, más rápida que el proxy |
| `--jupyter` | Arranca Jupyter en lugar de SSH |
| `--onstart-cmd` | Script bash que se ejecuta al arrancar |
| `--env` | Variables de entorno y mapeo de puertos |

Imágenes habituales: `pytorch/pytorch:2.4.0-cuda12.4-cudnn9-runtime`, `nvidia/cuda:12.4.1-devel-ubuntu22.04`, `vastai/base-image`, o cualquier imagen propia en un registro público.

## Experimento: lanzar una instancia y verificar la GPU

**Contexto:** lo primero que hay que hacer en toda máquina alquilada es comprobar que la GPU es la que prometía la oferta. Ocurre que no lo es, o que está compartida.

```bash
# Crear
vastai create instance 20443118 \
  --image pytorch/pytorch:2.4.0-cuda12.4-cudnn9-runtime \
  --disk 40 --ssh --direct

# Esperar a que arranque y conectarse
vastai show instances
ssh -p 41372 root@ssh5.vast.ai 'nvidia-smi'
```

**Resultado:**
```
Started. {'success': True, 'new_contract': 21447903}

ID        Machine  Status   Image                          $/hr    SSH Addr
21447903  14882    running  pytorch/pytorch:2.4.0-cuda12.4 0.398   ssh5.vast.ai:41372

+-----------------------------------------------------------------------------+
| NVIDIA-SMI 560.35.03    Driver Version: 560.35.03    CUDA Version: 12.6      |
|-------------------------------+----------------------+----------------------+
| GPU  Name          Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
|   0  NVIDIA GeForce RTX 4090  On | 00000000:01:00.0 Off |                  Off |
| 30%   34C    P8    18W / 450W |      1MiB / 24564MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
```

**Qué aprender:** `1MiB / 24564MiB` usados y 0% de utilización confirman que la GPU está entera para ti. Si al conectarte ves memoria ocupada o utilización alta, la máquina está compartida con otro inquilino: destruye y busca otra oferta. Fíjate también en que `CUDA Version: 12.6` es la del driver del host, superior a la 12.4 de la imagen — es lo normal y correcto.

## Transferir ficheros

```bash
# Subir un dataset
vastai copy local:./data/ 21447903:/workspace/data/

# Bajar resultados
vastai copy 21447903:/workspace/checkpoints/ local:./checkpoints/
```

Para volúmenes grandes es mucho más rápido descargar directamente desde dentro de la instancia (Hugging Face, S3, un `wget`) que subir desde tu conexión doméstica.

## Experimento: script de arranque que deja la máquina lista sola

**Contexto:** el tiempo de arranque se factura. Con `--onstart-cmd` la instancia se prepara sola mientras haces otra cosa, en vez de esperar a que conectes para empezar a instalar.

```bash
cat > onstart.sh <<'EOF'
#!/bin/bash
# Las variables de entorno van a /etc/environment para sobrevivir reinicios
echo "HF_HOME=/workspace/hf_cache" >> /etc/environment
export HF_HOME=/workspace/hf_cache

pip install -q "transformers>=4.44" datasets accelerate peft bitsandbytes huggingface_hub

# Descargar los pesos dentro de la instancia (red del datacenter, no la tuya)
hf download meta-llama/Llama-3.1-8B-Instruct --token "$HF_TOKEN" --quiet

touch /workspace/.listo
EOF

vastai create instance 20443118 \
  --image pytorch/pytorch:2.4.0-cuda12.4-cudnn9-runtime \
  --disk 60 --ssh --direct \
  --env '-e HF_TOKEN=hf_xxxxxxxxxxxx' \
  --onstart onstart.sh
```

**Resultado:**
```
Started. {'success': True, 'new_contract': 21448860}

# Un rato después, comprobando desde fuera:
$ ssh -p 41520 root@ssh5.vast.ai 'ls -la /workspace/.listo && du -sh /workspace/hf_cache'
-rw-r--r-- 1 root root 0 Jul 27 11:42 /workspace/.listo
16G     /workspace/hf_cache
```

**Qué aprender:** el fichero centinela `/workspace/.listo` permite saber desde fuera cuándo la máquina terminó de prepararse, sin conectarse a mirar. Descargar los 16 GB de pesos desde la red del datacenter llevó ~4 minutos (0,027 $); hacerlo desde una conexión doméstica de 50 Mbps habría llevado 45 minutos de instancia facturada.

## Experimento: ciclo completo automatizado

**Contexto:** el patrón que hace barato Vast.ai es "alquilar, ejecutar, destruir" sin intervención humana. Así la instancia nunca se queda encendida por olvido.

```bash
#!/bin/bash
set -euo pipefail

# 1. Coger la mejor oferta por rendimiento/precio
OFERTA=$(vastai search offers 'gpu_ram>=24 num_gpus=1 verified=true rentable=true' \
  -o 'dlperf_usd-' --raw | jq -r '.[0].id')
echo "Oferta seleccionada: $OFERTA"

# 2. Crear la instancia
ID=$(vastai create instance "$OFERTA" \
  --image pytorch/pytorch:2.4.0-cuda12.4-cudnn9-runtime \
  --disk 40 --ssh --direct --raw | jq -r '.new_contract')
echo "Instancia creada: $ID"

# 3. Destruir SIEMPRE al salir: se registra ANTES de trabajar, no después
trap 'vastai destroy instance "$ID"' EXIT

# 4. Esperar a que esté corriendo
until [ "$(vastai show instance "$ID" --raw | jq -r '.actual_status')" = "running" ]; do
  sleep 10
done

# 5. Trabajar
SSH_URL=$(vastai ssh-url "$ID")
ssh "$SSH_URL" 'cd /workspace && python entrenar.py'
vastai copy "$ID:/workspace/salida/" local:./salida/
```

**Resultado:**
```
Oferta seleccionada: 20443118
Instancia creada: 21449117
[esperando arranque... 78s]
Epoch 3/3: 100%|██████████| 412/412 [22:14<00:00, 3.24s/it]
Guardado en /workspace/salida/adapter_model.safetensors
Copiando 21449117:/workspace/salida/ -> ./salida/ ... 168 MB
destroying instance 21449117
```

**Qué aprender:** el `trap ... EXIT` es la línea más importante del script, y va **justo después de crear la instancia**, no al final: así destruye la GPU aunque el entrenamiento falle, se corte el SSH o pulses Ctrl-C. Registrarlo después del trabajo (error habitual) no protege de nada, porque si el trabajo falla el script nunca llega a esa línea. Coste total del ciclo: 24 minutos a 0,398 $/h = **0,16 $**.

## Errores frecuentes

- **Olvidar `destroy`** — el error más caro. Automatízalo.
- **Confundir `stop` con `destroy`** — parar sigue cobrando el disco.
- **Pedir poco disco** — el entrenamiento muere a mitad por disco lleno y no se puede ampliar en caliente. Calcula: imagen + pesos + checkpoints + dataset, y súmale un 50%.
- **Guardar en `/root` en lugar de `/workspace`** — `/workspace` es el volumen persistente de la instancia.
- **No verificar la GPU al conectar** — comprueba siempre con `nvidia-smi`.

## Referencias

- [Vast.ai — Guía del CLI](https://docs.vast.ai/cli/get-started)
- [Vast.ai — Plantillas y entorno Docker](https://docs.vast.ai/documentation/templates/introduction)
- [Vast.ai — Conectarse a una instancia](https://docs.vast.ai/documentation/instances/connect/overview)
- [Precios y facturación](/notes/tools/gpu-cloud/vast-ai/precios) — Siguiente paso
- [Hugging Face CLI](/notes/tools/huggingface/cli) — Descargar pesos dentro de la instancia
