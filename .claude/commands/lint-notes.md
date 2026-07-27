Revisa la salud de la sección de notas del cuaderno y da un informe.

Ámbito: "$ARGUMENTS" si se ha indicado algo (una ruta o subdirectorio de `notes/`); si está vacío, todo `notes/`.

**Este comando NO arregla nada por su cuenta.** Genera el informe, muéstramelo agrupado por comprobación, y espera a que yo te diga qué arreglar. Solo aplica cambios si te los pido explícitamente.

## 1. `## Referencias` al final

Toda página debe terminar con una sección `## Referencias`.

```bash
for f in $(find notes -name "*.md" -not -name "CLAUDE.md" | sort); do
  grep -q "^## Referencias" "$f" || echo "  $f"
done
```

## 2. Separadores `---`

Nunca se usa `---` como separador horizontal; se estructura con `##` y `###`. Hay que saltar el frontmatter, que usa la misma marca:

```bash
for f in $(find notes -name "*.md" -not -name "CLAUDE.md" | sort); do
  n=$(awk 'NR==1 && $0=="---" {fm=1; next} fm==1 && /^---[[:space:]]*$/ {fm=2; next} (fm==2||fm==0) && /^---[[:space:]]*$/ {c++} END{print c+0}' "$f")
  [ "$n" -gt 0 ] && echo "  $f ($n)"
done
```

Nota: `notes/glossary.md` los usa a propósito para separar las secciones por letra, porque así lo indica el comando `/glossary`. Es un conflicto conocido con la norma general — repórtalo, pero no lo arregles sin preguntar.

## 3. Enlaces internos

Los enlaces internos rotos rompen el build (`onBrokenLinks: 'throw'`). Comprueba que cada ruta `/notes/...` referenciada corresponde a un fichero real:

```bash
grep -rhoE "\]\(/notes/[a-z0-9/-]+" notes experiments | sed 's/](//' | sort -u | while read -r l; do
  [ -f "${l#/}.md" ] || echo "  ROTO: $l"
done
```

Revisa además que ningún enlace interno incluya el base URL `/falkens-notebook` (Docusaurus lo añade solo) ni la extensión `.md`.

## 4. Notas huérfanas

Una nota sin enlaces entrantes solo es alcanzable desde la sidebar y en la práctica no se lee:

```bash
grep -rhoE "\]\(/notes/[a-z0-9/-]+" notes experiments | sed 's/](//' | sort -u > /tmp/lnk.txt
for f in $(find notes -name "*.md" -not -name "CLAUDE.md" | sort); do
  grep -qx "/${f%.md}" /tmp/lnk.txt || echo "  $f"
done
```

Para cada huérfana, propón desde qué nota o experimento concreto tendría sentido enlazarla. No inventes enlaces forzados: si una nota no encaja en ningún sitio, dilo.

## 5. Conceptos sin entrada en el glosario

Busca términos técnicos que aparecen repetidamente en las notas y los experimentos pero no tienen entrada propia en `notes/glossary.md`. Lista los candidatos con el número de apariciones y en qué ficheros. Se añaden con `/glossary <término>`, no a mano.

Comprueba también lo contrario: entradas del glosario que nadie enlaza nunca.

## 6. Notas sin experimento

Las notas deben incluir al menos un `## Experimento:` cuando sea posible:

```bash
for f in $(find notes -name "*.md" -not -name "CLAUDE.md" | sort); do
  grep -q "^## Experimento" "$f" || echo "  $f"
done
```

Esta lista siempre será larga y no todas son un problema: `intro.md`, `glossary.md` y las páginas de recursos no lo necesitan. Prioriza las notas de herramientas concretas, donde un experimento sí aportaría.

## 7. Frontmatter

Debe usar `sidebar_position`, no `position` (Docusaurus ignora este último). Cada directorio de la sidebar debe tener su `_category_.json`.

## 8. Índice desactualizado

Compara la lista de ficheros reales bajo `notes/` con el "Índice de notas" de `notes/CLAUDE.md`. Reporta las notas que falten en el índice y las entradas del índice que ya no existan.

## Informe final

Agrupa por comprobación, con recuento por cada una. Termina con las tres cosas que arreglaría primero y por qué, y espera mi confirmación.
