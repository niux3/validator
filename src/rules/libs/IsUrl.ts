/**
 * Checks if a string is a valid URL.
 *
 * @param {string} value - The string to validate as a URL.
 * @returns {boolean} - Returns `true` if the string is a valid URL, otherwise `false`.
 *
 * @example
 * // Example 1: Valid HTTP URL
 * const result1 = IsUrl("https://www.example.com");
 * console.log(result1); // Output: true
 *
 * @example
 * // Example 2: Valid HTTPS URL
 * const result2 = IsUrl("https://example.com");
 * console.log(result2); // Output: true
 *
 * @example
 * // Example 3: Valid URL with subdomain
 * const result3 = IsUrl("https://sub.example.com");
 * console.log(result3); // Output: true
 *
 * @example
 * // Example 4: Invalid URL (missing protocol)
 * const result4 = IsUrl("www.example.com");
 * console.log(result4); // Output: false
 *
 * @example
 * // Example 5: Invalid URL (malformed)
 * const result5 = IsUrl("example");
 * console.log(result5); // Output: false
*/
export default (value:string):boolean =>{
    const urlRegex = new RegExp(
        '^(https?:\\/\\/)?' + // Protocole (http:// ou https://)
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Nom de domaine
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // Ou une adresse IP (IPv4)
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port et chemin
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // Paramètres de requête
        '(\\#[-a-z\\d_]*)?$', // Fragment
        'i' // Insensible à la casse
    )
    return urlRegex.test(value.trim())
}
