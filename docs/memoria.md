# memoria.md — enfoque y bitácora

Bloques y criterios en [plan.md](plan.md). Correcciones fechadas en [verificacion.md](verificacion.md).

## Enfoque técnico (Plan)

### La decisión de arquitectura que define todo lo demás

**El sistema encuentra y señala; la persona decide y firma.** No es una postura ética: es el art. 7.1
de la Resolución 2026025611 y el principio rector del reto. De ahí bajan tres reglas duras que
condicionan cualquier implementación del 26 de agosto:

1. **Sin ancla, sin pantalla.** Toda afirmación del sistema apunta a página y sección del documento de
   origen. Lo que no se puede anclar no se muestra: se manda a cola humana marcado como *baja
   confianza*. Es la respuesta directa al fallo documentado de Elsa en la FDA.
2. **Sin veredicto.** La salida es *hallazgo + evidencia + ubicación + acción sugerida*. Nunca
   "cumple / no cumple", que está prohibido como salida final.
3. **Sin huella, no existe.** Cada entrada, salida, revisor, cambio y decisión queda en un registro
   encadenado por hash. La trazabilidad es pantalla del demo, no plomería invisible.

### La forma que tendría el sistema

```text
dataset del evento
      │
      ▼
[ ingestor agnóstico ]  ──► lo que no se entiende va a cola humana, no se adivina
      │
      ▼
[ extracción con ancla de página + nivel de confianza ]
      │
      ▼
[ reglas de negocio: vacíos · duplicados · orden por riesgo art. 4 ]
      │
      ▼
[ vista del funcionario ]  ── acepta / corrige / rechaza / reordena ──► FIRMA
      │                                    │
      └────────────► [ Huella: log encadenado ] ◄──────────────┘
                              │
                              ▼
                   [ aviso al administrado ]
```

El ingestor se diseñó agnóstico a propósito, cuando la forma del dato aún no se conocía. **Ya se
conoce**: PDF con capa de texto, extraíbles con `pdftotext -layout`, estructurados por módulo CTD y
con encabezado de página que identifica documento, producto y folio. El agnosticismo deja de ser
seguro y pasa a ser costo: conviene atarlo a esa forma concreta.

### Elecciones por defecto y su razón

| Elección | Razón |
|---|---|
| Procesamiento dentro del entorno autorizado del evento | Dossieres con información comercial sensible; salir del entorno es a la vez causal de descalificación y pérdida en Seguridad y Cumplimiento |
| **Inferencia local** vía Ollama con `qwen2.5:3b` en la RTX 3050 Ti | El expediente no sale de la máquina. Vale en Seguridad (15 %) y Cumplimiento (10–15 %) a la vez, y ya está instalado |
| **OCR separado del razonamiento** | Con 4 GB de VRAM un modelo de visión va justo; un motor de OCR en CPU además entrega el ancla de página gratis |
| **OpenFDA** como fuente del lado de agencia de referencia | Pública, sin credenciales, citable; hace viable el *reliance* del art. 8 en una jornada |
| Índice local (SQLite o Postgres con `pgvector`) | Barato y defendible en Escalabilidad presupuestal, que vale 10–15 % |
| Log append-only con hash encadenado | Cubre trazabilidad sin depender de infraestructura de terceros |
| Anclaje en blockchain **solo** en el caso del art. 7.4 | Es el único punto donde la integridad temporal de una evidencia externa justifica el costo |
| Determinismo por encima de fluidez | "Misma entrada, misma salida" es criterio de Confiabilidad y se puede demostrar en vivo |

### Lo que deliberadamente no se hace

No se toca el fondo científico del expediente — eficacia, seguridad, calidad del medicamento. Ahí
viven la alucinación y la sustitución del juicio técnico, que son el riesgo y la prohibición
centrales. El valor está en el trabajo *alrededor* del expediente: triaje, vacíos, duplicados, orden,
verificación de documentos y huella.

## Bitácora

### 2026-08-24 (llegan las reglas oficiales; se rehace la base de análisis)

Aparecieron en la carpeta del proyecto los tres documentos oficiales del reto, con fecha de hoy. Se
leyeron completos y cambian el marco: hay etapa eliminatoria antes del puntaje, rúbrica ponderada
explícita, y dos entregables documentales obligatorios (clasificación de riesgo y EIA de 12 puntos)
que la investigación de julio no podía anticipar porque solo existía el flyer. Se verificó la carpeta
compartida del organizador: contiene **exactamente esos tres archivos y ningún dataset** — el dataset
de referencia lo entrega INVIMA el día del evento.

### 2026-08-24 (el hallazgo que cambia la estrategia)

