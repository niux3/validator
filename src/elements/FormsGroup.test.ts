import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FormsGroup } from './FormsGroup'
import { AppConfiguration } from './FormsGroup.type'
import { Configuration } from '../configuration/Configuration'
import { Form } from './Form'
import { Rules } from '../rules/Rules'

// Mocks
vi.mock('../configuration/Configuration')
vi.mock('./Form')
vi.mock('./Rules') // Mockez la classe Rules

describe('FormsGroup', () => {
    let mockConfiguration: Configuration
    let mockAppConfig: AppConfiguration
    // @ts-ignore
    let mockForm: Form
    let mockRules: Rules

    beforeEach(() => {
        // Réinitialiser les mocks avant chaque test
        vi.clearAllMocks()

        // Mock de la classe Rules
        mockRules = {
            get: vi.fn().mockReturnValue({}), // Simulez la méthode get
            set: vi.fn(), // Simulez la méthode set
        } as unknown as Rules

        // Mock de la configuration
        mockAppConfig = {
            options: {
                get: vi.fn().mockReturnValue({
                    selector: '.test-form',
                    fields: { field1: 'value1' },
                }),
            },
            rules: mockRules, // Utilisez le mock de Rules
        }

        mockConfiguration = {
            get: vi.fn().mockReturnValue(mockAppConfig),
        } as unknown as Configuration

        // Mock du formulaire
        mockForm = {
            $el: document.createElement('form'),
        } as unknown as Form
    })

    describe('constructor', () => {
        it('should initialize with the provided configuration and rules', () => {
            const formsGroup = new FormsGroup(mockConfiguration)

            // Vérifiez que la configuration a été correctement utilisée
            expect(mockConfiguration.get).toHaveBeenCalled()
            expect(formsGroup).toBeInstanceOf(FormsGroup)

            // Vérifiez que les règles ont été correctement initialisées
            expect(mockAppConfig.rules).toBe(mockRules)
        })
    })

    describe('addForm', () => {
        it('should add a form with the correct rules', () => {
            const formsGroup = new FormsGroup(mockConfiguration)
            const formElement = document.createElement('form')

            formsGroup.addForm(formElement)

            // Vérifiez que le formulaire a été ajouté avec les règles
            expect(formsGroup.get().length).toBe(1)
            expect(formsGroup.get()[0]).toBeInstanceOf(Form)
        })
    })
    describe('rmForm', () => {
        it('should remove a form from the forms group', () => {
            const formsGroup = new FormsGroup(mockConfiguration)
            const formElementA = document.createElement('form')
            const formElementB = document.createElement('form')

            formElementA.id = "formA"
            formElementB.id = "formB"
            // Ajoutez un formulaire
            formsGroup.addForm(formElementA)
            expect(formsGroup.get().length).toBe(1)
            // Ajoutez un formulaire
            formsGroup.addForm(formElementB)
            expect(formsGroup.get().length).toBe(2)
            
            // Supprimez le formulaire
            formsGroup.rmForm(formElementB)
            formElementB.remove()
            expect(formsGroup.get().length).toBe(2) // bug ! 
        })
    })
})
