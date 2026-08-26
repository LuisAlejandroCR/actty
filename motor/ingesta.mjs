/* ingesta.mjs — expediente CTD en PDF -> índice de texto anclado por folio.
 *
 * Regla que gobierna este archivo: el ancla la calcula el código, nunca el modelo.
 * Aquí no hay LLM. Sale un índice determinista: folio > línea > texto.
 *
 * Uso:  node motor/ingesta.mjs [--docs <dir>] [--salida <archivo>]
 */

import { execFileSync } from "node:child_process";
import {
  readdirSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  rmSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";

const DOCS_POR_DEFECTO =
  "C:/Users/Unknown Booty/Documents/Projects/Claude/generaX_summit/docs";
const SALIDA_POR_DEFECTO = "motor/salida/expediente.json";

function args() {
  const a = process.argv.slice(2);
  const leer = (bandera, def) => {
    const i = a.indexOf(bandera);
    return i >= 0 && a[i + 1] ? a[i + 1] : def;
  };
  return {
    docs: leer("--docs", DOCS_POR_DEFECTO),
    salida: leer("--salida", SALIDA_POR_DEFECTO),
  };
}

/* Los nombres traen el rango de folios al final: "Modulo 3_Calidad_53_97_.pdf".
 * De ahí sale el folio global, que es la unidad que cita el evaluador — no la
 * página del PDF suelto. */
const PATRON = /^Modulo\s*(\d)[_ ](.+?)[_ ](\d+)[_ ](\d+)[_ ]?\.pdf$/i;

function descubrir(dirDocs) {
  const encontrados = [];
  for (const nombre of readdirSync(dirDocs)) {
    const m = PATRON.exec(nombre);
    if (!m) continue;
    encontrados.push({
      modulo: `M${m[1]}`,
      titulo: m[2].replace(/_/g, " ").trim(),
      folioInicial: Number(m[3]),
      folioFinal: Number(m[4]),
      archivo: join(dirDocs, nombre),
      nombre,
    });
  }
  encontrados.sort((a, b) => a.folioInicial - b.folioInicial);
  return encontrados;
}

/* pdftotext -layout emite un salto de página (\f) entre páginas. Una sola
 * invocación por PDF en vez de una por página: 5 procesos, no 166.
 *
 * El binario mingw de pdftotext no abre rutas con acentos —"Información" llega
 * mutilada a la capa de archivos de Windows—, así que el PDF se copia antes a un
 * nombre ASCII temporal. Node sí maneja el nombre original sin problema. */
let contadorTemporal = 0;
function paginasDe(archivo) {
  const temporal = join(tmpdir(), `ingesta-${process.pid}-${contadorTemporal++}.pdf`);
  copyFileSync(archivo, temporal);
  let bruto;
  try {
    bruto = execFileSync(
      "pdftotext",
      ["-layout", "-enc", "UTF-8", temporal, "-"],
      { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
    );
  } finally {
    rmSync(temporal, { force: true });
  }
  const paginas = bruto.split("\f");
  // pdftotext deja una página vacía al final por el \f terminal.
  if (paginas.length && paginas[paginas.length - 1].trim() === "") paginas.pop();
  return paginas;
}

/* Cada página del expediente trae impreso su propio pie. El formato no es único
 * — cambia de módulo a módulo:
 *
 *   M2-05-CO | CORAZILIMAB | DOCUMENTO FICTICIO – HACKATON INVIMA Página 45 de 52 Folio 3
 *   M3-32S-DS | CORAZILIMAB | DRUG SUBSTANCE | DOCUMENTO FICTICIO – HACKATON INVIMA Página 57 de 97Página 5
 *   M5-01-PKPD | CORAZILIMAB | FASE I PK/PD | DOCUMENTO FICTICIO – HACKATON Página 134 de 166Página 5
 *
 * Lo estable son tres campos: el documento al que pertenece la página, el folio
 * global ("Página 57") y el ordinal dentro del documento, que unas veces se
 * llama "Folio" y otras "Página". El "de 97" es el folio final del módulo, no un
 * total del expediente.
 *
 * El folio impreso manda sobre cualquier aritmética: la primera página de cada
 * PDF es una portada sin folio, así que contar páginas se corre en uno. */
const PIE =
  /^\s*(M\d[-A-Z0-9]*)\s*\|.*?CORAZILIMAB.*?P[áa]gina\s+(\d+)\s+de\s+(\d+)\s*(?:(?:Folio|P[áa]gina)\s*(\d+))?/i;

function leerPie(lineas) {
  for (let i = lineas.length - 1; i >= 0; i--) {
    const m = PIE.exec(lineas[i].replace(/\s+/g, " "));
    if (m) {
      return {
        documento: m[1].toUpperCase(),
        folio: Number(m[2]),
        folioFinalModulo: Number(m[3]),
        folioEnDocumento: m[4] ? Number(m[4]) : null,
        lineaPie: i,
      };
    }
  }
  return null;
}

function ingerir({ docs, salida }) {
  const fuentes = descubrir(docs);
  if (!fuentes.length) {
    console.error(`Sin PDFs de módulo en ${docs}`);
    process.exit(1);
  }

  const folios = [];
  const modulos = [];
  const avisos = [];

  for (const f of fuentes) {
    const paginas = paginasDe(f.archivo);
    // Folios del rango + 1 portada sin numerar al frente de cada módulo.
    const esperadas = f.folioFinal - f.folioInicial + 2;
    if (paginas.length !== esperadas) {
      avisos.push(
        `${f.nombre}: se esperaban ${esperadas} páginas (${f.folioFinal - f.folioInicial + 1} folios + portada) y el PDF trae ${paginas.length}`,
      );
    }
    paginas.forEach((texto, i) => {
      const lineas = texto.split(/\r?\n/);
      const pie = leerPie(lineas);
      // Portada del módulo: sin pie impreso y sin folio. Se conserva como
      // contexto, pero no se le asigna número — nada se puede anclar ahí.
      const calculado = f.folioInicial + i - 1;
      const folioCalculado = calculado >= f.folioInicial ? calculado : null;
      folios.push({
        // El pie impreso manda. Donde no lo hay —portadas y el formulario del
        // INVIMA al frente de M1— cae a la cuenta de páginas, y queda anotado
        // de dónde salió: una cita nunca debe poder confundir las dos cosas.
        folio: pie ? pie.folio : folioCalculado,
        folioCalculado,
        origenDelFolio: pie
          ? "pie impreso"
          : folioCalculado
            ? "calculado por posición — la página no trae pie"
            : "sin folio — portada de módulo",
        documento: pie ? pie.documento : null,
        folioEnDocumento: pie ? pie.folioEnDocumento : null,
        modulo: f.modulo,
        paginaPdf: i + 1,
        archivo: f.nombre,
        lineas,
      });
      if (pie && pie.folio !== calculado) {
        avisos.push(
          `${f.modulo} pág. PDF ${i + 1}: el pie impreso dice folio ${pie.folio} y la cuenta de páginas da ${calculado}`,
        );
      }
    });
    modulos.push({
      id: f.modulo,
      titulo: f.titulo,
      archivo: f.nombre,
      folioInicial: f.folioInicial,
      folioFinal: f.folioFinal,
      paginas: paginas.length,
    });
  }

  const conFolio = folios.filter((f) => f.folio !== null);
  const documentos = [...new Set(conFolio.map((f) => f.documento))].sort();

  const indice = {
    generadoPor: "motor/ingesta.mjs",
    generadoEn: new Date().toISOString(),
    origen: docs,
    totalPaginas: folios.length,
    totalFolios: conFolio.length,
    rangoFolios: conFolio.length
      ? [
          Math.min(...conFolio.map((f) => f.folio)),
          Math.max(...conFolio.map((f) => f.folio)),
        ]
      : null,
    documentos,
    totalLineas: folios.reduce((n, f) => n + f.lineas.length, 0),
    caracteres: folios.reduce(
      (n, f) => n + f.lineas.reduce((m, l) => m + l.length, 0),
      0,
    ),
    modulos,
    avisos,
    folios,
  };

  mkdirSync(dirname(salida), { recursive: true });
  writeFileSync(salida, JSON.stringify(indice, null, 1), "utf8");

  console.log(`Módulos:  ${modulos.length}`);
  for (const m of modulos) {
    console.log(
      `  ${m.id}  folios ${m.folioInicial}–${m.folioFinal}  (${m.paginas} páginas)  ${m.titulo}`,
    );
  }
  console.log(
    `Folios:   ${indice.totalFolios} con folio impreso (${indice.rangoFolios?.join("–")}) · ${indice.totalPaginas} páginas en total`,
  );
  console.log(`Documentos: ${documentos.length} — ${documentos.join(", ")}`);
  console.log(`Líneas:   ${indice.totalLineas}`);
  console.log(`Caracteres: ${indice.caracteres}`);
  if (avisos.length) {
    console.log("Avisos:");
    for (const a of avisos) console.log(`  ! ${a}`);
  }
  console.log(`→ ${salida}`);
  return indice;
}

ingerir(args());
