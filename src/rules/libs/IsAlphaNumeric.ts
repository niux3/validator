/**
 * Checks if a string contains only alphanumeric characters (letters and numbers).
 *
 * This function uses a regular expression to validate that the string contains only letters (case-insensitive) and numbers.
 * Leading and trailing spaces are ignored using `trim()`.
 *
 * @param {string} value - The string to validate.
 * @returns {boolean} - Returns `true` if the string contains only alphanumeric characters, otherwise `false`.
 *
 * @example
 * // Example 1: Valid alphanumeric string
 * const isValid1 = isAlphanumeric("Hello123");
 * console.log(isValid1); // true
 *
 * @example
 * // Example 2: Invalid string (contains special characters)
 * const isValid2 = isAlphanumeric("Hello@123");
 * console.log(isValid2); // false
*/
export default (value:string):boolean =>{
    return new RegExp('^[a-z0-9]+$', 'i').test(value.trim())
}
