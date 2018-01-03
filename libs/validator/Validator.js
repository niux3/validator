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


import { ConfigurationValidatorLoader } from './ConfigurationValidatorLoader';
import { Form } from '../element/Form';
import { Field } from '../element/Field';

class Validator{

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
        this.config = this.__getConfig(options);
        this.rules = this.__getDefaultRules();
        this.__forms = [];

        document.querySelectorAll(this.config.get().selector).forEach(($form, i) =>{
            let form = new Form($form);
            this.__addForm(form);
            this.__forms[i].$el.querySelectorAll('.require').forEach(($require, k) => {
                this.__forms[i].addField(new Field($require));
            });
        });
    }

    /*
    * add or update rule attribute
    * @param key is a string : a name of rule
    * @param rule  is a lambda function : return bollean validation (the first argument of the lambda method is the field object)
    */
    setRules(key, rule){
        this.rules[key] = rule;
    }

    /*
    * validate some fields in forms
    * @param callback is lambda function : add a callback function to after validat form    *
    */
    form(callback = null){
        this.__forms.forEach((form, indexForm) =>{
            form.$el.addEventListener('submit', (e) =>{

                form.getFields().forEach((field, indexField)=>{
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
        this.__forms.forEach((form) =>{
            form.getFields().forEach((field, indexField)=>{
                if(field.$el === $el){
                    this.__manageField(field);
                }
            });
        });
    }


    addRequireField($el){
        $el.classList.add('require');
        this.__forms.forEach((form) =>{
            if(form.$el === $el.closest('form')){
                form.addField(new Field($el));
            }
        });
    }

    removeRequireField($el){
        $el.classList.remove('require');
        $el.classList.remove('error');
        var $stateMessage = document.getElementById(`${$el.id}_statemessage`);
        if($stateMessage){
            $stateMessage.parentNode.removeChild($stateMessage);
        }

        this.__forms.forEach((form, i)=>{
            form.__fields.forEach((field, j) =>{
                if(field.$el === $el){
                    form.rmField(j);
                }
            });
        });
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
    * manage rules list
    * @param field is a attribute of Form object
    *
    * @return object
    */
    __getRulesListFromConfig(field){
        let rulesInField = this.config.getNameKey(field.$el.name);
        let notempty = false;
        let rulesList = [];

        for(let item in rulesInField){
            item = item.trim().replace(/\s+/g, ' ');
            if(item !== "target"){
                if(item === "notempty"){
                    notempty = true;
                }else{
                    rulesList.push(item);
                }
            }
        }

        if(notempty){
            rulesList.push('notempty');
        }

        return rulesList;
    }



    /*
    * check validity field
    * @param field is a attribute of Form object
    */
    __validate(field){
        let defaultRules = this.__getRules();
        let rulesInNode = this.__getRulesListFromConfig(field);
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
                if( key === ruleInNode && defaultRules[key](fieldValue, this.config.getNameKey(field.$el.name)[key])){
                    field.state.error = true;
                    field.state.message = this.config.getNameKey(field.$el.name)[key]['message'];
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

                if(this.config.get()['fields'][field.$el.name].hasOwnProperty('target')){
                    if(document.querySelector(this.config.getNameKey(field.$el.name)['target'][item])){
                         document.querySelector(this.config.getNameKey(field.$el.name)['target'][item]).insertAdjacentHTML('beforeend', this.__getTemplateMessage( item, field.$el.name , field.state.message ))
                    }
                }else{
                    field.$el.insertAdjacentHTML('afterend', this.__getTemplateMessage( item, field.$el.name, field.state.message ));
                }
            }
        }
    }

    /*
    * subscription at the form property
    * @param add form object
    */
    __addForm(form){
        this.__forms.push(form);
    }

    /*
    * get content attribute of rules
    * @param options is a object : configuration by the user
    *
    * @return object
    */
    __getConfig(options){
        let defaultValues = [
            {
                "k" : "selector",
                "f" : "string",
                "v" : "form"
            },
            {
                "k" : "mode",
                "f" : "string",
                "v" : "html"
            },
            {
                "k" : "succcess",
                "f" : "bolean",
                "v" : false
            },
        ];
        let config = new ConfigurationValidatorLoader(options);

        for(var i = 0; i < defaultValues.length; i++){
            config.update(defaultValues[i]['k'], defaultValues[i]['v'], defaultValues[i]['f'], options);
        }

        if(options['fields'] !== undefined){ // && config.get().mode === "object"
            config.add('fields', options['fields']);
        }

        return config;
    }


    /*
    * get content attribute of rules
    * @return object
    */
    __getRules(){
        return this.rules;
    }

    /*
    * get rules list by default in library
    * @return object
    */
    __getDefaultRules(){
        return {
            'boolean'       : (...args)=>{
                return !new RegExp("^0|1|true|false$").test(args[0]);
            },
            'notempty'      : (...args)=>{
                return parseInt(args[0].length, 10) === 0;
            },
            'email'         : (...args)=>{
                return !new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[A-Za-z]{2,}$").test(args[0]);
            },
            'alphanumeric'  : (...args)=>{
                return !new RegExp('^[a-z0-9]+$').test(args[0]);
            },
            'numeric'       : (...args)=>{
                return !new RegExp('^[0-9]+$').test(args[0]);
            },
            'float'         : (...args)=>{
                return !new RegExp('^[0-9]+(\.|,)[0-9]+$').test(args[0]);
            },
            'alpha'         : (...args)=>{
                return !new RegExp('^[a-zA-Z]+$').test(args[0]);
            },
            'url'           : (...args)=>{
                return !new RegExp('^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$').test(args[0]);
            },
            'ipv4'          : (...args)=>{
                return !new RegExp('^([0-2][0-5][0-9]\.){3}[0-2][0-5][0-9]$').test(args[0]);
            },
            'min'           : (...args)=>{
                return parseInt(args[0], 10) < parseInt(args[1]['params'], 10);
            },
            'max'           : (...args)=>{
                return parseInt(args[0], 10) > parseInt(args[1]['params'], 10);
            },
            'between'       : (...args)=>{
                let params = args[1].split(';');
                return  args[0] > parseInt(params[0], 10) || args[0] < parseInt(params[1], 10);
            },
            'maxlength'     : (...args)=>{
                return parseInt(args[0].length, 10) > parseInt(args[1]['params'], 10);
            },
            'minlength'     : (...args)=>{
                return parseInt(args[0].length, 10) < parseInt(args[1]['params'], 10) ;
            },
            'betweenlength' : (...args)=>{
                let params = args[0].split(';');
                return  args[0].length < params[0] || args[0].length > params[1];
            },
            'equalto'       : (...args)=>{
                let params = args[1]['params'];
                if(document.querySelector(params)){
                    if(args[0] != document.querySelector(params).value.trim()){
                        return true;
                    }
                }else{
                    if(/[^0-9]/.test(params) && params !== args[0]){
                        return true;
                    }else if(parseInt(params,10) !== parseInt(args[0], 10)){
                        return true;
                    }
                }
            }
        }
    }
}

export { Validator }
