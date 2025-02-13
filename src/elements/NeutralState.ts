import { FieldState } from './FieldState.interface'

export class NeutralState implements FieldState {
    constructor(private field: Field) {}

    handle(): void {
        if(this.field.$el.classList.contains('error')){
            this.field.$el.classList.remove('error')
        }
        if(this.field.$el.classList.contains('success')){
            this.field.$el.classList.remove('success')
        }
    }
}
