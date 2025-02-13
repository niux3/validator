import { ElementProperties } from "./Element.type"


export class Element {
    protected $el: HTMLElement
    protected id: {
        html: String
        fo: String
        fi: String
    }
    protected params?: String
    protected state?: String
    protected rules?: String
    protected middleware?: String
    protected mode?: String

    constructor(properties: ElementProperties) {
        this.$el = properties.element
        this.id = {
            html: properties.id.html,
            fo: properties.id.fo,
            fi: properties.id.fi,
        }
        this.params = properties.params
        this.state = properties.state
        this.rules = properties.rules
        this.middleware = properties.middleware
        this.mode = properties.mode

        console.log(this)
    }

    // Gestionnaire d'événements amélioré
    on(ev:string, callback: (event: Event, element: this) => void, useCapture: boolean = false): void {
        this.$el.addEventListener(ev, (e) => {
            callback(e, this)
        }, useCapture)
    }
}
