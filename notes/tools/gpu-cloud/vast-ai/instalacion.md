---
sidebar_position: 2
---

# Instalación y configuración

Vast.ai se puede usar entero desde la web ([cloud.vast.ai](https://cloud.vast.ai)), pero el CLI es lo que permite automatizar: buscar la oferta más barata, lanzar el trabajo y destruir la instancia desde un script.

## Instalar el CLI

Con `pip` (requiere Python 3.8+):

```bash
pip install vastai
```

O descargando el script directamente, sin instalar nada en el sistema:

```bash
wget https://raw.githubusercontent.com/vast-ai/vast-cli/master/vast.py -O vastai
chmod +x vastai
```

En Windows, con PowerShell:

```powershell
pip install vastai
```

Comprueba que responde:

```bash
vastai --help
```

## Configurar la API key

Crea una clave en [cloud.vast.ai/manage-keys](https://cloud.vast.ai/manage-keys/) y regístrala:

```bash
vastai set api-key TU_API_KEY
```

La clave se guarda en `~/.vast_api_key`. Para entornos de CI o contenedores, puedes usar la variable de entorno en su lugar:

```bash
export VAST_API_KEY=TU_API_KEY
```

## Experimento: verificar la cuenta y el saldo

**Contexto:** antes de lanzar nada, confirma que el CLI está autenticado y que hay crédito. Vast.ai es prepago: sin saldo no se crea ninguna instancia.

```bash
vastai show user --raw | jq '{usuario: .username, saldo: .credit, email: .email}'
```

**Resultado:**
```json
{
  "usuario": "falkenslab",
  "saldo": 25.0,
  "email": "falken@example.com"
}
```

**Qué aprender:** `--raw` devuelve JSON, lo que convierte cualquier comando del CLI en una fuente de datos para scripts. Con 25 $ de saldo tienes unas 70 horas de RTX 4090 o unas 13 horas de H100: más que suficiente para varios experimentos serios.

## Experimento: comprobar el gasto acumulado

**Contexto:** el error más caro en Vast.ai es olvidarse una instancia encendida. Revisar el gasto es el hábito que lo evita.

```bash
# Instancias activas ahora mismo, su estado y su coste por hora
vastai show instances --raw | jq -r '.[] | "\(.id)  \(.gpu_name)  \(.actual_status)  \(.dph_total) $/h"'

# Coste total por hora de todo lo que tienes encendido
vastai show instances --raw | jq '[.[].dph_total] | add'
```

**Resultado:**
```
19284471  RTX_4090  running  0.394 $/h
20117903  RTX_4090  exited  0.012 $/h
0.406
```

**Qué aprender:** la segunda instancia está `exited` (parada) y aun así cuesta 0,012 $/h: eso es el **almacenamiento**, que se sigue cobrando mientras el disco exista. Parar no es destruir. Si ya no la necesitas, `vastai destroy instance 20117903`.

## Autocompletado y alias útiles

Para el día a día conviene tener a mano los comandos que más se repiten:

```bash
# ~/.bashrc
alias vgpu='vastai show instances'
alias vkill='vastai destroy instance'
alias v4090='vastai search offers "gpu_name=RTX_4090 num_gpus=1 verified=true rentable=true" -o "dlperf_usd-" --limit 10'
```

## Referencias

- [Vast.ai CLI — Documentación oficial](https://docs.vast.ai/cli/get-started)
- [vast-cli — GitHub](https://github.com/vast-ai/vast-cli)
- [Gestión de claves API](https://cloud.vast.ai/manage-keys/)
- [Buscar ofertas](/notes/tools/gpu-cloud/vast-ai/buscar-ofertas) — Siguiente paso
- [Precios y facturación](/notes/tools/gpu-cloud/vast-ai/precios) — Cómo no llevarse sustos
