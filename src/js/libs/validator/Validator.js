/*
                       ..,co88oc.oo8888cc,..
  o8o.               ..,o8889689ooo888o"88888888oooc..
.88888             .o888896888".88888888o'?888888888889ooo....
a888P          ..c6888969""..,"o888888888o.?8888888888"".ooo8888oo.
088P        ..atc88889"".,oo8o.86888888888o 88988889",o888888888888.
888t  ...coo688889"'.ooo88o88b.'86988988889 8688888'o8888896989^888o
 888888888888"..ooo888968888888  "9o688888' "888988 8888868888'o88888
  ""G8889""'ooo888888888888889 .d8o9889""'   "8688o."88888988"o888888o .
           o8888'""""""""""'   o8688"          88868. 888888.68988888"o8o.
           88888o.              "8888ooo.        '8888. 88888.8898888o"888o.
           "888888'               "888888'          '""8o"8888.8869888oo8888o .
      . :.:::::::::::.: .     . :.::::::::.: .   . : ::.:."8888 "888888888888o
                                                        :..8888,. "88888888888.
                                                        .:o888.o8o.  "866o9888o
                                                         :888.o8888.  "88."89".
    author : Renaud Bourdeau                            . 89  888888    "88":.
    version : 2.0                                       :.     '8888o
    email : renaudbourdeau@gmail.com                     .       "8888..
                                                                   888888o.
                                                                    "888889,
                                                             . : :.:::::::.: :.
*/

import Polyfills from '../Polyfills';
import Configuration from '../configuration/Configuration';
import FormsGroup from '../element/FormsGroup';
import Rules from './Rules';

export default class Validator{

    /*
    *
    * public method
    *
    */

    /*
    * init object
    * @param options is a object : configuration by the user
    */
    constructor(options = {}){
        Polyfills.run();
        this.__configuration = new Configuration(options);
        this.__rules = new Rules();
        this.__FormsGroup = new FormsGroup(this.__configuration);
        
        return this;
    }

    

    /*
    * validate some fields in forms
    * @param callback is lambda function : add a callback function to after validat form    *
    */
    form(callback = null){
        this.__FormsGroup.each((form)=>{
            form.on('submit', (e, form)=>{
                form.notify((field, i) =>{
                    this.__manageField(field);
                });
                if(e.target.querySelectorAll('.error').length > 0){
                    if(callback !== null){
                        callback();
                    }
                    e.preventDefault();
                }
            });
        });
    }

    /*
    * validate one field
    * @param $el is a input (node) : element in the dom
    */
    element($el){
        this.__FormsGroup.each((form)=>{
            form.notify((field, i) =>{
                if(field.$el === $el){
                    this.__manageField(field);
                }
            });
        });
    }


    addRequireField($el){
        this.__FormsGroup.each((form)=>{
            if(form.$el === $el.closest('form')){
                form.addField($el);
                $el.classList.add('require');
            }            
        });
    }

    removeRequireField($el){
        this.__FormsGroup.each((form)=>{
            form.notify((field, i)=>{
                if(field.$el === $el){
                    form.rmField(i);
                    $el.classList.remove('require');
                    $el.classList.remove('error');
                    var $stateMessage = document.getElementById(`${$el.id}_statemessage`);
                    if($stateMessage){
                        $stateMessage.parentNode.removeChild($stateMessage);
                    }
                }
            })
        });
    }
    
    /*
    * add or update rule attribute
    * @param key is a string : a name of rule
    * @param rule  is a lambda function : return bollean validation (the first argument of the lambda method is the field object)
    */
    addRules(key, rule){
        this.__rules.set(key, rule);
    }

    /*
    *
    * private method
    *
    */

    /*
    * validate one field
    * @param field is a attribute of Form object
    */
    __manageField(field){
        this.__rmMessages(field);
        this.__validate(field);
        this.__displayState(field);
    }

    /*
    * remove error
    * @param field is a attribute of Form object
    */
    __rmMessages(field){
        for(let item in field.state){
            if(item !== "message" && field.state[item] === true){
                field.resetState();
                field.$el.classList.remove(item);

                if(document.getElementById(`${field.$el.name}_statemessage`) !== null){
                    let $errorMessage = document.getElementById(`${field.$el.name}_statemessage`);
                    $errorMessage.parentNode.removeChild($errorMessage);
                }
            }
        }
    }


    /*
    * check validity field
    * @param field is a attribute of Form object
    */
    __validate(field){
        let defaultRules = this.__rules.get();
        let rulesInNode = this.__configuration.getRulesList(field);
        let fieldValue;
        let checks = [];

        //field is a group of checkbox or multiple choices or radio ?
        if(field.$el.name.indexOf('[]') !== -1 || field.$el.type === "radio"){
            document.getElementsByName(field.$el.name).forEach(($input) =>{
                if($input.checked){
                    checks.push($input.value);
                }
            });
            fieldValue = checks;
        }else{
            fieldValue = field.$el.value.trim();
        }

        rulesInNode.forEach((ruleInNode) =>{
            for(let key in defaultRules){
                if( key === ruleInNode && defaultRules[key](fieldValue, this.__configuration.getNameKey(field.$el.name)[key])){
                    field.state.error = true;
                    field.state.message = this.__configuration.getNameKey(field.$el.name)[key]['message'];
                }

                if(!field.state.error){
                    field.state.success = true;
                }else{
                    field.state.success = false;
                }
            }
        });
    }

    /*
    * return
    * @param field is a attribute of Form object
    */
    __getTemplateMessage(cls, id, msg){
        return `<span id="${id}_statemessage" class="${cls}">${msg}</span>`;
    }

    /*
    * show error
    * @param field is a attribute of Form object
    */
    __displayState(field){
        if(document.getElementById(`${field.$el.name}_statemessage`)){
            return;
        }
        for(let item in field.state){
            if(item !== 'message' && field.state[item]){
                field.$el.classList.add(item);
                field.state.message = field.state.message !== null? field.state.message : '';

                if(this.__configuration.get()['fields'][field.$el.name].hasOwnProperty('target')){
                    if(field.$el.closest('form').querySelector(this.__configuration.getNameKey(field.$el.name)['target'][item])){
                        field.$el.closest('form').querySelectorAll(this.__configuration.getNameKey(field.$el.name)['target'][item]).forEach(($target) =>{
                            $target.insertAdjacentHTML('beforeend', this.__getTemplateMessage( item, field.$el.name , field.state.message ))
                        });
                    }
                }else{
                    field.$el.insertAdjacentHTML('afterend', this.__getTemplateMessage( item, field.$el.name, field.state.message ));
                }
            }
        }
    }
}
