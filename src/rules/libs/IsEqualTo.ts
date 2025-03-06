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
    let result = true
    if(document.querySelector(params) !== null){
        // @ts-ignore
        if(value !== document.querySelector(params)?.value.trim()){
            result = false
        }
    }else{
        if(/[^0-9]/.test(params) && params !== value){
            result = false
        }
        if(/\d+/.test(params) && parseInt(params,10) !== parseInt(value, 10)){
            result = false
        }
    }
    return result
}
