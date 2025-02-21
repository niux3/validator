import { Field } from "./Field"


export interface FormSubject{
    register(indexField:number, $field:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement):void
    unregister(field:Field):void
    notify(callback:Function):void
}
