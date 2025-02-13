import { FieldState } from './FieldState.interface';

export class SuccessState implements FieldState {
    constructor(private field: Field) {}

    handle(): void {
        this.field.$el.classList.add('success')
        this.field.$el.classList.remove('error')
    }
}
