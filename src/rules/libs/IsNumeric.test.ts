import { describe, it, expect } from 'vitest'
import isNumeric from './IsNumeric'

describe('isNumeric', () => {
    it('should return true for a string containing only digits', () => {
        expect(isNumeric("12345")).toBe(true)
        expect(isNumeric("0")).toBe(true)
    })

    it('should return false for a string containing non-digit characters', () => {
        expect(isNumeric("123abc")).toBe(false)
        expect(isNumeric("abc")).toBe(false)
        expect(isNumeric("123.45")).toBe(false)
        expect(isNumeric("123,45")).toBe(false)
    })

    it('should return true for a number', () => {
        expect(isNumeric(42)).toBe(true)
        expect(isNumeric(0)).toBe(true)
        expect(isNumeric(-0)).toBe(true) // -0 est techniquement un nombre
    })

    it('should return false for an empty string', () => {
        expect(isNumeric("")).toBe(false)
    })

    it('should return false for non-string and non-number inputs', () => {
        // @ts-ignore
        expect(isNumeric({})).toBe(false)
        // @ts-ignore
        expect(isNumeric([])).toBe(false)
        // @ts-ignore
        expect(isNumeric(null)).toBe(false)
        // @ts-ignore
        expect(isNumeric(undefined)).toBe(false)
    })
})
