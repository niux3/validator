// @ts-nocheck
import Validator from './Validator'

let options = {
    'selector': '.testForm',
    'fields': {
        'firstname': {
            'isempty': {
                'error': 'ne doit pas être vide (params)',
                'success': '!!',
            },
            'isminlength': {
                'params': 2,
                'error': 'doit contenir au moins 3 caractères',
                'success': 'isminlength ok !'
            }
        }
    }
}
let validator = new Validator(options)
let $myForm = document.getElementById('myForm')
let $lastname = document.getElementById('lastname')

//$myForm?.addEventListener('submit', e => validator.checkForm($myForm, e))

validator.addRules('isimmatriculation', value => /^\d{3,4}[a-z]{2,3}\d{2}[a-z]?$/i.test(value.trim()))

validator.form()
let myForm = document.getElementById('myForm')
validator.addRequireForm(myForm)
validator.form()

document.querySelector('.rmForm')?.addEventListener('click', e =>{
    validator.removeRequireForm(myForm)
    myForm.remove()
})

document.querySelector('.addField')?.addEventListener('click', e =>{
    let tpl = document.getElementById('fieldUsername'),
        contentTpl = tpl.content.cloneNode(true).firstElementChild
    console.log(tpl.content.cloneNode(true).firstElementChild)
    document.querySelector('.testForm')?.insertAdjacentElement('afterbegin', contentTpl)
    validator.addRequireField(contentTpl.querySelector('input'))

})

document.querySelector('.rmField')?.addEventListener('click', e =>{
    let username = document.querySelector('#username')
    validator.removeRequireField(username)
    username.closest('label').remove()
})


$lastname?.addEventListener('blur', e => validator.element($lastname))


console.log('>>', validator.check('a123', 'isbetweenlength', '2;10'))
