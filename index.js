/* global Blob */

var once = require('once')

module.exports = {
  getBlob: function (stream, mimeType, cb) {
    if (typeof mimeType === 'function') return this.getBlob(stream, null, mimeType)
    cb = once(cb)
    var chunks = []
    stream
      .on('data', function (chunk) {
        chunks.push(chunk)
      })
      .on('end', function () {
        var blob = mimeType
          ? new Blob(chunks, { type: mimeType })
          : new Blob(chunks)
        cb(null, blob)
      })
      .on('error', cb)
  },
  getBlobPromise: function (stream, mimeType) {
    return new Promise(function(resolve, reject) {
      if (typeof mimeType === 'function') reject('Invalid mimetype, expected string, got function.');
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
        .on('error', function(err) { reject(err) })
    })
  }
}
