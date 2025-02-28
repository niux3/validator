/**
 * Checks if a value is a valid boolean-like value.
 *
 * This function checks if the provided value is one of the following:
 * - `true` or `false` (boolean)
 * - `0` or `1` (number)
 * - `"0"` or `"1"` (string)
 * - `"true"` or `"false"` (string)
 *
 * This is useful for validating values that can represent boolean states in various formats.
 *
 * @param {string | boolean | number} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a valid boolean-like value, otherwise `false`.
 *
 * @example
 * // Example 1: Valid boolean-like values
 * const isValid1 = isBooleanLike(true);
 * console.log(isValid1); // true
 *
 * const isValid2 = isBooleanLike("1");
 * console.log(isValid2); // true
 *
 * const isValid3 = isBooleanLike(0);
 * console.log(isValid3); // true
 *
 * @example
 * // Example 2: Invalid boolean-like values
 * const isValid4 = isBooleanLike("yes");
 * console.log(isValid4); // false
 *
 * const isValid5 = isBooleanLike(2);
 * console.log(isValid5); // false
 *
 * const isValid6 = isBooleanLike(null);
 * console.log(isValid6); // false
 */
export default (value:string|boolean|number)=>{
    return [true, false, 0, 1, "0", "1", "true", "false"].some(e => e === value)
}
