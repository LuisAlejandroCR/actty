/* anclar.mjs — dada una cita textual, encuentra dónde está en el expediente.
 *
 * Esta es la regla dura del sistema: el modelo cita el texto literal, y el
 * folio, el documento y la línea los encuentra este archivo buscando esa cadena.
 * Medido antes del evento: un modelo de 3B citó mal el número de línea 3 de 3
 * veces. Contar no es tarea suya.
 *
 * Y la contraria: si una cita no se encuentra, la respuesta correcta es
 * `encontrado: false`. Sin ancla no hay pantalla — va a cola humana.
 *
 * Uso como módulo:   import { cargarIndice, anclar } from "./anclar.mjs"
 * Uso como comando:  node motor/anclar.mjs "texto a buscar"
 */

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const INDICE_POR_DEFECTO = "motor/salida/expediente.json";

/* --------------------------------------------------------------------------
 * Normalización
 *
 * Un PDF maquetado no entrega el texto como lo teclearía nadie: comillas
 * angulares, guiones largos, espacios duros, saltos de línea a mitad de frase y
 * columnas separadas por veinte espacios. Se compara sobre una forma canónica,
 * pero se devuelve SIEMPRE el texto original del documento — lo que se le
 * enseña al evaluador es el folio, no la forma normalizada.
 * ----------------------------------------------------------------------- */

const COMILLAS = /[«»""''"']/g;
const GUIONES = /[–—‑‒−]/g;

export function normalizar(s) {
  return String(s)
    .replace(/­/g, "") // guión suave de corte de línea
    .replace(COMILLAS, '"')
    .replace(GUIONES, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/* Para el cotejo se va un paso más allá y se quitan tildes y puntuación: el
 * OCR y la maquetación se comen tildes con facilidad, y una tilde perdida no
 * debería costar un ancla. La forma estricta se prueba primero. */
export function normalizarLaxo(s) {
  return normalizar(s)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N} ]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* Concatena las líneas de una página ya normalizadas, llevando a la vez un mapa
 * de tramos: qué franja del texto normalizado vino de qué línea original. Así
 * una posición hallada con indexOf se traduce a un número de línea exacto, sin
 * estimar nada — que es justo lo que este módulo existe para garantizar. */
function tejer(lineas, norma) {
  const tramos = [];
  const partes = [];
  let pos = 0;
  lineas.forEach((linea, i) => {
    const t = norma(linea);
    if (!t) return;
    if (partes.length) pos += 1; // el espacio con que se unen
    partes.push(t);
    tramos.push({ desde: pos, hasta: pos + t.length, linea: i });
    pos += t.length;
  });
  return { texto: partes.join(" "), tramos };
}

export function cargarIndice(ruta = INDICE_POR_DEFECTO) {
  const indice = JSON.parse(readFileSync(ruta, "utf8"));
  for (const pagina of indice.folios) {
    pagina._norm = tejer(pagina.lineas, normalizar);
    pagina._laxo = tejer(pagina.lineas, normalizarLaxo);
  }
  return indice;
}

function lineaEn(tramos, posicion) {
  for (const t of tramos) {
    if (posicion >= t.desde && posicion < t.hasta) return t.linea;
  }
  return tramos.length ? tramos[tramos.length - 1].linea : 0;
}

/* Localiza la cita dentro de la página y devuelve la línea real y el texto tal
 * como aparece en el documento. Trabaja sobre la página entera para que una
 * cita partida en dos renglones —o repartida entre columnas— se siga
 * encontrando. */
function ubicarEnPagina(pagina, cita) {
  const objetivos = [
    { forma: "exacta", aguja: normalizar(cita), tejido: pagina._norm },
    {
      forma: "sin tildes ni puntuación",
      aguja: normalizarLaxo(cita),
      tejido: pagina._laxo,
    },
  ];
  for (const { forma, aguja, tejido } of objetivos) {
    if (!aguja) continue;
    const i = tejido.texto.indexOf(aguja);
    if (i === -1) continue;
    const ocurrencias = tejido.texto.split(aguja).length - 1;
    const linea = lineaEn(tejido.tramos, i);
    const lineaFinal = lineaEn(tejido.tramos, i + aguja.length - 1);
    // Texto literal: los renglones del documento que la cita atraviesa, tal
    // como están impresos. Nunca la forma normalizada.
    const literal = pagina.lineas
      .slice(linea, lineaFinal + 1)
      .map((l) => l.trim())
      .filter(Boolean)
      .join(" ");
    return { forma, linea, lineaFinal, literal, ocurrencias };
  }
  return null;
}

/* --------------------------------------------------------------------------
 * anclar
 * ----------------------------------------------------------------------- */

/**
 * @param {string} cita  texto literal citado por el modelo
 * @param {object} indice  el índice cargado con cargarIndice()
 * @param {object} [filtro]  { modulo, documento } para acotar la búsqueda
 * @returns {object} ancla verificable, o {encontrado:false, motivo}
 */
export function anclar(cita, indice, filtro = {}) {
  const limpia = String(cita ?? "").trim();
  if (limpia.length < 8) {
    return {
      encontrado: false,
      motivo: "la cita es demasiado corta para anclarse sin ambigüedad",
      cita: limpia,
    };
  }

  const candidatas = indice.folios.filter(
    (p) =>
      (!filtro.modulo || p.modulo === filtro.modulo) &&
      (!filtro.documento || p.documento === filtro.documento),
  );

  const golpes = [];
  for (const pagina of candidatas) {
    const u = ubicarEnPagina(pagina, limpia);
    if (u) golpes.push({ pagina, ...u });
  }

  if (!golpes.length) {
    return {
      encontrado: false,
      motivo:
        "la cita no aparece en el expediente — el modelo la parafraseó o la inventó",
      cita: limpia,
      ...(filtro.modulo || filtro.documento ? { filtro } : {}),
    };
  }

  // Con varias páginas candidatas gana la coincidencia exacta sobre la laxa.
  golpes.sort((a, b) =>
    a.forma === b.forma ? a.pagina.paginaPdf - b.pagina.paginaPdf : a.forma === "exacta" ? -1 : 1,
  );
  const g = golpes[0];

  return {
    encontrado: true,
    cita: limpia,
    textoLiteral: g.literal,
    modulo: g.pagina.modulo,
    documento: g.pagina.documento,
    folio: g.pagina.folio,
    folioEnDocumento: g.pagina.folioEnDocumento,
    origenDelFolio: g.pagina.origenDelFolio,
    linea: g.linea,
    paginaPdf: g.pagina.paginaPdf,
    archivo: g.pagina.archivo,
    coincidencia: g.forma,
    // Si la misma cadena aparece en varios folios, el ancla es ambigua y hay
    // que decirlo: un evaluador que abre el folio equivocado pierde la
    // confianza en todo lo demás.
    ambigua: golpes.length > 1,
    otrosFolios: golpes.slice(1, 6).map((o) => o.pagina.folio),
  };
}

/* Uso desde la línea de comandos, para comprobar una cita suelta. */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const cita = process.argv.slice(2).join(" ");
  if (!cita) {
    console.error('Uso: node motor/anclar.mjs "texto literal a buscar"');
    process.exit(1);
  }
  const indice = cargarIndice();
  console.log(JSON.stringify(anclar(cita, indice), null, 2));
}
