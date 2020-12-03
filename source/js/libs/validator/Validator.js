/*
                                  __......._    _..--._,--._
                            _.--''  , ,:   :``-/  :.` (-`,o)``-._
                         ,-'`::.      ::  .: ` `-._    `--' :. __\
                      ,-':   `::  `   :: ,:;     . \  :.  _.-''  /
                    ,'  `:.`  ::. ,   `:.::.  ,  `: `. _,' . ` ,`
                 _,' `   `:.  `::       `::;     ,    ` __.,.-`
 `-._         _,'  `:   .-::-.  ::  `    ,:  ,' /. )-'''
  `  ``--.._,'`:._  `:.     ,: \ `:.___.,::..--/: / /
      . _.-'    _.--'``--''`'`.:\'''-`------..( `(._`._____.....---
-..___,'`:_..-''   -  _   -.  _\.`.      -     `:.`.       ,`
    ,:. ,'---...._______  ,     \_.`. -=    `  , `..\ ,  -     .-  _
   /  ,'    ___         ```````---`,)'-------....._).`.____,.__....---
  :  :    ,',-.:.                                  `'`'
  |  |   ( (   \ \  author : Renaud Bourdeau
  ::.:    `.:, /./  email : renaudbourdeau@gmail.com
   `. `-..__..' /   version : 0.10.1
     `-.::__.:-'
*/
import Polyfills from '../Polyfills';
import Configuration from '../configuration/Configuration';
import FormsGroup from '../element/FormsGroup';
import Rules from '../rules/Rules';

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

        let configDefaultApps = {
            'selector' : 'form',
            'mode' : 'object',
            'fields' : {}
        };

        this.middleware = {
            formOnError : null,
            formOnSuccess : null,
            fieldOnError : null,
            fieldOnSuccess : null,
        };

        let appConfig = new Configuration(options, configDefaultApps);

        this.__app = new Configuration({
            options : appConfig ,
            rules : new Rules(),
            middleware : this.middleware,
            state : []
        });
        this.__FormsGroup = new FormsGroup(this.__app);
        return this;
    }

    /*
    * validate some fields in forms on submit
    */
    form(){
        this.__FormsGroup.each((form, i)=>{
            form.on('submit', (event, form)=>{
                this.__app.state[i].success = false;
                form.notify((field) =>{
                    field.clean().validate().displayState();
                });

                if(!this.__app.state[i].success){
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
    * validate some fields in specific form
    */
    checkForm($el, event){
        this.__FormsGroup.each((form, i)=>{
            if($el === form.$el){
                this.__app.state[i].success = false;
                form.notify((field) =>{
                    field.clean().validate().displayState();
                });

                if(!this.__app.state[i].success){
                    if(this.middleware.formOnError !== null){
                        this.middleware.formOnError(event, form.$el);
                    }
                    event.preventDefault();
                }else{
                    if(this.middleware.formOnSuccess !== null){
                        this.middleware.formOnSuccess(event, form.$el);
                    }
                }
            }
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
        let inFormGroup = false;
        this.__FormsGroup.each(form =>{
            if(form.$el === $el){
                inFormGroup = true;
            }
        });
        if(!inFormGroup){
            this.__FormsGroup.addForm($el);
        }
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
        this.__app.rules.set(key, rule);
    }

    /*
    * check if the form is valid
    * @param $el is a form (node) : element in the dom
    */
    formIsValid($el){
        let state = false;
        this.__FormsGroup.each((form, i)=>{
            if(form.$el === $el){
                state = this.__app.state[i].success;
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
        return !this.__app.rules.get()[rulesname](data, configuration);
    }
}
