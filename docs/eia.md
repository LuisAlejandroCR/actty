# eia.md — Evaluación de Impacto Algorítmico preliminar

Los 12 puntos de [Reglas §7], colgados de las cuatro funciones del NIST AI RMF. Nivel de riesgo y sus
seis criterios en [../reference/clasificacion-riesgo.md](../reference/clasificacion-riesgo.md).
Cifras medidas en [verificacion.md](verificacion.md); bloques y criterios en [plan.md](plan.md).

**Solución:** Cockpit del Evaluador · **Versión:** 1.0 · **Fecha:** 26 de agosto de 2026 ·
**Nivel de riesgo:** MEDIO · **Pista declarada:** A — escalar la comprensión humana del expediente.

Preliminar y proporcional al riesgo, como pide §7. Toda cifra de este documento salió de correr la
cosa real y tiene su fila en [verificacion.md](verificacion.md); lo que no está medido se dice.

## Mapa: los 12 puntos sobre el NIST AI RMF

| Función | Puntos de [Reglas §7] |
|---|---|
| **Map** — contexto y alcance | 1 identificación · 2 finalidad · 3 descripción técnica · 5 datos y fuente |
| **Govern** — quién responde y quién decide | 4 desarrollador · 11 supervisión humana · 12 revisión u objeción |
| **Measure** — qué puede salir mal, y cuánto | 6 nivel de riesgo · 7 derechos · 8 datos y seguridad · 9 sesgo e inexactitud |
| **Manage** — qué se hace al respecto | 10 mitigaciones y controles |

Los 12 van numerados en su orden original para que la verificación de admisibilidad sea una lectura
en línea recta. **CONPES 4144** es el ancla nacional equivalente al marco NIST.

---

## 1. Identificación de la solución · Map

**Cockpit del Evaluador**, versión 1.0. Herramienta de lectura asistida sobre un expediente CTD ya
radicado. Dos piezas:

| Pieza | Qué es | Dónde |
|---|---|---|
| Pantalla | Un archivo HTML, sin instalación y **sin peticiones de red**; abre con `file://` | `prototipo/index.html` |
| Motor de evidencia | Node 24 sin dependencias; lee los PDF, ancla cada cita y audita la pantalla | `motor/` |

**Filas de uso elegible que la autorizan** [Reglas §4]: *extracción estructurada de dossieres (CTD,
BPM, certificados)* como fila principal; *detección de expedientes incompletos antes del reparto* y
*clasificación y priorización de trámites como herramienta de apoyo* como accesorias. Ninguna fila de
usos no admisibles aplica: no adopta decisiones, no emite acto, no califica cumplimiento como salida
final, no perfila titulares y no aprende del histórico de decisiones.

## 2. Finalidad y función institucional · Map

**Finalidad.** Que un evaluador encuentre en minutos una contradicción entre módulos de un expediente
que hoy exige leer cinco módulos completos, y que la decisión la siga firmando una persona.

**Función institucional en la que se inserta.** La evaluación previa a la comercialización de un
medicamento nuevo, repartida entre grupos evaluadores que revisan módulos distintos y no se ven entre
sí. La salida alimenta, cuando el evaluador lo decide, el requerimiento del art. 94 del Decreto 2106
de 2019.

**Lo que no hace, por diseño y por norma.** No aprueba, no rechaza, no califica cumplimiento, no
redacta la motivación del acto y no opina sobre el fondo científico —eficacia, seguridad, calidad—.
El art. 7.1 de la Resolución 2026025611 reconoce el derecho a que la decisión la tome una persona; la
herramienta está construida para que eso siga siendo cierto.

## 3. Descripción técnica · Map

Cadena de cinco pasos, toda local:

