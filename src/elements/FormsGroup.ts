import { Configuration } from '../configuration/Configuration'
import { Form } from './Form'
import { ElementHTMLProperties } from './ElementHTML.type'


export class FormsGroup{
    private forms:Form[] = []
    private configuration = {}
    
    constructor(configuration:Configuration){
        this.configuration = configuration
        
        if(document.querySelectorAll(this.configuration.options.selector) !== null){
            document.querySelectorAll(this.configuration.options.selector).forEach($form =>{
                this.addForm($form)
            })
        }
    }

    addForm($form:HTMLFormElement){
        let props:ElementHTMLProperties = {
            element : $form,
            id : {
                html : `vfo${this.forms.length}_`,
                fo : this.forms.length,
                fi : null
            },
            state: null,
            params : this.configuration.options['fields'],
            rules : this.configuration.rules,
        };

        this.forms = [...this.forms, new Form(props)]
    }

    rmForm($form:HTMLFormElement){
        this.forms.forEach((form, i)=>{
            if(form.$el === $form){
                delete this.forms[i]
            }
        })
    }

    getForms(){
        return this.forms
    }
}
