import { ElementHTMLState } from './ElementHTMLState.interface'
import { ElementHTML } from '../ElementHTML'

export class NeutralState implements ElementHTMLState {
    message:string = ''
    constructor(private element: ElementHTML) {}

    handle(): void {
        if(this.element.$el.classList.contains('error')){
            this.element.$el.classList.remove('error')
        }
        if(this.element.$el.classList.contains('success')){
            this.element.$el.classList.remove('success')
        }
        if(this.element.$el.nodeName.toLowerCase() !== 'form'){
            this.element.$el.removeAttribute('aria-invalid')
            this.element.$el.removeAttribute('aria-describedby')
        }
    }

    toString(){
        return 'neutral'
    }
}
