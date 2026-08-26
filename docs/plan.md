# plan.md — Hackatón INVIMA del Futuro, 26 de agosto de 2026

Especificación y bloques. Contexto en [../descubrimientos/reto-invima-2026.md](../descubrimientos/reto-invima-2026.md).
Método en [../descubrimientos/metodologia-sdd.md](../descubrimientos/metodologia-sdd.md).

**Alcance de esta carpeta.** Aquí solo hay documentación. Ningún bloque de los días D-2 y D-1 produce
código; los bloques del día del evento describen qué se construye, pero se ejecutan el 26 en Ágora,
no aquí.

## Reloj — día del evento

Agenda real, de la presentación de la jornada:

| Hora | Bloque | Qué significa |
|---|---|---|
| 10:30 – 12:30 | Definición de solución y arquitectura | **Mentoría rotativa** — aquí se preguntan los pendientes |
| 12:30 – 13:15 | Almuerzo | |
| **13:15 – 15:15** | **Construcción del prototipo** | **Checkpoint obligatorio a mitad (~14:15)** |
| 15:15 – 15:30 | Pausa | **Cierre de código y alistamiento de la demo** |
| 15:30 – 16:30 | Pitch ante el jurado | En simultánea por reto |
| 16:35 – 16:50 | Deliberación | Rúbrica cerrada previamente |
| 16:50 – 17:00 | Ganadores y cierre | |

**Dos horas de construcción real.** Todo lo que no esté en pie a las 15:15 no existe.
WiFi: **GOHACKIA** / **GOHACK26**.

Los trámites de entrada (invitación de Calendar, Declaración de PI a `jdvargas@mentex.co`) vencían
antes del inicio — B0. **Llevar computador propio.**

## Bloques abiertos — de más fácil a más difícil

### B0 — Trámites de entrada (hoy, ~40 min)

**Historia.** Como participante quiero quedar formalmente inscrito y con mi PI previa protegida, para
que nada administrativo me deje fuera de una jornada que ya preparé.

**Criterios de aceptación**
- [ ] Invitación de Google Calendar **aceptada** ("Sí"), antes de las 10:00 del 25 de agosto. Haberse
      registrado antes no basta.
- [ ] `Declaracion_Propiedad_Intelectual_Hackaton_INVIMA` diligenciada, firmada y enviada a
      `jdvargas@mentex.co`, con acuse.
- [ ] Secciones I.1 a I.6 de la declaración llenas — activos previos, modelo base, datos, open source,
      APIs de terceros, licencias. Ninguna en blanco.
- [ ] Si hay equipo: firma de todos sus integrantes, o de quien los representa.

**Fuera de alcance.** Registrar startup, constituir nada. Las reglas no lo exigen.

### B1 — Clasificación de riesgo, pre-escrita (D-1, ~45 min)

**Historia.** Como equipo quiero llegar con la tabla de riesgo razonada, para que el 26 solo haya que
ajustarla a la idea final en lugar de descubrir el formato.

**Criterios de aceptación** — cerrado el 2026-08-26 en
[../reference/clasificacion-riesgo.md](../reference/clasificacion-riesgo.md), **nivel MEDIO**.
- [x] Los seis criterios de [Reglas §6] evaluados en una tabla: efecto sobre derechos, autonomía,
      datos personales, impacto en salud pública, alcance, reversibilidad.
- [x] El nivel final es el **más alto** de los seis, y así está escrito.
- [x] Cada nivel trae una frase de justificación, un control con su estado, y no solo la etiqueta.
- [x] No resultó alto, así que el criterio de controles reforzados no aplica — pero en las dos
      fronteras cortas hacia alto (autonomía y omisión) se aplican controles de nivel alto, y los
      **cinco disparadores de reclasificación** quedan escritos por adelantado.
- [x] Cotejado contra la pantalla el 26 a las 13:40: dos afirmaciones del documento no coincidían con
      lo que hace `prototipo/index.html` y se corrigieron en el documento —
      [verificacion.md](verificacion.md) §7.3 y §7.4.

### B2 — EIA preliminar (escrita el día D, 13:30–14:00)

