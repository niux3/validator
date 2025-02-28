/**
 * Validates a credit card number using the Luhn algorithm and checks for specific card type formats.
 *
 * This function validates a credit card number by:
 * 1. Trimming the input string.
 * 2. Checking for non-numeric characters (excluding spaces and hyphens).
 * 3. Cleaning the string by removing spaces and hyphens.
 * 4. Verifying the length of the cleaned string (must be between 13 and 19 digits).
 * 5. Applying the Luhn algorithm to ensure the number is valid.
 * 6. Checking the card type (Visa, Mastercard, Amex, Diners Club, Discover) based on the starting digits and length.
 *
 * @param {string} value - The credit card number to validate.
 * @returns {boolean} - Returns `true` if the credit card number is valid, otherwise `false`.
 *
 * @example
 * // Example 1: Valid Visa card
 * const isValid1 = isValidCreditCard("4111 1111 1111 1111");
 * console.log(isValid1); // true
 *
 * @example
 * // Example 2: Valid Mastercard
 * const isValid2 = isValidCreditCard("5555 5555 5555 4444");
 * console.log(isValid2); // true
 */
export default (value:string) => {
    value = value.trim()

    // Vérifie si la valeur contient des caractères non numériques
    if (/[^0-9\- ]+/.test(value)) {
        return false
    }

    // Nettoie la chaîne (enlève espaces et tirets)
    value = value.replace(/\D/g, "")

    // Vérifie si la longueur est valide
    if (value.length < 13 || value.length > 19) {
        return false
    }

    // Applique l'algorithme de Luhn
    let sum = 0
    let shouldDouble = false

    for (let i = value.length - 1; i >= 0; i--) {
        let digit = parseInt(value[i], 10)

        if (shouldDouble) {
            digit *= 2
            if (digit > 9) digit -= 9 // Soustrait 9 si >= 10
        }

        sum += digit
        shouldDouble = !shouldDouble
    }

    // Retourne false si la somme n'est pas un multiple de 10
    if (sum % 10 !== 0) {
        return false
    }

    // Vérification des types de cartes (Visa, Mastercard, etc.)
    if (/^5[1-5]|^2[2-7]/.test(value)) return value.length === 16 // Mastercard
    if (/^4/.test(value)) return value.length === 13 || value.length === 16 // Visa
    if (/^3[47]/.test(value)) return value.length === 15 // Amex
    if (/^3(0[0-5]|[68])/.test(value)) return value.length === 14 // Diners Club
    if (/^6011/.test(value)) return value.length === 16 // Discover

    return false // Carte inconnue
}