```text
PDF del expediente
   │  pdftotext -layout
   ▼
Índice de folios — el folio se LEE del pie impreso (159 de 166); los 7 sin pie se calculan y quedan marcados
   │
   ▼
Preselección determinista: el código elige los folios candidatos por búsqueda de texto
   │
   ▼
Lectura asistida — qwen2.5:3b local, temperatura 0 y semilla fija; el modelo cita texto literal, nada más
   │
   ▼
Anclaje por código: la cita se busca en el texto y devuelve documento > folio > línea. Sin ancla, no se muestra
   │
   ▼
Salida de nueve campos → pantalla estática precomputada + auditoría (`motor/auditar.mjs`)
```

**Las cuatro reglas del motor, todas salidas de una medición** ([verificacion.md](verificacion.md)
§3.12, §6.5):

1. **Una tarea por llamada.** Extracción y detección de huecos nunca comparten turno.
2. **La checklist la pone el sistema**, nunca se le pregunta al modelo "qué falta" en abstracto.
3. **El ancla la calcula el código, no el modelo.**
4. **El código también decide qué se lee** — el modelo solo lee lo que se le pone delante.

**Lo medido, con su alcance** ([verificacion.md](verificacion.md) §6.3): 5/5 de éxito sobre el caso
H1, **una sola huella en 5 corridas** —determinismo demostrable en vivo—, 1,87 s por corrida.
N = 5 sobre **un** caso, no sobre el expediente entero.

## 4. Desarrollador o proveedor · Govern

Desarrollado por el equipo participante durante la Hackatón, sobre andamiaje propio declarado en la
sección I.1 de la Declaración de Propiedad Intelectual. **No hay proveedor de servicio**: no se
contrata ni se consume ninguna API de terceros, y por tanto no hay procesador de datos externo.

Componentes de terceros utilizados, todos de ejecución local:

| Componente | Uso | Licencia |
|---|---|---|
| Node 24 | Motor de evidencia | ⏳ por confirmar en el anexo de licencias (B8) |
| `pdftotext` (Poppler) | Extracción de texto con maquetación | ⏳ por confirmar |
| Ollama | Servidor de inferencia local | ⏳ por confirmar |
| `qwen2.5:3b` | Lectura asistida; **se usa tal cual, sin entrenamiento ni ajuste fino** | ⏳ por confirmar |

Las cuatro licencias se identifican y se anexan antes del cierre. Declararlas es obligación de
[Reglas §8.7], y **omitir deliberadamente el uso de componentes de terceros es causal de
descalificación** [§11.11]: por eso figuran aquí aunque la verificación esté pendiente.

## 5. Datos utilizados y su fuente · Map

| Dato | Fuente | Naturaleza |
|---|---|---|
| Expediente CTD CORAZILIMAB — 5 PDF, 166 folios, 18 documentos | Entregado por el organizador el 26/08 a las 10:25 | **Ficticio**, construido para el evento |
| Acta No. 04 de 2026, Sala Especializada | Entregada por el organizador | Documento **público** de la autoridad |

**Datos personales tratados: ninguno.** El expediente es sintético y el acta es un documento público;
no se ingieren datos de pacientes identificados —CRF, listados de sujetos, narrativas de eventos
adversos— y esa frontera está declarada como disparador de reclasificación en
[../reference/clasificacion-riesgo.md](../reference/clasificacion-riesgo.md).

**Datos que no se usan, y por qué.** No se carga información institucional no autorizada [§11.4], no
se usa histórico de decisiones para predecir el sentido de una decisión —prohibido en la tabla de
usos no admisibles— y no se intenta reidentificar información anonimizada [§11.6], ni siquiera como
demostración. Todo el procesamiento ocurre en la máquina del evento: **el expediente no sale de la
máquina**, y eso se demuestra con el WiFi apagado.

## 6. Nivel de riesgo y justificación · Measure

**MEDIO.** Los seis criterios de [Reglas §6] evaluados uno por uno en
[../reference/clasificacion-riesgo.md](../reference/clasificacion-riesgo.md); los seis dan medio y la
clasificación final es la del mayor, como manda §6.

