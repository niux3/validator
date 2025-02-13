import { describe, it, expect } from "vitest"
import IsCreditCard from "../libs/IsCreditCard"

describe("Credit Card Validation with Luhn Algorithm", () => {
    it("should return true for valid Mastercard numbers", () => {
        expect(IsCreditCard("5105105105105100")).toBe(true) // Mastercard
        expect(IsCreditCard("2221000000000009")).toBe(true) // Nouveau Mastercard
    })

    it("should return true for valid Visa numbers", () => {
        expect(IsCreditCard("4111111111111111")).toBe(true) // Visa
        expect(IsCreditCard("4012888888881881")).toBe(true) // Visa valide
    })

    it("should return true for valid Amex numbers", () => {
        expect(IsCreditCard("371449635398431")).toBe(true) // Amex
    })

    it("should return false for invalid Luhn numbers", () => {
        expect(IsCreditCard("4111111111111112")).toBe(false) // Mauvais checksum
        expect(IsCreditCard("5105105105105101")).toBe(false) // Mauvais checksum
    })

    it("should return false for incorrect card formats", () => {
        expect(IsCreditCard("1234567812345670")).toBe(false) // Faux numéro
        expect(IsCreditCard("4111-1111-1111-1234")).toBe(false) // Mauvais checksum
    })

    it("should ignore spaces and dashes", () => {
        expect(IsCreditCard("4111 1111 1111 1111")).toBe(true)
        expect(IsCreditCard("5105-1051-0510-5100")).toBe(true)
    })

    it("should return false for non-numeric input", () => {
        expect(IsCreditCard("abcd efgh ijkl mnop")).toBe(false)
        expect(IsCreditCard("4111-1111-1111-XXXX")).toBe(false)
    })
})
