export type Middleware = {
    formOnError: (e:Event, $el:HTMLFormElement)=> void, 
    formOnSuccess: (e:Event, $el:HTMLFormElement)=> void, 
    fieldOnError: ($el:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)=> void, 
    fieldOnSuccess:($el:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)=> void
}