| Criterio | Nivel | Razón en una línea |
|---|---|---|
| Efecto sobre derechos | Medio | Apoya una decisión que sí afecta derechos; no produce ningún acto |
| Autonomía | Medio | Preclasifica y recomienda; no decide ni firma |
| Datos personales | Medio | Hoy ninguno; en despliegue real, datos del apoderado en M1 |
| Impacto en seguridad sanitaria | Medio | Indirecto: media la cadena completa de evaluación humana |
| Alcance | Medio | Colectivo determinado: los trámites de un grupo evaluador |
| Reversibilidad | Medio | El requerimiento del art. 94 se formula una sola vez |

**No es bajo:** preclasifica y recomienda sobre un trámite con efectos jurídicos. **No es alto hoy:**
no hay decisión automatizada, ni datos sensibles, ni irreversibilidad propia. Dos criterios se
elevaron a medio por la regla de la duda de §6, y en las dos fronteras cortas hacia alto —autonomía y
omisión— se aplican controles de nivel alto. Los **cinco disparadores de reclasificación** están
escritos por adelantado en el documento de clasificación, para que subir de nivel sea una regla y no
una discusión.

## 7. Riesgos para los derechos de las personas · Measure

| # | Riesgo | Por qué es real aquí |
|---|---|---|
| R1 | **Sesgo de automatización por omisión** | Un tramo marcado «sin hallazgos» que el evaluador deja de leer y escondía un defecto. Es el daño realista, no el falso positivo |
| R2 | **Requerimiento incompleto** | El art. 94 se formula una sola vez y consolidado: lo que nadie vio no obtiene segundo turno |
| R3 | **Sustitución de la decisión humana** | Si la acción sugerida se copiara sin leer la evidencia, la decisión la habría tomado la máquina — §11.2 y §11.3 |
| R4 | **Cita errónea que induce a error** | Medido, no hipotético: **7 de 13 citas del prototipo tenían el folio corrido y 3 estaban atribuidas a otro documento** antes de que existiera el auditor ([verificacion.md](verificacion.md) §3.16) |
| R5 | **Demora del trámite** | Un hallazgo espurio que provoca un requerimiento innecesario alarga el acceso del paciente |

Derechos afectados: debido proceso del solicitante, derecho a decisión humana (art. 7.1) y, de forma
diferida, el acceso de pacientes con hipertensión arterial pulmonar.

## 8. Riesgos para los datos personales y la seguridad de la información · Measure

| # | Riesgo | Estado |
|---|---|---|
| S1 | **Instrucciones maliciosas escondidas en el PDF** | Probado con un folio envenenado de seis órdenes: **6/6 señales detectadas, 0 afirmaciones del atacante llegaron a evidencia**, y se comprobó que el ataque sí llegó al modelo (§6.4) |
| S2 | **Fuga del expediente a un servicio externo** | Cerrado por arquitectura: sin red, inferencia local. Es además la exposición que §5.2 llama la más probable y la más fácil de evitar |
| S3 | **Datos del apoderado y del representante legal** (M1, despliegue real) | Personales no sensibles; hoy no se tratan. Frontera declarada |
| S4 | **Integridad del índice de folios** | Un índice alterado corrompe todas las anclas; `motor/auditar.mjs` re-ancla cada cita contra el PDF y falla ruidosamente |
| S5 | **Registro de trazabilidad incompleto** | Impedir la trazabilidad es causal de descalificación [§11.10]; el log encadenado por hash es pantalla del demo, no plomería |

**Alcance honesto de S1.** El folio envenenado es texto del expediente, así que sus frases **sí
anclan**: el anclaje solo no basta. Lo que las deja fuera es la regla de código que exige que la cita
hable del tema, más la revisión humana. La defensa es de capas y ninguna basta sola. Decir «el
sistema es inmune» sería falso.

## 9. Riesgos de sesgo, discriminación o inexactitud · Measure

**La inexactitud es el riesgo dominante, y está medida** ([verificacion.md](verificacion.md) §3.12,
§6.5). Tres fallos reproducidos del modelo pequeño, cada uno con su control en el punto 10:

