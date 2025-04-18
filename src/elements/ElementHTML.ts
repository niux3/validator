import { ElementHTMLProperties } from './ElementHTML.type'
import { ElementHTMLState } from './state/ElementHTMLState.interface'
import { Rules } from '../rules/Rules'
import {
    NeutralState,
    SuccessState,
    ErrorState
} from './state'
import {Middleware} from './Middleware.type'


/**
 * Represents an interactive element with a state and events.
 */
export class ElementHTML {
    /** The current state of the element */
    protected state: ElementHTMLState

    /** The associated HTML element */
    public $el: HTMLFormElement|HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement

    /** Identifiers associated with the element */
    protected id: {
        html?: string
        fo: Number
        fi: Number|null
    }

    /** Additional parameters */
    protected params: any

    /** Rules associated with the element */
    protected rules: Rules

    /** Rules associated with the element */
    public middleware:Middleware

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
        this.rules = properties.rules
        this.state = new NeutralState(this)
        this.middleware = properties.middleware
    }

    /**
     * Sets a new state for the element.
     * @param {ElementState} state - The new state to apply.
    */
    protected setState(state: ElementHTMLState): void {
        this.state = state
        this.state.handle()
    }

    /**
     * error the element's state to `ErrorState`.
    */
    protected errorState(): void {
        this.setState(new ErrorState(this))
    }

    /**
     * Success the element's state to `SuccessState`.
    */
    protected successState(): void {
        this.setState(new SuccessState(this))
    }

    /**
     * Resets the element's state to `NeutralState`.
    */
    protected resetState(): void {
        this.setState(new NeutralState(this))
    }

    /**
     * get state of this HTMLElement
    */
    getState():ElementHTMLState{
        return this.state
    }

    /**
     * get id of this HTMLElement
    */
    getId(){
        return this.id
    }

    /**
     * get params of this HTMLElement
    */
    getParams(): Record<string, { error: string; params?: any, success?:string }>{
        return this.params
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
