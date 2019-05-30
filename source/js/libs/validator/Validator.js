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
    version : 0.5.6                                     :.     '8888o
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

        this.middleware = {
            formOnError : null,
            formOnSuccess : null,
            fieldOnError : null,
            fieldOnSuccess : null,
        };

        this.__configuration = {
            params : new Configuration(options),
            rules : new Rules(),
            middleware : this.middleware,
            state : []
        };
        this.__FormsGroup = new FormsGroup(this.__configuration);


        return this;
    }

    /*
    * validate some fields in forms
    */
    form(){
        this.__FormsGroup.each((form, i)=>{
            form.on('submit', (event, form)=>{
                this.__configuration.state[i].success = false;
                form.notify((field) =>{
                    field.clean().validate().displayState();
                });

                if(!this.__configuration.state[i].success){
                    if(this.middleware.formOnError !== null){
                        this.middleware.formOnError(event, form.$el);
                    }
                    event.preventDefault();
                }else{
                    if(this.middleware.formOnSuccess !== null){
                        this.middleware.formOnSuccess(event, form.$el);
                    }
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
                    field.clean().validate().displayState();
                    return field.$el;
                }
            });
        });
    }

    /*
    * add Field for validation
    * @param $el is a input (node) : element in the dom
    */
    addRequireField($el){
        this.__FormsGroup.each((form)=>{
            if(form.$el === $el.closest('form')){
                $el.classList.add('require');
                form.addField($el);
            }
        });
    }

    /*
    * remove Field for validation
    * @param $el is a input (node) : element in the dom
    */
    removeRequireField($el){
        this.__FormsGroup.each((form, i)=>{
            form.notify((field, j)=>{
                if(field.$el === $el){
                    field.$el.classList.remove('require');
                    form.rmField(j);
                }
            })
        });
    }

    /*
    * add Form for validation
    * @param $el is a form (node) : element in the dom
    */
    addRequireForm($el){
        this.__FormsGroup.addForm($el);
    }

    /*
    * remove Form for validation
    * @param $el is a form (node) : element in the dom
    */
    removeRequireForm($el){
        this.__FormsGroup.rmForm($el);
    }

    /*
    * add or update rule attribute
    * @param key is a string : a name of rule
    * @param rule  is a lambda function : return bollean validation (the first argument of the lambda method is the field object)
    */
    addRules(key, rule){
        this.__configuration.rules.set(key, rule);
    }

    /*
    * check if the form is valid
    * @param $el is a form (node) : element in the dom
    */
    formIsValid($el){
        let state = false;
        this.__FormsGroup.each((form, i)=>{
            if(form.$el === $el){
                state = this.__configuration.state[i].success;
            }
        });
        return state;
    }


    /*
    * check valid data
    * @param data is a value to test
    * @param rulesname is a name of one item in rules list
    * @param configuration is an object with a little more parameters for the rules method
    * @return boolean
    */
    check(data, rulesname, configuration = {}){
        return !this.__configuration.rules.get()[rulesname](data, configuration);
    }
}
