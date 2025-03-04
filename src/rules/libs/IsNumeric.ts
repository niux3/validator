/**
 * Vérifie si une valeur donnée est composée uniquement de chiffres.
 *
 * @param value - La valeur à tester. Peut être une chaîne de caractères (string) ou un nombre (number).
 * @returns `true` si la valeur est composée uniquement de chiffres, sinon `false`.
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
