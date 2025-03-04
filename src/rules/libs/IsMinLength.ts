/**
 * Checks if the length of the provided string value is greater than a specified minimum length.
 *
 * @param value - The string to be checked.
 * @param args - An object containing the parameters for the validation.
 *
 * @returns {boolean} - Returns `true` if the length of `value` is greater than the specified minimum length, otherwise `false`.
 *
 * @throws {Error} - Throws an error if `args.params` is not a valid number.
 *
 * @example
 * // Example 1: Valid usage with a number
 * const result1 = isMinLength("hello", 3);
 * console.log(result1); // true, because "hello" has 5 characters which is greater than 3
 *
 * @example
 * // Example 2: Valid usage with a string representing a number
 * const result2 = isMinLength("hello", 7);
 * console.log(result2); // false, because "hello" has 5 characters which is less than 7
 *
 * @example
 * // Example 3: Invalid usage with a non-numeric string
 * try {
 *   const result3 = isMinLength("hello", "abc");
 * } catch (e) {
 *   console.error(e.message); // "The params of method 'is min length' must be a number"
 * }
 */
export default (value:string, args:string|number):boolean => {
    if (!/^\d+$/.test(args.toString())) {
        throw new Error('The params of method "is min length" must be a number')
    }
    return value.length > parseInt(args.toString(), 10)
}