Al sumar los pesos de la rúbrica: Confiabilidad 20 % + Seguridad 15 % + Cumplimiento legal 15 % =
**50 % del puntaje que no se gana con el demo** sino con documentos y con decisiones de arquitectura
explicables en treinta segundos. La consecuencia práctica es que llegar el 26 con la EIA y la
clasificación de riesgo pre-escritas vale más que llegar con prototipo. Eso reordenó `plan.md`: los
bloques de D-1 son documentales (B1, B2, B3, B4) y la construcción solo aparece el día del evento.

*Nota del 26:* la presentación del día da otra tabla, donde Cumplimiento legal vale 10 % y ese
subtotal baja a 45 % ([verificacion.md](verificacion.md) §3.15). La conclusión no se mueve: sigue
siendo cerca de la mitad del puntaje y sigue ganándose con documentos.

### 2026-08-26 (llegó el dataset, y trae las contradicciones puestas)

Nueve PDF a las 10:25. El dataset es un **expediente CTD ficticio de 166 páginas** —CORAZILIMAB, un
anticuerpo monoclonal anti-ALK-1 para hipertensión arterial pulmonar— repartido en los cinco módulos,
más un **acta real** de Sala Especializada con 64 productos. Análisis completo en
[../descubrimientos/dataset-corazilimab.md](../descubrimientos/dataset-corazilimab.md).

**Lo que cambia el enfoque.** El expediente está construido con contradicciones plantadas entre
módulos, y tres quedaron verificadas contra el texto extraído. La mejor: **M2 pide una indicación para
"adultos y adolescentes ≥12 años" cuando el estudio pivotal en M5 excluyó explícitamente a los menores
de 18**, el plan de gestión de riesgos lista esa población como información faltante, y el estudio que
la respaldaría (`CRZ-HAP-501`) ni siquiera está en el expediente. Es exactamente la pregunta que la
ficha visual del organizador le asigna al Módulo 2: *¿el relato global representa fielmente la
evidencia detallada?*

Eso convierte una decisión de diseño que ya estaba tomada —"el sistema encuentra y señala; la persona
decide"— en algo demostrable con un caso real en dos minutos, contra un baseline cronometrado de
alguien buscándolo a mano. El Impacto (25 %) deja de ser una promesa.

**Lo que se cae.** La bioinformática anunciada en el correo no aparece por ningún lado en el dataset:
no hay secuencias ni datos ómicos, solo documentos para leer y cruzar. El puente argumental que se
había preparado para justificarla queda archivado ([verificacion.md](verificacion.md) §3.14).

**Lo que aparece.** La ficha visual fija una **salida mínima obligatoria de nueve campos** (respuesta,
evidencia, ubicación exacta, versión, confianza, contradicciones, información faltante, limitaciones,
siguiente acción) y **cinco controles no negociables**, uno de los cuales es defensa contra
instrucciones maliciosas dentro de los documentos. Eso es la rúbrica de Confiabilidad y Seguridad
escrita por el propio organizador — no hay que adivinarla, hay que implementarla.

### 2026-08-24 (por qué la trazabilidad se volvió el producto, no un requisito)

Se contrastó el mercado: las plataformas maduras de IA regulatoria —Veeva, ArisGlobal/NavaX, Certara,
Weave Bio— sirven al titular que radica, no a la autoridad que evalúa; y el referente más avanzado del
lado de la agencia, Elsa de la FDA, es públicamente conocido por alucinar y citar mal. El hueco
competitivo y el requisito de admisibilidad apuntan al mismo sitio, así que la Huella pasó de ser
infraestructura a ser pantalla del demo. Detalle en
[../descubrimientos/competencia.md](../descubrimientos/competencia.md).

### 2026-08-24 (método: SDD con una compuerta antepuesta)

Se evaluaron Shape Up, Design Sprint, Doble Diamante y Lean Canvas y se descartaron por calendario o
por no producir ningún artefacto que la rúbrica premie. Se mantiene SDD, con dos modificaciones: el
objeto de la especificación es la **propuesta** (demo + dossier), no el código; y se antepone una
compuerta de admisibilidad, porque especificar algo inadmisible cuesta el día entero. Razonamiento
completo en [../descubrimientos/metodologia-sdd.md](../descubrimientos/metodologia-sdd.md).
**No se escribió una línea de código:** esta jornada fue de investigación y especificación.

### 2026-08-24, tarde (llega el insumo de Google y se corrige el reloj)

