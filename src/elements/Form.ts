import { ElementHTML } from './ElementHTML'
import { ElementHTMLProperties } from './ElementHTML.type'
import { FormSubject } from './FormSubject.interface'
import { Field } from './Field'


/**
 * Represents a form that manages a collection of fields.
 * This class extends `ElementHTML` and implements the `FormSubject` interface.
 * It is responsible for registering, unregistering, and notifying fields within the form.
 */
export class Form extends ElementHTML implements FormSubject{
    /**
     * An array of fields managed by this form.
     * @type {Field[]}
     */
    protected fields:Field[] = []
    
    /**
     * Creates an instance of the `Form` class.
     * @param {ElementHTMLProperties} props - The properties used to initialize the form element.
     */
    constructor(props:ElementHTMLProperties){
        super(props)

        // Register all required fields found in the form element
        for(let [indexField, $field] of Object.entries(this.$el.querySelectorAll(this.getSelectorRequiresFields()))){
            this.register(parseInt(indexField, 10), $field)
        }
    }

    /**
     * Registers a new field in the form.
     * @param {number} indexField - The index of the field.
     * @param {Element | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} $field - The DOM element representing the field.
     */
    register(indexField:number, $field:Element|HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement):void{
        // @ts-ignore
        let params = Object.keys(this.params).includes($field.name)? this.params[$field.name] : null,
            options:ElementHTMLProperties = {
                // @ts-ignore
                element:$field, 
                id:{
                    // @ts-ignore
                    fo:this.id.fo,
                    fi: indexField
                },
                rules: this.rules,
                params: params
            }
        this.fields = [...this.fields, new Field(options)]
    }

    /**
     * Unregisters a field from the form.
     * @param {Field} field - The field to unregister.
     */
    unregister(field:Field):void{
        this.fields = this.fields.filter(f => f.$el !== field.$el)
    }

    /**
     * Notifies all fields in the form by invoking a callback function on each field.
     * After notifying all fields, it updates the form's state based on the fields' validation results.
     * @param {Function} callback - The callback function to execute for each field.
     */
    notify(callback:(field: Field) => void):void{
        this.fields.forEach((field, i) =>{
            field.update(field, i, callback)
        })

        // @ts-ignore
        let method = this.fields.every(f => f.state.toString() === 'success')? 'success' : 'error' // bug Typescript ! getState() is not method ???
        // @ts-ignore
        this[`${method}State`]() // bug Typescript ! 
    }

    /**
     * Returns an array of all fields currently registered in the form.
     * This method provides access to the internal list of fields managed by the form.
     *
     * @returns {Field[]} An array of `Field` instances representing the fields in the form.
     *
     * @example
     * // Get all fields in the form
     * const fields = form.getFields();
     * console.log(fields); // Output: [Field, Field, Field, ...]
    */
    getFields():Field[]{
        return this.fields
    }

    /**
     * Generates a CSS selector string for all required fields in the form.
     * @private
     * @returns {string} - The CSS selector string for required fields.
     */
    private getSelectorRequiresFields():string{
        let fieldType = [
            'input',
            'textarea',
            'select',
        ];
        return fieldType.map((input)=>{
            return `${input}.require,${input}[required]`;
        }).join(',');
    }
}