1. Con extracción y huecos **en una sola llamada**, pasó por alto un "no adjunto" escrito en el texto.
2. Sin checklist explícita, **falso positivo consistente 3/3**: afirmó que faltaba algo que estaba.
3. Con la clasificación correcta 3/3, **citó mal el número de línea las tres veces**.
4. Con un módulo entero delante, **se saltó la fila que importaba** dentro de una tabla y devolvió dos
   citas con cifras inexistentes.

**Sesgo y discriminación.** La herramienta no decide sobre personas naturales ni las clasifica: no hay
puntaje de titular, ni ranking por solicitante, ni ninguna vista agregada por quién radica —eso sería
perfilamiento con efectos jurídicos [§11.7]—. Dos fuentes de sesgo sí quedan identificadas:

- **Sesgo de atención.** Ordenar la lectura por riesgo sanitario dirige dónde mira la persona. Control:
  el panel es orden de lectura, **no filtro**; no se oculta ningún folio.
- **Sesgo lingüístico y de formato.** El expediente está en español y el modelo es multilingüe de 3 mil
  millones de parámetros; el fallo 4 ocurre en tablas. Control: preselección por código y anclaje
  obligatorio — una cita que no ancla no se muestra.

**Lo que no se puede afirmar:** no hay tasa de falsos positivos ni de falsos negativos medida. Haría
falta un juego de expedientes anotados por evaluadores del INVIMA.

## 10. Medidas de mitigación y controles · Manage

| # | Control | Cubre | Estado y verificador |
|---|---|---|---|
| C1 | **Sin ancla, sin pantalla** — lo que no se puede anclar va a cola humana marcado | R4, R1 | Implementado · `anclar()` devuelve `encontrado: false` con motivo y la cita se descarta |
| C2 | **Sin veredicto** — hallazgo + evidencia + ubicación + acción sugerida; nunca "cumple / no cumple" | R3 | Implementado · no existe campo de veredicto; el índice global publicado se declara abajo |
| C3 | **El folio se lee del pie impreso**, y donde se calcula se dice que se calculó | R4 | Implementado · 159 leídos / 7 calculados y marcados (§6.1) |
| C4 | **Auditoría automática de todas las citas** contra el PDF | R4 | Implementado · `node motor/auditar.mjs`; destapó los 7 folios corridos |
| C5 | **El texto del expediente es dato, nunca instrucción** | S1 | Implementado · 6/6 detectadas, 0 en evidencia (§6.4) |
| C6 | **Inferencia local, sin red** | S2 | Implementado · demostrable con el WiFi apagado |
| C7 | **Determinismo** — temperatura 0 y semilla fija | Inexactitud | Implementado · una sola huella en 5 corridas (§6.3) |
| C8 | **Una tarea por llamada · checklist puesta por el sistema · el código preselecciona** | Inexactitud 1–4 | Implementado en el motor; la checklist queda ejercida en el caso demo ⏳ |
| C9 | **«Sin hallazgos» se rotula como *no se detectó contradicción entre los documentos cotejados***, jamás como *aprobado*; lo no analizado se marca «no analizado» | R1 | Comprometido |
| C10 | **Cada hallazgo declara sus limitaciones y su información faltante** — dos de los nueve campos | R2, R3 | Implementado |
| C11 | **Huella encadenada por hash**: qué entró, qué salió, quién revisó, qué cambió | S5, §11.10 | Pantalla del registro ⏳ pendiente al cierre |
| C12 | **Revisión humana del análisis precomputado** antes de publicarlo | R1, R4 | Implementado |

**Residuo declarado: el índice global de la cabecera.** La pantalla publica un porcentaje único
—«Índice de rigor»— ponderado por área. Es la pieza que más se acerca a la frontera de §4, porque un
número solo invita a leerse como calificación de cumplimiento. Se declara en vez de esconderse, con
lo que sí es cierto y es verificable en pantalla: no se rotula «cumple» ni «aprueba», califica
**documentos dentro de la revisión** y nunca el trámite, y **los factores que lo producen se muestran
desglosados** por área, módulo y documento —que es exactamente lo que §5.4 exige para que un número no
vaya solo—. ⚠️ Queda una decisión abierta antes del cierre de código: renombrarlo a lo que mide
—cobertura de la revisión— o retirarlo de la cabecera.

