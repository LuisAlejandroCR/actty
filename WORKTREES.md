# WORKTREES.md — trabajo en paralelo con varios agentes

> Capa de mecánica sobre [`AGENTS.md`](AGENTS.md) (constitución) y [`CLAUDE.md`](CLAUDE.md) (contexto).
> Aquí vive **cómo** se reparte el trabajo entre varios agentes sin que se pisen, y cómo se vuelve a
> juntar. Archivo **privado**, gitignored.
>
> Rulebook transversal: `../procedures/worktrees.md` y `../procedures/agent_loops.md`.

## El fallo que esto evita

Dos agentes en el mismo directorio: uno reescribe un archivo mientras el otro lo edita. **Los cambios
del perdedor desaparecen — sin error y sin aviso**, y uno se entera una hora después cuando falla algo
que no tiene relación. En una jornada con **dos horas de construcción real (13:15–15:15)**, enterarse
una hora después es no enterarse.

Un worktree es un directorio de trabajo aparte, con su propia rama, sobre la misma historia del repo.
Un agente por worktree y el problema no existe.

## Estado actual

| Worktree | Rama | Contenido | Estado |
|---|---|---|---|
| `generaX_summit/` (principal) | `main` | Todo, incluido lo privado | Checkout principal — desde aquí se lanza |
| `.claude/worktrees/motor-evidencia/` | `worktree-motor-evidencia` | `motor/ingesta.mjs` · `anclar.mjs` · `auditar.mjs` · `motor/salida/` | 🔒 Bloqueado por una sesión viva |

**No tocar ese worktree desde otra sesión.** `git worktree list --porcelain` dice quién lo tiene.

## El reparto de áreas — antes de que nadie empiece

**Lo que choca no son los archivos, es el alcance semántico.** Se reparte a las 10:30, no a las 14:00.
Techo: **3 o 4 agentes en paralelo**; más allá, revisar y mezclar se come el ahorro.

| Área | Worktree | Archivos suyos, y de nadie más | Verificador, en una frase |
|---|---|---|---|
| **Motor de evidencia** | `motor-evidencia` | `motor/**` | `node motor/auditar.mjs` termina en 0 y ninguna cita queda sin ancla |
| **Cockpit del evaluador** | `cockpit` | `prototipo/**` | La página abre con y sin JS, los KPI muestran el valor real con la pestaña oculta, y el contraste llega a AA |
| **Dossier y aviso** | `dossier` | `docs/**` | Los 12 puntos de la EIA están presentes y no queda ningún `‹se llena el 26›` |

Reglas del reparto:

1. **Un área por agente, asignada antes del arranque.** Nadie edita fuera de su columna.
2. `README.md` y los `.md` compartidos los toca **una sola persona**, al final, en el checkout principal.
3. Si dos áreas necesitan el mismo archivo, es que el reparto está mal hecho: se rehace, no se negocia
   en caliente.

## Arrancar

```bash
claude --worktree cockpit
```

Crea `.claude/worktrees/cockpit/` sobre la rama `worktree-cockpit`. Otra terminal, otro nombre, otro
agente. Desde una sesión ya abierta se puede pedir "trabaja en un worktree" (herramienta
`EnterWorktree`).

**Lanzar siempre desde el checkout principal.** Claude Code suele negarse a entrar a un worktree si
la sesión arrancó dentro de otro.

Primera vez en el directorio: hay que aceptar el diálogo de confianza corriendo `claude` una vez.

## ⚠️ Lo que **no** llega solo al worktree

Un worktree es un checkout limpio: **solo trae archivos rastreados**. En este repo casi todo lo que un
agente necesita para no inventar está gitignored, así que **no aparece**:

| Falta en el worktree | Consecuencia si nadie lo copia |
|---|---|
| `AGENTS.md`, `CLAUDE.md`, `WORKTREES.md` | El agente trabaja sin constitución: sin regla de ancla, sin idioma, sin la regla de no commitear |
| `docs/plan.md`, `memoria.md`, `verificacion.md` | Sin criterios de aceptación y sin saber qué ya está verificado → inventa estado |
| `reference/**` (29 MB, los 9 PDF) | `node motor/ingesta.mjs` no tiene qué leer |
| `descubrimientos/**` | Sin el análisis del dataset ni las contradicciones verificadas |

Por eso existe [`.worktreeinclude`](.worktreeinclude) en la raíz: sintaxis de `.gitignore`, copia los
archivos **ignorados** que ahí se nombren a cada worktree nuevo. Lo rastreado nunca se duplica.

