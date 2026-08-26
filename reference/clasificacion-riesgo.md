# Clasificación preliminar del nivel de riesgo

**Solución:** Cockpit del evaluador — expediente CTD preclasificado, hallazgos con folio, tramos ya
conceptuados. **Marco:** Reglas de juego §6. **Fecha:** 26 de agosto de 2026. **Versión:** 1.0.

## Nivel global asignado: MEDIO

Seis criterios evaluados, los seis en nivel medio. Regla de §6: la clasificación final corresponde
**al nivel de mayor riesgo identificado**. Ningún criterio alcanza el umbral de alto — y **dos que un
análisis complaciente habría dejado en bajo se elevaron a medio** aplicando la segunda regla de §6:
en caso de duda entre dos niveles, se elige el de mayor exigencia.

§6 también dice que la clasificación como riesgo alto no excluye la propuesta: cambia el nivel de
controles exigidos. Aquí ocurre lo simétrico — declararse medio no baja la guardia: en las dos
fronteras donde la distancia hacia alto es corta (autonomía y omisión) se aplican controles de alto.

## Qué se clasifica exactamente

Aplicación web estática que muestra, sobre un expediente CTD ya radicado: (a) cada documento
preclasificado en **Conforme / Subsanable / Omisión / No aportado**; (b) los **hallazgos de
contradicción entre módulos** con su texto literal y folio exacto; (c) los **tramos que ya tienen
concepto favorable o precedente de Sala**, para no reevaluarlos.

Cuatro hechos de arquitectura que condicionan toda la clasificación:

1. El análisis se **precomputa fuera de línea** y queda en `datos.js`, revisado por una persona antes
   de publicarse.
2. La aplicación **no hace llamadas de red** y no envía el expediente a ningún servicio externo: se
   abre con `file://` y funciona con el WiFi apagado.
3. **No hay inferencia en vivo.** Misma entrada → misma salida, byte a byte.
4. **Nunca emite «cumple / no cumple»** como salida final: produce hallazgo + evidencia + ubicación +
   acción sugerida. El evaluador decide.

## Resumen de los seis criterios

| Criterio (§6)                          | Nivel | Razón en una línea                                      |
| -------------------------------------- | ----- | ------------------------------------------------------- |
| Efecto sobre derechos                  | Medio | Apoyo a una decisión que sí afecta derechos             |
| Autonomía                              | Medio | Preclasifica y recomienda; no decide ni firma           |
| Datos personales                       | Medio | Hoy ninguno; en despliegue real, datos del apoderado    |
| Impacto en seguridad sanitaria         | Medio | Indirecto: toda la cadena humana media entre uso y daño |
| Alcance                                | Medio | Colectivo determinado: trámites de un grupo evaluador   |
| Reversibilidad                         | Medio | El requerimiento del art. 94 se formula una sola vez    |

## Detalle por criterio

### 1. Efecto sobre derechos — MEDIO

La salida alimenta un acto administrativo (requerimiento o concepto) que afecta derechos del
solicitante y, de forma diferida, el acceso de pacientes con HAP. Pero la herramienta no produce
ningún acto ni veredicto: su unidad de salida es hallazgo + evidencia + ubicación + acción sugerida.
Eso es literalmente la definición de medio en §6: *apoyo a decisiones con validación humana*. Se
ubica en el borde superior del nivel porque una acción sugerida puede convertirse en requerimiento.

**Control.** La salida no contiene veredicto ni puntaje de aprobabilidad. Los estados Conforme /
Subsanable / Omisión / No aportado califican **el documento dentro de la revisión**, nunca el
trámite; el estado del trámite lo fija la persona. Cada hallazgo trae un campo `limitaciones` que
declara qué **no** juzga el sistema (H5: la valoración beneficio-riesgo queda fuera de alcance).
**Estado:** implementado — verificable en `prototipo/datos.js`; no existe ningún campo de veredicto.

### 2. Autonomía — MEDIO

La herramienta no se limita a mostrar datos: preclasifica documentos y propone una acción concreta
(«requerir CRZ-HAP-501 o restringir la indicación a adultos»). Bajo §6 eso es *recomendación sujeta a
validación*, no *apoyo informativo*. Llamarlo bajo porque la aplicación es HTML estático sería
confundir la implementación con la función, y es exactamente el error que §9 penaliza. Alto queda
excluido por construcción: no hay decisión automatizada, no se emite acto, no se escribe nada en el
expediente.

**Control.** (a) Toda recomendación aparece junto a su evidencia literal y su folio, nunca sola.
(b) Los pesos internos (legal 0,25 · calidad 0,45 · farmacología 0,30) ordenan la carga de revisión;
**no se publica un porcentaje global de cumplimiento ni de aprobabilidad** — es el residuo de riesgo
más visible de esta pieza y por eso se declara. (c) La acción se redacta como requerimiento
*propuesto*. **Estado:** (a) y (c) implementados; (b) comprometido y verificable en la entrega.

### 3. Datos personales — MEDIO (por regla de duda)

Hoy el prototipo procesa un expediente sintético y un acta pública: no hay datos de pacientes
identificados y las cifras de exposición son agregadas. Con ese alcance el criterio sería bajo. Pero
la función está diseñada para expedientes reales, cuyo Módulo 1 lleva datos de identificación del
apoderado y del representante legal — datos personales no sensibles. §6 obliga al nivel de mayor
exigencia ante la duda: **medio**.

