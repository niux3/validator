import { ElementHTML } from './ElementHTML'
import { ElementHTMLProperties } from './ElementHTML.type'


export class Form extends ElementHTML{
    /**
     * Creates an instance of Field.
     * @param {ElementHTMLProperties} props - The properties of the field element.
    */
    constructor(props:ElementHTMLProperties){
        super(props)
    }
}
