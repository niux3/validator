import Form from '../element/Form';

export default class FormsGroup{
    constructor(config){
        this.__config = config;
        this.index = 0;
        this.__forms = [];

        document.querySelectorAll(this.__config.get().selector).forEach(($form, i) =>{
            this.addForm($form);
        });
    }

    /*
    * subscription at the form property
    * @param add form object
    */
    addForm($form){ 
        this.__forms.push(new Form($form));
    }

    /*
    * remove subscription at the form property
    * @param form object
    */
    rmForm($form){
        return null;
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
            callback(form);
        }
    }

    /*
    * get current form object
    */
    current(){
        let form = this.get()[this.index];
        this.index += 1;

        return form;
    }

    /*
    * check next form object
    */
    next(){
        return this.index >= this.get().length || this.get()[this.index] === null? false : true;
    }

    /*
    * get first form object
    */
    reset(){
        this.index = 0;
    }
}
