const test = require('tape')
// Could perhaps be replace with blob.text()
const toBuffer = require('blob-to-buffer')
// TODO: replace with stream.Readable.from
const toStream = require('string-to-stream')
const toBlob = require('../index.js')

test('basic usage with Promise', t => {
  t.plan(2)
  const str = '0123456789'
  const stream = toStream(str)
  toBlob(stream, 'text/plain')
    .then(blob => {
      toBuffer(blob, (err, buf) => {
        t.error(err)
        t.equal(buf.toString(), str)
      })
    })
    .catch(err => t.fail(err))
})

test('basic usage (without MimeType) with Promise', t => {
  t.plan(2)
  const str = '0123456789'
  const stream = toStream(str)
  toBlob(stream)
    .then(blob => {
      toBuffer(blob, (err, buf) => {
        t.error(err)
        t.equal(buf.toString(), str)
      })
    })
    .catch(err => t.fail(err))
})

test('stress test usage with Promise', t => {
  t.plan(2)
  const str = new Array(1000000).join('0123456789')
  const stream = toStream(str)
  toBlob(stream, 'text/plain')
    .then(blob => {
      toBuffer(blob, (err, buf) => {
        t.error(err)
        t.equal(buf.toString(), str)
      })
    })
    .catch(err => t.fail(err))
})
