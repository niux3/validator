/**
 * Validates if a string is a valid email address.
 *
 * This function uses a comprehensive regular expression to check if the provided string:
 * 1. Matches the general structure of an email address (local part, `@` symbol, domain part).
 * 2. Conforms to the rules for valid characters in the local and domain parts of an email address.
 * 3. Supports common email formats, including those with special characters, quoted strings, and IP addresses in the domain.
 *
 * @param {string} value - The string to validate as an email address.
 * @returns {boolean} - Returns `true` if the string is a valid email address, otherwise `false`.
 *
 * @example
 * // Example 1: Valid email
 * const isValid1 = isEmail("test@example.com");
 * console.log(isValid1); // true
 *
 * @example
 * // Example 2: Valid email with special characters
 * const isValid2 = isEmail("user.name+tag+sorting@example.com");
 * console.log(isValid2); // true
*/
export default (value:string)=>{
     //let pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    let pattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
    return pattern.test(value.trim())
}
