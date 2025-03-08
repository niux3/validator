import { Field } from "./Field"
import {Middleware} from "./Middleware.type"


export interface FormSubject{
    register(indexField:number, $field:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement, middleware:Middleware):void
    unregister(field:Field):void
    notify(callback:Function):void
}
