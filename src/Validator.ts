import { Configuration } from './configuration/Configuration'
import { Rules } from './rules/Rules'
import { FormsGroup } from './elements/FormsGroup'


export default class Validator{
    private app:any
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

        this.formsGroup = new FormsGroup(this.app.get())
    }

    /*
    * validate some fields in forms on submit
    */
    form(){
        this.formsGroup.get().forEach((form, i)=>{
            form.on('submit', (event, form)=>{
                form.notify(field => field.clean().validate().displayState())
                
                if(form.state.toString() === 'error'){
                    event.preventDefault()
                }
            })
        })
    }

    /*
    * validate some fields in specific form
    */
    checkForm($el:HTMLFormElement, event:Event){
        this.formsGroup.get().forEach((form, i)=>{
            if($el === form.$el){
                form.notify(field => field.clean().validate().displayState())
                
                if(form.state.toString() === 'error'){
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
        this.formsGroup.get().forEach((form)=>{
            form.notify((field, i) =>{
                if(field.$el === $el){
                    field.clean().validate().displayState()
                }
            })
        })
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
