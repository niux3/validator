/**
 * Validates a postal code based on the specified country.
 *
 * @param value - The postal code to validate. Must be a string.
 * @param country - The country code (e.g., "FR" for France, "US" for the United States).
 * @returns `true` if the postal code is valid for the specified country, otherwise `false`.
 *
 * @example
 * ```typescript
 * import isPostalCodeValid from './isPostalCodeValid';
 *
 * // Valid French postal code
 * console.log(isPostalCodeValid("75001", "FR")); // true
 *
 * // Invalid French postal code
 * console.log(isPostalCodeValid("75A01", "FR")); // false
 *
 * // Valid US postal code
 * console.log(isPostalCodeValid("12345", "US")); // true
 *
 * // Valid US postal code with extended format
 * console.log(isPostalCodeValid("12345-6789", "US")); // true
 *
 * // Invalid country code
 * console.log(isPostalCodeValid("12345", "XX")); // false (country not supported)
 * ```
*/
export default (value:string, country:string):boolean =>{
    // common patterns
    let threeDigit = /^\d{3}$/,
        fourDigit = /^\d{4}$/,
        fiveDigit = /^\d{5}$/,
        sixDigit = /^\d{6}$/,
        patterns:{[ country:string ]: any} = {
            AD: /^AD\d{3}$/,
            AT: fourDigit,
            AU: fourDigit,
            BE: fourDigit,
            BG: fourDigit,
            BR: /^\d{5}-\d{3}$/,
            CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
            CH: fourDigit,
            CZ: /^\d{3}\s?\d{2}$/,
            DE: fiveDigit,
            DK: fourDigit,
            DZ: fiveDigit,
            EE: fiveDigit,
            ES: fiveDigit,
            FI: fiveDigit,
            FR: /^\d{2}\s?\d{3}$/,
            GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
            GR: /^\d{3}\s?\d{2}$/,
            HR: /^([1-5]\d{4}$)/,
            HU: fourDigit,
            ID: fiveDigit,
            IL: fiveDigit,
            IN: sixDigit,
            IS: threeDigit,
            IT: fiveDigit,
            JP: /^\d{3}\-\d{4}$/,
            KE: fiveDigit,
            LI: /^(948[5-9]|949[0-7])$/,
            LT: /^LT\-\d{5}$/,
            LU: fourDigit,
            LV: /^LV\-\d{4}$/,
            MX: fiveDigit,
            MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
            NL: /^\d{4}\s?[a-z]{2}$/i,
            NO: fourDigit,
            NZ: fourDigit,
            PL: /^\d{2}\-\d{3}$/,
            PR: /^00[679]\d{2}([ -]\d{4})?$/,
            PT: /^\d{4}\-\d{3}?$/,
            RO: sixDigit,
            RU: sixDigit,
            SA: fiveDigit,
            SE: /^[1-9]\d{2}\s?\d{2}$/,
            SI: fourDigit,
            SK: /^\d{3}\s?\d{2}$/,
            TN: fourDigit,
            TW: /^\d{3}(\d{2})?$/,
            UA: fiveDigit,
            US: /^\d{5}(-\d{4})?$/,
            ZA: fourDigit,
            ZM: fiveDigit,
    }

    if(!Object.keys(patterns).includes(country) || typeof value !== 'string'){
        return false
    }
    return patterns[country.toUpperCase()].test(value)
}