**Historia.** Como equipo quiero la Evaluación de Impacto Algorítmico completa y proporcional al
riesgo, para pasar la etapa eliminatoria sin depender de que el jurado sea benévolo leyendo huecos.

**Los criterios cambiaron el 26 a las 13:45, y por qué.** Este bloque se escribió para un esqueleto de
D-1 con siete puntos en blanco. Ese documento nunca se redactó, y hoy los 12 puntos tienen medición
detrás, así que el criterio de «huecos visibles» dejó de aplicar y el tope de páginas subió: lo que
antes era un esqueleto ahora carga la clasificación de riesgo, los controles con su estado y las
cifras del motor. El fondo no se relajó — sigue exigiendo los 12 puntos, el esqueleto NIST y
proporcionalidad.

**Criterios de aceptación**
- [x] Los 12 puntos de [Reglas §7] presentes como secciones, en ese orden — 2026-08-26,
      [eia.md](eia.md). Cotejados uno por uno contra las reglas; cero huecos `‹…›`.
- [x] Esqueleto organizado por las funciones del NIST AI RMF, según
      [../descubrimientos/metodologia-sdd.md](../descubrimientos/metodologia-sdd.md).
- [x] Los cuatro requisitos de [Reglas §5.1] —dónde interviene el funcionario, qué recibe, qué
      conserva, qué puede modificar— respondidos en ese orden, en el punto 11.
- [x] Cada cifra remite a su medición en [verificacion.md](verificacion.md); lo no medido se declara
      como no medido. Cuatro huecos de conocimiento escritos a propósito.
- [x] Proporcional al riesgo, no una tesis: **282 líneas, 68 de ellas de tabla**, contra un tope
      fijado en 300. Equivale a unas 5–6 páginas impresas; ⏳ no se renderizó a PDF para contarlas.
- [ ] ⏳ Licencias de los cuatro componentes de terceros confirmadas y anexadas — va con B8.

### B3 — Guion del pitch y respuestas al jurado adversario (D-1, ~60 min)

**Historia.** Como presentador quiero tres minutos cronometrados y cinco respuestas duras listas, para
no improvisar delante de un jurado con perfil jurídico.

**Criterios de aceptación**
- [ ] Guion de 3:00 con reloj, estructurado como: cifra del problema → qué hace → **quién firma** →
      número medido → trazabilidad en pantalla → cierre.
- [ ] La cifra del problema es **12.466 trámites**, con su fuente a la mano.
- [ ] Las cinco preguntas de [../descubrimientos/riesgos.md](../descubrimientos/riesgos.md)
      respondidas por escrito, cada una en menos de 40 palabras.
- [ ] Ensayado en voz alta al menos una vez, cronometrado.

**Degradación.** Si el demo no corre en vivo: video de respaldo grabado antes del pitch, y el guion
funciona igual narrando el video.

### B4 — Kit del día (D-1, ~30 min)

**Historia.** Como equipo quiero una hoja de una página que evite los errores caros, para poder
consultarla a las 11 a.m. cuando nadie va a leer un documento largo.

**Criterios de aceptación**
- [ ] Checklist de admisibilidad: las 12 causales en forma de pregunta de sí/no.
- [ ] Tabla de usos elegibles impresa o accesible sin internet.
- [ ] Lista de preguntas para el organizador: herramientas autorizadas, forma del dataset, formato de
      entrega, composición del jurado.
- [ ] Roles asignados: dominio/regulatorio · construcción · quien presenta.
- [ ] Computador cargado y listo — el correo lo pide expresamente.

### B4b — Ensayo del stack (D-1, ~45 min)

**Historia.** Como equipo quiero haber tocado las herramientas antes del evento, para que la primera
hora del 26 no se vaya en crear cuentas y pelear con credenciales.

Bloque añadido el 24 de agosto, al llegar el insumo técnico de Google. Detalle de herramientas en
[../descubrimientos/stack-google.md](../descubrimientos/stack-google.md).

**Criterios de aceptación**
- [ ] Clave de API obtenida en AI Studio y una llamada de prueba que responde.
- [ ] Una consulta a **OpenFDA** ejecutada, con la respuesta guardada — es la fuente del lado de
      agencia de referencia y no pide credenciales.
