// @ts-nocheck
import { Rules } from "./rules/Rules"
import { Field } from "./elements/Field"
import { Form } from "./elements/Form"
import { ElementHTMLProperties } from "./elements/ElementHTML.type"
import { Configuration } from './configuration/Configuration'


let formElement = document.querySelector('form'),
    formProps:ElementHTMLProperties = {
        element: formElement,
        id: { html: "", fo: 0, fi: 0},
        params: {
            "firstname" : {
                //"target" : {
                    //"error" : "#errorSubject", // emplacement message document.getElementById('errorSubject')
                    //"success" : "#successSubject", // emplacement message document.getElementById('successSubject')
                //},
                "isempty" : {
                    "error" : "firstname doit être rempli",
                    "success" : "firstname donnée valide",
                },
                "isminlength":{
                    'params': 3,
                    "error" : "<span>Ce champ doit avoir minimum 3 caractères</span>",
                    "success" : "<span>donnée valide</span>"
                }
            },
            "lastname" : {
                //"target" : {
                    //"error" : "#errorSubject", // emplacement message document.getElementById('errorSubject')
                    //"success" : "#successSubject", // emplacement message document.getElementById('successSubject')
                //},
                "isempty" : {
                    "error" : "lastname doit être rempli",
                    "success" : "lastname donnée valide",
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
    },
    form = new Form(formProps)

    form.on('submit', (e, form)=>{
        e.preventDefault()
        form.resetState()
        form.notify()
    })
