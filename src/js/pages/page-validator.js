import { Validator } from '../libs/validator/Validator';

var pageValidator = function(){
    if(document.querySelector("#exemple-basique")){
        let optionValidator = {
            "success" : true,
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
                    "notempty":{
                        "message" : "Ce champ ne doit pas être vide"
                    },
                    "minlength":{
                        'params': 3,
                        "message" : "Ce champ doit avoir minimum 3 caractères"
                    }
                },
                "lastname" : {
                    "notempty":{
                        "message" : "Ce champ ne doit pas être vide"
                    },
                    "minlength":{
                        'params': 3,
                        "message" : "Ce champ doit avoir minimum 3 caractères"
                    }
                },
                "email" : {
                    "notempty":{
                        "message" : "Ce champ ne doit pas être vide"
                    },
                    "email":{
                        "message" : "Ce champ doit avoir la bonne saisie (dom@dom.com)"
                    }
                },
                "subject" : {
                    "notempty":{
                        "message" : "Ce champ ne doit pas être vide"
                    },
                    "minlength":{
                        'params': 3,
                        "message" : "Ce champ doit avoir minimum 3 caractères"
                    }
                },
                "message" : {
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
                    "notempty" : {
                        "message" : "Ce champ ne doit pas être vide"
                    }
                },
                "loisirs[]":{
                    "target" : {
                        "error" : "#messageLoisirs",
                    },
                    "notempty":{
                        "message" : "Ce champ ne doit pas être vide"
                    },
                }
            }
        };


        let validate = new Validator(optionValidator);
        validate.form();

        var $phone = document.getElementById('phone');
        $phone.parentNode.style.display = 'none';
        document.getElementsByName('contactEvent').forEach(($input) =>{
            $input.addEventListener('click', (e)=>{
                if(e.target.checked && e.target.id === "contactEventSMS"){
                    $phone.parentNode.style.display = 'block';
                    validate.addRequireField($phone);
                }else{
                    $phone.parentNode.style.display = 'none';
                    validate.removeRequireField($phone);
                }
            });
        });

        var listRequireField = [
            'input[type=text]',
            'select',
            'textarea',
        ];

        document.querySelectorAll(listRequireField.join(',')).forEach(($field)=>{
            $field.addEventListener('blur', (e)=>{
                validate.element(e.target);
            });
        });
    }
};

export { pageValidator }
