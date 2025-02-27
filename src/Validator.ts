import { Configuration } from './configuration/Configuration'
import { Field } from './elements/Field'
import { Form } from './elements/Form'
import { Rules } from './rules/Rules'
import { FormsGroup } from './elements/FormsGroup'


/**
 * The `Validator` class is responsible for managing form validation within an application.
 * It provides methods to validate forms, fields, and add/remove validation rules dynamically.
 *
 * @example
 * // Basic usage of the Validator class
 * const validator = new Validator({
 *   selector: 'form', // Selector for forms to validate
 *   fields: {
 *     'username': { 
 *      'isempty':{
 *        'error': "field must not be empty",
 *        'success': "done"
 *      },
 *      'isminlength': {
 *          'params': 3,
 *          'error': 'the field must contain at least 3 characters'
 *      }
 *     },
 *     'email': {
 *      'isempty':{
 *        'error': "field must not be empty",
 *      },
 *      'isemail': {
 *          'error': 'the field must be an email'
 *      }
 *     }
 *   }
 * });
 *
 * // Validate all forms on submit
 * validator.form();
 *
 * // Validate a specific form
 * let $myForm = document.getElementById('myForm') as HTMLFormElement;
 * $myForm?.addEventListener('submit', e => validator.checkForm($myForm, e));
 *
 * // Validate a specific field
 * let $lastname = document.getElementById('lastname')
 * $lastname?.addEventListener('blur', e => validator.element($lastname))
 */
export default class Validator{
    /**
     * The application configuration object that stores validation rules and settings.
     * @private
     * @type {Configuration}
    */
    private app:Configuration

    /**
     * The group of forms managed by the validator.
     * @private
     * @type {FormsGroup}
    */
    private formsGroup:FormsGroup

    /**
     * Creates an instance of the `Validator` class.
     * @param {Object} options - The configuration options for the validator.
     * @param {string} [options.selector='form'] - The CSS selector for forms to be validated.
     * @param {Object} [options.fields={}] - The fields and their validation rules.
    */
    constructor(options:{selector?: string, fields?:any} = {}){
        let configDefaultApps = {
            'selector': 'form',
            'fields': {}
        }

        let appConfig = new Configuration(options, configDefaultApps)
        this.app = new Configuration({
            options: appConfig,
            rules: new Rules()
        })

        this.formsGroup = new FormsGroup(this.app)
    }

    /**
     * Validates all forms in the application on submit.
     * This method attaches a submit event listener to each form and validates the fields within the form.
     * If any field fails validation, the form submission is prevented.
     * 
     * @example
     * // Validate all forms on submit
     * validator.form();
    */
    form(){
        this.formsGroup.get().forEach((form:Form)=>{
            form.on('submit', (event, form)=>{
                form.notify((field: Field) => field.clean().validate().displayState())
                
                if(form.getState().toString() === 'error'){
                    event.preventDefault()
                }
            })
        })
    }

    /**
     * Validates a specific form.
     * This method checks the fields within the specified form and prevents the event if validation fails.
     * 
     * @param {HTMLFormElement} $el - The form element to validate.
     * @param {Event} event - The event associated with the form submission.
     * 
     * @example
     * // Validate a specific form
     * let $myForm = document.getElementById('myForm') as HTMLFormElement;
     * $myForm?.addEventListener('submit', e => validator.checkForm($myForm, e));
    */
    checkForm($el:HTMLFormElement, event:Event){
        this.formsGroup.get().forEach((form:Form)=>{
            if($el === form.$el){
                form.notify((field:Field) => field.clean().validate().displayState())
                
                if(form.getState().toString() === 'error'){
                    event.preventDefault()
                }
            }
        })
    }

    /**
     * Validates a specific field.
     * This method checks the specified field and updates its validation state.
     * 
     * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} $el - The field element to validate.
     * 
     * @example
     * // Validate a specific field
     * let $lastname = document.getElementById('lastname')
     * $lastname?.addEventListener('blur', e => validator.element($lastname))
    */
    element($el:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement){
        this.formsGroup.get().forEach((form:Form)=>{
            form.notify((field:Field) =>{
                if(field.$el === $el){
                    field.clean().validate().displayState()
                }
            })
        })
    }

    /**
     * Adds a field to the validation process.
     * This method marks the specified field as required and registers it for validation.
     * 
     * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} $el - The field element to add for validation.
     * 
     * @example
     * // Add a field for validation
     * const myInput = document.querySelector('#username') as HTMLInputElement;
     * validator.addRequireField(myInput);
    */
    addRequireField($el:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement){
        this.formsGroup.get().forEach((form:Form)=>{
            if(form.$el === $el.closest('form')){
                $el.classList.add('require')
                form.register(this.formsGroup.get().length, $el)
            }
        })
    }

    /**
     * Removes a field from the validation process.
     * This method unregisters the specified field from validation and removes the required attribute.
     * 
     * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} $el - The field element to remove from validation.
     * 
     * @example
     * // Remove a field from validation
     * const myInput = document.querySelector('#username') as HTMLInputElement;
     * validator.removeRequireField(myInput);
    */
    removeRequireField($el:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement){
        this.formsGroup.get().forEach((form:Form)=>{
            form.notify((field:Field)=>{
                if(field.$el === $el){
                    field.$el.classList.remove('require')
                    form.unregister(field)
                }
            })
        })
    }

    /**
     * Adds a form to the validation process.
     * This method registers the specified form for validation if it is not already registered.
     * 
     * @param {HTMLFormElement} $el - The form element to add for validation.
     * 
     * @example
     * // Add a form for validation
     * const myForm = document.querySelector('#myForm') as HTMLFormElement;
     * validator.addRequireForm(myForm);
    */
    addRequireForm($el:HTMLFormElement){
        let inFormGroup = false
        this.formsGroup.get().forEach((form:Form) =>{
            if(form.$el === $el){
                inFormGroup = true
            }
        })
        if(!inFormGroup){
            this.formsGroup.addForm($el)
        }
    }

    /**
     * Removes a form from the validation process.
     * This method unregisters the specified form from validation.
     * 
     * @param {HTMLFormElement} $el - The form element to remove from validation.
     * 
     * @example
     * // Remove a form from validation
     * const myForm = document.querySelector('#myForm') as HTMLFormElement;
     * validator.removeRequireForm(myForm);
    */
    removeRequireForm($el:HTMLFormElement){
        this.formsGroup.rmForm($el)
    }

    /**
     * Adds or updates a validation rule.
     * This method allows dynamic addition or modification of validation rules.
     * 
     * @param {string} key - The name of the rule.
     * @param {Function} rule - The validation function. It should return a boolean indicating whether the validation passed.
     * 
     * @example
     * // Add a custom validation rule
     * validator.addRules('isStrongPassword', (value) => value.length >= 8);
    */
    addRules(key:string, rule:Function){
        //@ts-ignore
        this.app.get().rules.set(key, rule)
    }

    /**
     * Check if a given value passes a specific validation rule.
     * This method is useful for validating data outside of forms.
     * 
     * @param {any} data - The value to validate.
     * @param {string} rulesname - The name of the validation rule to apply.
     * @param {Object} [configuration={}] - Additional configuration for the validation rule.
     * @returns {boolean} - Returns `true` if the validation passes, otherwise `false`.
     * 
     * @example
     * // Check if a value is valid according to a rule
     * const isValid = validator.check('dom+dom@dom.com', 'isemail');
     * console.log(isValid); // true or false
    */
    check(data:any, rulesname:string, configuration = {}){
        //@ts-ignore
        return !this.app.get().rules.get()[rulesname](data, configuration)
    }
}
