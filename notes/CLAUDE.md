# CLAUDE.md — Notas

Convenciones de la sección **Notas** (`notes/`, ruta pública `/notes`). Aplica a todo lo que hay bajo este directorio. Las normas generales del proyecto están en el `CLAUDE.md` de la raíz.

## Qué es una nota

Documentación de referencia: conceptos, guías de herramientas, modelos y contexto teórico que da soporte a los [experimentos](/experiments). La teoría vive aquí, no en los experimentos.

Filosofía: **teoría la mínima indispensable**. Una nota existe para que se entienda mejor un experimento, no como fin en sí misma.

## Taxonomía: dónde va cada cosa

- **`basics/`** — Conceptos transversales que no dependen de ninguna herramienta concreta (prompt engineering, fundamentos).
- **`models/`** — Familias y tipos de modelo: panorama general, embeddings, comparativas por proveedor.
- **`tools/`** — Herramientas concretas. Tiene tres subárboles:
  - `tools/agents/coding/<herramienta>/` — agentes de programación (Claude Code, Codex, opencode).
  - `tools/agents/personal/<herramienta>/` — agentes de uso personal, no de programación (Hermes).
  - `tools/llm-runtimes/<herramienta>/` — runtimes y aplicaciones para ejecutar modelos en local (Ollama, LM Studio, Jan, llamafile, Msty, AnythingLLM, Open WebUI).
  - `tools/vector-databases/` — bases de datos vectoriales, un fichero por producto más `intro.md`.
- **`resources/`** — Enlaces y catálogos de recursos externos.
- **`glossary.md`** — Glosario único de todo el cuaderno. No se trocea en páginas por término.
- **`intro.md`** — Portada de la sección.

Criterio para herramientas con varias páginas: cuando una herramienta necesita más de una página, se le crea directorio propio con `_category_.json` y se reparte en las páginas habituales — `instalacion`, `configuracion`, `modelos`, `uso`, `comparativa`. Si con una página basta, un solo `overview.md` dentro de su directorio.

## Formato de una nota

Frontmatter mínimo — solo `sidebar_position` (no `position`, que Docusaurus ignora):

```markdown
---
sidebar_position: 3
---

# Título de la nota

Párrafo de entrada que dice qué es esto y por qué importa.
```

El cuerpo va con `##` y `###`. Después, cuando sea posible, un bloque de experimento con el formato del `CLAUDE.md` raíz. Siempre se cierra con `## Referencias`.

## Enlazado

Es lo que mantiene el cuaderno navegable, y es la regla que más se incumple.

- **Rutas absolutas sin extensión ni base URL**: `/notes/tools/vector-databases/qdrant`, no `qdrant.md` ni `/falkens-notebook/notes/...`. Docusaurus añade el base URL solo.
- **Al glosario, por ancla**: `[RAG](/notes/glossary#rag)`. El ancla es el texto del `###` en minúsculas, sin acentos, con guiones en lugar de espacios.
- **Solo la primera mención** de un término en cada fichero se enlaza. Las siguientes van en texto plano.
- **Toda nota nueva necesita al menos un enlace entrante** desde otra nota o desde un experimento. Una nota sin enlaces entrantes solo es alcanzable por la sidebar y en la práctica no se lee.
- Los enlaces internos rotos **rompen el build** (`onBrokenLinks: 'throw'`).

## `_category_.json`

Cada directorio de la sidebar lleva el suyo:

```json
{
  "label": "Nombre visible",
  "position": 3,
  "link": {
    "type": "generated-index",
    "description": "Una línea describiendo qué hay en esta sección."
  }
}
```

## Índice de notas

Catálogo para decidir dónde encaja contenido nuevo sin abrir los 46 ficheros. Al añadir o renombrar una nota, actualiza también esta lista.

### Raíz

- `intro.md` — Portada de la sección: qué son las notas y su relación con los experimentos.
- `glossary.md` — Glosario alfabético de conceptos de IA, con anclas enlazables desde todo el cuaderno.

### `basics/`

- `prompt-engineering.md` — Diseño y refinado de instrucciones para obtener mejores resultados de un modelo.

### `models/`

- `overview.md` — Panorama de modelos por tipo y proveedor.
- `embeddings.md` — Modelos que convierten texto o imágenes en vectores semánticos; base de RAG y búsqueda.

### `resources/`

