import { ElementState } from './ElementState.interface'

export class ErrorState implements ElementState {
    constructor(private element: Element) {}

    handle(): void {
        this.element.$el.classList.add('error')
        this.element.$el.classList.remove('success')
    }
}
