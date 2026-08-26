# Hackatón INVIMA del Futuro — Genera Summit 2026

Preparación para la Hackatón INVIMA del **26 de agosto de 2026**, **Ágora Bogotá, 8:00 a.m. – 5:00
p.m.**, con computador propio. Dentro del Genera Summit 2026 de MenteX, en la Hackaton House de GoFest.

El reto: diseñar soluciones de IA que mejoren la eficiencia, oportunidad, trazabilidad y gestión del
riesgo en los procesos del INVIMA — **como apoyo a la función administrativa, nunca como sustituto de
la decisión del servidor público**.

Este repositorio contiene **solo documentación**: investigación, análisis y especificación. No hay
código.

## Empieza aquí

| Si quieres… | Abre |
|---|---|
| **Ver el dataset del día y sus contradicciones** | [descubrimientos/dataset-corazilimab.md](descubrimientos/dataset-corazilimab.md) |
| Entender el reto y las reglas reales | [descubrimientos/reto-invima-2026.md](descubrimientos/reto-invima-2026.md) |
| Ver las ideas y cuál conviene | [descubrimientos/brainstorming.md](descubrimientos/brainstorming.md) |
| Saber qué te puede descalificar | [descubrimientos/riesgos.md](descubrimientos/riesgos.md) |
| Saber contra quién compites | [descubrimientos/competencia.md](descubrimientos/competencia.md) |
| Saber con qué herramientas construir | [descubrimientos/stack-google.md](descubrimientos/stack-google.md) |
| Saber qué skills y CLIs de agente aplican | [descubrimientos/toolchain-agente.md](descubrimientos/toolchain-agente.md) |
| Saber cómo se va a trabajar | [descubrimientos/metodologia-sdd.md](descubrimientos/metodologia-sdd.md) |
| Ver qué hay que hacer y cuándo | [docs/plan.md](docs/plan.md) |
| Ver el estado y las decisiones tomadas | [docs/memoria.md](docs/memoria.md) |
| Ver qué está verificado y qué falta | [docs/verificacion.md](docs/verificacion.md) |

## Estado — 26 de agosto, día del evento

**El dataset ya llegó** (10:25 a.m.): un expediente CTD ficticio de 166 páginas, **CORAZILIMAB**
(anticuerpo monoclonal anti-ALK-1 para hipertensión arterial pulmonar), más un **acta real** de Sala
Especializada con 64 productos. Trae **contradicciones plantadas y verificadas** entre módulos.
Todo el análisis está en
[descubrimientos/dataset-corazilimab.md](descubrimientos/dataset-corazilimab.md).

Los trámites de entrada (invitación de Calendar, Declaración de PI firmada a `jdvargas@mentex.co`)
tenían plazo antes del inicio del evento — bloque B0 de [docs/plan.md](docs/plan.md).

WiFi de la sede: **GOHACKIA** / **GOHACK26**.

## Las cuatro cosas que hay que tener claras

1. **Hay una etapa eliminatoria antes del puntaje.** Una propuesta brillante que cruce una línea
   prohibida no se evalúa. Las tres trampas más fáciles de pisar están en
   [descubrimientos/riesgos.md](descubrimientos/riesgos.md) §A.
2. **Cerca de la mitad del puntaje no se gana con el demo.** Confiabilidad 20 % + Seguridad 15 % +
   Cumplimiento legal (10 % o 15 %) = 45–50 %, y se gana con documentos: la clasificación de riesgo y
   la Evaluación de Impacto Algorítmico.
3. ⚠️ **La rúbrica oficial y la de la presentación de hoy no coinciden.** Escalabilidad y
   Cumplimiento legal están intercambiados (10 %/15 % contra 15 %/10 %). Hay que preguntarlo al
   mentor; mientras tanto se defienden **ambos como 15 %**. Detalle en
   [descubrimientos/dataset-corazilimab.md](descubrimientos/dataset-corazilimab.md) §2.
4. **Hay que declarar pista: A o B.** A = escalar la comprensión humana del expediente.
   B = habilitar flujos autónomos de bajo riesgo. Son las dos únicas aprobadas.

Y dos más, del cierre del 24:

4. El correo anuncia un enfoque de "agentes de IA y herramientas de bioinformática", pero **la tabla
   de usos elegibles de las reglas no tiene ninguna fila de bioinformática**. El puente defendible
   está en [descubrimientos/stack-google.md](descubrimientos/stack-google.md) §2.3.
5. **La inferencia local ya corre en tu máquina.** Ollama está instalado con `qwen2.5:3b`, que cabe
   entero en los 4 GB de la RTX 3050 Ti. Eso convierte *"el expediente no sale de la máquina"* en un
   hecho de arquitectura, que vale Seguridad 15 % + Cumplimiento 15 %
   ([descubrimientos/toolchain-agente.md](descubrimientos/toolchain-agente.md) §6).

## Fuentes primarias en esta carpeta

Del día del evento (26 de agosto, 10:25 a.m.):

- `01_Ficha_visual_Dossier_Regulatorio_Hackathon_INVIMA.pdf` — anatomía del dossier y **contrato de
  una IA regulatoria asistiva** (los cinco controles no negociables y la salida mínima obligatoria)
- `02_Anexo_tecnico_Dossier_Medicamento_Nuevo_Hackathon_INVIMA.pdf` — proceso regulatorio de extremo
  a extremo y modelo mínimo del objeto documental
- `Modulo 1…5_*.pdf` — el expediente CORAZILIMAB, 166 páginas
- `Acta No. 04 de 2026 SEMPB Primera parte_copia.pdf` — acta real de Sala Especializada
- `Presentación de la jornada.pptx.pdf` — agenda, pistas A/B, rúbrica y reglas de uso de IA

Previas:

- `Reglas de juego Hackaton Invima-2.md` — reglamento oficial del reto
- `Declaracion_Propiedad_Intelectual_Hackaton_INVIMA.md` — declaración a firmar y enviar
- `Confirma tu participación y conoce el reto.md` — correo del organizador
- `Ecosistema de Google para Desarrolladores Cientificos.md` — insumo técnico oficial

La investigación previa del 28–29 de julio quedó absorbida en
[descubrimientos/reto-invima-2026.md](descubrimientos/reto-invima-2026.md) §6 — ficha del evento,
patrocinadores, quién evalúa dentro del INVIMA, la estructura CTD del expediente y los precedentes
técnicos. Lo que contradecía a las reglas está corregido y fechado en
[docs/verificacion.md](docs/verificacion.md) §3.
# actty
