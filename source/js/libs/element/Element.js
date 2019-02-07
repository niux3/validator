export default class Element{
    constructor($el = null){
        this.$el = $el;
    }

    //event
    on(ev, callback, useCapture = false){
        this.$el.addEventListener(ev,(e)=>{
            callback(e, this);
        }, useCapture);
    }

}