- [ ] Gemini Notebook probado con un PDF técnico cualquiera, comprobando que **cita la sección de
      origen**. Sirve además como demo de respaldo.
- [ ] Decidido y escrito qué se hace si el acceso EAP (Co-Scientist, AlphaEvolve) no llega: la ruta
      crítica no depende de él.
- [ ] `agent-browser` instalado (`npm install -g agent-browser && agent-browser install`) y una
      corrida de prueba **con HAR** sobre una página pública, para confirmar que el binario y Chrome
      funcionan en esa máquina. Es la pieza que vuelve demostrable el art. 7.4 —
      [../descubrimientos/toolchain-agente.md](../descubrimientos/toolchain-agente.md) §1.
- [x] **Inferencia local probada** — 2026-08-24. Ollama 0.32.1 responde; `qwen2.5:3b` a 30,8 tok/s,
      65 % en GPU, JSON válido sin reintentos y **determinista** a temperatura 0. Números en
      [verificacion.md](verificacion.md) §1.30–33.
- [ ] Un **motor de OCR** elegido y probado con un PDF escaneado cualquiera — es el eslabón que la
      inferencia local no resuelve sola
      ([../descubrimientos/toolchain-agente.md](../descubrimientos/toolchain-agente.md) §6.4).
- [ ] Media hora con `github-repo-scout` sobre la idea elegida, anotando **licencias** — alimenta la
      sección I.4 de la Declaración de PI.
- [ ] Docker y el navegador cerrados antes de medir. Con 13,86 GB totales, la RAM libre decide si el
      modelo cabe.
- [ ] Opcional, 10 min: `supply-chain-audit` sobre el portátil antes de instalar nada más. Es de solo
      lectura.

**Fuera de alcance.** Construir el prototipo. Esto es reconocimiento de terreno, no desarrollo.
También queda fuera cualquier recon contra sistemas que pidan credenciales: solo datos abiertos y
documentación pública (§2 del mismo documento).

### B5 — Gate y baseline (día D, 8:00–9:30)

**Historia.** Como equipo quiero descartar lo inadmisible y medir el "antes" antes de construir nada,
para que el número de impacto sea real y no una estimación de pitch.

**Criterios de aceptación**
- [x] **Pista declarada: A** — escalar la comprensión humana del expediente. Queda por escrito en el
      encabezado de [eia.md](eia.md) y en el punto 1, con las **filas de uso elegible** de [Reglas §4]
      que la autorizan: extracción estructurada de dossieres como principal; detección de expedientes
      incompletos y clasificación/priorización como accesorias.
- [ ] Idea elegida con la **fila de uso elegible anotada** que la autoriza.
- [ ] Las 12 causales revisadas contra la idea; ninguna aplica.
- [ ] **Baseline cronometrado**: alguien busca a mano una de las contradicciones verificadas de
      [../descubrimientos/dataset-corazilimab.md](../descubrimientos/dataset-corazilimab.md) §4 y se
      anota el tiempo, con testigo. Es el "antes" contra el que se mide el Impacto (25 %).
- [ ] Alcance escrito en una frase, y lo excluido en otra.
- [ ] **Preguntado al mentor qué tabla de pesos usa el jurado** — las reglas §9 y la presentación de
      hoy no coinciden ([verificacion.md](verificacion.md) §3.15). Mientras no haya respuesta,
      Escalabilidad y Cumplimiento legal se defienden **ambos como 15 %**.
- [ ] La checklist de trazabilidad queda **escrita y versionada antes de construir**, tomada de la
      ficha visual y no inventada: módulo > sección > documento > versión > folio > fragmento, más los
      nueve campos de la salida mínima obligatoria. Es lo único que el modelo no puede improvisar sin
      inventar.

**Resuelto por el material del día — ya no hay que preguntarlo**
- ~~Forma del dataset~~ → PDF, expediente CTD de 166 páginas. [verificacion.md](verificacion.md) §2.2.
- ~~Bioinformática como uso elegible~~ → no aplica: el dataset no tiene datos que la requieran.
  §3.14.
