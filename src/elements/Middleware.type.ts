export type Middleware = {
    formOnError: (e: Event, $el: HTMLFormElement) => void,
    formOnSuccess: (e: Event, $el: HTMLFormElement) => void,
    fieldOnError: ($el: HTMLElement) => void,
    fieldOnSuccess: ($el: HTMLElement) => void
}