- `online-tools.md` — Aplicaciones web de IA usables desde el navegador, sin instalación.
- `resources.md` — Lista de enlaces y recursos externos recomendados.

### `tools/agents/coding/claude-code/`

- `instalacion.md` — Qué es Claude Code (CLI de Anthropic) e instalación.
- `claude-md.md` — El fichero `CLAUDE.md`, el directorio `.claude` y el comando `/init`.
- `skills.md` — Skills y comandos personalizados.
- `flujo-de-trabajo.md` — Flujo típico de trabajo con el agente.

### `tools/agents/coding/codex/`

- `instalacion.md` — Qué es Codex CLI (OpenAI) e instalación.
- `agents-md.md` — `AGENTS.md`, el equivalente de `CLAUDE.md` en Codex.
- `modelos.md` — Uso de cualquier proveedor compatible con la API de OpenAI.
- `referencia.md` — Comandos útiles y comparativa.

### `tools/agents/coding/opencode/`

- `instalacion.md` — Agente de terminal open source (MIT) de Anomaly; instalación.
- `configuracion.md` — Ficheros `opencode.json` / JSONC y su `$schema`.
- `modelos.md` — Diseño agnóstico de proveedor: modelos remotos y locales.
- `uso.md` — Sesión interactiva (TUI) y características.
- `comparativa.md` — Ventajas, desventajas y comparación con Claude Code y Codex.

### `tools/agents/personal/hermes/`

- `instalacion.md` — Hermes Agent (Nous Research, MIT): agente personal, no de programación.
- `configuracion.md` — Configuración YAML en `~/.hermes/`.
- `modelos.md` — Más de 50 proveedores; la restricción real es el tamaño de modelo.
- `uso.md` — Modos TUI y CLI.
- `comparativa.md` — Por qué no compite con los agentes de programación.

### `tools/llm-runtimes/`

- `ollama/intro.md` — Qué es Ollama y por qué es la referencia para ejecutar LLMs en local.
- `ollama/instalacion.md` — Instalación por sistema operativo.
- `ollama/uso-basico.md` — Chat interactivo desde la terminal.
- `ollama/modelos.md` — Catálogo, descarga y gestión de modelos.
- `ollama/configuracion.md` — Variables de entorno y ajustes.
- `ollama/api.md` — API REST compatible con OpenAI en `localhost:11434`.
- `ollama/casos-de-uso.md` — Aplicaciones prácticas (asistente de código offline, etc.).
- `lmstudio/overview.md` — App de escritorio para modelos GGUF con explorador integrado.
- `jan/overview.md` — Alternativa open source a ChatGPT, 100% offline.
- `llamafile/overview.md` — Modelo completo empaquetado en un único ejecutable portable (Mozilla).
- `msty/overview.md` — App de escritorio todo-en-uno orientada a productividad.
- `anythingllm/overview.md` — App todo-en-uno orientada a privacidad, escritorio o autoalojada.
- `open-webui/overview.md` — Interfaz web tipo ChatGPT para Ollama, en local.

### `tools/vector-databases/`

- `intro.md` — Qué son y su papel como almacenamiento en sistemas RAG.
- `chromadb.md` — La opción más simple para prototipos y proyectos pequeños.
- `faiss.md` — Librería de búsqueda por similitud de Meta; motor dentro de otras bases de datos.
- `pgvector.md` — Extensión de PostgreSQL con índices HNSW e IVFFlat.
- `qdrant.md` — Open source en Rust, referencia para producción autoalojada.
- `weaviate.md` — Objetos y vectores nativos; destaca en búsqueda híbrida.
- `milvus.md` — Sistema distribuido para escala masiva.
- `pinecone.md` — Servicio gestionado serverless que escala a cero.

## Mantenimiento

Pasa `/lint-notes` de vez en cuando, y siempre después de añadir varias notas seguidas. Comprueba `## Referencias`, separadores `---`, enlaces internos, notas huérfanas, conceptos sin entrada de glosario y notas sin experimento.

## Referencias

- [`CLAUDE.md` raíz](../CLAUDE.md) — Normas generales del proyecto y formato del bloque de experimento
- [`.claude/commands/lint-notes.md`](../.claude/commands/lint-notes.md) — Comando de revisión de esta sección
- [`.claude/commands/glossary.md`](../.claude/commands/glossary.md) — Comando para añadir términos al glosario
