/* ollama.mjs — cliente mínimo del modelo local.
 *
 * Todo el razonamiento ocurre en esta máquina. El expediente no sale de aquí:
 * no hay API de terceros, no hay red. Esa es una propiedad de arquitectura, no
 * una promesa del pitch — se puede demostrar desconectando el WiFi en tarima.
 *
 * Dos decisiones fijas, y las dos se defienden:
 *  - temperatura 0 y semilla fija, para que la misma entrada dé la misma salida
 *    en dos corridas seguidas. Medido antes del evento: idéntica byte a byte.
 *  - formato JSON forzado, para que la salida se pueda validar en vez de
 *    interpretarse a ojo.
 */

const URL_BASE = process.env.OLLAMA_URL ?? "http://127.0.0.1:11434";
export const MODELO_POR_DEFECTO = process.env.OLLAMA_MODELO ?? "qwen2.5:3b";
export const SEMILLA = 7;

export async function estaViva(url = URL_BASE) {
  try {
    const r = await fetch(`${url}/api/tags`, { signal: AbortSignal.timeout(3000) });
    if (!r.ok) return { viva: false, motivo: `HTTP ${r.status}` };
    const { models } = await r.json();
    return { viva: true, modelos: models.map((m) => m.name) };
  } catch (e) {
    return { viva: false, motivo: e.message };
  }
}

/**
 * Una llamada, una tarea. Nunca se le piden dos cosas distintas al modelo en el
 * mismo turno: medido antes del evento, pedir extracción y detección de huecos
 * juntas le hizo pasar por alto un "no adjunto" escrito en el propio texto.
 *
 * @returns {Promise<{json:object|null, texto:string, ms:number, intentos:number,
 *                    modelo:string, error?:string}>}
 */
export async function preguntar({
  sistema,
  prompt,
  modelo = MODELO_POR_DEFECTO,
  semilla = SEMILLA,
  temperatura = 0,
  numCtx = 8192,
  intentosMax = 2,
  url = URL_BASE,
}) {
  const cuerpo = {
    model: modelo,
    system: sistema,
    prompt,
    stream: false,
    format: "json",
    options: {
      temperature: temperatura,
      seed: semilla,
      num_ctx: numCtx,
      // top_k/top_p neutralizados: con temperatura 0 no deberían influir, pero
      // dejarlos explícitos evita que un cambio de default de Ollama mueva la
      // salida sin que nos demos cuenta.
      top_k: 1,
      top_p: 1,
      repeat_penalty: 1,
    },
  };

  const t0 = Date.now();
  let ultimoTexto = "";
  let ultimoError = null;

  for (let intento = 1; intento <= intentosMax; intento++) {
    let respuesta;
    try {
      respuesta = await fetch(`${url}/api/generate`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cuerpo),
        signal: AbortSignal.timeout(180000),
      });
    } catch (e) {
      // Degradación explícita: si el modelo local no responde, se dice con hora
      // y no se inventa nada. Nunca se cae hacia una API remota.
      return {
        json: null,
        texto: "",
        ms: Date.now() - t0,
        intentos: intento,
        modelo,
        error: `el modelo local no respondió: ${e.message}`,
        hora: new Date().toISOString(),
      };
    }

    if (!respuesta.ok) {
      ultimoError = `HTTP ${respuesta.status}`;
      continue;
    }

    const datos = await respuesta.json();
    ultimoTexto = datos.response ?? "";
    try {
      return {
        json: JSON.parse(ultimoTexto),
        texto: ultimoTexto,
        ms: Date.now() - t0,
        intentos: intento,
        modelo,
        evalCount: datos.eval_count ?? null,
        tokensPorSegundo:
          datos.eval_count && datos.eval_duration
            ? +(datos.eval_count / (datos.eval_duration / 1e9)).toFixed(1)
            : null,
      };
    } catch {
      ultimoError = "la respuesta no es JSON válido";
    }
  }

  return {
    json: null,
    texto: ultimoTexto,
    ms: Date.now() - t0,
    intentos: intentosMax,
    modelo,
    error: ultimoError,
    hora: new Date().toISOString(),
  };
}
