export default class Element{
    constructor(properties){
        this.$el = properties.element;
        this.id = properties.id;
    }

    //event
    on(ev, callback, useCapture = false){
        this.$el.addEventListener(ev,(e)=>{
            callback(e, this);
        }, useCapture);
    }

}
