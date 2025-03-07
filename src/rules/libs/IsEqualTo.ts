/**
 * Compares a value with the value of an HTML input element or a numeric parameter.
 *
 * @param {string} value - The value to compare.
 * @param {string} params - A selector for the HTML input element or a numeric string.
 * @returns {boolean} - Returns `true` if the value matches the input element's value or the numeric parameter, otherwise `false`.
 *
 * @example
 * // Example 1: Comparing with an input element's value
 * // HTML: <input id="myInput" value="Hello">
 * const result1 = IsEqualTo("Hello", "#myInput");
 * console.log(result1); // Output: true
 *
 * @example
 * // Example 2: Comparing with a numeric parameter
 * const result2 = IsEqualTo("42", "42");
 * console.log(result2); // Output: true
 *
 * @example
 * // Example 3: Comparing with a non-matching value
 * const result3 = IsEqualTo("Hello", "World");
 * console.log(result3); // Output: false
 */
export default (value:string, params:string):boolean =>{
    if(!/^\d+/.test(params) && params.length > 0 && document.querySelectorAll(params) !== null){
        // @ts-ignore
        return value === document.querySelector(params)?.value.trim()
    }else{
        if(/^\d+$/.test(params)){
            return parseInt(params,10) === parseInt(value, 10)
        }else{
            return params === value
        }
    }
}
