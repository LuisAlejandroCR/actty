# pitch.md — Cockpit del evaluador · 3 minutos · 26 de agosto de 2026, 15:30

Guion cronometrado, momento del demo, respuestas al jurado adversario y vocabulario prohibido.
Base: [../descubrimientos/dataset-corazilimab.md](../descubrimientos/dataset-corazilimab.md) ·
[../prototipo/datos.js](../prototipo/datos.js) ·
[../descubrimientos/competencia.md](../descubrimientos/competencia.md) ·
[../descubrimientos/reto-invima-2026.md](../descubrimientos/reto-invima-2026.md) §4.2.

**Regla de oro del día:** el prototipo no aprueba, no rechaza, no califica cumplimiento y no decide.
Localiza, cita y ordena la lectura. Ver §4 antes de subir a tarima.

---

## 1. Guion de 3 minutos

Ritmo objetivo: 448 palabras en 180 s, 2,5 por segundo. Los silencios del bloque 3 son los clics.
Lo que va en `>` se dice en voz alta, tal cual.

### 0:00 – 0:25 · Gancho (25 s · 64 palabras)

**Pantalla:** portada con una sola línea — *Expediente 2026-REG-CRZ-001784 · 166 folios*.

> Nueve comisionados, a tiempo parcial, sostienen la evaluación farmacológica de todo el país.
> Hoy están estudiando expedientes radicados a finales de 2024, y la norma les da nueve meses por
> trámite. No es un problema de voluntad ni de criterio técnico: es un problema de folios por hora.
> Cada expediente trae cientos de páginas y tres grupos evaluadores que no se ven entre sí.

### 0:25 – 0:45 · Qué es (20 s · 52 palabras)

**Pantalla:** árbol del expediente, 18 documentos presentes y 3 declarados que no están.

> Esto es un cockpit para el evaluador. Toma el expediente de CORAZILIMAB —ciento sesenta y seis
> folios, cinco módulos— y lo preclasifica documento por documento. No lo resume: lo localiza.
> Señala dónde un módulo dice una cosa y otro dice la contraria, con la cita textual y el folio
> exacto. Miren esta.

### 0:45 – 1:25 · El demo (40 s · 106 palabras)

**Pantalla:** hallazgo H1, con los cinco pasajes de evidencia y el precedente P1 al lado.
Coreografía clic por clic en §2.

> Hallazgo uno. Folio cuarenta y seis: la indicación pide adultos y adolescentes desde los doce
> años. Un clic: folio ciento cincuenta y ocho, el pivotal, no se incluyó a menores de dieciocho.
> Folio ciento sesenta y tres: el plan de riesgos lo reconoce como información faltante. Y el
> estudio que sostendría esa población no está en el expediente.
>
> El contraste es público. Acta cuatro de 2026: la Sala aprobó EVKEEZA, el mismo tipo de anticuerpo,
> con indicación pediátrica, porque presentó un pivotal que sí enroló a esos pacientes.
> Mismo estándar. Dos resultados.
>
> Nadie decidió nada: el sistema puso los dos textos uno al lado del otro.

### 1:25 – 1:50 · Lo que no hay que volver a leer (25 s · 60 palabras)

**Pantalla:** vista de tramos sin hallazgos, con el contador de folios.

> El otro lado vale igual. Sesenta y siete de los ciento sesenta y seis folios quedan marcados sin
> divergencias entre el resumen y el detalle: sustancia activa, estabilidad, lotes, toxicología a
> dosis repetida. Ahí la lectura se puede muestrear en vez de rehacerse. Y la consulta de
> precedentes que hoy toma una tarde ya está resuelta, con acta y numeral.

### 1:50 – 2:15 · Por qué es creíble (25 s · 60 palabras)

**Pantalla:** ficha de un hallazgo con los nueve campos visibles; indicador de red en cero.

> Tres decisiones de ingeniería, rápido. Una: cada afirmación trae los nueve campos que exige su
> ficha visual —evidencia, ubicación, versión, confianza, contradicciones, faltantes, limitaciones—.
> Si no puede citar folio, no se muestra. Dos: el expediente no sale de la máquina. Esto corre con
> el WiFi apagado y lo pueden comprobar ahora. Tres: la misma entrada da la misma salida, siempre.

### 2:15 – 2:40 · Quién firma (25 s · 59 palabras)

**Pantalla:** registro de revisión — qué entró, qué salió, quién aceptó o corrigió.

> Dónde interviene la persona: en todo. El sistema no aprueba, no rechaza y no califica
> cumplimiento. Localiza y cita; el evaluador acepta, corrige o descarta cada hallazgo, y esa
> decisión queda en el registro con su nombre. Traemos además la clasificación de riesgo, la
> evaluación de impacto algorítmico y el aviso al administrado que pide el artículo 7.1.

### 2:40 – 3:00 · Cierre (20 s · 47 palabras)

**Pantalla:** el hallazgo H1 otra vez, con el folio 46 abierto al lado del 158.

