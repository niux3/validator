import { Rules } from "./rules/Rules"
import { Configuration } from './configuration/Configuration'

const rules = new Rules()

console.log(rules)

document.querySelector('form')?.addEventListener('submit', e =>{
    e.preventDefault()
    console.log('=--> ', document.querySelector('input')?.value)
})



let optionValidator = {
    "selector" : ".formToValidate",
    "mode" : "object",
    "fields" : {
        "subjet" : {
            "target" : {
                "error" : "#errorSubject", // emplacement message document.getElementById('errorSubject')
                "success" : "#successSubject", // emplacement message document.getElementById('successSubject')
            },
            "notempty" : {
                "error" : "doit être rempli",
                "success" : "donnée valide",
            },
            "minlength":{
                'params': 3,
                "error" : "<span>Ce champ doit avoir minimum 3 caractères</span>",
                "success" : "<span>donnée valide</span>"
            }
        },
    }
}

let configDefaultApps = {
    'selector' : 'form',
    'mode' : 'object',
    'fields' : {}
}

let appConfig = new Configuration(optionValidator, configDefaultApps)

let app = new Configuration({
    options : appConfig ,
    rules : new Rules(),
})

console.log('>>', appConfig)
console.log('>>', app)
//import { Field } from "./elements/Field"
//import { ElementProperties } from "./elements/Element.type"

// Créer une instance de Field
//const fieldProps: ElementProperties = {
    //element: document.getElementById('field'),
    //id: { html: "html-id", fo: "fo-id", fi: "fi-id" },
    //params: "some-param",
    //state: "some-state",
    //rules: "some-rules",
    //middleware: "some-middleware",
    //mode: "some-mode"
//}

//const field = new Field(fieldProps)

//field.on('blur', (e, field)=>{
    //field.validate()
//})

// Réinitialiser l'état
// field.resetState() // Passe à l'état neutre
// console.log(field)
