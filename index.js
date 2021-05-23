/*! stream-to-blob. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* global Blob */

module.exports = iteratorToBlob

async function iteratorToBlob (stream, type) {
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return new Blob(chunks, { type })
}
