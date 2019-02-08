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
            "hobbiesChoice" : {
                "target" : {
                    "error" : ".choiceHobbiesMessage",
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
                    'params' : 3,
                    "message" : "vous devez choisir au maximum 3 loisirs"
                },
                "notempty":{
                    "message" : "Ce champ ne doit pas être vide"
                },
            },
            "password" : {
                "target" : {
                    "error" : ".messagePassword",
                },
                "notempty":{
                    "message" : "Ce champ ne doit pas être vide"
                }
            },
            "checkpassword" : {
                "target" : {
                    "error" : ".messageCheckPassword",
                },
                "notempty":{
                    "message" : "Ce champ ne doit pas être vide"
                },
                "equalto":{
                    "params" : '#password',
                    "message" : "Ce champ doit être identique au champs mot de passe"
                }
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
        'input[type=password]',
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
        $input.addEventListener('change', (e)=>{
            if(e.target.checked && e.target.id === "validatePhoneYes"){
                $phone.parentNode.style.display = 'block';
                validate.addRequireField($phone);
            }else{
                $phone.parentNode.style.display = 'none';
                validate.removeRequireField($phone);
            }
        });
    });

    //add require fields if you answer 'yes' 
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



    console.log("'dom@dom' ===  format email --> ", validate.check('dom@dom', 'email'));
});
