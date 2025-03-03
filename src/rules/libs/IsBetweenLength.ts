/**
 * Checks if the length of a string falls within a specified range.
 *
 * This function takes a string value and a range string (in the format "min;max"), converts the range values to numbers,
 * and checks if the length of the string is greater than the minimum and less than the maximum.
 * If the range format is invalid (e.g., missing `min` or `max`), an error is thrown.
 *
 * @param {string} value - The string to check.
 * @param {string} params - A string representing the range in the format "min;max".
 * @returns {boolean} - Returns `true` if the length of the string is within the specified range, otherwise `false`.
 * @throws {Error} - Throws an error if the range format is invalid.
 *
 * @example
 * // Example 1: Length within range
 * const isLengthInRange1 = isLengthInRange("Hello", "1;10");
 * console.log(isLengthInRange1); // true
 *
 * @example
 * // Example 2: Length below range
 * const isLengthInRange2 = isLengthInRange("Hi", "5;10");
 * console.log(isLengthInRange2); // false
 *
 * @example
 * // Example 3: Length above range
 * const isLengthInRange3 = isLengthInRange("HelloWorld", "1;5");
 * console.log(isLengthInRange3); // false
 *
 * @example
 * // Example 4: Length at the boundary (exclusive)
 * const isLengthInRange4 = isLengthInRange("Hello", "1;5");
 * console.log(isLengthInRange4); // false
 *
 * @example
 * // Example 5: Invalid range format (missing max)
 * const isLengthInRange5 = isLengthInRange("Hello", "1");
 * console.log(isLengthInRange5); // Throws an error
*/
export default (value: string, params: string) => {
    if(typeof params !== 'string'){
        throw new Error("Invalid range format. Expected 'minmax' (isbetweenlength).")
    }
    if(!params.includes(';')){
        throw new Error("arguments must be separated by a semicolon example: 2;3 (isbetweenlength).")
    }
    let [min, max] = params.split(";")
    return value.length > parseInt(min, 10) && value.length < parseInt(max, 10)
}