**Control.** Frontera declarada: la herramienta **no ingiere datos de pacientes identificados** —
CRF, listados de sujetos, narrativas de eventos adversos. Si alguna vez los ingiriera, este criterio
pasa a alto y con él la clasificación global. Sin red, el dato no sale de la máquina. Intentar
reidentificar información anonimizada está prohibido (§11.6) y no se hace ni como demostración.
**Estado:** implementado en el prototipo (`datos.js` no contiene datos personales) + frontera
comprometida para despliegue.

### 4. Impacto en seguridad sanitaria o salud pública — MEDIO (indirecto)

El objeto es la evaluación previa a la comercialización de un biológico para hipertensión arterial
pulmonar. El daño realista no es un falso positivo: es **la omisión** — un tramo marcado «sin
hallazgos» que el evaluador deja de leer y que escondía un defecto. Hubo duda genuina entre indirecto
y directo; se resuelve en indirecto por una razón concreta: la herramienta **nunca retira folios del
alcance del evaluador**, y entre su salida y cualquier efecto sanitario está la cadena completa de
evaluación humana y la Sala Especializada.

**Control** — el más reforzado del documento, porque aquí está la pieza peligrosa:

- El panel de tramos ya cotejados es **orden de lectura, no filtro**: no oculta ningún folio.
- Cada tramo declara **qué se comparó** y **por qué** se marcó coherente (campos `detalle` y `razon`).
- «Sin hallazgos» se rotula como *no se detectó contradicción entre los documentos cotejados*, jamás
  como *aprobado*.
- Un documento cuya extracción falle o quede con baja confianza se marca **«no analizado»**, nunca
  «sin hallazgos».

**Estado:** los dos primeros implementados; los dos últimos comprometidos.

### 5. Alcance — MEDIO (colectivo determinado)

El prototipo opera sobre un expediente. La función está pensada para la cola de trámites de registro
sanitario asignados a un grupo evaluador; los afectados —solicitantes y pacientes en espera— son un
colectivo determinado e identificable, no una masa indeterminada. No se opera sobre datos
poblacionales ni sobre el público general, lo que excluye el nivel alto.

**Control.** Prohibición expresa de vistas agregadas **por titular o por solicitante**: cualquier
ranking por quién radica es perfilamiento con efectos jurídicos (§4, usos no admisibles; §11.7). La
agrupación admitida es por trámite y por riesgo sanitario. **Estado:** comprometido — hoy no existe
ninguna vista por titular en `datos.js`, y esa ausencia es una decisión de diseño, no un pendiente.

### 6. Reversibilidad — MEDIO (difícilmente reversible)

Lo que la herramienta produce es reversible en sí mismo: los hallazgos se descartan, el archivo está
versionado y nada se escribe en el expediente. La consecuencia no siempre lo es. El requerimiento del
art. 94 del Decreto 2106 de 2019 se formula **una sola vez y consolidado**: un hallazgo que la
herramienta no vio y la persona tampoco no obtiene un segundo requerimiento. Marcar «reversible»
sería mirar solo el software y no el procedimiento en el que se inserta.

**Control.** La revisión humana de `datos.js` antes de publicarlo y la regla dura de cita —sin folio
verificable no se muestra la afirmación— actúan antes de que un error llegue al requerimiento. Además
la pantalla dice **qué no revisó**: los campos `faltante` y `limitaciones` existen para que la persona
complete el requerimiento con su propio criterio. **Estado:** implementado.

## Por qué no es bajo, y por qué todavía no es alto

**No es bajo.** Preclasifica y recomienda sobre un trámite con efectos jurídicos. Clasificarse bajo
para parecer inofensivo se lee como error de análisis, y §9 es explícito: el nivel de riesgo no se
evalúa como algo negativo en sí mismo; lo que se evalúa es si el equipo **clasificó correctamente** y
diseñó controles proporcionales.

**No es alto hoy.** Ninguno de los seis umbrales de alto se alcanza: no hay decisión automatizada, no
hay datos sensibles ni biométricos ni de NNA, el impacto sanitario está mediado por la cadena humana
completa, el alcance es un colectivo determinado y nada es irreversible por sí mismo.

## Disparadores de reclasificación a ALTO

Si ocurre cualquiera de estos, la clasificación sube y se rehace la EIA antes de seguir usando la
herramienta. Se declaran por adelantado para que el ascenso sea una regla, no una discusión.

| Disparador                                                     | Criterio que sube      |
| -------------------------------------------------------------- | ---------------------- |
| Ingerir datos de salud individuales o pacientes identificados  | Datos personales       |
| Generar borrador de motivación del acto                        | Autonomía / derechos   |
| Conectar inferencia en vivo en el momento de la consulta       | Autonomía / seguridad  |
| Agregar información entre expedientes por titular              | Alcance / derechos     |
| Usar la salida para ordenar reparto con efecto sobre términos  | Efecto sobre derechos  |

Tres de ellos son además causales de descalificación si se hacen sin control: sustituir la motivación
sin validación humana evidente (§11.3), perfilar titulares (§11.7) y usar resultados de IA sin
mecanismo de verificación (§11.8). Entrenar con el histórico para predecir el sentido de la decisión
no aparece en la tabla porque no es un ascenso de nivel: está prohibido y no se hace.

## Qué falta para afirmar más

- **Tasa de error medida.** No se ha cuantificado falsos positivos ni negativos. Haría falta un juego
  de expedientes anotados por evaluadores del INVIMA para afirmar exactitud con número.
- **Muestreo de auditoría a ciegas** contra el sesgo de automatización: definido como control, no
  ejecutado.
- **Enganche de trazabilidad** con el sistema de gestión documental, para registrar quién revisó y
  qué decidió. La aplicación estática no puede hacerlo y no debe simularlo.
