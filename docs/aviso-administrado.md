# aviso-administrado.md — el aviso que recibe el solicitante

Texto y datos del aviso exigido por [Reglas §5.4] y por el art. 7.1 de la Resolución 2026025611.
Punto 12 de la [EIA](eia.md); bloque B7 de [plan.md](plan.md). El aviso **lo genera el sistema**, no
se escribe a mano: aquí van el texto fijo, los campos que se rellenan y la entrega al frontend.

## Regla que decide la redacción

§5.4 dice que **no basta con presentar una puntuación, una clasificación o una recomendación sin
explicar los factores que la produjeron**. Por eso el aviso no dice "su expediente tiene 3 hallazgos":
dice qué se revisó, qué se encontró, dónde está en el papel y quién lo decidió.

Escrito para una persona sin formación regulatoria. Sin "IA generativa", sin "anclaje", sin "módulo
CTD" a secas, sin nombres de archivo.

---

## Texto del aviso

> ### Aviso: en la revisión de su solicitud se usó una herramienta informática de apoyo
>
> **Solicitud:** ‹expediente› · **Producto:** ‹producto› · **Solicitante:** ‹solicitante›
> **Fecha del aviso:** ‹fecha y hora› · **Versión de la herramienta:** ‹versión›
>
> #### Qué se hizo
>
> Su solicitud tiene ‹n› folios repartidos en varios cuadernos. Para leerlos, el evaluador usó una
> herramienta que busca dentro de los documentos y señala dónde dos partes de la solicitud dicen
> cosas distintas. La herramienta le muestra al evaluador la frase exacta y la página donde está.
>
> #### Qué **no** hizo la herramienta
>
> No aprobó ni negó nada. No calificó su solicitud. No redactó la decisión ni la firmó. No opinó
> sobre si el medicamento es eficaz, seguro o de buena calidad: eso lo evalúa un equipo técnico
> humano. La herramienta solo lee y señala; **la decisión sobre su trámite la toma una persona.**
>
> #### Qué encontró, y quién lo revisó
>
> ‹Por cada punto señalado:›
>
> - **‹Qué se encontró, en una frase sin tecnicismos.›**
>   Dónde está en su solicitud: folio ‹f1› y folio ‹f2›.
>   Revisado por: ‹nombre y cargo del evaluador› el ‹fecha›. Resultado de esa revisión: ‹el evaluador
>   lo tuvo en cuenta / lo descartó›.
>
> La herramienta **no retira ninguna página de la revisión**: el evaluador leyó su solicitud completa.
> Lo señalado aquí es lo que la herramienta ayudó a encontrar, no todo lo que se revisó.
>
> #### Qué no alcanza a revisar la herramienta
>
> ‹Limitaciones del análisis, en lenguaje llano.› Lo que la herramienta no pudo leer con seguridad
> quedó marcado como *no analizado* y lo revisó una persona.
>
> #### Si no está de acuerdo: puede pedir revisión humana
>
> Usted puede pedir que una persona distinta revise lo que se señaló arriba, sin costo y sin
> necesidad de abogado. La solicitud queda registrada y se le responde por escrito.
>
> - **Cómo:** ‹canal de radicación›
> - **Qué escribir:** el número de su solicitud (‹expediente›), cuál de los puntos señalados objeta y
>   por qué. Si tiene un documento que lo respalde, adjúntelo.
> - **Plazo para pedirla:** ‹término del trámite›
> - **Quién responde:** ‹dependencia›
>
> Pedir esta revisión **no interrumpe ni retrasa** el trámite por sí misma, y no reemplaza los
> recursos que la ley le concede contra la decisión final.
>
> #### Cómo saber qué pasó con su solicitud
>
> Cada paso quedó registrado: qué documentos entraron, qué señaló la herramienta, quién lo revisó,
> qué cambió y qué se decidió. Usted puede pedir copia de ese registro citando ‹expediente›.
>
> ---
>
> Este aviso se generó automáticamente al cerrarse la revisión asistida de su solicitud.
> Identificador de la huella: ‹hash›.

---

## Campos que rellena el sistema

Ninguno se escribe a mano. Si un campo no está disponible, el aviso **no se emite**: un aviso con un
hueco es peor que no tenerlo.

| Campo | De dónde sale |
|---|---|
| `expediente`, `producto`, `solicitante` | Módulo 1 del expediente |
| `fecha y hora`, `hash` | Registro encadenado del cierre de la revisión |
| `versión` | Versión de la herramienta y del análisis publicado |
| `n` folios | Índice de folios del motor |
| Lista de hallazgos | Campos *respuesta* y *ubicación exacta* de la salida de nueve campos, reescritos en llano |
| Folios citados | Campo *ubicación exacta*; sale del pie impreso del documento |
| Revisor, fecha y resultado | Registro de revisión humana |
| Limitaciones | Campo *limitaciones* de cada hallazgo |
| `canal`, `término`, `dependencia` | ⏳ Datos institucionales — no se inventan. Ver abajo |

**Los tres campos institucionales van con marca visible en el demo.** El canal de radicación, el
término y la dependencia responsable son datos del INVIMA que este equipo no tiene verificados; en la
pantalla se muestran como pendientes de confirmación institucional, no como si estuvieran fijados.
Inventarlos sería exactamente la afirmación de cumplimiento que [AGENTS.md] prohíbe.

## Ejemplo con el expediente del reto

Con los datos del expediente ficticio: expediente `2026-REG-CRZ-001784`, producto CORAZILIMAB
(CRZ-042), solicitante Biofarma Andina S.A.S., 166 folios.

El hallazgo H1 se escribe así para el ciudadano — la misma información que ve el evaluador, sin el
vocabulario:

> **En su solicitud, el uso que se pide para el medicamento incluye a adolescentes desde los 12 años,
> pero el estudio principal que se presenta como respaldo excluyó a los menores de 18.**
> Dónde está en su solicitud: folio 43 y folio 158.
> Revisado por: ‹evaluador› el ‹fecha›. Resultado: ‹…›.

Lo que **no** dice: que la solicitud incumple, que va a ser negada, ni qué debería hacer el
solicitante. Eso lo determina la persona que decide.

## Entrega al frontend

Esta es la especificación; **la pantalla la implementa el área del cockpit**, no este documento.

1. Vive como una vista propia dentro de `prototipo/index.html`, alcanzable desde el hallazgo y desde
   el registro.
2. Se genera desde los datos ya presentes, sin texto escrito a mano en la plantilla salvo el fijo de
   arriba.
3. Los tres campos institucionales se pintan como pendientes de confirmación.
4. Verificador, en una frase: **la vista del aviso se abre, muestra los ‹n› hallazgos con su folio y
   no contiene ningún hueco `‹…›` fuera de los tres campos institucionales marcados.**
