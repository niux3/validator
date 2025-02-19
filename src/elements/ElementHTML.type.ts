import {
    NeutralState,
    SuccessState,
    ErrorState
} from './state'
import { Rules } from '../rules/Rules'

export type ElementHTMLProperties = {
    element:HTMLInputElement,
    id: {
        html?:string,
        fo:number,
        fi:number
    },
    params:any,
    state:NeutralState|SuccessState|ErrorState|null,
    rules:Rules,
    middleware:String,
    mode:String
}
