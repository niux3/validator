//import { Rules } from "./rules/Rules"
//import { Configuration } from './configuration/Configuration'

//const rules = new Rules()

//console.log(rules)

//document.querySelector('form')?.addEventListener('submit', e =>{
    //e.preventDefault()
    //console.log('=--> ', document.querySelector('input')?.value)
//})



//let optionValidator = {
    //"selector" : ".formToValidate",
    //"mode" : "object",
    //"fields" : {
        //"subjet" : {
            //"target" : {
                //"error" : "#errorSubject", // emplacement message document.getElementById('errorSubject')
                //"success" : "#successSubject", // emplacement message document.getElementById('successSubject')
            //},
            //"notempty" : {
                //"error" : "doit être rempli",
                //"success" : "donnée valide",
            //},
            //"minlength":{
                //'params': 3,
                //"error" : "<span>Ce champ doit avoir minimum 3 caractères</span>",
                //"success" : "<span>donnée valide</span>"
            //}
        //},
    //}
//}

//let configDefaultApps = {
    //'selector' : 'form',
    //'mode' : 'object',
    //'fields' : {}
//}

//let appConfig = new Configuration(optionValidator, configDefaultApps)

//let app = new Configuration({
    //options : appConfig ,
    //rules : new Rules(),
//})

//console.log('>>', appConfig)
//console.log('>>', app)

import { Rules } from "./rules/Rules"
import { Field } from "./elements/Field"
import { ElementHTMLProperties } from "./elements/ElementHTML.type"
import { Configuration } from "./configuration/Configuration"


let fieldElement = document.querySelector('input[name="subject"]')
const fieldProps: ElementHTMLProperties = {
    element: fieldElement,
    id: { html: "html-id", fo: 0, fi: 0},
    params: {
        "subject" : {
            "target" : {
                "error" : "#errorSubject", // emplacement message document.getElementById('errorSubject')
                "success" : "#successSubject", // emplacement message document.getElementById('successSubject')
            },
            "isempty" : {
                "error" : "doit être rempli",
                "success" : "donnée valide",
            },
            "isminlength":{
                'params': 3,
                "error" : "<span>Ce champ doit avoir minimum 3 caractères</span>",
                "success" : "<span>donnée valide</span>"
            }
        },
    },
    state: null,
    rules: new Rules(),
    middleware: "some-middleware",
    mode: "some-mode"
}

const field = new Field(fieldProps)

field.on('blur', (e, field)=>{
    field.clean().validate().displayState()
})

 //field.resetState() // Passe à l'état neutre
 console.log(field)
