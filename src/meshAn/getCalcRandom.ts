const { random, floor } = Math

export const getRandomFloat = (min: number, max: number): number => random() * (max - min) + min

export const getRandomInt = (min: number, max: number): number => floor(random() * (max - min)) + min

export const getRandomItem = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)]