Llegó una versión actualizada del correo del organizador más un cuarto documento oficial: el
ecosistema de Google para desarrolladores científicos. Tres correcciones de hecho, todas fechadas en
[verificacion.md](verificacion.md) §3.6–3.8: la confirmación ya no es un formulario del 24 a las 8 p.m.
sino **aceptar la invitación de Google Calendar antes del 25 a las 10 a.m.**; el horario confirmado es
**8:00 a.m.–5:00 p.m.** en Ágora, media hora antes de lo documentado; y aparece un enfoque técnico de
"agentes de IA y herramientas de bioinformática" que las reglas no contemplan. Las copias descargadas
de las reglas y de la declaración se compararon con `diff`: idénticas, no hay versión nueva del
reglamento.

### 2026-08-24, tarde (dos hallazgos técnicos que mueven decisiones de diseño)

**OpenFDA** aparece listado como recurso: API pública y sin credenciales a los datos de la FDA. Eso
derriba la única objeción práctica que tenía la idea del *Espejo Regulatorio* —de dónde salen los
datos de la agencia de referencia en ocho horas— y la subió de 3,95 a 4,25 en la rúbrica. Y
**MedGemma** es descargable de Hugging Face: un modelo abierto corriendo local convierte "prometemos
cuidar el dato afuera" en "el dato no sale", que es exactamente lo que piden Seguridad y Cumplimiento,
30 % entre los dos. Ambos quedaron incorporados a las elecciones por defecto de arriba. Análisis en
[../descubrimientos/stack-google.md](../descubrimientos/stack-google.md).

### 2026-08-24, tarde (la tensión que hay que resolver el 26 a las 9 a.m.)

El correo pide bioinformática; la tabla de usos elegibles no tiene ninguna fila de bioinformática —
sus nueve filas son de gestión de trámites. Como la Etapa 1 es eliminatoria, esto no es un matiz:
un equipo que llegue con descubrimiento o reposicionamiento molecular puede quedar fuera antes de que
miren el mérito. Se resolvió por diseño, no por apuesta: se añadió la idea #9, donde ChEMBL, PubChem y
UniProt entran como **fuente de verificación** de lo que el expediente declara, lo cual sí cae en dos
filas existentes. Queda como pregunta explícita para el organizador en el bloque B5 de
[plan.md](plan.md).

### 2026-08-24, noche (se cataloga una toolchain de agente y se filtra a tres piezas)

Se documentaron en `procedures/` la colección `crafter-station/skills` (ocho skills, MIT, vendorizada
al commit `6037031`) y las tres herramientas que la sostienen: agent-browser, cligentic y scriptc.
Para este reto entran tres y se descartan seis con su razón escrita
([../descubrimientos/toolchain-agente.md](../descubrimientos/toolchain-agente.md)). La que cambia algo
real es **agent-browser**: `network har start/stop` más una captura fechada es lo que vuelve
demostrable el art. 7.4, que hasta ahora era una idea sin mecanismo. El HAR quedó registrado como
secreto en el riesgo C6.

### 2026-08-24, noche (el método de la jornada queda escrito, y no es una herramienta)

Se distiló un deck de 45 minutos sobre loops de agentes (`prompt engineering.pdf`) a
[`procedures/agent_loops.md`](../../procedures/agent_loops.md). El PDF no tenía capa de texto —
`pdftotext` devolvió cero caracteres— así que se renderizaron sus diez páginas a imagen para leerlas.
Lo que aporta al 26 no es una herramienta sino cuatro decisiones: la **regla filtro** (sin verificador
en una frase objetiva no hay loop), la **escalera de verificadores** cuyo último peldaño es
literalmente el requisito 6.1 de las reglas, el principio de que **quien produce no califica**, y
montar el loop de deploy temprano. Sus dos límites honestos —3 a 4 agentes como techo, y descartar el
loop si el andamiaje pasa de 30 minutos— entraron al plan como criterios.

### 2026-08-24, noche (aparece una descripción ajena que describe este reto mejor que el reto)

El brief de QVAC —SDK de IA local, Apache 2.0— define su caso de uso principal como *"gente leyendo
documentos, detectando discrepancias y escalando lo que importa… datos que las empresas genuinamente
no pueden mandar a una API de terceros"*. Es el reto del INVIMA escrito por otras personas para otro
concurso. Aporta tres cosas que la arquitectura ya quería: inferencia local de verdad, **OCR y
multimodal en el mismo SDK** (el riesgo D3), y un servidor compatible con OpenAI que hace que adoptarlo
cueste una URL base. Y su segundo track regala la evidencia que faltaba para Confiabilidad: **tasa de
éxito sobre N corridas**, con los fallos no resueltos incluidos. Eso entró al bloque B6 como criterio.

### 2026-08-24, noche (se mide el portátil y la ruta local deja de ser una apuesta)

