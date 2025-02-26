// @ts-nocheck
import Validator from './Validator'

let options = {
    'fields': {
        'firstname': {
            'isempty': {
                'error': 'ne doit pas être vide (params)',
            },
            'isminlength': {
                'params': 3,
                'error': 'doit contenir au moins 3 caractères'
            }
        }
    }
}
let validator = new Validator(options)
let $myForm = document.getElementById('myForm')
let $lastname = document.getElementById('lastname')

//$myForm?.addEventListener('submit', e => validator.checkForm($myForm, e))
validator.form()

$lastname?.addEventListener('blur', e => validator.element($lastname))


console.log('>>', validator.check('', 'isempty'))