- ~~Estándar de completitud para trazabilidad~~ → lo fija la ficha visual. §2.3.

### B6 — Recorte construido con Huella (día D, 9:30–15:00)

**Historia.** Como evaluador quiero ver un recorte que funcione de punta a punta y pueda explicar cada
salida, para creer que esto es usable y no una maqueta.

**El caso demo, ya elegido.** Las tres contradicciones verificadas en
[../descubrimientos/dataset-corazilimab.md](../descubrimientos/dataset-corazilimab.md) §4 son el
guion. La 4.1 —la indicación pide adolescentes ≥12 años y el pivotal los excluyó— es la mejor: es un
cruce M2↔M5 que hoy hacen dos grupos evaluadores distintos y ninguno ve al otro.

**Criterios de aceptación**
- [x] Un caso completo corre de principio a fin sobre el expediente CORAZILIMAB — 2026-08-26.
      `node motor/extraer.mjs` produce H1 en 1,87 s. [verificacion.md](verificacion.md) §6.3.
- [x] **La salida trae los nueve campos obligatorios** de la ficha visual: respuesta; evidencia;
      ubicación exacta; versión; nivel de confianza; contradicciones; información faltante;
      limitaciones; siguiente acción sugerida. Faltar uno es regalar Confiabilidad (20 %).
- [x] Cada salida enlaza a su origen; lo que no se puede anclar **no se muestra**, se manda a cola
      humana — 2026-08-26. `anclar()` devuelve `encontrado: false` con motivo y la cita se descarta.
- [x] **Defensa contra instrucciones maliciosas dentro de los documentos** — la ficha visual la exige
      explícitamente como control de Seguridad, y casi nadie la va a implementar. El texto del
      expediente se trata como dato, nunca como instrucción.
- [x] **El ancla la calcula el código, no el modelo.** El modelo cita el texto literal; la página y la
      línea salen de buscar esa cadena en el documento. Medido: un 3B cita mal la línea 3 de 3 veces.
- [x] **Una tarea por llamada.** Extracción y detección de huecos van en llamadas separadas —
      2026-08-26, `extraerCitas` y `resolverItem` son funciones distintas y nunca comparten turno.
- [ ] **La checklist la pone el sistema**, nunca se le pregunta al modelo "qué falta" en abstracto —
      eso produjo un falso positivo consistente 3/3. Su **origen queda anotado**: dataset del evento,
      norma citada, o supuesto propio ([verificacion.md](verificacion.md) §3.13).
- [x] Existe una pantalla o vista donde se ve el registro: qué entró, qué salió, quién revisó, qué
      cambió — 2026-08-26, 14:08. Pestaña **Huella** en `prototipo/index.html`: SHA-256 escrito en la
      página (sin red, sin librerías), cadena de 4 pasos del motor + 1 de la pantalla + firma humana
      pendiente. Botón "Alterar un registro" rompe la cadena en vivo y "Restaurar" la repara — medido
      en navegador. [verificacion.md](verificacion.md) §5.10.
- [x] Ninguna salida es un veredicto de cumplimiento — cada hallazgo sale marcado como *lectura
      asistida* y la acción sugerida termina siempre en una persona.
- [x] Degradación: si un proveedor externo no responde, la pantalla lo dice con hora, y no se cae —
      2026-08-26, ejercida contra un puerto muerto: mensaje con marca de tiempo y código de salida 2.
- [x] La misma entrada produce la misma salida en dos corridas seguidas — 2026-08-26, **una sola
      huella en 5 corridas**. [verificacion.md](verificacion.md) §6.3.
- [x] **Tasa de éxito sobre N corridas** anotada, con N dicho en voz alta, más los fallos que no se
      pudieron arreglar. Es la forma más barata de ganar Confiabilidad (20 %) y casi nadie la lleva
      medida — ver [../descubrimientos/toolchain-agente.md](../descubrimientos/toolchain-agente.md) §6.
- [ ] El verificador de cada paso cumple la regla filtro: se puede escribir en **una sola frase
      objetiva**. Si no, ese paso lo hace una persona a mano
      ([../../procedures/agent_loops.md](../../procedures/agent_loops.md)).

