import { ElementHTMLProperties } from './ElementHTML.type'
import { ElementHTMLState } from './ElementHTMLState.interface'
import {
    NeutralState,
    SuccessState,
    ErrorState
} from './state'


/**
 * Represents an interactive element with a state and events.
 */
export class ElementHTML {
    /** The current state of the element */
    protected state: ElementHTMLState

    /** The associated HTML element */
    public $el: HTMLInputElement

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
    constructor(properties: ElementHTMLProperties) {
        this.$el = properties.element
        this.id = {
            html: properties.id.html,
            fo: properties.id.fo,
            fi: properties.id.fi,
        }
        this.params = properties.params
        // TODO (double state ???)
        //this.state = properties.state 
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
    setState(state: ElementHTMLState): void {
        this.state = state
        this.state.handle()
    }

    /**
     * error the element's state to `ErrorState`.
    */
    errorState(): void {
        this.setState(new ErrorState(this))
    }

    /**
     * Success the element's state to `SuccessState`.
    */
    successState(): void {
        this.setState(new SuccessState(this))
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
