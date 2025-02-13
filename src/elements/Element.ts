import { ElementProperties } from "./Element.type"
import { ElementState } from './ElementState.interface'
import { ErrorState } from "./ErrorState"
import { SuccessState } from "./SuccessState"
import { NeutralState } from './NeutralState'


/**
 * Represents an interactive element with a state and events.
 */
export class Element {
    /** The current state of the element */
    protected state: ElementState

    /** The associated HTML element */
    protected $el: HTMLElement

    /** Identifiers associated with the element */
    protected id: {
        html: String
        fo: String
        fi: String
    }

    /** Additional parameters */
    protected params?: String
    // protected state?: String

    /** Rules associated with the element */
    protected rules?: String

    /** Optional middleware */
    protected middleware?: String

    /** Mode of operation */
    protected mode?: String

    /**
     * Creates an instance of `Element`.
     * @param {ElementProperties} properties - The properties of the element.
    */
    constructor(properties: ElementProperties) {
        this.$el = properties.element
        this.id = {
            html: properties.id.html,
            fo: properties.id.fo,
            fi: properties.id.fi,
        }
        this.params = properties.params
        this.state = properties.state // TODO (double state ???)
        this.rules = properties.rules
        this.middleware = properties.middleware
        this.mode = properties.mode
        this.state = new NeutralState(this)

        console.log(this)
    }

    /**
     * Sets a new state for the element.
     * @param {ElementState} state - The new state to apply.
    */
    setState(state: ElementState): void {
        this.state = state
        this.state.handle()
    }

    /**
     * Resets the element's state to `NeutralState`.
    */
    resetState(): void {
        this.setState(new NeutralState(this))
    }

    /**
     * Adds an event listener to the element.
     * @param {string} ev - The event type (e.g., "click").
     * @param {(event: Event, element: this) => void} callback - The callback function to execute when the event occurs.
     * @param {boolean} [useCapture=false] - Indicates whether the event should be captured during the capture phase.
    */
    on(ev:string, callback: (event: Event, element: this) => void, useCapture: boolean = false): void {
        this.$el.addEventListener(ev, (e) => {
            callback(e, this)
        }, useCapture)
    }
}
