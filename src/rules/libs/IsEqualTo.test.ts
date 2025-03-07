import { describe, it, expect, beforeEach, afterEach } from "vitest"
import IsEqualTo from "./IsEqualTo"

describe("IsEqualTo", () => {
    // Crée un élément input pour les tests
    let input: HTMLInputElement

    beforeEach(() => {
        input = document.createElement("input")
        input.id = "testInput"
        document.body.appendChild(input)
    })

    // Nettoie le DOM après chaque test
    afterEach(() => {
        document.body.removeChild(input)
    })

    // Test 1: Comparaison avec un élément HTML input (valeur correspondante)
    it("should return true if the value matches the input element's value", () => {
        input.value = "Hello"
        expect(IsEqualTo("Hello", "#testInput")).toBe(true)
    })

    // Test 2: Comparaison avec un élément HTML input (valeur différente)
    it("should return false if the value does not match the input element's value", () => {
        input.value = "World"
        expect(IsEqualTo("Hello", "#testInput")).toBe(false)
    })

    // Test 3: Comparaison avec une chaîne de caractères numérique (valeurs égales)
    it("should return true if the value matches the numeric string", () => {
        expect(IsEqualTo("42", "42")).toBe(true)
    })

    // Test 4: Comparaison avec une chaîne de caractères non numérique (valeurs différentes)
    it("should return false if the value does not match the non-numeric string", () => {
        expect(IsEqualTo("Hello", "World")).toBe(false)
    })

    // Test 5: Comparaison avec une chaîne de caractères numérique (valeurs différentes)
    it("should return false if the numeric values are different", () => {
        expect(IsEqualTo("42", "24")).toBe(false)
    })

    // Test 6: Cas où le sélecteur ne correspond à aucun élément
    it("should handle cases where the selector does not match any element", () => {
        expect(IsEqualTo("42", "#nonExistentInput")).toBe(false)
    })

    // Test 7: Cas où `params` est une chaîne vide
    it("should return false if params is an empty string", () => {
        expect(IsEqualTo("Hello", "")).toBe(false)
    })

    // Test 8: Cas où `value` est une chaîne vide
    it("should return false if value is an empty string", () => {
        input.value = ""
        expect(IsEqualTo("", "#testInput")).toBe(true) // Correspond si l'input est vide
    })
})