**Estado del motor — 26 de agosto, 13:15.** Código en `motor/`, worktree `motor-evidencia`.
Medidas en [verificacion.md](verificacion.md) §6.

| Pieza | Estado |
|---|---|
| Ingesta de los 5 PDF con folio anclado | ✅ 166 folios, 18 documentos |
| Resolución de citas a documento/folio/línea | ✅ verificado contra el pie impreso |
| Auditoría de las citas del prototipo | ✅ y **destapó 7 folios corridos** — §3.16 |
| Caso H1 de punta a punta con los 9 campos | ✅ 5/5, 1,87 s, determinista |
| Prueba de inyección con folio envenenado | ✅ 0 afirmaciones del atacante en evidencia |
| Checklist puesta por el sistema | ⏳ `resolverItem` está escrito pero **no ejercido** en el caso demo |
| Pantalla del registro (qué entró, qué salió, quién revisó) | ✅ 2026-08-26 14:08, pestaña Huella en `prototipo/index.html` |
| Árbol del expediente: módulo → documento → fragmento extraído → hallazgo | ✅ 2026-08-26 14:24, pestaña Expediente. No es criterio explícito de B6; se construyó a pedido del usuario sobre `MODULES`/`FINDINGS` ya existentes — [verificacion.md](verificacion.md) §5.11 |

**Lo que falta y no se puede fingir:** los folios corridos del prototipo hay que corregirlos antes de
las 15:15, y la cifra de fiabilidad es 5/5 **sobre un caso**, no sobre el expediente. Ambas cosas se
dicen tal cual o cuestan más de lo que ahorran.

### B7 — Aviso al administrado (día D, 15:00–15:30)

**Historia.** Como titular de un trámite quiero saber que hubo apoyo de IA y cómo pedir revisión
humana, porque el art. 7.1 de la Resolución me reconoce ese derecho.

**Criterios de aceptación** — texto y especificación en
[aviso-administrado.md](aviso-administrado.md), escritos el 2026-08-26.
- [x] Una página: qué hizo la IA, **qué no hizo**, qué revisó una persona y cómo se pide revisión
      humana documentada.
- [x] Redactada para un ciudadano, sin jerga técnica: sin «IA generativa», sin «anclaje», sin nombres
      de archivo. Ejemplo del hallazgo H1 traducido a lenguaje llano.
- [x] Cumple la exigencia de [Reglas §5.4] de **no presentar solo una puntuación o recomendación**:
      enumera cada hallazgo con su folio y sus limitaciones.
- [x] Los tres campos institucionales que este equipo no tiene verificados —canal, término,
      dependencia— se pintan como pendientes en vez de inventarse.
- [x] Se genera desde el sistema, no es un PDF suelto hecho a mano — 2026-08-26, 14:09. Pestaña
      **Aviso** en `prototipo/index.html`, generada desde `DOSSIER`/`FINDINGS`, sin texto de plantilla
      escrito a mano salvo el fijo del documento fuente. Verificador ejercido en navegador: la vista
      abre, muestra los 5 hallazgos con su folio, y cero huecos `‹…›` fuera de los tres campos
      institucionales marcados «pendiente de confirmación institucional». [verificacion.md](verificacion.md) §5.10.

### B8 — Doble verificación y congelación (día D, 15:30–17:00)

**Historia.** Como equipo quiero que el demo y el dossier digan lo mismo, para que una contradicción no
destruya lo que ganamos en confiabilidad.

**Criterios de aceptación**
- [ ] Verificación técnica: el flujo completo corre dos veces sin intervención manual.
- [ ] Verificación de admisibilidad: se lee la EIA con el demo abierto al lado; toda discrepancia se
      corrige en la EIA, no se maquilla en el demo.
- [ ] Video de respaldo grabado.
- [ ] Alcance congelado: después de las 15:30 no entra funcionalidad nueva.
- [ ] Anexo de licencias de terceros completo y coherente con la declaración enviada en B0.

## Bloques cerrados

### B-01 — Investigación del reto con las reglas oficiales · cerrado 2026-08-24

