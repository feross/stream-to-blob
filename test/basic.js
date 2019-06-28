var test = require('tape')
var toBlob = require('../')
var toBuffer = require('blob-to-buffer')
var toStream = require('string-to-stream')

test('basic usage with Promise', function (t) {
  var str = '0123456789'
  var stream = toStream(str)
  toBlob(stream, 'text/plain')
    .then(function (blob) {
      toBuffer(blob, function (err, buf) {
        t.error(err)
        t.equal(buf.toString(), str)
        t.end(err)
      })
    })
    .catch(function (err) { t.error(err) })
})

test('basic usage (without MimeType) with Promise', function (t) {
  var str = '0123456789'
  var stream = toStream(str)
  toBlob(stream)
    .then(function (blob) {
      toBuffer(blob, function (err, buf) {
        t.error(err)
        t.equal(buf.toString(), str)
        t.end(err)
      })
    })
    .catch(function (err) { t.error(err) })
})

test('stress test usage with Promise', function (t) {
  var str = new Array(1000000).join('0123456789')
  var stream = toStream(str)
  toBlob(stream, 'text/plain')
    .then(function (blob) {
      toBuffer(blob, function (err, buf) {
        t.error(err)
        t.equal(buf.toString(), str)
        t.end(err)
      })
    })
    .catch(function (err) { t.error(err) })
})