⏳ **Sin verificar todavía:** la copia solo ocurre al crear un worktree con Claude Code, y desde que se
escribió el archivo no se ha creado ninguno. `git worktree add` a mano **no** lo aplica. Primera cosa
que hay que comprobar al abrir el siguiente worktree: que `AGENTS.md` y `reference/` estén ahí.

Si no llegan: copiarlos a mano antes de dar la primera instrucción, y anotarlo en
`docs/verificacion.md`.

## Reglas dentro de un worktree

1. **Comandos simples, uno a la vez.** Claude Code rechaza heredocs con delimitador sin comillas y
   expansión de llaves porque no puede verificar que se queden dentro. Ese chequeo **no se puede
   apagar**: para escribir un archivo largo se usa la herramienta de escritura, no `cat <<EOF`.
2. **Nada de editar rutas del checkout principal**, ni `git -C`, ni `GIT_DIR`, ni `cd` antes del `git`.
   Están bloqueados, y si funcionara sería peor.
3. **Sigue vigente la regla 1 de la constitución: el agente no commitea ni pushea.** Cada worktree deja
   su bloque `git add … && git commit -m "…"` listo; el humano commitea y mezcla. El humano es la
   compuerta de merge.
4. **Cada rama se verifica sola antes de mezclarse** — con el verificador de su fila en la tabla de
   áreas, no con "se ve bien".
5. **La memoria se escribe al repo, no se queda en la sesión.** Resultado de la pasada en
   `docs/memoria.md`; la lección aprendida, en `AGENTS.md`.

## Loops de agente — qué merece uno

**Regla filtro: si el verificador no cabe en una sola frase objetiva, no es trabajo de loop.** Es un
prompt suelto, hecho a mano, y se sigue.

Las cuatro piezas, siempre: **disparador · acción · verificador · parada**. Falta una y no es un loop,
es un `while` con factura.

| Escalón del verificador | Ejemplos aquí |
|---|---|
| 1 · Determinístico | Código de salida de `node motor/auditar.mjs`, JSON que valida contra el esquema |
| 2 · Esquema | Los nueve campos de la salida mínima obligatoria, con el error devuelto como contexto |
| 3 · Modelo como juez | Solo para calidad difusa, y **nunca solo**: siempre con un check determinístico al lado |
| 4 · Humano | Checkpoint que **bloquea antes de lo irreversible** |

Cuatro límites que ningún loop arregla:

1. **3–4 agentes es el techo.**
2. **Si montar el andamiaje pasa de 30 minutos, el loop no se paga.** A mano.
3. **Sin tope de intentos y sin tope de gasto, es una bomba de tiempo.** Ambos se fijan antes.
4. **Quien produce no califica.** El verificador es otro agente, o un comando.

Dos fallos con el mismo error → **parar**, escribir el bloqueo, salir. No reintentar.

## Cierre del día

| Hora | Qué pasa |
|---|---|
| ~14:15 | **Checkpoint obligatorio.** Cada rama enseña su verificador en verde o dice qué falta |
| 15:15 | **Cierre de código.** No entra funcionalidad nueva. Lo que no esté en pie, no existe |
| 15:15–15:30 | Merge de las ramas al principal, en orden: `motor` → `cockpit` → `dossier` |
| 15:30–17:00 | B8: doble verificación, video de respaldo, alcance congelado |

El orden del merge no es arbitrario: el cockpit muestra lo que el motor ancló, y el dossier cita lo
que el cockpit enseña.

## Limpieza

```bash
git worktree list
```

* Sesión interactiva limpia y sin nombre → se borra sola al salir.
* Con trabajo dentro → pregunta antes de borrar. Borrar elimina el directorio, la rama y el trabajo.
* **Las corridas `-p` no preguntan nunca y dejan su worktree bloqueado.** Se limpian a mano:

```bash
git worktree unlock .claude/worktrees/<nombre>
```

```bash
git worktree remove .claude/worktrees/<nombre>
```

`.claude/` ya está en `.gitignore`, así que el contenido de los worktrees no aparece como archivo sin
rastrear en el checkout principal.

## Verify

1. `git worktree list` muestra una entrada por agente activo y ningún huérfano de una corrida `-p`.
2. `.claude/` está gitignored, y `AGENTS.md`, `CLAUDE.md`, `WORKTREES.md`, `docs/` también.
3. `.worktreeinclude` existe, y el próximo worktree creado trae `AGENTS.md` y `reference/` dentro.
4. Cada rama pasa **su** verificador antes de cualquier merge.
5. Cada loop activo puede decir sus cuatro piezas en una línea cada una, con tope de intentos escrito.
