const chai = require('chai')
const assert = chai.assert
const _ = require('underscore')

const randkey = require('../main')

describe('random-keygen', function() {
  describe('get()', function() {
    it('should accept to be called without the options parameter', function() {
      assert.doesNotThrow(function() {
        randkey.get()
      })
    })

    it('should give key of correct length', function() {
      var length = 12

      var key = randkey.get({ length: length })

      assert.equal(key.length, length)
    })

    it('should get strict random sequence that is correct length', function() {
      var length = 12

      var key = randkey.get({ length: length, strict: true })

      assert.equal(key.length, length)
    })

    it('should remove possible similar characters from the sequences', function() {
      var key = randkey.get({ length: 10000, excludeSimilarCharacters: true })

      assert.notMatch(key, /[ilLI|`oO0]/, 'key does not contain similar characters')
    })

    describe('strict mode', function() {
      var amountToGenerate = 500

      it('should generate strict random sequence that has strictly at least one number', function() {
        var keys = randkey.getMulti(amountToGenerate, { length: 4, strict: true, uppercase: false, numbers: true })

        keys.forEach(function(key) {
          assert.match(key, /[0-9]/, 'key has a number')
        })
        assert.equal(keys.length, amountToGenerate)
      })

      it('should generate strict random sequence that has strictly at least one lowercase letter', function() {
        var keys = randkey.getMulti(amountToGenerate, { length: 4, strict: true, uppercase: false })

        keys.forEach(function(key) {
          assert.match(key, /[a-z]/, 'key has a lowercase letter')
        })
        assert.equal(keys.length, amountToGenerate)
      })

      it('should generate strict random sequence that has strictly at least one uppercase letter', function() {
        var keys = randkey.getMulti(amountToGenerate, { length: 4, strict: true, uppercase: true })

        keys.forEach(function(key) {
          assert.match(key, /[A-Z]/, 'key has an uppercase letter')
        })
        assert.equal(keys.length, amountToGenerate)
      })

      it('should throw an error if rules don\'t correlate with length', function() {
        assert.throws(function() {
          randkey.get({ length: 2, strict: true, symbols: true, numbers: true })
        }, TypeError, 'Length must correlate with strict guidelines')
      })

      it('should generate short strict keys without stack overflow', function() {
        assert.doesNotThrow(function() {
          randkey.get({ length: 4, strict: true, uppercase: true, numbers: true, symbols: true })
        }, Error)
      })
    })
  })

  describe('getMulti()', function() {
    it('should accept to be called without the options parameter', function() {
      assert.doesNotThrow(function() {
        randkey.getMulti(1)
      })
    })
    it('should give right amount of keys', function() {
      var amount = 34

      var keys = randkey.getMulti(amount)

      assert.equal(keys.length, amount)
    })

    it('should not give duplicates in pool', function() {
      var keys = randkey.getMulti(250, { length: 10, numbers: true, symbols: true })

      var unique = _.uniq(keys)
      assert.equal(unique.length, keys.length)
    })
  })
})
