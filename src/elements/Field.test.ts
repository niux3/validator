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
            <form>
                <input type="text" name="subject" />
                <div id="errorSubject"></div>
                <div id="successSubject"></div>
            </form>
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
                    "isnotempty": {
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
        field.clean().validate().displayState()

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

    describe('getParamsFromHTML', () => {
        it('should extract validation rules and messages from HTML attributes', () => {
            // Configure les attributs HTML pour le test
            fieldElement.dataset.validateRules = 'isempty isminlength'
            fieldElement.dataset.validateTargetError = '#errorSubject'
            fieldElement.dataset.validateTargetSuccess = '#successSubject'
            fieldElement.setAttribute('data-error-isempty', 'doit être rempli')
            fieldElement.setAttribute('data-success-isempty', 'donnée valide')
            fieldElement.setAttribute('data-error-isminlength', 'Ce champ doit avoir minimum 3 caractères')
            fieldElement.setAttribute('data-success-isminlength', 'donnée valide')
            fieldElement.setAttribute('data-validate-isminlength-args', '3')

            // @ts-ignore - Accès forcé à la méthode privée
            field.getParamsFromHTML()

            // @ts-ignore Vérifie que this.params est correctement défini
            expect(field.params).toEqual({
                isempty: {
                    error: 'doit être rempli',
                    success: 'donnée valide',
                },
                isminlength: {
                    error: 'Ce champ doit avoir minimum 3 caractères',
                    success: 'donnée valide',
                    params: '3',
                },
                target: {
                    error: '#errorSubject',
                    success: '#successSubject',
                },
            })
        })

        it('should throw an error if data-validate-rules is missing', () => {
            // Supprime l'attribut data-validate-rules pour simuler l'erreur
            fieldElement.removeAttribute('data-validate-rules')

            // @ts-ignore - Accès forcé à la méthode privée
            expect(() => field.getParamsFromHTML()).toThrowError(
                'this.params is empty (field name : subject)'
            )
        })

        it('should throw an error if a rule is missing an error message', () => {
            // Configure les attributs HTML pour le test
            fieldElement.dataset.validateRules = 'isempty isminlength'
            fieldElement.dataset.validateTargetError = '#errorSubject'
            fieldElement.dataset.validateTargetSuccess = '#successSubject'
            fieldElement.setAttribute('data-error-isempty', 'doit être rempli')
            fieldElement.setAttribute('data-success-isempty', 'donnée valide')
            // Ne pas définir data-error-isminlength pour simuler l'erreur

            // @ts-ignore - Accès forcé à la méthode privée
            expect(() => field.getParamsFromHTML()).toThrowError(
                'field subject doesn\'t have error message for this rule : isminlength'
            )
        })
    })
})
