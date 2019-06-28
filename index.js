/* global Blob */

module.exports = function (stream, mimeType) {
  return new Promise(function (resolve, reject) {
    if (typeof mimeType === 'function') {
      reject(new Error('Invalid mimetype, expected string, got function.'))
    }
    let chunks = []
    stream.on('data', function (chunk) {
      chunks.push(chunk)
    })
      .on('end', function () {
        if (typeof mimeType === 'string') {
          resolve(new Blob(chunks, { type: mimeType }))
        } else {
          resolve(new Blob(chunks))
        }
      })
      .on('error', function (err) { reject(err) })
  })
}
