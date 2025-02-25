import {
    NeutralState,
    SuccessState,
    ErrorState
} from './state'
import { Rules } from '../rules/Rules'

export type ElementHTMLProperties = {
    element:HTMLInputElement|HTMLFormElement|HTMLSelectElement|HTMLTextAreaElement,
    id: {
        html?:string,
        fo:number,
        fi:number|null
    },
    params:any,
    state:NeutralState|SuccessState|ErrorState|null,
    rules:Rules,
}
