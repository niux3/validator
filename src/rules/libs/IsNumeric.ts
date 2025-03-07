/**
 * Checks if a given value consists only of digits.
 *
 * @param {string|number} value - The value to test. Can be a string or a number.
 * @returns {boolean} - return `true` if the value is composed only of digits, otherwise `false`.
 *
 * @example
 * ```typescript
 * import isNumeric from './isNumeric';
 *
 * console.log(isNumeric("12345")); // true
 * console.log(isNumeric("123abc")); // false
 * console.log(isNumeric(42)); // true
 * console.log(isNumeric("42")); // true
 * console.log(isNumeric("0")); // true
 * console.log(isNumeric("")); // false
 * ```
*/
export default (value:string|number):boolean => {
    // @ts-ignore
    return new RegExp('^[0-9]+$').test(value)
}
