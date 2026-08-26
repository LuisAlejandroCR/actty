/* auditar.mjs — coteja las citas del prototipo contra el expediente real.
 *
 * El prototipo lleva los hallazgos escritos a mano, con su folio. Este archivo
 * los vuelve a anclar contra los PDF y dice, cita por cita, si el folio que se
 * va a enseñar en tarima es el folio donde el texto realmente está.
 *
 * Es la verificación técnica del bloque B8: el demo y el dossier tienen que
 * decir lo mismo. Un jurado que abre el folio citado y no encuentra la frase
 * deja de creer todo lo demás.
 *
 * Uso:  node motor/auditar.mjs [--fuente <index.html|datos.js>] [--json <salida>]
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { cargarIndice, anclar } from "./anclar.mjs";

const FUENTE_POR_DEFECTO = "prototipo/index.html";
const JSON_POR_DEFECTO = "motor/salida/auditoria.json";

function args() {
  const a = process.argv.slice(2);
  const leer = (bandera, def) => {
    const i = a.indexOf(bandera);
    return i >= 0 && a[i + 1] ? a[i + 1] : def;
  };
  return {
    fuente: leer("--fuente", FUENTE_POR_DEFECTO),
    json: leer("--json", JSON_POR_DEFECTO),
    indice: leer("--indice", "motor/salida/expediente.json"),
  };
}

/* Los datos del prototipo viven en un literal de JavaScript, no en un JSON.
 * Se recorta el bloque `const HALLAZGOS = [...]` contando corchetes —así no
 * importa cuántos arreglos anidados traiga— y se evalúa como expresión. Es
 * código propio, del mismo repositorio; no entra nada de afuera. */
