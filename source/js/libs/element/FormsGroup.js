import Form from '../element/Form';

export default class FormsGroup{
    constructor(config){
        this.__config = config;
        this.__index = 0;
        this.__forms = [];

        document.querySelectorAll(this.__config.get().selector).forEach(($form, i) =>{
            this.addForm($form);
        });
    }

    /*
    * subscription at the form property
    * @param form $el object
    */
    addForm($form){ 
        this.__forms.push(new Form($form));
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
