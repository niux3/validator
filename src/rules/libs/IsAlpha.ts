/**
 * Checks if a string contains only alphabetic characters (uppercase or lowercase).
 * 
 * This function uses a regular expression to validate that the string contains only letters from the alphabet.
 * Leading and trailing spaces are ignored using `trim()`.
 * 
 * @param {string} value - The string to validate.
 * @returns {boolean} - Returns `true` if the string contains only alphabetic characters, otherwise `false`.
 * 
 * @example
 * // Example 1: Valid string
 * const isValid1 = isAlphaOnly("HelloWorld");
 * console.log(isValid1); // true
 * 
 * @example
 * // Example 2: Invalid string (contains numbers)
 * const isValid2 = isAlphaOnly("Hello123");
 * console.log(isValid2); // false
 * 
 * @example
 * // Example 3: Invalid string (contains spaces)
 * const isValid3 = isAlphaOnly("Hello World");
 * console.log(isValid3); // false
 * 
 * @example
 * // Example 4: Valid string (leading and trailing spaces are ignored)
 * const isValid4 = isAlphaOnly("  HelloWorld  ");
 * console.log(isValid4); // true
 */
export default (value:string)=>{
    return new RegExp('^[a-zA-Z]+$').test(value.trim())
}
