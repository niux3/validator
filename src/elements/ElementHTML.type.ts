import {
    NeutralState,
    SuccessState,
    ErrorState
} from './state'
import { Rules } from '../rules/Rules'

export type ElementHTMLProperties = {
    element:HTMLInputElement,
    id: {
        html:String,
        fo:String,
        fi:String
    },
    params:any,
    state:NeutralState|SuccessState|ErrorState|null,
    rules:Rules|null,
    middleware:String,
    mode:String
}
