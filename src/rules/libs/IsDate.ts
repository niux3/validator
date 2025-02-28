/**
 * Validates if a string is a valid date in the format `YYYY-MM-DD` within a reasonable year range (1900-2100).
 *
 * This function checks if the provided string:
 * 1. Is not empty, `null`, or `undefined`.
 * 2. Matches the format `YYYY-MM-DD`.
 * 3. Represents a valid date (e.g., valid month, day, and year ranges).
 *
 * @param {string} value - The string to validate.
 * @returns {boolean} - Returns `true` if the string is a valid date in the format `YYYY-MM-DD`, otherwise `false`.
 *
 * @example
 * // Example 1: Valid date
 * const isValid1 = isValidDate("2023-10-05");
 * console.log(isValid1); // true
 *
 * @example
 * // Example 2: Invalid date
 * const isValid2 = isValidDate("1899-02-30");
 * console.log(isValid2); // false
*/
export default (value:string) => {
    if (['', null, undefined].some(e => e === value)) {
        return false
    }

    // check if format YYYY-MM-DD
    let match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!match) {
        return false
    }

    let [_, y, m, d] = match.map(Number) // Convertit in Number

    return (
        m > 0 &&
        m < 13 &&
        y > 0 &&
        y < 32768 &&
        d > 0 &&
        d <= new Date(y, m, 0).getDate()
    )
}