## 11. Mecanismo de supervisión y decisión humana · Govern

[Reglas §5.1] pide exactamente cuatro cosas: dónde interviene el funcionario, qué información recibe,
qué decisiones conserva y qué puede modificar. En ese orden:

| Momento | Qué recibe la persona | Qué puede hacer | Qué conserva siempre |
|---|---|---|---|
| **Antes** — publicación del análisis | El análisis precomputado completo, con sus anclas | Aceptar, corregir o descartar antes de que llegue al evaluador | La publicación no ocurre sin revisión |
| **Durante** — lectura del hallazgo | Los nueve campos: respuesta, evidencia, ubicación exacta, versión, confianza, contradicciones, información faltante, limitaciones y acción sugerida | Abrir el folio citado y cotejar; aceptar, corregir, rechazar o reordenar | Ningún folio queda fuera de su alcance: el orden no es filtro |
| **Después** — decisión | El expediente completo, más la huella de lo que el sistema hizo | Formular o no el requerimiento, con su propia motivación | **La motivación y la firma son suyas.** El sistema no redacta el acto |

**El sistema encuentra y señala; la persona decide y firma.** No hay ningún camino en el que una
salida llegue a un acto administrativo sin pasar por una persona que pudo abrir el folio y leerlo.

## 12. Mecanismo de revisión u objeción · Govern

**Frente al administrado.** Cada trámite apoyado por la herramienta genera un **aviso al
administrado** —texto en [aviso-administrado.md](aviso-administrado.md)— que dice en lenguaje llano
qué hizo la IA, qué revisó una persona y **cómo pedir revisión humana documentada**. Se genera desde
el sistema y queda en la huella; no es un PDF suelto. Lo exigen [Reglas §5.4] y el art. 7.1 de la
Resolución 2026025611, y §5.4 añade que no basta con presentar una puntuación o una recomendación sin
explicar los factores que la produjeron: por eso el aviso enumera los hallazgos con su folio.

**Frente al evaluador.** Un hallazgo que la persona rechaza queda registrado con quién lo rechazó y
por qué. El rechazo es dato de mejora, no ruido que se borra.

**Frente al equipo.** Los cinco disparadores de reclasificación a riesgo alto obligan a rehacer esta
EIA **antes** de seguir usando la herramienta. La versión de este documento y la del análisis
publicado se citan juntas, para que una objeción sepa a qué versión se refiere.

---

## Lo que esta EIA no afirma

Cuatro huecos declarados, porque un documento de impacto que no tiene ninguno no se está mirando de
verdad:

1. **La fiabilidad es 5/5 sobre un caso**, no sobre el expediente. N = 5.
2. **No hay tasa de falsos positivos ni negativos.** Requiere expedientes anotados por evaluadores.
3. **El muestreo de auditoría a ciegas** contra el sesgo de automatización está definido como control,
   no ejecutado.
4. **La huella no está enganchada** a un sistema de gestión documental real. La aplicación estática no
   puede hacerlo y no debe simularlo.

## Trazabilidad de este documento

| Punto de §7 | Fuente de lo que afirma |
|---|---|
| 3, 6.3, 6.4 | Mediciones en [verificacion.md](verificacion.md) §6 |
| 6 | [../reference/clasificacion-riesgo.md](../reference/clasificacion-riesgo.md), seis criterios de §6 |
| 9 | Mediciones en [verificacion.md](verificacion.md) §3.12 y §6.5 |
| 4 | Declaración de PI, sección I; licencias ⏳ pendientes de anexo |
| 12 | [aviso-administrado.md](aviso-administrado.md) |
