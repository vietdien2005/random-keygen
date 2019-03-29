const randkey = require('../main')

const key = randkey.get({
	length: 15, // defaults to 10
	numbers: true, // defaults to false
	symbols: true, // defaults to false
	uppercase: true, // defaults to true
	strict: true // defaults to false
})

console.log(key)

const keys = randkey.getMulti(10, {
	length: 15,
	numbers: true,
	symbols: true,
	uppercase: true
})

console.log(keys)
