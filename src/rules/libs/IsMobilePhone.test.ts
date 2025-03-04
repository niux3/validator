import { describe, it, expect } from 'vitest'
import IsMobilePhone from './IsMobilePhone'

describe('IsMobilePhone', () => {
    it('should validate US phone numbers correctly', () => {
        expect(IsMobilePhone("+1-800-555-5555", "en-US")).toBe(true) // Valide
        expect(IsMobilePhone("8005555555", "en-US")).toBe(true) // Valide
        expect(IsMobilePhone("12345", "en-US")).toBe(false) // Invalide (trop court)
        expect(IsMobilePhone("800-555-5555-1234", "en-US")).toBe(false) // Invalide (trop long)
    })

    it('should validate French phone numbers correctly', () => {
        expect(IsMobilePhone("0612345678", "fr-FR")).toBe(true) // Valide
        expect(IsMobilePhone("+33612345678", "fr-FR")).toBe(true) // Valide
        expect(IsMobilePhone("061234567", "fr-FR")).toBe(false) // Invalide (trop court)
        expect(IsMobilePhone("06123456789", "fr-FR")).toBe(false) // Invalide (trop long)
    })

    it('should validate Canadian phone numbers correctly', () => {
        expect(IsMobilePhone("+1-613-555-0175", "en-CA")).toBe(true) // Valide
        expect(IsMobilePhone("6135550175", "en-CA")).toBe(true) // Valide
        expect(IsMobilePhone("613-555-017", "en-CA")).toBe(false) // Invalide (trop court)
        expect(IsMobilePhone("613-555-01755", "en-CA")).toBe(false) // Invalide (trop long)
    })

    it('should validate UK phone numbers correctly', () => {
        expect(IsMobilePhone("07700900123", "en-GB")).toBe(true) // Valide
        expect(IsMobilePhone("0770090012", "en-GB")).toBe(false) // Invalide (trop court)
        expect(IsMobilePhone("077009001234", "en-GB")).toBe(false) // Invalide (trop long)
    })

    it('should return false for unsupported countries', () => {
        expect(IsMobilePhone("1234567890", "xx-XX")).toBe(false) // Pays non supporté
        expect(IsMobilePhone("0612345678", "zz-ZZ")).toBe(false) // Pays non supporté
    })

    it('should handle edge cases', () => {
        expect(IsMobilePhone("", "fr-FR")).toBe(false) // Chaîne vide
        expect(IsMobilePhone("0612345678", "")).toBe(false) // Pays vide
        expect(IsMobilePhone(612345678, "fr-FR")).toBe(false) // Type incorrect (nombre au lieu de chaîne)
    })
})
