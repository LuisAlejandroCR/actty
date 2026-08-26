**Reglas de juego — Hackatón INVIMA del Futuro**

1. **Presentación**

La Hackatón INVIMA del Futuro busca promover el desarrollo colaborativo de soluciones y prototipos que permitan aprovechar herramientas de inteligencia artificial para apoyar y optimizar procesos institucionales, particularmente actividades de clasificación, priorización, seguimiento, análisis, organización y gestión de información.

El uso de inteligencia artificial deberá entenderse en todo momento como herramienta de apoyo a la función administrativa y no como sustituto de la competencia, el juicio técnico o jurídico ni de la decisión de los servidores públicos del INVIMA.

1. **Objetivo de la Hackaton**

Diseñar y desarrollar soluciones basadas en inteligencia artificial que contribuyan a mejorar la eficiencia, oportunidad, trazabilidad y gestión del riesgo en los procesos del INVIMA, bajo condiciones de uso seguro, ético, transparente y responsable. Las propuestas deberán demostrar no solamente su utilidad técnica, sino también la forma en que gestionan los riesgos asociados al uso de inteligencia artificial y garantizan la supervisión y decisión humana.

1. **Principio Rector:**

El art. 7.1 de la Resolución 2026025611 (<https://www.invima.gov.co/biblioteca/resolucion-2026025611-de-21-mayo-2026-plan-contingencia-de-medicamentos_pdf>) prohíbe expresamente usar IA para sustituir la decisión administrativa. Toda propuesta que cruce esa línea queda descalificada de entrada, por buena que sea técnicamente. En consecuencia, toda solución deberá identificar de manera clara:

- Qué actividades realiza la herramienta de IA;
- Qué resultados, recomendaciones o alertas genera;
- En qué momento interviene el servidor público;
- Qué información puede revisar, corregir, aceptar o rechazar; y
- Quién conserva la responsabilidad por la decisión final.

1. **Retos y usos de la inteligencia artificial**

Las soluciones podrán ubicarse en diferentes niveles de riesgo. Una solución de riesgo alto no está automáticamente prohibida; deberá incorporar controles más estrictos. Lo que sí estará prohibido es que la IA adopte autónomamente decisiones administrativas definitivas o sustituya la motivación que corresponde al funcionario competente.

&nbsp;

| **USOS ELEGIBLES**                                                            | **USOS NO ADMISIBLES**                                                                                                                                    |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clasificación y priorización de trámites como herramienta de apoyo            | Adoptar automáticamente decisiones administrativas definitivas                                                                                            |
| ---                                                                           | ---                                                                                                                                                       |
| Detección de expedientes incompletos antes del reparto                        | Emitir o firmar el acto administrativo                                                                                                                    |
| ---                                                                           | ---                                                                                                                                                       |
| Extracción estructurada de dossieres (CTD, BPM, certificados)                 | Sustituir la motivación técnica o jurídica del acto administrativo. Generar la motivación técnica sin evaluador que la valide                             |
| ---                                                                           | ---                                                                                                                                                       |
| Comparación de un dossier contra decisiones de agencias de referencia         | Determinar automáticamente sanciones, suspensiones u otras consecuencias jurídicas. Calificar cumplimiento/incumplimiento de requisitos como salida final |
| ---                                                                           | ---                                                                                                                                                       |
| Herramientas de apoyo para revisión de documentos públicos extranjeros        | Generar tratamientos discriminatorios                                                                                                                     |
| ---                                                                           | ---                                                                                                                                                       |
| Alertas o señales de riesgo para apoyar actividades de seguimiento de control | Decidir a qué titular se le sanciona o se le suspende un registro. Perfilamiento de titulares con efectos jurídicos automáticos                           |
| ---                                                                           | ---                                                                                                                                                       |
| Detección de duplicidad, agrupación de trámites conexos                       | Sistemas que aprendan del histórico para "predecir" el sentido de la decisión                                                                             |
| ---                                                                           | ---                                                                                                                                                       |
| Traducción y verificación de documentos públicos extranjeros (art. 7.4)       | Cualquier uso que no deje huella en el expediente <br><br/><br/><br/><br/><br/><br/><br/><br/><br/>                                                       |
| ---                                                                           | ---                                                                                                                                                       |
| Apoyo a control posterior: señales de riesgo para focalizar visitas           | Diseñar sistemas que impidan conocer cómo se produjo un resultado relevante o que eliminen la revisión humana                                             |
| ---                                                                           | ---                                                                                                                                                       |

&nbsp;

1. **Datos**

&nbsp;

1. **Datos sintéticos o anonimizados obligatorios.** Los equipos trabajarán exclusivamente con los conjuntos de datos, documentos y demás información expresamente habilitados para el desarrollo de la Hackatón. Cuando corresponda, deberán utilizarse datos sintéticos, anonimizados o preparados específicamente para el evento. Nadie trabaja con expedientes reales durante la competencia. El INVIMA debe entregar un _dataset_ de referencia construido para el evento.
2. **Prohibición de uso de información institucional no autorizada**. No podrá cargarse información reservada, clasificada, sometida a reserva legal, datos personales o sensibles, información relacionada con investigaciones o actuaciones de vigilancia y control en curso, secretos empresariales ni otra información no pública del Instituto en herramientas de IA públicas, no autorizadas o terceros que no estén en el ambiente autorizado del evento. Es la exposición más probable y la más fácil de evitar.
3. **Confidencialidad:** Las obligaciones de reserva, confidencialidad, protección de datos, seguridad de la información, propiedad intelectual y uso responsable de inteligencia artificial deberán incorporarse expresamente en los términos de participación, acuerdos de confidencialidad u otros instrumentos jurídicos aplicables a los participantes.
4. **Clasificación del nivel de riesgo**

Como parte obligatoria de la propuesta, cada equipo deberá realizar una clasificación preliminar del nivel de riesgo de su solución. Para ello deberá analizar, como mínimo, los siguientes criterios:

| **Criterio**                                       | **Riesgo bajo**      | **Riesgo medio**                         | **Riesgo alto**                                               |
| -------------------------------------------------- | -------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| **Efecto sobre derechos**                          | Sin efecto           | Apoyo a decisiones con validación humana | Efectos jurídicos o materiales significativos                 |
| ---                                                | ---                  | ---                                      | ---                                                           |
| **Autonomía**                                      | Apoyo informativo    | Recomendación sujeta a validación        | Decisión automatizada <br><br/><br/><br/><br/><br/><br/><br/> |
| ---                                                | ---                  | ---                                      | ---                                                           |
| **Datos personales**                               | No utiliza           | Datos personales no sensibles            | Datos sensibles, biométricos o de NNA                         |
| ---                                                | ---                  | ---                                      | ---                                                           |
| **Impacto en seguridad sanitaria o salud pública** | Nulo                 | Indirecto                                | Directo                                                       |
| ---                                                | ---                  | ---                                      | ---                                                           |
| **Alcance**                                        | Individual o acotado | Colectivo determinado                    | Masivo o indeterminado                                        |
| ---                                                | ---                  | ---                                      | ---                                                           |
| **Reversibilidad**                                 | Reversible           | Difícilmente reversible                  | Irreversible                                                  |
| ---                                                | ---                  | ---                                      | ---                                                           |

La clasificación final corresponderá al nivel de mayor riesgo identificado. En caso de duda entre dos niveles, deberá seleccionarse el nivel de mayor exigencia. La clasificación como riesgo alto no implica por sí sola la exclusión de la propuesta. Sin embargo, deberá ir acompañada de controles reforzados y medidas de mitigación.

&nbsp;

1. **Requisitos mínimos de diseño (condiciones de admisibilidad)**

&nbsp;

Toda solución debe demostrar, para ser evaluada:

- 1. **Humano en el circuito documentado**: dónde exactamente interviene el funcionario competente y qué puede modificar. Debe identificarse exactamente dónde interviene el funcionario competente, qué información recibe, qué decisiones conserva y qué resultados del sistema puede modificar, aceptar o rechazar.
  2. **Trazabilidad**: La solución deberá permitir reconstruir, cuando corresponda, qué información ingresó al sistema; qué resultado, recomendación o alerta generó; qué persona revisó dicho resultado; qué cambios realizó; y cuál fue la decisión finalmente adoptada.
  3. **Explicabilidad utilizable**: Cuando se utilice inteligencia artificial generativa, los resultados deberán ser revisados antes de su utilización. En especial deberán poder verificarse referencias normativas, técnicas, jurisprudenciales y cuantitativas; el evaluador debe poder validar la motivación del acto realizado por la IA.
  4. **Aviso al administrado**: la solución debe contemplar cómo se le informa que hubo apoyo de IA en su trámite y cómo pide revisión humana documentada. Los resultados relevantes deberán poder ser comprendidos por el usuario de la solución. No será suficiente presentar  
     <br/><br/><br/><br/><br/><br/><br/><br/>únicamente una puntuación, clasificación o recomendación sin explicar los factores que dieron lugar al resultado.
  5. **Seguridad y protección**. La propuesta deberá identificar los principales riesgos de seguridad y las vulnerabilidades que puedan presentarse durante el ciclo de vida de la solución y señalar las medidas previstas para prevenirlos o mitigarlos.
  6. **Riesgo de sesgo o discriminación.** Cuando corresponda por la naturaleza de la solución, deberán identificarse posibles fuentes de sesgo algorítmico y los mecanismos propuestos para su detección y mitigación.

1. **Evaluación de Impacto Algorítmico**

Toda propuesta deberá presentar una Evaluación de Impacto Algorítmico preliminar, proporcional al nivel de riesgo de la solución. Para efectos de la Hackatón, podrá utilizarse una versión simplificada basada en la plantilla contenida en el Anexo Técnico del proyecto de Circular del INVIMA. Como mínimo deberá incluir:

1. identificación de la solución;
2. finalidad y función institucional;
3. descripción técnica;
4. desarrollador o proveedor;
5. datos utilizados y su fuente;
6. nivel de riesgo y justificación;
7. riesgos para los derechos de las personas;
8. riesgos para los datos personales y la seguridad de la información;
9. riesgos de sesgo, discriminación o inexactitud;
10. medidas de mitigación y controles;
11. mecanismo de supervisión y decisión humana;
12. mecanismo de revisión u objeción.
13. Cuando la propuesta sea clasificada como riesgo alto, la identificación de riesgos y las medidas de mitigación constituirán un componente esencial de la evaluación de la solución.
14. **Metodología de evaluación**

**Etapa 1. Verificación de admisibilidad**

Antes de asignar puntaje, se verificará el cumplimiento de las reglas mínimas de la Hackatón.  
<br/><br/><br/><br/><br/><br/><br/>

No continuarán a evaluación las propuestas que incurran en alguno de los usos expresamente prohibidos o incumplan condiciones esenciales relacionadas con supervisión humana, información, seguridad o trazabilidad.

**Etapa 2. Evaluación de las soluciones**

Las propuestas admisibles serán evaluadas por un panel multidisciplinario de expertos bajo los siguientes criterios

| **Criterio**                                                                                                                        | **Peso** |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Impacto: Potencial de reducir tiempos, fricciones y carga operativa del proceso regulatorio.                                        | 25%      |
| ---                                                                                                                                 | ---      |
| Confiabilidad de la herramienta: Solidez, consistencia, trazabilidad y calidad de los resultados.                                   | 20%      |
| ---                                                                                                                                 | ---      |
| Seguridad: Capacidad de prevenir riesgos en el uso de la solución y proteger información sensible.                                  | 15%      |
| ---                                                                                                                                 | ---      |
| Innovación / Disrupción: Grado en que la solución cambia significativamente la forma actual de hacer el proceso.                    | 15%      |
| ---                                                                                                                                 | ---      |
| Escalabilidad: Viabilidad técnica, operativa y presupuestal de llevar la solución a mayor escala.                                   | 10%      |
| ---                                                                                                                                 | ---      |
| Cumplimiento de requisitos legales: Compatibilidad con el marco regulatorio, protección de datos, trazabilidad y responsabilidades. | 15%      |
| ---                                                                                                                                 | ---      |

El nivel de riesgo de una solución no deberá evaluarse como un elemento negativo por sí mismo. Lo relevante será que el equipo haya clasificado correctamente el riesgo y diseñado controles proporcionales y suficientes para mitigarlo.  
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

1. **Propiedad intelectual y componentes de terceros**

Antes de la apertura de la Hackatón deberán quedar expresamente definidos los siguientes aspectos:

1. titularidad de los desarrollos, código y modelos preexistentes de cada participante;
2. titularidad de los desarrollos producidos durante la Hackatón;
3. tratamiento de los modelos entrenados o ajustados durante el evento;
4. titularidad y condiciones de utilización de datos o productos derivados;
5. utilización de componentes open source;
6. utilización de APIs, modelos comerciales o herramientas de terceros;
7. obligación de identificar las licencias y términos de uso aplicables.

Los participantes deberán garantizar que cuentan con los derechos, permisos o licencias necesarios para utilizar los componentes incorporados en sus soluciones y deberán declararlos al momento de la entrega.

Para lo anterior, es importante diligenciar, firmar y enviar el documento **DECLARACIÓN DE PROPIEDAD INTELECTUAL, COMPONENTES DE TERCEROS Y LICENCIA DE USO**.

1. **Causales de inadmisibilidad o descalificación**

Una propuesta podrá ser inadmitida o descalificada cuando:

1. diseñe la inteligencia artificial para adoptar autónomamente una decisión administrativa definitiva;
2. sustituya el juicio técnico o jurídico del funcionario competente;
3. sustituya la motivación del acto administrativo sin validación evidente por un ser humano;
4. utilice información institucional no autorizada;
5. cargue información reservada, clasificada, personal o sensible en herramientas no autorizadas;
6. intente reidentificar información anonimizada;
7. utilice sistemas de calificación social, vigilancia masiva o mecanismos discriminatorios;
8. utilice resultados generados por IA sin mecanismos adecuados de verificación;
9. carezca de supervisión humana cuando esta sea necesaria;
10. impida la trazabilidad de resultados relevantes;
11. omita deliberadamente la utilización de componentes o herramientas de terceros;
12. incumpla las demás condiciones esenciales establecidas en estas reglas.

**12\. Resultados de la Hackatón y etapa posterior**

**LA SELECCIÓN DE UNA PROPUESTA COMO GANADORA NO IMPLICA LA CELEBRACIÓN DE UN CONTRATO CON EL INVIMA O TERCEROS, LA ADJUDICACIÓN DE UN PROCESO DE CONTRATACIÓN NI EL COMPROMISO DE IMPLEMENTAR LA SOLUCIÓN PRESENTADA.**

Cualquier eventual desarrollo, adquisición, contratación, pilotaje o implementación posterior deberá sujetarse a los procedimientos jurídicos, técnicos, presupuestales y contractuales aplicables.

&nbsp;

&nbsp;