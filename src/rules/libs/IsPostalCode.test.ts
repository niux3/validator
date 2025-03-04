import { describe, it, expect } from 'vitest'
import IsPostalCodeValid from './IsPostalCode'

describe('IsPostalCodeValid', () => {
    it('should validate French postal codes correctly', () => {
        expect(IsPostalCodeValid("75001", "FR")).toBe(true) // Valide
        expect(IsPostalCodeValid("7500A", "FR")).toBe(false) // Invalide (lettre)
        expect(IsPostalCodeValid("7500", "FR")).toBe(false) // Invalide (trop court)
        expect(IsPostalCodeValid("750001", "FR")).toBe(false) // Invalide (trop long)
    })

    it('should validate US postal codes correctly', () => {
        expect(IsPostalCodeValid("12345", "US")).toBe(true) // Valide
        expect(IsPostalCodeValid("12345-6789", "US")).toBe(true) // Valide avec format étendu
        expect(IsPostalCodeValid("1234", "US")).toBe(false) // Invalide (trop court)
        expect(IsPostalCodeValid("123456", "US")).toBe(false) // Invalide (trop long)
        expect(IsPostalCodeValid("12345-678", "US")).toBe(false) // Invalide (format étendu incorrect)
    })

    it('should validate Canadian postal codes correctly', () => {
        expect(IsPostalCodeValid("K1A 0B1", "CA")).toBe(true) // Valide
        expect(IsPostalCodeValid("K1A0B1", "CA")).toBe(true) // Valide (sans espace)
        expect(IsPostalCodeValid("K1A 0B", "CA")).toBe(false) // Invalide (trop court)
        expect(IsPostalCodeValid("K1A 0B12", "CA")).toBe(false) // Invalide (trop long)
        expect(IsPostalCodeValid("1A1 A1A", "CA")).toBe(false) // Invalide (mauvais format)
    })

    it('should return false for unsupported countries', () => {
        expect(IsPostalCodeValid("12345", "XX")).toBe(false) // Pays non supporté
        expect(IsPostalCodeValid("75001", "ZZ")).toBe(false) // Pays non supporté
    })

    it('should handle edge cases', () => {
        expect(IsPostalCodeValid("", "FR")).toBe(false) // Chaîne vide
        expect(IsPostalCodeValid("75001", "")).toBe(false) // Pays vide
        // @ts-ignore
        expect(IsPostalCodeValid(75001, "FR")).toBe(false) // Type incorrect (nombre au lieu de chaîne)
    })
})
