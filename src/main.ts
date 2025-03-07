// @ts-nocheck
import Validator from './Validator'


let defaultErrorMessage = "Ce champ ne doit pas être vide",
    optionValidator = {
        "selector" : ".formToValidate",
        "mode" : "object",
        "fields" : {
            "civility" : {
                "target" : {
                    "error" : "#messageCivility",
                },
                "isnotempty" : {
                    "error" : defaultErrorMessage
                }
            },
            "firstname" : {
                "target" : {
                    "error" : ".messageFirstname",
                },
                "isnotempty":{
                    "error" : defaultErrorMessage,
                },
                "isminlength":{
                    'params': 2,
                    "error" : "Ce champ doit avoir minimum 3 caractères",
                }
            },
            "lastname" : {
                "target" : {
                    "error" : ".messageLastname",
                },
                "isnotempty":{
                    "error" : defaultErrorMessage
                },
                "isminlength":{
                    'params': 2,
                    "error" : "Ce champ doit avoir minimum 3 caractères"
                }
            },
            "email" : {
                "target" : {
                    "error" : "#messageEmail",
                },
                "isnotempty":{
                    "error" : defaultErrorMessage
                },
                "isemail":{
                    "error" : "Ce champ doit avoir la bonne saisie (dom@dom.com)"
                }
            },
            "subject" : {
                "target" : {
                    "error" : "#messageSubject",
                },
                "isnotempty":{
                    "error" : defaultErrorMessage
                },
                "isminlength":{
                    'params': 2,
                    "error" : "Ce champ doit avoir minimum 3 caractères"
                }
            },
            "message" : {
                "target" : {
                    "error" : "#messageMessage",
                },
                "isnotempty":{
                    "error" : defaultErrorMessage
                },
                "isminlength":{
                    'params': 2,
                    "error" : "Ce champ doit avoir minimum 3 caractères"
                }
            },
            "validatePhone" : {
                "target" : {
                    "error" : "#messagePhoneChoice",
                },
                "isnotempty" : {
                    "error" : defaultErrorMessage
                }
            },
            "hobbiesChoice" : {
                "target" : {
                    "error" : ".choiceHobbiesMessage",
                },
                "isnotempty" : {
                    "error" : defaultErrorMessage
                }
            },
            "phone" : {
                "target" : {
                    "error" : "#messagePhone",
                },
                "checkphone" : {
                    "error" : "Le format ne semble pas être bon 0102030405"
                },
                "isnotempty" : {
                    "error" : defaultErrorMessage
                }
            },
            "hobbies[]":{
                "target" : {
                    "error" : ".hobbiesMessage",
                },
                "isminlength":{
                    'params' : 1,
                    "error" : "vous devez choisir au moins 2 loisirs"
                },
                "ismaxlength":{
                    'params' : 4,
                    "error" : "vous devez choisir au maximum 3 loisirs"
                },
                "isnotempty":{
                    "error" : defaultErrorMessage
                },
            },
            "password" : {
                "isnotempty":{
                    "error" : defaultErrorMessage
                }
            },
            "selectMultiple[]" : {
                "isminlength":{
                    'params' : 1,
                    "error" : "vous devez choisir au moins 2 items"
                },
                "ismaxlength":{
                    'params' : 4,
                    "error" : "vous devez choisir au maximum 3 items"
                },
                "isnotempty":{
                    "error" : defaultErrorMessage
                },
            },
            "checkpassword" : {
                "isnotempty":{
                    "error" : defaultErrorMessage
                },
                "isequalto":{
                    "params" : '#password',
                    "error" : "Ce champ doit être identique au champs mot de passe"
                }
            },
            "dateAppointement" : {
                "target" : {
                    "error" : "#messageDate",
                },
                "isnotempty":{
                    "error" : defaultErrorMessage
                },
                "isdate":{
                    "error" : "Ce champ doit être une date valide"
                }
            }
        }
    },
    validate = new Validator(optionValidator)

//add rules for phone input
validate.addRules('checkphone', (value)=>{
    return !/^0[1-8][ .-]?(\d{2}[ .-]?){4}$/.test(value);
})
//check form when it's submitted
validate.form()

let listRequireField = [
    'input[type=text]',
    'input[type=date]',
    'input[type=password]',
    // 'input[type=radio]',
    'input[type=checkbox]',
    'select',
    'textarea',
]

//check each element(input/select/textarea) when it's in focus and has lost focus
document.querySelectorAll(listRequireField.join(',')).forEach(($field)=>{
    $field.addEventListener('blur', (e)=>{
        validate.element(e.target)
    })
})

//add require field if you answer 'yes' at 'add phone number'
if(document.getElementById('phone')){
    let $phone = document.getElementById('phone')
    $phone.parentNode.style.display = 'none'
    document.getElementsByName('validatePhone').forEach(($input) =>{
        $input.addEventListener('change', (e)=>{
            if(e.target.checked && e.target.id === "validatePhoneYes"){
                $phone.parentNode.style.display = 'block'
                validate.addRequireField($phone)
            }else{
                $phone.parentNode.style.display = 'none'
                validate.removeRequireField($phone)
            }
        })
    })
}
//add require fields if you answer 'yes'
if(document.getElementsByName('hobbies[]')){
    let $hobbies = document.getElementsByName('hobbies[]'),
        $hobbiesContainer = document.getElementById('hobies-container');
    document.getElementsByName('hobbiesChoice').forEach(($radio) =>{
        $radio.addEventListener('change', (e)=>{
            if(e.target.checked && e.target.id === "hobbiesYes"){
                $hobbiesContainer.style.display = 'block';
                $hobbies.forEach(($checkbox)=>{
                    validate.addRequireField($checkbox);
                });
            }else{
                $hobbiesContainer.style.display = 'none';
                $hobbies.forEach(($checkbox)=>{
                    validate.removeRequireField($checkbox);
                });
            }
        });
    });
}

console.log("'dom@dom' ===  format email --> ", validate.check('dom@dom', 'isemail'))
