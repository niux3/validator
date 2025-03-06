/**
 * Checks if a numeric value falls within a specified range.
 *
 * This function takes a numeric value (as a string or number) and a range string (in the format "min;max"),
 * converts them to numbers, and checks if the value is greater than the minimum and less than the maximum.
 * If the range format is invalid, an error is thrown.
 *
 * @param {string | number} value - The numeric value to check.
 * @param {string} params - A string representing the range in the format "min;max".
 * @returns {boolean} - Returns `true` if the value is within the specified range, otherwise `false`.
 * @throws {Error} - Throws an error if the range format is invalid.
 *
 * @example
 * // Example 1: Value within range
 * const isInRange1 = isInRange("5", "1;10");
 * console.log(isInRange1); // true
 *
 * @example
 * // Example 2: Invalid range format (missing max)
 * const isInRange2 = isInRange("5", "1");
 * console.log(isInRange2); // Throws an error
 */
export default (value: string | number, params: string):boolean => {
    let [min, max] = params.split(";")
    if (!min || !max) {
        throw new Error("Invalid range format. Expected 'minmax'.")
    }
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value
    return numValue > parseInt(min, 10) && numValue < parseInt(max, 10)
}
