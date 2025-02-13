import { Element } from "./Element"
import { ElementProperties } from "./Element.type"
import { ErrorState } from "./ErrorState"
import { SuccessState } from "./SuccessState"
import { NeutralState } from './NeutralState'
import { FieldState } from "./FieldState.interface"


export class Field extends Element{
    private state: FieldState

    constructor(props:ElementProperties){
        super(props)
        this.switchRequireAttribute()
        this.state = new NeutralState(this)
    }

    setState(state: FieldState): void {
        this.state = state
        this.state.handle()
    }

    resetState(): void {
        this.setState(new NeutralState(this))
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