La duda era si la máquina aguantaba inferencia local. **Se midió en vez de suponer:** Ryzen 7 5800H,
13,86 GB de RAM, **RTX 3050 Ti con 4.096 MiB de VRAM**, 210 GB libres, Node 24. Un 3B en Q4 (~1,9 GB)
cabe entero en la GPU. Y **Ollama ya estaba instalado con `qwen2.5:3b` y `mistral:latest`
descargados**: la ruta local no había que construirla, había que arrancarla — el daemon no estaba
corriendo, `ollama list` se cuelga sin `ollama serve`.

Decisión: **`qwen2.5:3b` en GPU es el default del 26**, `mistral` (7B, ~4,1 GB, no cabe entero) queda
de reserva. **QVAC pasa a opcional** por decisión del usuario; sobre el papel la máquina cumple sus
requisitos —el loader Vulkan es 1.4.309.0 y pide ≥ 1.4— pero no se probó, así que queda ⏳ sin
verificar, no descartado. Su método de medir fiabilidad se adopta igual. Detalle en
[../descubrimientos/toolchain-agente.md](../descubrimientos/toolchain-agente.md) §6 y correcciones en
[verificacion.md](verificacion.md) §3.10.

El OCR quedó separado del razonamiento: con 4 GB de VRAM un modelo de visión va justo, y un motor de
OCR en CPU entrega además la posición del texto — que es el ancla de página que la regla "sin ancla,
sin pantalla" exige de todos modos.

### 2026-08-24, noche (se prueba la inferencia local y se corrige una frase del pitch)

Se arrancó Ollama 0.32.1 y se ejecutó `qwen2.5:3b` sobre un fragmento de expediente sintético. Salió
**30,8 tok/s**, JSON válido contra el esquema sin reintentos, y **salida idéntica byte a byte** a
temperatura 0 con semilla fija: el determinismo que pide Confiabilidad (20 %) es demostrable en vivo.
Pero `/api/ps` desmintió una frase que este repositorio ya había escrito: el modelo **no cabe entero
en la GPU** —3,56 GB en ejecución, 2,30 GB en VRAM, 65 %— porque el peso del archivo no incluye la
caché KV ni el contexto. Corregido y fechado en [verificacion.md](verificacion.md) §3.11.

### 2026-08-24, noche (tres pruebas cambian el diseño del triaje)

Probar el modelo contra la tarea real —detectar un expediente incompleto— dejó tres hechos medidos, no
supuestos ([verificacion.md](verificacion.md) §3.12). Pedirle extracción y huecos **en una sola
llamada** le hizo pasar por alto un "Certificado BPM: no adjunto" escrito en el propio texto.
Preguntarle "qué falta" **sin checklist** produjo un falso positivo **consistente 3/3**: afirmó que
faltaba un campo que estaba presente. Y **con checklist explícita** clasificó los seis ítems bien 3/3,
con salida idéntica, pero **citó mal el número de línea en los tres casos presentes**.

De ahí salieron las tres reglas que gobiernan el bloque B6: **una tarea por llamada**; **la checklist
la pone el sistema**, nunca el modelo; y **el ancla nunca la produce el modelo** — que cite el texto
literal y que el código encuentre dónde está. Resumido: el modelo sirve para leer y clasificar, no
para contar ni para recordar qué debería estar.

### 2026-08-24, noche (la investigación de julio se absorbe y su carpeta queda libre)

Se comparó `hackaton_invima_genera_summit/` contra los docs actuales buscando qué se estaba perdiendo.
Faltaban seis cosas: la mecánica del evento (tres hackatones, equipos de 5, URLs de inscripción), la
tabla de patrocinadores y premios (GOMATCH, Davivienda, CCB), **quién evalúa dentro del INVIMA** (la
Sala Especializada y la SEMNNIMB), la **tabla de módulos CTD**, la preferencia documentada de
farmacovigilancia por resaltar extractos en vez de resumir, y los datos de **MediLedger**. Todo eso
entró como §6 de [../descubrimientos/reto-invima-2026.md](../descubrimientos/reto-invima-2026.md).

El `roadmap-estudio.md` **no se absorbió a propósito**: era un plan de 28 días a una hora diaria
escrito el 29 de julio, cuando no se conocían las reglas. Quedan dos días y el reglamento cambió el
marco; conservarlo sería documentación que miente. Con los enlaces ya redirigidos, la carpeta vieja no
tiene contenido único.

### 2026-08-24, noche (una pregunta del usuario destapa un supuesto colado como hecho)

Se propuso como acción "escribir la checklist de requisitos INVIMA", y el usuario preguntó si esa
checklist aparecía en los documentos fuente. **Se buscó en los cuatro: `checklist` no aparece ni una
vez, y las tres apariciones de `requisito` en las Reglas se refieren a la propuesta, no al
expediente.** La palabra venía del análisis de julio —donde iba marcada como `[Razonamiento]`— y del
diseño experimental de la prueba con `qwen2.5:3b`.

