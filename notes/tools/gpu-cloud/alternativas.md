---
sidebar_position: 2
---

# Alternativas a Vast.ai

Vast.ai no es la única forma de alquilar GPU. Cada proveedor ocupa un punto distinto del eje **precio ↔ garantías**.

| Proveedor | Modelo | Precio relativo | Fuerte en |
| --------- | ------ | --------------- | --------- |
| **Vast.ai** | Marketplace abierto | El más barato | Experimentación, fine-tuning con presupuesto |
| **RunPod** | Marketplace + datacenter propio | Barato | Serverless GPU, arranque rápido, buena UX |
| **Lambda Labs** | Cloud especializado en IA | Medio | Hardware homogéneo, clusters H100/B200 |
| **CoreWeave** | Cloud IA a escala | Medio-alto | Kubernetes, contratos grandes |
| **Modal / Replicate** | Serverless por invocación | Alto por hora, barato si es esporádico | Desplegar una función GPU sin gestionar máquinas |
| **AWS / GCP / Azure** | Cloud generalista | El más caro | Integración con el resto de la infraestructura, cumplimiento normativo |
| **Google Colab** | Cuaderno gestionado | Gratis / 10 $ mes | Aprender, prototipos cortos |

## Cómo elegir

- **¿Estás aprendiendo o probando?** → Colab gratis, y Vast.ai cuando el runtime de Colab se quede corto.
- **¿Un trabajo con principio y fin y presupuesto ajustado?** → Vast.ai o RunPod.
- **¿Un endpoint que se llama a ratos?** → Serverless (Modal, Replicate, RunPod Serverless): no pagas GPU parada.
- **¿Datos sensibles o regulados?** → Cloud tradicional con contrato. En un marketplace, el host tiene acceso físico a la máquina.
- **¿Entrenamiento multinodo grande?** → Lambda o CoreWeave: necesitas InfiniBand y hardware homogéneo, no una colección de máquinas dispares.

## Experimento: el punto de equilibrio entre serverless y GPU por horas

**Contexto:** serverless parece caro por hora, pero solo pagas mientras corre. La pregunta es a partir de cuánta carga compensa alquilar una GPU entera.

```python
# Endpoint de inferencia: 2 s de GPU por petición
segundos_por_peticion = 2

precio_serverless_hora = 1.20   # facturado por segundo de ejecución
precio_dedicada_hora   = 0.40   # RTX 4090, encendida 24/7

coste_dedicada_dia = precio_dedicada_hora * 24

print(f"{'peticiones/día':>15}{'serverless':>13}{'dedicada':>11}{'ganador':>13}")
for peticiones in (100, 500, 1_000, 5_000, 20_000, 50_000):
    horas_gpu = peticiones * segundos_por_peticion / 3600
    coste_serverless = horas_gpu * precio_serverless_hora
    ganador = "serverless" if coste_serverless < coste_dedicada_dia else "dedicada"
    print(f"{peticiones:>15,}{coste_serverless:>12.2f}$"
          f"{coste_dedicada_dia:>10.2f}$ {ganador:>12}")
```

**Resultado:**
```
 peticiones/día   serverless   dedicada      ganador
            100        0.07$      9.60$   serverless
            500        0.33$      9.60$   serverless
          1,000        0.67$      9.60$   serverless
          5,000        3.33$      9.60$   serverless
         20,000       13.33$      9.60$     dedicada
         50,000       33.33$      9.60$     dedicada
```

**Qué aprender:** el cruce está en torno a las **14.400 peticiones diarias** (8 horas de GPU efectiva al día). Por debajo, una GPU dedicada pasa la mayor parte del tiempo parada y cobrando; por encima, el sobreprecio del serverless supera a la GPU ociosa. Es el mismo razonamiento que decide entre API por token y modelo autoalojado.

## Referencias

- [RunPod](https://www.runpod.io)
- [Lambda Labs](https://lambdalabs.com)
- [Modal](https://modal.com)
- [Replicate](https://replicate.com)
- [Vast.ai](/notes/tools/gpu-cloud/vast-ai/intro) — La opción documentada en detalle en este cuaderno
- [Alquilar GPUs por horas](/notes/tools/gpu-cloud/intro)
