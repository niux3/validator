import { ElementHTMLState } from './ElementHTMLState.interface'
import { ElementHTML } from '../ElementHTML'

export class SuccessState implements ElementHTMLState {
    message:string = ''
    constructor(private element: ElementHTML) {}

    handle(): void {
        this.element.$el.classList.add('success')
        this.element.$el.classList.remove('error')
        if(this.element.$el.nodeName.toLowerCase() !== 'form'){
            this.element.$el.setAttribute('aria-invalid', 'false')
            this.element.$el.removeAttribute('aria-describedby')
            for(let [key, value] of Object.entries(this.element.getParams())){
                if(key !== 'target' && Object.keys(value).includes('success')){
                    this.element.$el.setAttribute('aria-describedby', this.element.getId().html!)
                    break
                }
            }
        }
    }

    toString(){
        return 'success'
    }
}