Importa porque la idea recomendada del brainstorming es un triaje de vacíos documentales, y **"vacío"
no significa nada sin un estándar de completitud que las reglas no definen ni entregan**. El hallazgo
medido sigue en pie —sin estándar explícito el modelo se lo inventa, 3/3— pero el estándar deja de ser
un hecho normativo y pasa a ser pregunta al organizador y, si toca, supuesto declarado en la EIA.
Corrección en [verificacion.md](verificacion.md) §3.13, pendiente §2.3, y tres caminos según la
respuesta en el bloque B5 de [plan.md](plan.md).

### 2026-08-24, noche (el reglamento de otro hackatón corrige un supuesto de este)

Al comparar con el reglamento del Aleph Hackathon —que cerró el 23 de agosto y exige que todo el
código se escriba durante el evento y sea abierto— quedó claro que este plan había importado ese
supuesto sin verificarlo. **En el reto INVIMA no existe esa regla**: la sección I.1 de la Declaración
de PI es precisamente una tabla para declarar activos preexistentes, y la causal 11 castiga *omitir*
declararlos, no usarlos. Corrección fechada en [verificacion.md](verificacion.md) §3.9. No cambia la
decisión de no construir el prototipo a ciegas, pero sí abre llevar andamiaje, plantillas y la capa
de Huella preparados y declarados.

### 2026-08-26 (el frontend se rehace sobre los mismos datos, y la medición encuentra un fallo)

Se rehízo la capa de presentación de [`prototipo/index.html`](../prototipo/index.html) sin tocar una
cifra del expediente: los datos precomputados quedaron intactos y lo que cambió es cómo se leen.
Paleta tomada de `invima.gov.co` medida en el sitio público — **solo color, nunca logotipo ni
escudo**, y el aviso ahora dice explícitamente que no es un sistema del INVIMA. La regla 2 de
`procedures/skillui.md` advierte que vestirse como el regulador hace que un demo parezca oficial;
hablar su idioma cromático sin firmar con su nombre es el punto medio defendible.

Se añadieron cinco gráficos que **cargan dato, no adorno**: mapa de 166 folios con las 13 anclas
citadas, arco que une los folios que se contradicen entre sí, rosco del índice, pipeline M1→M5 y
barras por área. Cada marca abre su hallazgo. Las técnicas de animación vienen de `somos_internet`
—número que cuenta, barra en dos fotogramas, trazo SVG que se dibuja solo, punto que viaja por el
pipeline—; el código se reescribió en inglés según `procedures/agents.md`.

**La medición encontró lo que la vista no.** Los KPI se quedaban en `—` y el rosco en 0 % cuando la
pestaña estaba oculta: `requestAnimationFrame` no corre ahí, y los tres helpers escribían el valor
real recién en el primer fotograma. La página mostraba una cifra falsa en cuanto perdía el foco.
Corregido invirtiendo el orden —valor final síncrono, animación después— en los cuatro sitios. Es la
trampa 1 de `procedures/responsive.md` ocurriendo de verdad, y sale gratis solo si se mide.

También se corrigió `--ink-3`, el token de los folios y las notas: medía 4,32 de contraste, por
debajo de AA para texto normal. Medidas completas en [verificacion.md](verificacion.md) §5.

Queda declarado lo que **no** está resuelto: sin JavaScript la vista central sigue vacía, y
`prefers-reduced-motion` se verificó leyendo el código, no emulando la preferencia.

### 2026-08-26, tarde (la paleta se calienta y el idioma se aplica sin excepciones)

Dos correcciones del usuario sobre el frontend recién hecho.

**Idioma, sin la excepción que me había reservado.** La regla es código en inglés, pantalla y `.md`
en español. En la primera pasada dejé el esquema de datos en español argumentando que `hallazgo`,
`folio` y `precedente` son términos regulatorios literales; el usuario cerró la puerta. Traducido
entero —constantes y ~40 claves— manteniendo en español **los valores que sí se imprimen**, y pasando
por tabla de etiquetas los que no (`severity: "critical"` → "Crítico", `confidence: "high"` → "Alta").
Es la distinción que hace que la regla sea aplicable en vez de un dilema: la clave es código, el
valor visible es interfaz.

**Paleta cálida, y el INVIMA se cae casi entero.** Pedir calidez después de pedir la paleta del
INVIMA es incompatible con lo que hace reconocible a esa marca: el cian `#0D8EBA` y el azul `#3366CC`
son los anclajes fríos, y se fueron. Sobrevive **el verde lima `#ABCD73` literal**, que además es el
color de "Conforme". El resto pasó a cremas, terracota y ocre, sombras incluidas. Efecto lateral
bueno: el riesgo de `procedures/skillui.md` §2 —parecer el sistema oficial de un regulador— baja
todavía más, porque ya no se parece al sitio del INVIMA.