> No les estamos pidiendo que confíen en un modelo. Les estamos pidiendo que abran el expediente en
> el folio que el sistema señala y comprueben si dice lo que decimos que dice. Eso es lo que le
> faltó a Elsa, la herramienta interna de la FDA. Gracias.

### Hueco por llenar antes de subir

Si el baseline manual quedó cronometrado en la mañana, reemplazar la última frase del bloque
0:25–0:45 por: *«Esa contradicción, buscada a mano, nos tomó ‹X› minutos esta mañana; aquí aparece
al abrir el expediente.»* Si nadie lo cronometró con testigo, **no se dice ningún número**: un
número inventado en Impacto (25 %) se cae con una sola repregunta.

---

## 2. El momento del demo, clic por clic

Cuarenta segundos. Cinco clics, ni uno más. Ensayarlo hasta que salga sin mirar el teclado.

1. **0:45 — abrir el hallazgo H1.** Queda el título y la respuesta en una línea.
   Se dice: «Hallazgo uno. Folio cuarenta y seis…»
2. **0:52 — evidencia 1, `M2-05-CO` folio 46.** Cita literal de la indicación ≥12 años.
   Se dice: «…la indicación pide adultos y adolescentes desde los doce años.»
3. **0:58 — evidencia 2, `M5-03-PIVOTAL` folio 158.** «No se incluyeron adolescentes ni niños».
   Se dice: «Un clic, y salta al folio ciento cincuenta y ocho del pivotal.»
4. **1:06 — evidencias 4 y 5, folios 163 y 165.** PGR con información faltante y extensión a 2028.
   Se dice: «lo reconoce como información faltante.»
5. **1:12 — precedente P1, EVKEEZA.** Acta No. 04 de 2026, numeral 3.1.2.2, al lado del hallazgo.
   Se dice: «El contraste es público…»

**Por qué este hallazgo y no otro.** Es un cruce Módulo 2 ↔ Módulo 5 que hoy hacen dos grupos
distintos que no ven el documento del otro. No requiere criterio farmacológico para entenderlo:
un texto pide una población y el otro dice que la excluyó. Y se sostiene solo, con cinco pasajes
independientes en dos módulos.

**Por qué el precedente remata.** EVKEEZA (evinacumab) es anticuerpo monoclonal recombinante,
150 mg/mL, misma vía de evaluación farmacológica, y la Sala le aprobó indicación desde los cinco
años **porque presentó el estudio NCT03399786 identificado, que enroló esa población**. No es
opinión nuestra: es el Acta No. 04 de 2026 SEMPB, numeral 3.1.2.2, documento público. El sistema no
concluye nada de ahí; pone el concepto de la Sala al alcance del evaluador para que él compare.

**Frase de seguridad, si el jurado se tensa:** «El precedente no es una regla que apliquemos
nosotros; es lo que la Sala ya escribió, puesto donde el evaluador lo pueda leer.»

**Degradación.** Si la pantalla no responde: el video de respaldo lleva los mismos cinco clics y el
guion no cambia una palabra. Si falla también el video, se cuenta con el PDF del Módulo 5 abierto en
el folio 158 — el argumento vive en el expediente, no en la app.

---

## 3. Jurado adversario — ocho preguntas y su respuesta

Respuestas de 2–3 frases. Se contestan mirando a quien pregunta, sin volver a la pantalla.

**1. ¿Esto no está decidiendo por el evaluador?**
No emite ninguna salida decisoria: entrega hallazgo, evidencia, ubicación exacta y una acción
sugerida de trámite, nunca de fondo. Lo que es juicio —beneficio-riesgo, suficiencia probatoria,
aceptar una indicación— está fuera de alcance por diseño y así aparece escrito en cada ficha.
El hallazgo H5 es el ejemplo: lo marca para revisión humana y se abstiene de valorarlo.

**2. ¿Y si alucina?**
El ancla no la produce el modelo, la calcula el código: el modelo cita el texto literal y el folio
sale de buscar esa cadena en el PDF. Si una afirmación no se puede anclar, no se muestra, va a cola
humana. Lo medimos: preguntándole «qué falta» sin checklist, un modelo local inventó un faltante
inexistente tres de tres veces; por eso la checklist la pone el sistema, nunca el modelo.

**3. ¿Por qué no usaron un LLM en vivo?**
Porque el análisis está precomputado y lo decimos en pantalla: se extrajo fuera de línea y **una
persona lo revisó antes de cargarlo**. Generar en vivo delante de ustedes agregaría una modalidad
de fallo sin agregar una sola evidencia nueva. Lo que congelamos es la salida, no el método: la
misma extracción corre en local, sobre modelo abierto, y es determinista a temperatura cero.

**4. ¿Cuánto cuesta operar esto?**
La aplicación es estática, sin llamadas de red: corre en el portátil del evaluador, sin servidor y
sin licencia por token. La capa de extracción usa un modelo abierto de 3B que ya medimos en una GPU
de 4 GB a 30,8 tokens por segundo, así que el costo marginal por expediente es electricidad.
El gasto real está en la ingesta con OCR y en el tiempo humano de revisión, no en la inferencia.

