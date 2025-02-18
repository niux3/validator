import { ElementHTMLState } from './ElementHTMLState.interface'
import { ElementHTML } from '../ElementHTML'

export class SuccessState implements ElementHTMLState {
    message:string = ''
    constructor(private element: ElementHTML) {}

    handle(): void {
        this.element.$el.classList.add('success')
        this.element.$el.classList.remove('error')
    }

    toString(){
        return 'success'
    }
}