Contraste remedido sobre la paleta nueva: todos los pares ≥ 4,9 en claro y oscuro. Layout sin
cambios, revalidado a 320 px en las tres pestañas. Cero `undefined` en la página tras el renombrado,
que es la comprobación que atrapa una clave mal traducida. Detalle en
[verificacion.md](verificacion.md) §5.1, §5.3 y §5.6.

### 2026-08-26, tarde (el cockpit se parte en dos pantallas y gana tres zonas)

El usuario señaló lo que ya se veía: demasiado texto en una sola vista. Ahora hay **Resumen** —
tiles, donas, mapa de calor de 21 celdas, barra de severidad y chips con `M2 f.46 ⟷ M5 f.158`, sin
párrafos— y **Detalle**, con los nueve campos obligatorios. El párrafo de respuesta de cada hallazgo
se movió de la cabecera de la tarjeta al cuerpo desplegado: era la mitad del ruido. Cuatro caminos
distintos —chip, celda, marca del mapa, documento del árbol— abren el mismo hallazgo ampliado.

El shell pasó a tres zonas: barra lateral oscura (navegación BPM provisional + árbol del expediente),
columna de trabajo y dock del asistente. **El asistente no está conectado y lo dice**: conectarlo a
un servicio rompería la promesa de que el expediente no sale de la máquina, y fingir que funciona
sería peor que dejarlo declarado como espacio reservado. La navegación BPM queda marcada como
provisional en el código y en la interfaz, esperando el mapa real.

**Lo que la medición volvió a destapar.** Leer `getBoundingClientRect()` justo después del clic
devuelve la posición a mitad de la transición de 220 ms, así que `aria-expanded` mentía: ahora el
estado se deduce de qué modo eligió el CSS (`position: sticky` o `fixed`), sin medir nada. Y
`Escape` no cerraba el cajón porque la guarda `!t.closest` corría antes de mirar la tecla. Además,
blanco sobre terracota medía 3,99 en cinco sitios; se resolvió con tokens propios que en oscuro
invierten a tinta sobre relleno claro. Todo en [verificacion.md](verificacion.md) §5.7.

### 2026-08-26, mediodía (el folio deja de calcularse y pasa a leerse)

Se construyó el motor de evidencia en el worktree `motor-evidencia`, en paralelo con el frontend.
La primera versión sacaba el folio de la aritmética obvia: el nombre del PDF trae el rango
(`Modulo 3_Calidad_53_97_.pdf`), así que folio = inicio + número de página. **Salió mal, y el aviso
lo dio el propio código**: los cinco módulos reportaron exactamente una página de más.

La causa: cada PDF abre con una portada sin folio. Pero la corrección no fue restar uno — fue dejar
de calcular. **Cada página del expediente trae su folio impreso en el pie**, junto con el documento al
que pertenece. El motor lo lee de ahí, y donde no hay pie cae a la cuenta de páginas **anotando en el
índice de dónde salió el número**. Esa anotación es la que permite decir en tarima «este folio lo dice
el documento» sin que sea una frase de fe.

Consecuencia inmediata y cara: al re-anclar las 13 citas del prototipo, **7 tenían el folio corrido y
3 estaban atribuidas a otro documento** ([verificacion.md](verificacion.md) §3.16). Entre ellas la
indicación de CORAZILIMAB, que es la primera evidencia del pitch. Los desfases van de −12 a +2, así
que no había forma de detectarlos leyendo: solo cotejando contra el texto.

**La decisión de arquitectura que queda:** el ancla es una propiedad del documento, no un cálculo del
sistema. Cuando el documento la trae impresa, se lee; cuando no, se calcula y se marca. Nunca se
mezclan las dos cosas en un mismo campo sin decir cuál es cuál.

### 2026-08-26, mediodía (el modelo lee, el código busca — y hubo que aprender que también preselecciona)

El reparto que traía el plan era de dos partes: el modelo cita el texto literal, el código encuentra
el folio. Probarlo contra el expediente real añadió una tercera, y por la vía dolorosa.

Darle a `qwen2.5:3b` el documento M2-05-CO entero y pedirle los pasajes sobre la población de la
indicación **no trajo la indicación**. Trajo las tablas de subgrupos —«Edad <65 años», «WHO-FC III»—
y dos citas con cifras que no existen en el expediente. La línea que importa está dentro de una tabla
y el modelo pasó por encima.

