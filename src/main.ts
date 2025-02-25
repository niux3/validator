// @ts-nocheck
import Validator from './Validator'

let validator = new Validator()
let $myForm = document.getElementById('myForm')
let $lastname = document.getElementById('lastname')

//$myForm?.addEventListener('submit', e => validator.checkForm($myForm, e))
validator.form()

$lastname?.addEventListener('blur', e => validator.element($lastname))


console.log('>>', validator.check('', 'isempty'))
