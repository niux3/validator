export default (...args: any[]) => {
    let value = args[0]

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
