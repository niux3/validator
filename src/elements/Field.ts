import { ElementHTML } from './ElementHTML'
import { ElementHTMLProperties } from './ElementHTML.type'
import {
    SuccessState,
    ErrorState
} from './state'


export class Field extends ElementHTML{

    constructor(props:ElementHTMLProperties){
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
