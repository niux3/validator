import Form from '../element/Form';

export default class FormsGroup{
    constructor(config){
        this.__configuration = config;
        this.__index = 0;
        this.__forms = [];
        document.querySelectorAll(this.__configuration.options.selector).forEach(($form, i) =>{
            this.addForm($form);
        });
    }

    /*
    * subscription at the form property
    * @param form $el object
    */
    addForm($form){
        this.__configuration.state[ this.__forms.length ] = {
            success : false,
            fields : []
        };

        let props = {
            element : $form,
            id : {
                html : `vfo${this.__forms.length}_`,
                fo : this.__forms.length
            },
            params : this.__configuration.options['fields'],
            state : this.__configuration.state,
            rules : this.__configuration.rules,
            middleware : this.__configuration.middleware,
            mode : this.__configuration.options.mode
        };

        this.__forms.push(new Form(props));
    }

    /*
    * remove subscription at the form property
    * @param form $el object
    */
    rmForm($form){
        this.each((form, i)=>{
            if(form.$el === $el){
                delete this.__forms[i];
            }
        });
    }

    /*
    * get all forms objects
    */
    get(){
        return this.__forms;
    }

    /*
    * subscription at the form property
    * @param add form object
    */
    each(callback){
        let form;

        this.reset();
        while(form = this.current()){
            this.next();
            callback(form, this.__index - 1); // this.__index - 1 because current method add one point
        }
    }

    /*
    * get current form object
    */
    current(){
        let form = this.get()[this.__index];
        this.__index += 1;

        return form;
    }

    /*
    * check next form object
    */
    next(){
        return this.__index >= this.get().length || this.get()[this.__index] === null? false : true;
    }

    /*
    * get first form object
    */
    reset(){
        this.__index = 0;
    }
}
