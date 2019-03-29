const crypto = require('crypto')

const randkey = module.exports

const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'
const similarCharacters = /[ilLI|`oO0]/g
const strictRules = [
  { name: 'lowercase', rule: /[a-z]/ },
  { name: 'uppercase', rule: /[A-Z]/ },
  { name: 'numbers', rule: /[0-9]/ },
  { name: 'symbols', rule: /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/ }
]

const generate = (options, pool) => {
  let key = ''
  const optionsLength = options.length
  const poolLength = pool.length

  for (let i = 0; i < optionsLength; i++) {
    key += pool[randomNumber(poolLength)]
  }

  if (options.strict) {
    const fitsRules = strictRules.reduce((result, rule) => {
      if (result == false) return false;

      if (options[rule.name] == false) return result

      return rule.rule.test(key)
    }, true)

    if (!fitsRules) {
      return generate(options, pool)
    }
  }

  return key
}

const randomNumber = (max) => {
  let rand = crypto.randomBytes(1)[0]
  while (rand >= 256 - (256 % max)) {
    rand = crypto.randomBytes(1)[0]
  }
  return rand % max
}


randkey.get = (options) => {
  options = options || {}

  if (!options.hasOwnProperty('length')) options.length = 10
  if (!options.hasOwnProperty('numbers')) options.numbers = false
  if (!options.hasOwnProperty('symbols')) options.symbols = false
  if (!options.hasOwnProperty('exclude')) options.exclude = ''
  if (!options.hasOwnProperty('uppercase')) options.uppercase = true
  if (!options.hasOwnProperty('excludeSimilarCharacters')) options.excludeSimilarCharacters = false
  if (!options.hasOwnProperty('strict')) options.strict = false

  if (options.strict) {
    const minStrictLength = 1 + (options.numbers ? 1 : 0) + (options.symbols ? 1 : 0) + (options.uppercase ? 1 : 0)
    if (minStrictLength > options.length) {
      throw new TypeError('Length must correlate with strict guidelines')
    }
  }

  let pool = lowercase

  if (options.uppercase) {
    pool += uppercase
  }
  if (options.numbers) {
    pool += numbers
  }
  if (options.symbols) {
    pool += symbols
  }

  if (options.excludeSimilarCharacters) {
    pool = pool.replace(similarCharacters, '')
  }

  let i = options.exclude.length
  while (i--) {
    pool = pool.replace(options.exclude[i], '')
  }

  const key = generate(options, pool)

  return key
}

randkey.getMulti = (amount, options) => {
  const keys = []

  for (let i = 0; i < amount; i++) {
    keys[i] = randkey.get(options)
  }

  return keys
};
