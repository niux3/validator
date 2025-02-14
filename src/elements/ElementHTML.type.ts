import {
    NeutralState,
    SuccessState,
    ErrorState
} from './state'

export type ElementHTMLProperties = {
    element:HTMLInputElement,
    id: {
        html:String,
        fo:String,
        fi:String
    },
    params:String,
    state: NeutralState|SuccessState|ErrorState,
    rules:String,
    middleware:String,
    mode:String
}