El arreglo no fue mejorar el prompt: fue **quitarle al modelo la tarea de buscar**. Ahora el código
preselecciona los folios candidatos con una búsqueda de texto sobre los términos del criterio, y el
modelo solo lee lo que se le pone delante. Es determinista, se explica en una frase y bajó el caso
completo a dos llamadas y 1,87 s.

Queda como cuarta regla del motor, al lado de las tres de la noche del 24: **una tarea por llamada ·
la checklist la pone el sistema · el ancla la calcula el código · y el código también decide qué se
lee**. Las cuatro salen de medidas, no de preferencias.

### 2026-08-26, mediodía (la confiabilidad deja de ser un adjetivo)

`motor/verificar.mjs` produce las tres cifras que el bloque B6 pedía y que casi ningún equipo va a
llevar medidas: **5/5 de tasa de éxito** sobre el caso H1, **una sola huella en 5 corridas** —el
determinismo, demostrable en vivo— y **1,87 s por corrida**.

Lo que hizo falta para que la cifra valga algo fue definir «éxito» en una frase objetiva antes de
medir: *la corrida produce el hallazgo con al menos dos pasajes anclados, uno del módulo de resúmenes
y otro del de estudios clínicos*. Sin esa frase, «funciona» es una opinión y la tasa no significa
nada. Es la regla filtro de `procedures/agent_loops.md` aplicada a su propio verificador.

La prueba de inyección enseñó algo que conviene no maquillar. Se metió un folio con seis órdenes
dirigidas al modelo y ninguna llegó a evidencia — pero **el anclaje solo no es lo que las detuvo**:
el folio envenenado es texto del expediente, así que sus frases anclan. Las detuvo la regla de código
que exige que la cita hable del tema, más la revisión humana. La defensa es de capas. Decir «el
sistema es inmune» sería exactamente el tipo de frase que un jurado jurídico desarma.

Se añadió además una comprobación de que **el ataque llegó de verdad al modelo**: si la preselección
hubiera dejado el folio envenenado fuera, el «PASA» no habría probado nada.

### 2026-08-26, 13:30 (el dossier se escribe, y cotejarlo contra la pantalla destapa dos afirmaciones falsas)

Mientras el cockpit y el motor seguían en sus worktrees, el área de documentos escribió las dos
piezas que faltaban para la etapa eliminatoria: la **EIA de 12 puntos** ([eia.md](eia.md)) y el
**aviso al administrado** ([aviso-administrado.md](aviso-administrado.md)). La clasificación de riesgo
ya estaba, en nivel medio.

La EIA cuelga los 12 puntos de [Reglas §7] de las cuatro funciones del NIST AI RMF, pero los deja
numerados en el orden de la norma: quien verifica admisibilidad lee en línea recta, y quien pregunta
por el marco recibe el nombre del marco. No hay ningún hueco: hoy los 12 puntos tienen medición
detrás, así que el plan original de «esqueleto con siete huecos» quedó sin objeto y sus criterios se
reescribieron con la razón anotada, no en silencio.

**Lo que no estaba previsto fue el cotejo.** Escribir el punto 10 —controles, con su estado— obliga a
mirar si el control existe de verdad, y dos afirmaciones del dossier no sobrevivieron:

1. La clasificación apoyaba cuatro de sus seis controles en `prototipo/datos.js`. **Ese archivo no
   existe**: los datos viven dentro del único `index.html`. Un jurado que abre el repo y no encuentra
   el archivo citado deja de creer el resto.
2. La clasificación declaraba como control que **«no se publica un porcentaje global de cumplimiento
   ni de aprobabilidad»**. La cabecera publica uno: el «Índice de rigor», ponderado por área.

La regla de B8 dice qué hacer: la discrepancia se corrige en el documento, no se maquilla en el demo.
El control quedó reescrito con lo que de verdad ocurre y con las tres acotaciones que sí son
verificables en pantalla —no se rotula «cumple», califica documentos y no el trámite, y los factores
se muestran desglosados, que es lo que §5.4 exige para que un número no vaya solo—. La decisión de
renombrar el índice o retirarlo **no se tomó desde aquí**: es del área del cockpit, y queda marcada
como abierta antes del cierre de código.

Cotejar también dejó un hallazgo que no es de documentos: `prototipo/index.html` es público y lleva
los pesos, el mapa de valor por estado y los umbrales en claro, que es justo lo que la regla del repo
público prohíbe. Reportado, no tocado — editar el archivo de otra área desde aquí es el fallo que
`WORKTREES.md` existe para evitar.

