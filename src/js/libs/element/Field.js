import { Element } from './Element';

class Field extends Element{
    constructor($el = null){
        super($el);
        this.state = {
            success : false,
            error : false,
            message : null
        };
        this.multipleData = false;
    }

    resetState(){
        this.setState({
            sucess : false,
            error : false,
            message : null
        });
    }

    setState(val){
        if(typeof val === "object"){
            this.state = val;
        }
    }

    update(obj, i, callback){
        //console.log('field update >>>', obj, i, obj === this);

        return callback(this);
    }
}

export { Field }
