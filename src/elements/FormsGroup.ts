import { Configuration } from '../configuration/Configuration'
import { Form } from './Form'
import { AppConfiguration } from './FormsGroup.type'
import { ElementHTMLProperties } from './ElementHTML.type'


/**
 * Represents a group of forms managed by the application.
 * This class handles the creation, removal, and retrieval of forms.
*/
export class FormsGroup{
    private forms:Form[] = []
    private configuration:AppConfiguration
    
    /**
     * Creates an instance of FormsGroup.
     * @param {Configuration} configuration - The configuration object containing form settings and rules.
    */
    constructor(configuration:Configuration){
        this.configuration = configuration.get() as AppConfiguration
        console.log('>>', configuration.get())
        
        if(document.querySelectorAll(this.configuration.options.get().selector).length){
            document.querySelectorAll(this.configuration.options.get().selector).forEach($form =>{
                this.addForm($form as HTMLFormElement)
            })
        }
    }

    /**
     * Adds a new form to the forms group.
     * @param {HTMLFormElement} $form - The HTML form element to add.
    */
    addForm($form:HTMLFormElement): void{
        let props:ElementHTMLProperties = {
            element : $form,
            id : {
                html : `vfo${this.forms.length}_`,
                fo : this.forms.length,
                fi : null
            },
            state: null,
            params : this.configuration.options.get()['fields'],
            rules : this.configuration.rules,
            // @ts-ignore
            middleware: this.configuration.middleware, 
        }

        this.forms = [...this.forms, new Form(props)]
    }

    /**
     * Removes a form from the forms group.
     * @param {HTMLFormElement} $form - The HTML form element to remove.
    */
    rmForm($form:HTMLFormElement): void{
        this.forms = [...this.forms.filter(f => f.$el !== $form)]
    }

    /**
     * Retrieves all forms in the forms group.
     * @returns {Form[]} An array of Form instances.
    */
    get(): Form[]{
        return this.forms
    }
}
