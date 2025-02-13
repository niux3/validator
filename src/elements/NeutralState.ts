import { ElementState } from './ElementState.interface'

export class NeutralState implements ElementState {
    constructor(private element: Element) {}

    handle(): void {
        if(this.element.$el.classList.contains('error')){
            this.element.$el.classList.remove('error')
        }
        if(this.element.$el.classList.contains('success')){
            this.element.$el.classList.remove('success')
        }
    }
}
