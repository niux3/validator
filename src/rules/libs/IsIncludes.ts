/**
 * Checks if the provided value (string or number) is included in the `valueCheck` array or string.
 *
 * @param {string|number} value - The value to check for inclusion. Can be a string or a number.
 * @param {string|string[]|numbers[]}valueCheck - The list of values or string to check against. Can be a string, an array of strings, or an array of numbers.
 *
 * @returns {boolean} - Returns `true` if `value` is included in `valueCheck`, otherwise `false`.
 *
 * @example
 * // Example 1: Valid usage with a string array
 * const result1 = isIncluded("apple", ["banana", "apple", "orange"]);
 * console.log(result1); // true, because "apple" is included in the array
 *
 * @example
 * // Example 2: Valid usage with a number array
 * const result2 = isIncluded(42, [10, 20, 30, 42]);
 * console.log(result2); // true, because 42 is included in the array
 *
 * @example
 * // Example 3: Valid usage with a string
 * const result3 = isIncluded("hello", "hello world");
 * console.log(result3); // true, because "hello" is included in the string "hello world"
 *
 * @example
 * // Example 4: Value not included
 * const result4 = isIncluded("grape", ["banana", "apple", "orange"]);
 * console.log(result4); // false, because "grape" is not included in the array
*/
export default (value:string|number, valueCheck:string|string[]|number[]):boolean =>{
    return valueCheck.toString().includes(value.toString())
}
