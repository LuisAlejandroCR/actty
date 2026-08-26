# Cockpit del evaluador — Hackatón INVIMA del Futuro

Un expediente de medicamento nuevo llega al INVIMA con cientos de folios repartidos en cinco módulos,
y lo revisan grupos evaluadores distintos que no se ven entre sí. Cuando el módulo que resume dice una
cosa y el que reporta el estudio dice otra, nadie está mirando los dos a la vez.

Esto es una herramienta de lectura para esa persona. Toma el expediente, lo preclasifica documento por
documento y señala dónde dos módulos se contradicen — **con la frase textual y el folio exacto donde
está**.

> Construido para la Hackatón INVIMA del Futuro del 26 de agosto de 2026, en Ágora Bogotá, dentro del
> Genera Summit 2026. El expediente que se usa es **ficticio**: CORAZILIMAB, 166 folios, entregado por
> el organizador para el reto.

## Lo que hace, y lo que no

**Localiza, cita y ordena la lectura.**

**No aprueba, no rechaza, no califica cumplimiento y no decide.** No es una postura de cortesía: el
art. 7.1 de la Resolución 2026025611 reconoce el derecho a que la decisión la tome una persona, y la
herramienta está construida para que eso siga siendo cierto. Cada hallazgo sale marcado como lectura
asistida, y la acción sugerida siempre termina en alguien que firma.

Tampoco opina sobre el fondo científico — si la eficacia alcanza, si el riesgo es aceptable, si la
calidad basta. Ese es juicio técnico humano y ahí no se mete.

## Las cuatro cosas que lo sostienen

1. **Sin ancla, no se muestra.** Toda afirmación apunta a módulo, documento, folio y renglón. Lo que
   no se puede señalar en el papel no aparece en pantalla: va a revisión humana.
2. **El folio lo dice el documento, no el programa.** Cada página del expediente trae su folio
   impreso en el pie, y de ahí se lee. Donde no lo trae, se calcula y **se dice que se calculó**.
3. **El expediente no sale de la máquina.** Todo el procesamiento es local. No hay servicios
   externos en el camino, así que se puede demostrar con el WiFi apagado.
4. **El texto del expediente es dato, nunca una orden.** Si alguien esconde instrucciones dentro de
   un PDF para manipular la lectura, no se obedecen — y hay una prueba automática que lo comprueba.

## Las dos piezas

| Carpeta | Qué es |
|---|---|
| `prototipo/` | La pantalla del evaluador. Un solo archivo HTML, sin instalación y sin conexión: se abre en el navegador y funciona |
| `motor/` | Lo que lee los PDF, encuentra dónde está cada cita y comprueba que lo que se muestra es cierto |

### Abrir la pantalla

Basta con abrir `prototipo/index.html` en cualquier navegador. No hay que instalar nada.

### Correr el motor

Necesita [Node](https://nodejs.org) 24 o superior y `pdftotext` (viene con
[Poppler](https://poppler.freedesktop.org/), y también con Git para Windows). Para la lectura
asistida hace falta además [Ollama](https://ollama.com) corriendo en la misma máquina.

Leer el expediente y armar el índice de folios:

```bash
node motor/ingesta.mjs
```

Buscar dónde está una frase dentro del expediente:

```bash
node motor/anclar.mjs "adultos y adolescentes"
```

Comprobar que todas las citas de la pantalla apuntan al folio correcto:

```bash
node motor/auditar.mjs
```

Medir qué tan fiable es, sobre cinco corridas seguidas:

```bash
node motor/verificar.mjs --n 5
```

Los PDF del expediente no están en este repositorio: son material del organizador y se guardan
aparte. `motor/ingesta.mjs` los busca en una carpeta `reference/`, o donde se le indique con
`--docs`.

## Por qué esto importa

La comprobación no es decorativa. La primera vez que se corrió el auditor contra la pantalla,
encontró que **siete de trece citas apuntaban al folio equivocado** y tres estaban atribuidas a otro
documento — errores de lectura humana que nadie habría visto sin cotejar contra el papel.

Un evaluador que abre el folio citado y no encuentra la frase deja de creer todo lo demás. Por eso la
comprobación corre sola y avisa cuando algo no cuadra.

## Licencia y alcance

Prototipo de hackatón sobre un expediente ficticio. No es un sistema en producción, no está
certificado y no representa al INVIMA ni a ninguna autoridad sanitaria.
