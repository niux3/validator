import Validator from './libs/validator/Validator';

window.addEventListener('DOMContentLoaded',(e)=>{
    let iconError = `<span class="icon">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 286.054 286.054" style="enable-background:new 0 0 286.054 286.054;" xml:space="preserve"><g><path style="fill:#ff0000;" d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027
        c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236
        c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209
        S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972
        c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723
        c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843
        C160.878,195.732,152.878,187.723,143.036,187.723z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
   </span>`;
   let iconSuccess = ` <span class="icon">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 442.533 442.533" style="enable-background:new 0 0 442.533 442.533;"
     xml:space="preserve" fill="#5CB85C"><g><path d="M434.539,98.499l-38.828-38.828c-5.324-5.328-11.799-7.993-19.41-7.993c-7.618,0-14.093,2.665-19.417,7.993L169.59,247.248
        l-83.939-84.225c-5.33-5.33-11.801-7.992-19.412-7.992c-7.616,0-14.087,2.662-19.417,7.992L7.994,201.852
        C2.664,207.181,0,213.654,0,221.269c0,7.609,2.664,14.088,7.994,19.416l103.351,103.349l38.831,38.828
        c5.327,5.332,11.8,7.994,19.414,7.994c7.611,0,14.084-2.669,19.414-7.994l38.83-38.828L434.539,137.33
        c5.325-5.33,7.994-11.802,7.994-19.417C442.537,110.302,439.864,103.829,434.539,98.499z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
</svg></span>
   `
    let defaultErrorMessage = iconError + "<span>Ce champ ne doit pas être vide</span>";


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
                    "error" : defaultErrorMessage
                }
            },
            "firstname" : {
                "target" : {
                    "error" : ".messageFirstname",
                },
                "notempty":{
                    "error" : defaultErrorMessage,
                },
                "minlength":{
                    'params': 3,
                    "error" : iconError + "<span>Ce champ doit avoir minimum 3 caractères</span>",
                }
            },
            "lastname" : {
                "target" : {
                    "error" : ".messageLastname",
                },
                "notempty":{
                    "error" : defaultErrorMessage
                },
                "minlength":{
                    'params': 3,
                    "error" : iconError + "<span>Ce champ doit avoir minimum 3 caractères</span>"
                }
            },
            "email" : {
                "target" : {
                    "error" : "#messageEmail",
                },
                "notempty":{
                    "error" : defaultErrorMessage
                },
                "email":{
                    "error" : iconError + "<span>Ce champ doit avoir la bonne saisie (dom@dom.com)</span>"
                }
            },
            "subject" : {
                "target" : {
                    "error" : "#messageSubject",
                },
                "notempty":{
                    "error" : defaultErrorMessage
                },
                "minlength":{
                    'params': 3,
                    "error" : iconError + "<span>Ce champ doit avoir minimum 3 caractères</span>"
                }
            },
            "message" : {
                "target" : {
                    "error" : "#messageMessage",
                },
                "notempty":{
                    "error" : defaultErrorMessage
                },
                "minlength":{
                    'params': 3,
                    "error" : iconError + "<span>Ce champ doit avoir minimum 3 caractères</span>"
                }
            },
            "validatePhone" : {
                "target" : {
                    "error" : "#messagePhoneChoice",
                },
                "notempty" : {
                    "error" : defaultErrorMessage
                }
            },
            "hobbiesChoice" : {
                "target" : {
                    "error" : ".choiceHobbiesMessage",
                },
                "notempty" : {
                    "error" : defaultErrorMessage
                }
            },
            "phone" : {
                "target" : {
                    "error" : "#messagePhone",
                },
                "checkphone" : {
                    "error" : iconError + "<span>Le format ne semble pas être bon 0102030405</span>"
                },
                "notempty" : {
                    "error" : defaultErrorMessage
                }
            },
            "hobbies[]":{
                "target" : {
                    "error" : ".hobbiesMessage",
                },
                "minlength":{
                    'params' : 2,
                    "error" : iconError + "<span>vous devez choisir au moins 2 loisirs</span>"
                },
                "maxlength":{
                    'params' : 3,
                    "error" : iconError + "<span>vous devez choisir au maximum 3 loisirs</span>"
                },
                "notempty":{
                    "error" : defaultErrorMessage
                },
            },
            "password" : {
                "target" : {
                    "error" : ".messagePassword",
                },
                "notempty":{
                    "error" : defaultErrorMessage
                }
            },
            "selectMultiple[]" : {
                "minlength":{
                    'params' : 2,
                    "error" : iconError + "<span>vous devez choisir au moins 2 items</span>"
                },
                "maxlength":{
                    'params' : 3,
                    "error" : iconError + "<span>vous devez choisir au maximum 3 items</span>"
                },
                "notempty":{
                    "error" : defaultErrorMessage
                },
            },
            "checkpassword" : {
                "target" : {
                    "error" : ".messageCheckPassword",
                },
                "notempty":{
                    "error" : defaultErrorMessage
                },
                "equalto":{
                    "params" : '#password',
                    "error" : iconError + "<span>Ce champ doit être identique au champs mot de passe</span>"
                }
            },
            "dateAppointement" : {
                "target" : {
                    "error" : "#messageDate",
                },
                "notempty":{
                    "error" : defaultErrorMessage
                },
                "date":{
                    "error" : iconError + "<span>Ce champ doit être une date valide</span>"
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


    //check each element(input/select/textarea) when it's in focus and has lost focus
    let listRequireField = [
        'input[type=text]',
        'input[type=date]',
        'input[type=password]',
        'input[type=radio]',
        'input[type=checkbox]',
        'select',
        'textarea',
    ];
    document.querySelectorAll(listRequireField.join(',')).forEach(($field)=>{
        let event = $field.nodeName.toLowerCase() === 'select'? 'change' : 'focus';
        $field.addEventListener(event, (e)=>{
            e.target.classList.remove('error');
            if(e.target.closest('form').querySelector(`[data-name="field_${e.target.name}"]`)){
                let $message = e.target.closest('form').querySelector(`[data-name="field_${e.target.name}"]`);
                $message.parentNode.removeChild($message);
            }
        });
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