**Lo que el aviso al administrado obligó a admitir.** El canal de radicación, el término y la
dependencia responsable son datos del INVIMA que este equipo no tiene verificados. Se pintan como
pendientes de confirmación institucional. Inventarlos habría sido la afirmación de cumplimiento más
fácil de desarmar del día, y con un jurado que trae despacho de propiedad intelectual, la más cara.

### 2026-08-26, 14:10 (tres sesiones caen por límite de cuota; se recupera desde sus transcripciones)

Las tres sesiones que se repartieron `prototipo/index.html` a las 13:35 —cockpit, documentos, árbol
M1–M8— agotaron su cuota antes de terminar. Se exportaron sus transcripciones y se retomó desde ahí en
vez de empezar de cero: la del cockpit había escrito y nunca ejecutado `add_trace.mjs` (pantalla
Huella); la del árbol había dejado solo fragmentos de CSS/JS sin ensamblar, a la espera de un archivo
del motor que no vive en este checkout.

Correr `add_trace.mjs` destapó dos bugs propios del script —una concatenación de cadena rota en
`renderTrace` y un `$$` que `String.replace` interpretó como escape de `$` dentro del texto de
reemplazo, dejando `showScreen()` con `$(...).forEach`, que no existe— ninguno de los dos visible sin
correrlo, porque la sesión que lo escribió nunca llegó a probarlo. Corregidos, la pestaña **Huella**
queda: cadena de 5 eslabones, "Alterar un registro" la rompe donde dice que la rompe, "Restaurar" la
repara, firmar añade un eslabón. Cierra el único ítem de B6 que dependía del frontend.

La pestaña **Aviso** se escribió de cero siguiendo [aviso-administrado.md](aviso-administrado.md) —no
había nada que recuperar—, leyendo los datos ya cargados sin depender del motor. Cierra el último ítem
de B7.

De paso se aplicó una recomendación que el área de documentos había dejado escrita: «Índice de rigor»
pasó a «Cobertura de revisión», con una nota de que no es veredicto de cumplimiento — el cálculo no se
tocó, solo la etiqueta.

**Lo que se decidió no tocar, a propósito.** La exposición de `WEIGHTS` y umbrales en el repo público
sigue igual: arreglarla de verdad es precomputar los puntajes y dejar de mostrar la fórmula, un cambio
de arquitectura que a menos de una hora del cierre de código pesa más el riesgo de romper el cálculo en
vivo que el de dejarlo documentado como pendiente. El árbol M1–M8 tampoco se ensambló: los fragmentos
recuperados asumen un archivo que no está en este checkout, y adivinar su forma es más caro que no
tenerlo. Detalle completo, con lo que sí se verificó en navegador, en
[verificacion.md §5.10](verificacion.md).

### 2026-08-26, 14:24 (el árbol M1–M8 que tres sesiones no llegaron a construir, sale de los mismos datos)

El usuario trajo `flujo_extraccion_validacion_M5_DALVANCE.md` —un pipeline de referencia sobre un
Clinical Review real (DALVANCE, FDA)— pidiendo la interacción exacta que `generax-summit-84` había
dejado a medio ensamblar por límite de cuota: abrir un módulo, entrar a un documento, saltar de ahí a
dónde se extrajo el dato. Se tomó el patrón, no el contenido: DALVANCE es otra molécula, y su PDF real
no se tocó ni se mezcló con el expediente CORAZILIMAB del reto.

La construcción no necesitó ningún dato nuevo ni el archivo del motor que faltaba en este checkout
(`motor/salida/expediente.json`, gitignored, solo en el worktree). `MODULES` y `FINDINGS` ya tenían
todo: cada documento ya declaraba qué hallazgos lo citan, y cada hallazgo ya traía el folio y el texto
exacto de su evidencia. La pestaña **Expediente** solo reagrupa esos mismos datos por documento en vez
de por hallazgo, y reutiliza `openFinding()` para el salto — sin duplicar lógica.

Una decisión explícita: no se embebió el PDF de DALVANCE ni los PDF reales de CORAZILIMAB. Lo que abre
al elegir un documento es el fragmento citado que el motor ya extrajo, con su folio — la misma
evidencia que ya se veía en una tarjeta de hallazgo, mirada desde el documento en vez de desde el
hallazgo. Redistribuir el PDF del organizador en el repo público sigue siendo el riesgo abierto de
[verificacion.md §7.6](verificacion.md), no algo que este cambio debía resolver.

Verificado en navegador: `Expediente → M5 → Fase III pivotal → fragmento` salta a la tarjeta H1 en
Detalle, expandida y con foco. Un estudio declarado y no aportado (`CRZ-HAP-501`) muestra el mensaje
correcto: no hay folio que abrir, la ausencia es la evidencia. Detalle completo en
[verificacion.md §5.11](verificacion.md).
