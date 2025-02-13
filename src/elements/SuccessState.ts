import { ElementState } from './ElementState.interface'

export class SuccessState implements ElementState {
    constructor(private element: Element) {}

    handle(): void {
        this.element.$el.classList.add('success')
        this.element.$el.classList.remove('error')
    }
}
