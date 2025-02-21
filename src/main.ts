// @ts-nocheck
import { Rules } from "./rules/Rules"
import { Field } from "./elements/Field"
import { Form } from "./elements/Form"
import { ElementHTMLProperties } from "./elements/ElementHTML.type"
import { Configuration } from './configuration/Configuration'


let fieldElement = document.querySelector('input[name="subject"]')
const fieldProps: ElementHTMLProperties = {
    element: fieldElement,
    id: { html: "", fo: 0, fi: 0},
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

let formElement = document.querySelector('form'),
    formProps:ElementHTMLProperties = {
        element: formElement,
        id: { html: "", fo: 0, fi: 0},
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
    },
    form = new Form(formProps)

    form.on('submit', (e, form)=>{
        e.preventDefault()
        console.log('>>', form)
    })
