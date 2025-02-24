import { describe, it, expect, beforeEach } from 'vitest'
import { Field } from './Field'
import { ElementHTMLProperties } from './ElementHTML.type'
import { Rules } from '../rules/Rules'

describe('Field', () => {
    let fieldElement: HTMLInputElement
    let field: Field

    beforeEach(() => {
        // Reset le DOM
        document.body.innerHTML = `
            <input type="text" name="subject" />
            <div id="errorSubject"></div>
            <div id="successSubject"></div>
        `

        fieldElement = document.querySelector('input[name="subject"]') as HTMLInputElement

        // Créer les propriétés du champ
        const fieldProps: ElementHTMLProperties = {
            element: fieldElement,
            id: { html: "", fo: 0, fi: 0 },
            params: {
                
                    "target": {
                        "error": "#errorSubject",
                        "success": "#successSubject",
                    },
                    "isempty": {
                        "error": "doit être rempli",
                        "success": "donnée valide",
                    },
                    "isminlength": {
                        "params": 3,
                        "error": "Ce champ doit avoir minimum 3 caractères",
                        "success": "donnée valide"
                    }
            },
            state: null,
            rules: new Rules(),
        }

        field = new Field(fieldProps)
    })

    it('should initialize with the correct properties', () => {
        expect(field.$el).toBe(fieldElement)
        // @ts-ignore
        expect(field.id.fo).toBe(0)
        // @ts-ignore
        expect(field.id.fi).toBe(0)
    })

    it('should display an error message if the field is empty', () => {
        fieldElement.value = '' // Simule un champ vide
        field.validate().displayState()

        const errorDiv = document.querySelector('#errorSubject') as HTMLElement
        expect(errorDiv.innerHTML).toContain("doit être rempli")
    })

    it('should display a success message if the field meets the minLength rule', () => {
        fieldElement.value = 'test' // Remplir avec un texte valide
        field.validate().displayState()

        const successDiv = document.querySelector('#successSubject') as HTMLElement
        expect(successDiv.innerHTML).toContain("donnée valide")
    })

    it('should clear the field state', () => {
        field.clean()
        // @ts-ignore
        expect(document.getElementById(field.id.html!)).toBeNull()
    })
})
