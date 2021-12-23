const { random, floor } = Math

// getRandom float
const getRandomFloat = (min, max) => (random() * (max - min)) + min

// getRandom int
const getRandomInt = (min, max) => floor(random() * (max - min)) + min

// getRandom items
const getRandomItem = arr => arr[getRandomInt(0, arr.length - 1)]


export { getRandomFloat, getRandomInt, getRandomItem }