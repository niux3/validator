/**
 * Checks if the length of a string is less than a specified maximum length.
 *
 * @param {string} value - The string to check.
 * @param {string|number} args - The maximum length allowed. Must be a positive integer.
 * @returns {boolean} - Returns `true` if the length of `value` is less than `args`, otherwise `false`.
 * @throws {Error} - Throws an error if `args` is not a positive integer.
 *
 * @example
 * // Example 1: Valid case (length is less than max)
 * const result1 = isMaxLength("Hello", 10);
 * console.log(result1); // Output: true
 *
 * @example
 * // Example 2: Valid case (length is equal to max)
 * const result2 = isMaxLength("Hello", 5);
 * console.log(result2); // Output: false
 *
 * @example
 * // Example 3: Valid case (length is greater than max)
 * const result3 = isMaxLength("Hello", 3);
 * console.log(result3); // Output: false
 *
 * @example
 * // Example 4: Error case (args is not a positive integer)
 * try {
 *   const result4 = isMaxLength("Hello", "abc");
 * } catch (e) {
 *   console.error(e.message); // Output: The params of method "is max length" must be a number
 * }
 */
export default (value:string, args:string|number):boolean => {
    if (!/^\d+$/.test(args.toString())) {
        throw new Error('The params of method "is max length" must be a number')
    }
    return value.length < parseInt(args.toString(), 10)
}