Reglas, declaración de PI y correo del organizador leídos completos; marco normativo verificado
(Resolución 2026025611, CONPES 4144, Decreto 843 de 2016); cifras del represamiento con fuente.
→ [../descubrimientos/reto-invima-2026.md](../descubrimientos/reto-invima-2026.md)

### B-02 — Competencia y benchmarks · cerrado 2026-08-24

Mercado del lado del titular (Veeva, ArisGlobal, Certara, Weave Bio) frente al lado de la agencia
(Elsa de la FDA, principios conjuntos FDA-EMA); hueco identificado y frases de diferenciación.
→ [../descubrimientos/competencia.md](../descubrimientos/competencia.md)

### B-03 — Registro de riesgos · cerrado 2026-08-24

Seis familias de riesgo, con las tres trampas eliminatorias y las cinco preguntas del jurado adversario.
→ [../descubrimientos/riesgos.md](../descubrimientos/riesgos.md)

### B-04 — Brainstorming filtrado por reglas · cerrado 2026-08-24

Ocho ideas, cada una con su fila de uso elegible; puntuadas contra la rúbrica ponderada; recomendación
y regla de pivote.
→ [../descubrimientos/brainstorming.md](../descubrimientos/brainstorming.md)

### B-05 — Decisión de método · cerrado 2026-08-24

SDD con compuerta de admisibilidad antepuesta y doble Verify; alternativas descartadas con razón.
→ [../descubrimientos/metodologia-sdd.md](../descubrimientos/metodologia-sdd.md)

### B-06 — Análisis del stack de Google · cerrado 2026-08-24

Insumo técnico oficial leído y mapeado contra el reto: qué está disponible en Colombia, qué depende de
un EAP, y los tres hallazgos que cambian el diseño (OpenFDA, MedGemma local, la tensión de la
bioinformática).
→ [../descubrimientos/stack-google.md](../descubrimientos/stack-google.md)

### B-09 — La máquina, medida · cerrado 2026-08-24

Ryzen 7 5800H, 13,86 GB de RAM, RTX 3050 Ti con 4 GB de VRAM, Node 24, Vulkan 1.4.309. **Ollama ya
instalado con `qwen2.5:3b` y `mistral:latest`.** La inferencia local pasa de apuesta a hecho; QVAC
queda opcional y sin verificar.
→ [../descubrimientos/toolchain-agente.md](../descubrimientos/toolchain-agente.md) §6 ·
[verificacion.md](verificacion.md) §1.26–29 y §3.10

### B-08 — Método de loops, IA local y reglas de concurso · cerrado 2026-08-24

Deck de loops de agentes distilado a `procedures/agent_loops.md`; QVAC, WDK y Pear documentados un
archivo por tecnología; reglas de jurado transversales en `procedures/sponsor_track_rules.md`. Del
lote entran cuatro piezas al reto y se descartan seis con su razón.
→ [../descubrimientos/toolchain-agente.md](../descubrimientos/toolchain-agente.md)

### B-07 — Toolchain de agente, filtrada · cerrado 2026-08-24

Catálogo de skills y herramientas de agente (crafter-station, agent-browser, cligentic, scriptc)
documentado en `procedures/`, y filtrado para este reto: entran tres, se descartan seis con su razón.
→ [../descubrimientos/toolchain-agente.md](../descubrimientos/toolchain-agente.md)

## Fuera de alcance, con su razón

- **Construir el prototipo completo antes del 26.** El dataset se entrega esa mañana y lo construido a
  ciegas probablemente no encaja. **No es que esté prohibido**: traer trabajo previo está permitido si
  se declara en la tabla I.1 de la Declaración de PI — ver corrección en
  [verificacion.md](verificacion.md) §3.9. Sí es razonable llevar andamiaje, plantillas, la capa de
  Huella y el ingestor agnóstico, todo declarado.
- **Blockchain como pieza central.** Las reglas no la mencionan; solo se justifica sola en el bloque
  del art. 7.4 ([../descubrimientos/brainstorming.md](../descubrimientos/brainstorming.md) §4).
- **Modelo entrenado con histórico de decisiones.** Prohibición expresa.
- **Plan de negocio o proyección de contrato.** Las reglas descartan expresamente que ganar implique
  contratación.
