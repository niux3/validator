import { Element } from "./Element"
import { ElementProperties } from "./Element.type"


export class Field extends Element{

    constructor(props:ElementProperties){
        super(props)
        this.switchRequireAttribute()
    }

    validate(): void {
        const isValid = this.$el.value.trim() !== "";
        if (isValid) {
            this.setState(new SuccessState(this))
        } else {
            this.setState(new ErrorState(this))
        }
    }
    
    private switchRequireAttribute(){
        if(this.$el.hasAttribute('required')){
            this.$el.removeAttribute('required')
            this.$el.classList.add('require')
        }
    }
}
