import { Configuration } from './configuration/Configuration'
import { Field } from './elements/Field'
import { Form } from './elements/Form'
import { Rules } from './rules/Rules'
import { FormsGroup } from './elements/FormsGroup'


export default class Validator{
    private app:Configuration
    private formsGroup:FormsGroup

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

    /*
    * validate some fields in forms on submit
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

    /*
    * validate some fields in specific form
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

    /*
    * validate one field
    * @param $el is a input (node) : element in the dom
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

    /*
    * add Field for validation
    * @param $el is a input (node) : element in the dom
    */
    addRequireField($el:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement){
        this.formsGroup.get().forEach((form:Form)=>{
            if(form.$el === $el.closest('form')){
                $el.classList.add('require')
                form.register(this.formsGroup.get().length, $el)
            }
        })
    }

    /*
    * remove Field for validation
    * @param $el is a input (node) : element in the dom
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

    /*
    * add Form for validation
    * @param $el is a form (node) : element in the dom
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

    /*
    * remove Form for validation
    * @param $el is a form (node) : element in the dom
    */
    removeRequireForm($el:HTMLFormElement){
        this.formsGroup.rmForm($el)
    }

    /*
    * add or update rule attribute
    * @param key is a string : a name of rule
    * @param rule  is a lambda function : return bollean validation (the first argument of the lambda method is the field object)
    */
    addRules(key:string, rule:Function){
        this.app.rules.set(key, rule)
    }

    /*
    * check valid data
    * @param data is a value to test
    * @param rulesname is a name of one item in rules list
    * @param configuration is an object with a little more parameters for the rules method
    * @return boolean
    */
    check(data:any, rulesname:string, configuration = {}){
        return !this.app.get().rules.get()[rulesname](data, configuration)
    }
}
