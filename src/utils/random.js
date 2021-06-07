/**
 * @param {number} low The lower bound (inclusive)
 * @param {number} high The upper bound (exclusive)
 * @returns {number} A random number between low and high
 */
export const randomRange = (low, high) => Math.random() * (high - low) + low;

/**
  * @param {number} low The lower bound (inclusive)
  * @param {number} high The upper bound (inclusive)
  * @returns {number} A random integer between low and high
  */
export const irandomRange = (low, high) => Math.floor(randomRange(low, high + 1));
 
/**
 * @param {number[]} list A list of numbers
 * @returns {number} the sum of numbers in the list
 */
const sum = (list) => list.reduce((total, value) => total + value, 0);

/**
  * @returns {number} a random number between 0.8 and 1.2
  */
export const random20 = () => 1 + irandomRange(-20, 20) / 100;

/**
 * @param {Map<T, number>} options A map of options to their weight
 * @returns {T} One of the options, chosen randomly
 */
export const chooseWeighted = (options) => {
  const totalWeight = sum([...options.values()]);
  let which = irandomRange(1, totalWeight);
  for (const [item, weight] of options) {
    which -= weight;
    if (which <= 0) { return item; }
  }
};