function extraerArreglo(fuente, nombre) {
  const marca = new RegExp(`const\\s+${nombre}\\s*=\\s*\\[`);
  const m = marca.exec(fuente);
  if (!m) return null;
  const inicio = fuente.indexOf("[", m.index);
  let nivel = 0;
  let enCadena = null;
  for (let i = inicio; i < fuente.length; i++) {
    const c = fuente[i];
    if (enCadena) {
      if (c === "\\") i++;
      else if (c === enCadena) enCadena = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") enCadena = c;
    else if (c === "[") nivel++;
    else if (c === "]") {
      nivel--;
      if (nivel === 0) {
        const literal = fuente.slice(inicio, i + 1);
        return new Function(`return ${literal};`)();
      }
    }
  }
  return null;
}

/* El folio del prototipo se escribe de varias formas —"Folio 46", "Folios
 * 130–166", "Folio 5 (pág. 14)"— y el expediente numera en dos escalas a la vez:
 * el folio global impreso ("Página 14 de 21") y el ordinal dentro del documento
 * ("Folio 5"). Se recogen todos los números y luego se ve cuál escala acierta;
 * acusar de error a una cita que usaba la otra escala sería el mismo pecado que
 * este auditor persigue. */
const folioDeclarado = (s) =>
  [...String(s ?? "").matchAll(/\d+/g)].map((m) => Number(m[0]));

/* La cita del prototipo viene adornada para la pantalla: comillas angulares,
 * una etiqueta delante ("PGR — información faltante: «...»"). Lo que se busca
 * en el expediente es lo que va entre comillas; si no hay comillas, la frase
 * entera. */
function citaBuscable(texto) {
  const entreComillas = /[«"']([^«»"']{12,})[»"']/.exec(String(texto ?? ""));
  return (entreComillas ? entreComillas[1] : String(texto ?? "")).trim();
}

function auditar({ fuente, json, indice: rutaIndice }) {
  const src = readFileSync(fuente, "utf8");
  const hallazgos = extraerArreglo(src, "HALLAZGOS");
  if (!hallazgos) {
    console.error(`No se encontró el arreglo HALLAZGOS en ${fuente}`);
    process.exit(1);
  }
  const indice = cargarIndice(rutaIndice);

  const filas = [];
  for (const h of hallazgos) {
    for (const [i, ev] of (h.evidencia ?? []).entries()) {
      const cita = citaBuscable(ev.texto);
      const declarados = folioDeclarado(ev.folio);
      const ancla = anclar(cita, indice, ev.modulo ? { modulo: ev.modulo } : {});

      let estado;
      let escala = null;
      if (!ancla.encontrado) estado = "sin ancla";
      else if (!declarados.length) estado = "sin folio declarado";
      else if (declarados.includes(ancla.folio)) {
        estado = "coincide";
        escala = "folio global";
      } else if (
        ancla.folioEnDocumento !== null &&
        declarados.includes(ancla.folioEnDocumento)
      ) {
        estado = "coincide";
        escala = "folio dentro del documento";
      } else estado = "folio corrido";

      const principal = declarados.length ? declarados[0] : null;
      filas.push({
        hallazgo: h.id,
        evidencia: i + 1,
        estado,
        escala,
        folioDeclarado: ev.folio ?? null,
        folioReal: ancla.encontrado ? ancla.folio : null,
        folioRealEnDocumento: ancla.folioEnDocumento ?? null,
        desfase:
          ancla.encontrado && principal !== null ? ancla.folio - principal : null,
        documentoDeclarado: ev.fuente ?? null,
        documentoReal: ancla.documento ?? null,
        // Atribuir la cita al documento equivocado es tan caro como el folio:
        // el evaluador la busca donde no está.
        documentoDistinto:
          ancla.encontrado && ev.fuente && ancla.documento
            ? !String(ev.fuente).toUpperCase().startsWith(ancla.documento)
            : null,
        modulo: ev.modulo ?? null,
        linea: ancla.linea ?? null,
        coincidencia: ancla.coincidencia ?? null,
        ambigua: ancla.ambigua ?? null,
        cita,
        textoEnElExpediente: ancla.textoLiteral ?? null,
        motivo: ancla.motivo ?? null,
      });
    }
  }

  const cuenta = (e) => filas.filter((f) => f.estado === e).length;
  const resumen = {
    generadoPor: "motor/auditar.mjs",
    generadoEn: new Date().toISOString(),
    fuente,
    hallazgos: hallazgos.length,
    citas: filas.length,
    coincide: cuenta("coincide"),
    folioCorrido: cuenta("folio corrido"),
    sinAncla: cuenta("sin ancla"),
    sinFolioDeclarado: cuenta("sin folio declarado"),
    documentoDistinto: filas.filter((f) => f.documentoDistinto).length,
  };

  mkdirSync(dirname(json), { recursive: true });
  writeFileSync(json, JSON.stringify({ ...resumen, filas }, null, 1), "utf8");

  const icono = {
    coincide: "ok ",
    "folio corrido": "!! ",
    "sin ancla": "XX ",
    "sin folio declarado": "?  ",
  };
  console.log(`Fuente: ${fuente}`);
  console.log(
    `${resumen.citas} citas en ${resumen.hallazgos} hallazgos — ` +
      `${resumen.coincide} coinciden · ${resumen.folioCorrido} con folio corrido · ` +
      `${resumen.sinAncla} sin ancla · ${resumen.documentoDistinto} atribuidas a otro documento\n`,
  );
  for (const f of filas) {
    const donde =
      f.estado === "coincide"
        ? `folio ${f.folioReal} · ${f.escala}`
        : f.estado === "folio corrido"
          ? `declara «${f.folioDeclarado}» → real: folio ${f.folioReal}` +
            (f.folioRealEnDocumento !== null
              ? `, folio ${f.folioRealEnDocumento} del documento`
              : "")
          : f.motivo;
    const doc = f.documentoDistinto
      ? `  · documento: declara ${f.documentoDeclarado}, está en ${f.documentoReal}`
      : "";
    console.log(
      `${icono[f.estado]}${f.hallazgo}.${f.evidencia}  ${f.modulo ?? "—"}  ${donde}${doc}`,
    );
    if (f.estado !== "coincide" || f.documentoDistinto) {
      console.log(`      cita: ${f.cita.slice(0, 96)}`);
      if (f.textoEnElExpediente) {
        console.log(`      dice: ${f.textoEnElExpediente.slice(0, 96)}`);
      }
    }
  }
  console.log(`\n→ ${json}`);

  // Sale distinto de cero si hay algo que corregir: sirve como compuerta antes
  // de congelar el alcance a las 15:30.
  const problemas = resumen.folioCorrido + resumen.sinAncla;
  process.exitCode = problemas ? 1 : 0;
  return { ...resumen, filas };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  auditar(args());
}

export { auditar, extraerArreglo, citaBuscable };
