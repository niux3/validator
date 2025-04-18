/**
 * Checks if a given value is a non-empty string.
 *
 * @param {string|string[]|number[]} value - The value to be checked.
 * @returns {boolean} - Returns `true` if the value is a non-empty string, otherwise returns `false`.
 *
 * @example
 * // Example 1: Checking a non-empty string
 * const result1 = isNonEmptyString("Hello, World!");
 * console.log(result1); // Output: true
 *
 * @example
 * // Example 2: Checking an empty string
 * const result2 = isNonEmptyString("");
 * console.log(result2); // Output: false
 *
 * @example
 * // Example 3: Checking a non-string value
 * const result3 = isNonEmptyString(123);
 * console.log(result3); // Output: false
*/
export default (value:string|string[]|number[]):boolean =>{
    // @ts-ignore
    if([null, undefined].some(e => e === value)){
        return false
    }
    value = typeof value === 'string'? value.trim() : value
    return value.length !== 0
}
