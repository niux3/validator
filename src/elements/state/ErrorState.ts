import { ElementHTMLState } from './ElementHTMLState.interface'
import { ElementHTML } from '../ElementHTML'

export class ErrorState implements ElementHTMLState {
    message:string = ''
    constructor(private element: ElementHTML) {}

    handle(): void {
        this.element.$el.classList.add('error')
        this.element.$el.classList.remove('success')
        if(this.element.$el.nodeName.toLowerCase() !== 'form'){
            this.element.$el.setAttribute('aria-invalid', 'true')
            this.element.$el.setAttribute('aria-describedby', this.element.getId().html!)
        }
    }

    toString(){
        return 'error'
    }
}
