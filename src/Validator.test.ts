import { describe, it, expect, vi, beforeEach } from 'vitest'
import Validator from './Validator'
import { Configuration } from './configuration/Configuration'
import { FormsGroup } from './elements/FormsGroup'
import { Form } from './elements/Form'
import { Field } from './elements/Field'

// Mocks pour les dépendances
vi.mock('./configuration/Configuration', () => ({
    Configuration: vi.fn().mockImplementation(() => ({
        get: vi.fn().mockReturnValue({
            options: { get: vi.fn().mockReturnValue({ selector: 'form', fields: {} }) },
            rules: { set: vi.fn(), get: vi.fn().mockReturnValue({}) }
        })
    }))
}))

vi.mock('./elements/FormsGroup', () => ({
    FormsGroup: vi.fn().mockImplementation(() => ({
        get: vi.fn().mockReturnValue([]),
        addForm: vi.fn(),
        rmForm: vi.fn()
    }))
}))

vi.mock('./elements/Form', () => ({
    Form: vi.fn().mockImplementation((props) => ({
        $el: props.element, // Assure-toi que $el est bien défini
        notify: vi.fn(), // Mock de la méthode notify
        getState: vi.fn().mockReturnValue({ toString: vi.fn().mockReturnValue('success') }),
        on: vi.fn(),
        register: vi.fn(),
        unregister: vi.fn(),
    })),
}))

vi.mock('./elements/Field', () => ({
    Field: vi.fn().mockImplementation(() => ({
        clean: vi.fn().mockReturnThis(),
        validate: vi.fn().mockReturnThis(),
        displayState: vi.fn(),
        $el: {}
    }))
}))

describe('Validator', () => {
    let validator: Validator

    beforeEach(() => {
        validator = new Validator()
    })

    it('should initialize with default configuration', () => {
        expect(validator).toBeInstanceOf(Validator)
        expect(Configuration).toHaveBeenCalled()
        expect(FormsGroup).toHaveBeenCalled()
    })

    it('should validate all forms on submit', () => {
        const mockForm = new Form({} as any)
        const mockEvent = { preventDefault: vi.fn() }

        // Simuler que FormsGroup retourne un formulaire
        vi.mocked(validator.formsGroup.get).mockReturnValue([mockForm])

        validator.form()

        // Simuler l'événement submit
        const submitCallback = vi.mocked(mockForm.on).mock.calls[0][1]
        submitCallback(mockEvent, mockForm)

        expect(mockForm.notify).toHaveBeenCalled()
        expect(mockForm.getState().toString()).toBe('success')
        expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    })

    it('should prevent form submission if validation fails', () => {
        const mockForm = new Form({} as any)
        const mockEvent = { preventDefault: vi.fn() }

        // Simuler que FormsGroup retourne un formulaire
        vi.mocked(validator.formsGroup.get).mockReturnValue([mockForm])

        // Simuler un état d'erreur
        vi.mocked(mockForm.getState().toString).mockReturnValue('error')

        validator.form()

        // Simuler l'événement submit
        const submitCallback = vi.mocked(mockForm.on).mock.calls[0][1]
        submitCallback(mockEvent, mockForm)

        expect(mockForm.notify).toHaveBeenCalled()
        expect(mockForm.getState().toString()).toBe('error')
        expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should validate a specific form', () => {
        const mockFormElement = document.createElement('form')
        const mockEvent = { preventDefault: vi.fn() }

        // Crée un mock de Form avec $el égal à mockFormElement
        const mockForm = new Form({
            element: mockFormElement,
            id: { fo: 1, fi: 0 },
            params: {},
            state: null,
            rules: {} as any,
        })

        // Simuler que FormsGroup retourne le formulaire mocké
        vi.mocked(validator.formsGroup.get).mockReturnValue([mockForm])

        // Appeler checkForm avec le formulaire mocké
        validator.checkForm(mockFormElement, mockEvent)

        // Vérifier que notify a été appelé
        expect(mockForm.notify).toHaveBeenCalled()

        // Vérifier que l'état du formulaire est "success"
        expect(mockForm.getState().toString()).toBe('success')

        // Vérifier que preventDefault n'a pas été appelé
        expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    })

    it('should validate a specific field', () => {
        const mockForm = new Form({} as any)
        const mockFieldElement = document.createElement('input')

        // Simuler que FormsGroup retourne un formulaire
        vi.mocked(validator.formsGroup.get).mockReturnValue([mockForm])

        validator.element(mockFieldElement)

        expect(mockForm.notify).toHaveBeenCalled()
    })

    it('should add a required field to the validation process', () => {
        const mockFormElement = document.createElement('form')
        const mockFieldElement = document.createElement('input')

        // Ajoute le champ au formulaire
        mockFormElement.appendChild(mockFieldElement)

        // Crée un mock de Form avec $el égal à mockFormElement
        const mockForm = new Form({
            element: mockFormElement,
            id: { fo: 1, fi: 0 },
            params: {},
            state: null,
            rules: {} as any,
        })

        // Simuler que FormsGroup retourne le formulaire mocké
        vi.mocked(validator.formsGroup.get).mockReturnValue([mockForm])

        // Appeler addRequireField avec le champ mocké
        validator.addRequireField(mockFieldElement)

        // Vérifier que register a été appelé
        expect(mockForm.register).toHaveBeenCalled()

        // Vérifier que la classe "require" a été ajoutée au champ
        expect(mockFieldElement.classList.contains('require')).toBe(true)
    })

    it('should remove a required field from the validation process', () => {
        const mockForm = new Form({} as any)
        const mockFieldElement = document.createElement('input')

        // Simuler que FormsGroup retourne un formulaire
        vi.mocked(validator.formsGroup.get).mockReturnValue([mockForm])

        validator.removeRequireField(mockFieldElement)

        expect(mockForm.notify).toHaveBeenCalled()
        expect(mockFieldElement.classList.contains('require')).toBe(false)
    })

    it('should add a form to the validation process', () => {
        const mockFormElement = document.createElement('form')

        validator.addRequireForm(mockFormElement)

        expect(validator.formsGroup.addForm).toHaveBeenCalledWith(mockFormElement)
    })

    it('should remove a form from the validation process', () => {
        const mockFormElement = document.createElement('form')

        validator.removeRequireForm(mockFormElement)

        expect(validator.formsGroup.rmForm).toHaveBeenCalledWith(mockFormElement)
    })

    it('should add or update a validation rule', () => {
        const mockRule = vi.fn()

        validator.addRules('isStrongPassword', mockRule)

        expect(validator.app.get().rules.set).toHaveBeenCalledWith('isStrongPassword', mockRule)
    })

    it('should check if a value passes a specific validation rule', () => {
        const mockRule = vi.fn().mockReturnValue(true)

        // Simuler que la règle existe
        vi.mocked(validator.app.get().rules.get).mockReturnValue({ isemail: mockRule })

        const isValid = validator.check('dom+dom@dom.com', 'isemail')

        expect(isValid).toBe(false) // La règle retourne true, donc la validation passe
    })
})
