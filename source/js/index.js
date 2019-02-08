import Validator from './libs/validator/Validator';

window.addEventListener('DOMContentLoaded',(e)=>{
    //configuration validator
    let optionValidator = {
        "selector" : ".formToValidate",
        "mode" : "object",
        "fields" : {
            "civility" : {
                "target" : {
                    "error" : "#messageCivility",
                },
                "notempty" : {
                    "message" : "Ce champ ne doit pas être vide"
                }
            },
            "firstname" : {
                "target" : {
                    "error" : ".messageFirstname",
                },
                "notempty":{
                    "message" : "Ce champ ne doit pas être vide"
                },
                "minlength":{
                    'params': 3,
                    "message" : "Ce champ doit avoir minimum 3 caractères"
                }
            },
            "lastname" : {
                "target" : {
                    "error" : ".messageLastname",
                },
                "notempty":{
                    "message" : "Ce champ ne doit pas être vide"
                },
                "minlength":{
                    'params': 3,
                    "message" : "Ce champ doit avoir minimum 3 caractères"
                }
            },
            "email" : {
                "target" : {
                    "error" : "#messageEmail",
                },
                "notempty":{
                    "message" : "Ce champ ne doit pas être vide"
                },
                "email":{
                    "message" : "Ce champ doit avoir la bonne saisie (dom@dom.com)"
                }
            },
            "subject" : {
                "target" : {
                    "error" : "#messageSubject",
                },
                "notempty":{
                    "message" : "Ce champ ne doit pas être vide"
                },
                "minlength":{
                    'params': 3,
                    "message" : "Ce champ doit avoir minimum 3 caractères"
                }
            },
            "message" : {
                "target" : {
                    "error" : "#messageMessage",
                },
                "notempty":{
                    "message" : "Ce champ ne doit pas être vide"
                },
                "minlength":{
                    'params': 3,
                    "message" : "Ce champ doit avoir minimum 3 caractères"
                }
            },
            "contactEvent" : {
                "target" : {
                    "error" : "#messageContactEvent",
                },
                "notempty" : {
                    "message" : "Ce champ ne doit pas être vide"
                }
            },
            "phone" : {
                "target" : {
                    "error" : "#messagePhone",
                },
                "checkphone" : {
                    "message" : "Le format ne semble pas être bon 0102030405"
                },
                "notempty" : {
                    "message" : "Ce champ ne doit pas être vide"
                }
            },
            "hobbies[]":{
                "target" : {
                    "error" : ".hobbiesMessage",
                },
                "minlength":{
                    'params' : 2,
                    "message" : "vous devez choisir au moins 2 loisirs"
                },
                "maxlength":{
                    'params' : 5,
                    "message" : "vous devez choisir au maximum 5 loisirs"
                },
                "notempty":{
                    "message" : "Ce champ ne doit pas être vide"
                },
            }
        }
    };

    //add custom config in the library
    let validate = new Validator(optionValidator);

    //add rules for phone input
    validate.addRules('checkphone', (value)=>{
        return !/^0[1-8][ .-]?(\d{2}[ .-]?){4}$/.test(value);
    });
    
    //check form when it's submitted
    validate.form();


    //check each element(input/select/textarea) when it's has lost focus
    let listRequireField = [
        'input[type=text]',
        'select',
        'textarea',
    ];
    document.querySelectorAll(listRequireField.join(',')).forEach(($field)=>{
        $field.addEventListener('blur', (e)=>{
            validate.element(e.target);
        });
    });

    //add require field if you answer 'yes' at 'add phone number' 
    let $phone = document.getElementById('phone');
    $phone.parentNode.style.display = 'none';
    document.getElementsByName('validatePhone').forEach(($input) =>{
        $input.addEventListener('click', (e)=>{
            if(e.target.checked && e.target.id === "validatePhoneYes"){
                $phone.parentNode.style.display = 'block';
                validate.addRequireField($phone);
            }else{
                $phone.parentNode.style.display = 'none';
                validate.removeRequireField($phone);
            }
        });
    });
});
