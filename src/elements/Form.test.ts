import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Form } from './Form'
import { ElementHTMLProperties } from './ElementHTML.type'


// Mocks pour les dépendances
vi.mock('./Field', () => ({
    Field: vi.fn().mockImplementation(() => ({
        update: vi.fn((field, i, callback) => {
            if (callback) {
                callback(field, i) // Appelle la fonction de rappel
            }
        }),
        $el: {},
        state: {
            toString: vi.fn().mockReturnValue('success'), // Simule un état valide
        },
    })),
}))

describe('Form', () => {
    let formElement: HTMLFormElement
    let formProps: ElementHTMLProperties
    let form: Form

    beforeEach(() => {
        // Crée un élément de formulaire factice pour les tests
        formElement = document.createElement('form')
        formElement.innerHTML = `
            <input type="text" name="field1" required>
            <input type="text" name="field2" class="require">
            <textarea name="field3" required></textarea>
            <select name="field4" required></select>
        `

        // Initialise les propriétés du formulaire
        formProps = {
            element: formElement,
            id: { fo: 1, fi: 0 },
            params: {},
            state: null,
            rules: {} as any,
        }

        // Crée une instance de Form pour les tests
        form = new Form(formProps)
    })

    it('should initialize with fields from the DOM', () => {
        expect(form).toBeInstanceOf(Form)
        expect(form.getFields()).toHaveLength(4) // 4 champs requis dans le formulaire
    })

    it('should notify all fields with a callback', () => {
        const mockCallback = vi.fn();
        form.notify(mockCallback);

        // Vérifie que la callback a été appelée pour chaque champ
        expect(mockCallback).toHaveBeenCalledTimes(4); // 4 champs
        form.getFields().forEach((field, index) => {
            expect(mockCallback).toHaveBeenCalledWith(field, index);
        });

        // Vérifie que l'état du formulaire est mis à jour correctement
        expect(form['state'].toString()).toBe('success'); // Tous les champs sont valides
    })

    it('should update form state to error if any field is invalid', () => {
        // Simule qu'au moins un champ est invalide
        // @ts-ignore
        form.getFields()[0].state.toString = vi.fn().mockReturnValue('error')

        const mockCallback = vi.fn()
        form.notify(mockCallback)

        // Vérifie que l'état du formulaire est "error"
        expect(form['state'].toString()).toBe('error')
    })
})
