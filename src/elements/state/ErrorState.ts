import { ElementHTMLState } from '../ElementHTMLState.interface'
import { ElementHTML } from '../ElementHTML'

export class ErrorState implements ElementHTMLState {
    message:string = ''
    constructor(private element: ElementHTML) {}

    handle(): void {
        this.element.$el.classList.add('error')
        this.element.$el.classList.remove('success')
    }

    toString(){
        return 'error'
    }
}
