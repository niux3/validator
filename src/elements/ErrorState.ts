import { FieldState } from './FieldState.interface';

export class ErrorState implements FieldState {
    constructor(private field: Field) {}

    handle(): void {
        this.field.$el.classList.add('error')
        this.field.$el.classList.remove('success')
    }
}
