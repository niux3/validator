export default class Element{
    constructor(properties){
        this.$el = properties.element;
        // for(let item in properties){
        //     if(item !== 'element'){
        //         console.log('=> ', item, properties[item])
        //         console.log('>> ', properties[item])
        //         console.log('-> ', typeof properties[item])
        //         this.item = properties[item];
        //     }
        // }
        this.id = {
            html : properties.id.html,
            fo : properties.id.fo,
            fi : properties.id.fi,
        }
        this.params = properties.params;
        this.state = properties.state;
        this.rules = properties.rules;
        this.middleware = properties.middleware;
        this.mode = properties.mode;
        // this.id.fo = properties.id.fo;
        // console.log(this);
    }

    //event
    on(ev, callback, useCapture = false){
        this.$el.addEventListener(ev,(e)=>{
            callback(e, this);
        }, useCapture);
    }

}
