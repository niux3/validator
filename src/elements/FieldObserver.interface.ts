import { Field } from "./Field"


export interface FieldObserver{
    update(field:Field, i:number, callback:Function):void
}