**5. ¿Esto ya existe, no?**
Existe del lado de quien radica: Veeva, ArisGlobal, Certara, Weave Bio le venden al titular que
prepara el dossier. Del lado de quien evalúa, el referente más avanzado es Elsa, de la FDA, y es
conocida públicamente por citas falsas. El hueco es exactamente ese: nadie le entrega al evaluador
hallazgos anclados a folio, y esa ancla es lo que exige el marco colombiano.

**6. ¿Qué pasa con un expediente que no sea este?**
La estructura es ICH M4: los mismos cinco módulos y la misma pregunta por módulo en todos los
dossieres. Las reglas de cruce son genéricas —indicación contra población estudiada, estudios
declarados contra estudios aportados, titular del certificado contra fabricante declarado— y son
justo los cruces que hoy se hacen a ojo entre grupos. El límite honesto: lo validamos sobre un
expediente de 166 folios; el siguiente paso es una decena, con un evaluador midiendo falsos
positivos.

**7. ¿Qué resuelve su trazabilidad que no resuelva un log firmado digitalmente?**
Un log firmado prueba qué hizo el sistema; no le permite al evaluador verificar lo que el sistema
afirma. Nosotros anclamos cada afirmación a módulo, documento, versión, folio y fragmento, para que
una persona reabra el PDF en esa página y pueda contradecirnos. Se necesitan las dos cosas: el log
sirve para auditar después, el ancla sirve para evaluar ahora.

**8. ¿Cómo evitan que esto termine perfilando titulares?**
No existe ninguna variable sobre quién radica, y no se entrena nada con el histórico de decisiones:
está expresamente prohibido y es la línea que descalifica. La priorización, si algún día se
incorpora, va por trámite y riesgo sanitario, que son los criterios del artículo 4 de la Resolución.
La búsqueda de precedentes devuelve documentos para leer, jamás un pronóstico del sentido.

**Preguntas de reserva** (por si el jurado va por otro lado): dónde firma exactamente el funcionario
y qué puede cambiar antes de firmar; qué dato sale del entorno autorizado y hacia dónde; y cómo se
entera el administrado de que hubo apoyo de IA. Las tres están contestadas en la EIA y en el aviso
al administrado que se entregan con el prototipo.

---

## 4. Frases que no se pueden decir

Calificar cumplimiento como salida final, decidir o predecir el sentido de una decisión son causales
de **descalificación antes del puntaje**, no penalizaciones. Un verbo mal elegido en tarima vale lo
mismo que haberlo programado.

- **aprobar** · «este expediente es aprobable» — decisión reservada al funcionario.
  → «el expediente contiene / no contiene».
- **rechazar, negar, objetar** — ídem, y además insinúa sanción.
  → «requiere aclaración», «requiere el estudio CRZ-HAP-501».
- **cumple / no cumple · apto / no apto** — es calificar cumplimiento como salida final.
  → «hallazgo que requiere revisión».
- **calificar, puntuar,** «85 % de cumplimiento» — un puntaje global es el veredicto con otra ropa.
  → «cinco hallazgos, tres de ellos críticos».
- **decidir, dictaminar, conceptuar, resolver** — sustituye el acto administrativo.
  → «localiza y cita; la decisión la firma el evaluador».
- **validar, certificar, avalar, garantizar** — atribuye al sistema una fe que no tiene.
  → «coteja», «contrasta contra», «verifica que el texto coincida».
- **predecir, anticipar el sentido,** «probabilidad de aprobación» — prohibición expresa del uso del
  histórico. → no hay reemplazo: no se menciona.
- **detectar incumplimiento / fraude / irregularidad** — imputa conducta; roza sanción y perfil.
  → «divergencia entre módulos», «dato no verificable con lo aportado».
- **«la IA concluye que…»** — convierte una extracción en juicio.
  → «el expediente dice, en el folio 46, que…».
- **«automatiza la evaluación»** — contradice el artículo 7.1 en tres palabras.
  → «preclasifica y ordena la lectura».
- **«semáforo verde / rojo»** — lenguaje de veredicto, aunque el dato de atrás sea correcto.
  → «estado de revisión: sin hallazgos / a subsanar / omisión / no aportado».
- **perfilar,** «este laboratorio suele radicar incompleto» — perfilamiento con efectos jurídicos.
  → nada sobre el titular: se habla del trámite.

**Tres trampas dentro de nuestra propia pantalla**

1. El estado `Conforme` del árbol se lee en voz alta como **«sin hallazgos en el cotejo»**. En
   pantalla es una etiqueta de consistencia documental; dicho en voz alta suena a «cumple».
2. La vista de tramos ya revisados nunca se llama «ya aprobado». Se dice **«sin divergencias
   detectadas»** o **«con precedente de Sala disponible»**, según la fila.
3. Los pesos internos por área (legal, calidad, farmacología) **no se muestran ni se mencionan como
   puntaje del expediente**. Si alguien pregunta, son un orden de lectura, no una nota.

**Prueba de bolsillo antes de hablar:** si la frase se puede escribir en una resolución sin cambiar
una palabra, está prohibida.
