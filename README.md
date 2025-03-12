# ![validator](./static/img/logo.svg)

## Table des Matières / Table of Contents
- français
    - [Introduction](#introduction_fr)
    - [Installation](#installation_fr)
    - [Utilisation](#utilisation_fr)
    - [API](#api_fr)
    - [License](#license)
- english
    - [Introduction](#introduction_en)
    - [Installation](#installation_en)
    - [Utilisation](#utilisation_en)
    - [API](#api_en)
    - [License](#license)

## introduction / introduction

<span id="introduction_fr"></span>
### français
Vous cherchez une bibliothèque standard en Javascript très légère pour valider des données courantes (comme les adresses e-mail, les URL, les numéros de carte de crédit, etc.) ? Cette bibliothèque vous permet de déclencher des validations lors d'événements tels que la soumission d'un formulaire, la saisie dans un champ texte, ou la perte de focus sur un champ. En fonction des résultats de la validation, des messages d'erreur sont automatiquement insérés dans le DOM, affichés ou masqués pour guider l'utilisateur.

De plus, vous avez besoin de flexibilité pour définir des règles de validation adaptées à différents environnements côté serveur selon les projets. Pourquoi réinventer la roue à chaque fois ? Cette bibliothèque vous offre une solution réutilisable et personnalisable, vous faisant gagner du temps et des efforts.

Sachez que le contenu de ce fichier et toute la documenation se trouvent dans le dossier "docs". Vous avez un fichier index.html

<span id="introduction_en"></span>
### english

Are you looking for a standard library in Javascript very light to validate common data (such as email addresses, URLs, credit card numbers, etc.)? This library allows you to trigger validations during events like form submission, text field input, or loss of focus on a field. Based on the validation results, error messages are automatically inserted into the DOM, displayed, or hidden to guide the user.

Additionally, you need flexibility to define validation rules tailored to different server-side environments depending on the project. Why reinvent the wheel every time? This library provides a reusable and customizable solution, saving you time and effort.

Please note that the contents of this file and all documentation are located in the "docs" folder. You have an index.html file

## Installation / Installation

<span id="installation_fr"></span>
### français

Amet neque assumenda officiis libero alias eaque? Amet odio facere assumenda a consequuntur. Mollitia velit quaerat culpa sed quis Veritatis deserunt illo labore consectetur fugit quam Vitae consequatur eaque perspiciatis!

<span id="installation_en"></span>
### english

Lorem assumenda quos nesciunt blanditiis nostrum? Excepturi rerum consequuntur nihil iusto provident? Architecto officiis rem veniam facere ullam blanditiis Blanditiis nobis recusandae sapiente tenetur minima aliquam possimus? Molestias aliquid quia

## Utilisation / Utilisation

<span id="utilisation_fr"></span>
### français

#### Configurer, est ce difficile ?

Il existe deux manières de configurer les validations de formulaire :

- **objet static** (dans un fichier js)
- **html** (dans le dom)

#### Pourquoi une configuration HTML ?

La configuration HTML permet de mutualiser les messages d'erreur avec le serveur. Elle facilite également la gestion des formulaires multi-langues, car l'application serveur gère les traductions.

#### Comment configurer ?

Les champs peuvent avoir soit la classe `require`, soit l'attribut `required`. Lorsque vous initialisez la librairie, l'attribut `required` sera supprimé et remplacé par la classe `require`.

**La validation se fait sur l'attribut `name` d'un champ. Il est aussi impératif que les champs du formulaire soient dans un élément [form](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form)**

##### Configuration avec un objet statique

la clef `selector` (par defaut : `form`) permet de spécifier quels sont les formulaires à valider avec cette libriairie. 

La clé `target` est optionnelle. Par défaut, le message d'erreur est placé après le champ [ `afterend` ](https://developer.mozilla.org/fr/docs/Web/API/Element/insertAdjacentHTML#visualisation_des_noms_de_position). Si vous configurez target, le message sera placé à la fin de la cible [ `beforeend` ](https://developer.mozilla.org/fr/docs/Web/API/Element/insertAdjacentHTML#visualisation_des_noms_de_position).

Les clés suivantes correspondent au nom de la règle en **minuscules**. Vous devez impérativement indiquer un message d'erreur. La clé `success` est optionnelle. La clé `params` peut être obligatoire si la règle l'exige.

exemple : 
```html
<form action="http://google.com" method="post">
    <div class="grid-x grid-padding-x">
        <div class="large-12 cell">
            <label>
                <span>civilités</span>
                <select>
                    <option value="">faire un choix</option>
                    <option value="mlle">mademoiselle</option>
                    <option value="mme">madame</option>
                    <option value="m">monsieur</option>
                </select>
            </label>
        </div>
    </div>
    <div class="grid-x grid-padding-x">
        <div id="messageFirstname"></div>
        <div class="large-6 medium-6 cell">
            <label>
                <span>prénom</span>
                <input type="text" name="firstname" value="" class="require">
            </label>
        </div>
        <div class="large-6 medium-6 cell">
            <label>
                <span>nom</span>
                <input type="text" name="lastname" value="" class="require">
            </label>
        </div>
    </div>
    <div class="grid-x grid-padding-x">
        <div class="large-6 cell">
            <button type="submit" class="button">envoyer</button>
        </div>
    </div>
</form>
```

```Javascript
window.addEventListener('DOMContentLoaded', function(){
    let options = {
        fields : {
            "firstname": {
                "target": {
                    "error": "#messageFirstname",
                    "success": "#messageFirstname",
                },
                "isnotempty" : {
                    "error" : "ce champs ne doit pas être vide",
                    "success": "!"
                }
            },
            "lastname": {
                "isnotempty" : {
                    "error" : "ce champs ne doit pas être vide"
                },
                "isminlength": {
                    "params": 3,
                    "error": "Ce champ doit contenir au moins 3 caractères"
                }
            },
        }
    };
    let validate = new Validator(options);
    validate.form();
});
```

##### Configuration avec HTML

Pour déclarer des règles dans un champ : 
```
data-validate-rules="isnotempty isemail"
```

Pour déclarer le message erreur d'une règle (**obligatoire d'indiquer ce message pour chaque règle**) :  
```
data-error-<nomdelarègle>="message erreur"
```

Pour déclarer le message de succès : 
```
data-success-<nomdelarègle>="message succès"
```

Pour déclarer les paramètres d'une règle : 
```
data-validate-<nomdelarègle>-args="3"
```

Pour déclarer l'endroit dans lequel le message d'erreur doit être placé. **n'oubliez pas de placer la cible**
```
data-validate-target-error="#cible" data-validate-target-success="#cible"
```

exemple : 

```html
<form action="http://google.com" method="post">
    <div class="grid-x grid-padding-x">
        <div class="large-6 medium-6 cell">
            <label>
                <span>prénom</span>
                <input type="text" name="firstname" value="" required data-validate-rules="isnotempty" data-error-isnotempty="ne doit pas être vide (HTML validation)">
            </label>
        </div>
        <div class="large-6 medium-6 cell">
            <label>
                <span>nom</span>
                <input type="text" name="lastname" value="" required data-validate-rules="isnotempty isminlength" data-error-notempty="ce champs ne doit pas être vide" data-error-minlength="minimum 3 caractères" data-validate-isminlength-args="3">
            </label>
        </div>
    </div>
    <div class="grid-x grid-padding-x">
        <div class="large-6 cell">
            <button type="submit" class="button">envoyer</button>
        </div>
    </div>
</form>
```

```Javascript
window.addEventListener('DOMContentLoaded', function(){
    let validate = new Validator();
    validate.form();
})
```
#### Ajouter une nouvelle règle de validation

Pour ajouter une nouvelle règle, utilisez la méthode `addRules`. Cette méthode prend deux arguments : le nom de la règle et une fonction de validation.
Vous pouvez nommer la règle comme vous le souhaitez (en PascalCase, camelCase ou snake_case). Cependant, lors de l'appel de la règle pour la validation, celle-ci doit toujours être référencée en minuscules.

```Javascript
window.addEventListener('DOMContentLoaded', function(){
    let optionsValidator = {
        "selector": ".forms",
        "fields": {
            "vehicule": {
                "isnotempty": {
                    "error": "ne doit pas être vide"
                },
                "immatriculation":{
                    "error": "l'immatriculation ne semble pas être valide"
                }
            }
        }
    }
    let validate = new Validator(optionsValidator);

    validate.addRules('immatriculation', value => /^[a-z]{2}-\d{3}-[a-z]{2}$/i.test(value.trim()) )

    validate.form();
})
```
#### Surcharger une règle existante

Pour surcharger une règle existante, vous pouvez également utiliser la méthode `addRules`. Cela vous permet de remplacer la logique de validation d'une règle existante par une nouvelle logique.

```Javascript
validate.addRules('IsMinLength', (value, params) => {
    return value.length >= params.minLength
})
```

#### Ajouter ou supprimer un formulaire à valider

Il est possible d'ajouter ou de supprimer un formulaire de la validation pour adapter la validation à des besoins spécifiques.

##### Ajouter un formulaire à la validation

Pour ajouter un formulaire à la validation, utilisez la méthode `addRequireForm`. Cette méthode prend un argument : le formulaire à ajouter.

```Javascript
// Add a form for validation
const myForm = document.querySelector('#myForm') as HTMLFormElement;
validate.addRequireForm(myForm);
```

##### Supprimer un formulaire à la validation

Pour supprimer un formulaire de la validation, utilisez la méthode removeRequireForm. Cette méthode prend un argument : le formulaire à supprimer.

```Javascript
// Remove a form from validation
validate.removeRequireForm(myForm);
```

#### Ajouter ou supprimer un ou des champs à valider

Il est possible d'ajouter ou de supprimer dynamiquement un ou plusieurs champs à valider en fonction des actions de l'utilisateur. Cela permet d'adapter la validation en temps réel, par exemple en affichant ou masquant des champs obligatoires en fonction des réponses fournies.

##### Ajouter ou supprimer un champ à valider

Pour ajouter ou supprimer un champ à valider, vous pouvez utiliser les méthodes `addRequireField` et `removeRequireField`. Voici un exemple où un champ de téléphone est ajouté ou supprimé de la validation en fonction de la réponse de l'utilisateur :

```Javascript
//add require field if you answer 'yes' at 'add phone number'
if(document.getElementById('phone')){
    let $phone = document.getElementById('phone')
    $phone.parentNode.style.display = 'none'
    document.getElementsByName('validatePhone').forEach(($input) =>{
        $input.addEventListener('change', (e)=>{
            if(e.target.checked && e.target.id === "validatePhoneYes"){
                $phone.parentNode.style.display = 'block'
                validate.addRequireField($phone)
            }else{
                $phone.parentNode.style.display = 'none'
                validate.removeRequireField($phone)
            }
        })
    })
}
```

##### Ajouter ou supprimer plusieurs champs à valider

Pour gérer plusieurs champs à la fois, vous pouvez itérer sur une liste de champs et appliquer les méthodes `addRequireField` ou `removeRequireField` à chacun d'eux. Voici un exemple où plusieurs champs de loisirs sont ajoutés ou supprimés de la validation en fonction de la réponse de l'utilisateur :

```Javascript
//add require fields if you answer 'yes'
if(document.getElementsByName('hobbies')){
    let $hobbies = document.getElementsByName('hobbies'),
        $hobbiesContainer = document.getElementById('hobies-container')
    document.getElementsByName('hobbiesChoice').forEach(($radio) =>{
        $radio.addEventListener('change', (e)=>{
            if(e.target.checked && e.target.id === "hobbiesYes"){
                $hobbiesContainer.style.display = 'block'
                $hobbies.forEach(($checkbox)=>{
                    validate.addRequireField($checkbox)
                })
            }else{
                $hobbiesContainer.style.display = 'none'
                $hobbies.forEach(($checkbox)=>{
                    validate.removeRequireField($checkbox)
                })
            }
        })
    })
}
```

#### Valider simplement une donnée 

Si vous ne souhaitez pas utiliser tout le mécanisme HTML pour valider des champs, vous pouvez valider une donnée directement en utilisant la méthode `check`. Cette méthode permet de vérifier si une valeur respecte une règle de validation spécifique, sans avoir besoin de créer un formulaire ou d'interagir avec le DOM.

La méthode `check` prend trois arguments :

1. La valeur à valider : Il peut s'agir d'une chaîne de caractères, d'un nombre, ou de tout autre type de donnée.
2. La règle de validation : Le nom de la règle à appliquer (par exemple, `isemail`, `isminlength`, etc.).
3. Les paramètres de la règle (optionnel) : Certaines règles nécessitent des paramètres supplémentaires pour fonctionner (par exemple, une longueur minimale pour `isminlength`).

La méthode retourne `true` si la valeur est valide selon la règle spécifiée, et `false` dans le cas contraire.

Valider une adresse e-mail :

```Javascript
const isValid = validator.check('dom+dom@dom.com', 'isemail');
console.log(isValid); // true or false
```
Valider une longueur minimale : 

```Javascript
console.log("format isminlength --> ", validate.check('d123', 'isminlength', 3))
```

#### Valider simplement plusieurs formulaire

La méthode `validator.form()` permet de valider des formulaires de manière statique. Cependant, si vous ajoutez ou supprimez des champs ou des formulaires après l'appel de cette méthode, ces modifications ne seront pas prises en compte. Pour gérer des formulaires de manière dynamique, il est préférable d'utiliser la méthode `validator.checkForm()`.

Lorsque vous utilisez `validator.form()`, la configuration des formulaires est figée au moment de l'appel. Si vous ajoutez ou supprimez des champs ou des formulaires par la suite, ces changements ne seront pas reflétés dans la validation.

exemple problématique : 
```Javascript
let validate = new Validator()
validate.addRequireForm(document.getElementById('my-form'))
validate.form() // Initialisation de la validation
validate.addRequireForm(document.getElementById('my-other-form')) // ne sera pas pris en compte !
```

#### Valider plusieurs formulaires dynamiquement avec `validator.checkForm()`

La méthode `validator.checkForm()` permet de valider un ou plusieurs formulaires de manière dynamique. Elle est particulièrement utile lorsque vous avez des formulaires qui peuvent être ajoutés ou modifiés après l'initialisation.


exemple : 
```Javascript
let validate = new Validator()
validate.addRequireForm(document.getElementById('my-form'))
validate.form()
validate.addRequireForm(document.getElementById('my-other-form')) // ne sera pas pris en compte !
validate.addRequireForm(document.getElementById('my-other-form-again')) // ne sera pas pris en compte !

let formsListSelector = [
    '#my-form',
    '#my-other-form',
    '#my-other-form-again',
]
document.querySelectorAll(formsListSelector.join(',')).forEach($form =>{
    $form.addEventListener('submit', e => validate.checkForm($form, e)))
})
```

#### Valider un champ spécifiquement

Dans certains cas, vous pouvez vouloir valider un champ spécifique, par exemple lors de la perte de focus (`blur`). Pour cela, utilisez la méthode `validator.element()`.

exemple : 

```Javascript
let $lastname = document.getElementById('lastname')
$lastname?.addEventListener('blur', e => validate.element($lastname))
```

#### Middleware

Les middlewares permettent d'intercepter l'état d'un ou plusieurs formulaires ou champs pendant le processus de validation. Ils agissent comme des "hooks" qui se déclenchent en fonction de l'état de validation (succès ou erreur). Ces middlewares sont particulièrement utiles pour exécuter des actions spécifiques, comme afficher des messages personnalisés, envoyer des données, ou effectuer des vérifications supplémentaires.

Pour utiliser ces middlewares, vous devez les initialiser avant d'appeler la méthode `validate.form()`. Après chaque événement de validation, l'état d'un formulaire ou d'un champ sera indiqué par une classe CSS (`error` ou `success`).


##### Middleware formOnError

Ce middleware est déclenché lorsque l'état d'un formulaire passe à "erreur". Vous pouvez l'utiliser pour exécuter des actions spécifiques, comme afficher un message d'erreur ou enregistrer des logs.

exemple : 
```Javascript
validate.middleware.formOnError = (event, $el) =>{
    if($el.id === 'my-form'){
        console.log(event)
        console.log("my form n'est pas valide")
    }
}
// ....
validate.form()
```

##### Middleware formOnSuccess

Ce middleware est déclenché lorsque l'état d'un formulaire passe à "succès". Il est utile pour exécuter des actions comme soumettre le formulaire ou afficher un message de confirmation.

exemple : 
```Javascript
validate.middleware.formOnSuccess = (event, $el) =>{
    if($el.id === 'my-form'){
        console.log(event)
        console.log("my form est valide")
    }
}
// ....
validate.form()
```

##### Middleware fieldOnError

Ce middleware est déclenché lorsque l'état d'un champ spécifique passe à "erreur". Il permet de réagir à des erreurs de validation sur des champs individuels.

exemple : 
```Javascript
validate.middleware.fieldOnError = ($el) =>{
    if($el.id === 'my-field'){
        console.log("my field n'est pas valide")
    }
}
// ....
validate.form()
```

##### Middleware fieldOnSuccess

Ce middleware est déclenché lorsque l'état d'un champ spécifique passe à "succès". Il est utile pour indiquer visuellement que le champ est valide ou pour exécuter des actions spécifiques.

exemple : 
```Javascript
validate.middleware.fieldOnSuccess = ($el) =>{
    if($el.id === 'my-field'){
        console.log("my field est valide")
    }
}
// ....
validate.form()
```

<span id="utilisation_en"></span>
### english

#### Is Configuration Difficult?
There are two ways to configure form validations:

- **Static object** (in a JS file)
- **html** (in the DOM)

#### Why Use HTML Configuration?

HTML configuration allows error messages to be shared with the server. It also simplifies the management of multi-language forms, as the server application handles translations.

#### How to Configure?

Fields can have either the `require` class or the `required` attribute. When you initialize the library, the `required` attribute will be removed and replaced with the `require` class.

**Validation is based on the name attribute of a field. It is also mandatory that form fields are within a [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) element.**

##### Configuration with a Static Object

The `selector` key (default: `form`) specifies which forms should be validated with this library.

The `target` key is optional. By default, the error message is placed after the field [ `afterend` ](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML#visualisation_des_noms_de_position). If you configure target, the message will be placed at the end of the target [ `beforeend` ](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML#visualisation_des_noms_de_position).

The following keys correspond to the rule name in **lowercase**. You must provide an error message. The `success` key is optional. The `params` key may be required if the rule demands it.

example : 

```html
<form action="http://google.com" method="post">
    <div class="grid-x grid-padding-x">
        <div class="large-12 cell">
            <label>
                <span>Title</span>
                <select>
                    <option value="">Make a choice</option>
                    <option value="mlle">Miss</option>
                    <option value="mme">Mrs</option>
                    <option value="m">Mr</option>
                </select>
            </label>
        </div>
    </div>
    <div class="grid-x grid-padding-x">
        <div id="messageFirstname"></div>
        <div class="large-6 medium-6 cell">
            <label>
                <span>First name</span>
                <input type="text" name="firstname" value="" class="require">
            </label>
        </div>
        <div class="large-6 medium-6 cell">
            <label>
                <span>Last name</span>
                <input type="text" name="lastname" value="" class="require">
            </label>
        </div>
    </div>
    <div class="grid-x grid-padding-x">
        <div class="large-6 cell">
            <button type="submit" class="button">Submit</button>
        </div>
    </div>
</form>
```

```Javascript
window.addEventListener('DOMContentLoaded', function(){
    let options = {
        fields : {
            "firstname": {
                "target": {
                    "error": "#messageFirstname",
                    "success": "#messageFirstname",
                },
                "isnotempty" : {
                    "error" : "This field must not be empty",
                    "success": "!"
                }
            },
            "lastname": {
                "isnotempty" : {
                    "error" : "This field must not be empty"
                },
                "isminlength": {
                    "params": 3,
                    "error": "This field must contain at least 3 characters"
                }
            },
        }
    };
    let validate = new Validator(options);
    validate.form();
});
```

##### Configuration with HTML

To declare rules in a field:

```
data-validate-rules="isnotempty isemail"
```

To declare the error message for a rule (mandatory to provide this message for each rule):

```
data-error-<rulename>="error message"
```

To declare the success message:

```
data-success-<rulename>="success message"
```

To declare the parameters of a rule:

```
data-validate-<rulename>-args="3"
```

To declare where the error message should be placed. Do not forget to place the target:

```
data-validate-target-error="#target" data-validate-target-success="#target"
```

example : 

```html
<form action="http://google.com" method="post">
    <div class="grid-x grid-padding-x">
        <div class="large-6 medium-6 cell">
            <label>
                <span>First name</span>
                <input type="text" name="firstname" value="" required data-validate-rules="isnotempty" data-error-isnotempty="Must not be empty (HTML validation)">
            </label>
        </div>
        <div class="large-6 medium-6 cell">
            <label>
                <span>Last name</span>
                <input type="text" name="lastname" value="" required data-validate-rules="isnotempty isminlength" data-error-notempty="This field must not be empty" data-error-minlength="Minimum 3 characters" data-validate-isminlength-args="3">
            </label>
        </div>
    </div>
    <div class="grid-x grid-padding-x">
        <div class="large-6 cell">
            <button type="submit" class="button">Submit</button>
        </div>
    </div>
</form>
```

```Javascript
window.addEventListener('DOMContentLoaded', function(){
    let validate = new Validator();
    validate.form();
})
```

#### Add a New Validation Rule

To add a new rule, use the `addRules` method. This method takes two arguments: the name of the rule and a validation function.
You can name the rule however you like (in PascalCase, camelCase, or snake_case). However, when calling the rule for validation, it must always be referenced in lowercase.

```Javascript
window.addEventListener('DOMContentLoaded', function(){
    let optionsValidator = {
        "selector": ".forms",
        "fields": {
            "vehicle": {
                "isnotempty": {
                    "error": "Must not be empty"
                },
                "registration": {
                    "error": "The registration does not seem to be valid"
                }
            }
        }
    };
    let validate = new Validator(optionsValidator);

    // Add a new rule for validating vehicle registration
    validate.addRules('registration', value => /^[a-z]{2}-\d{3}-[a-z]{2}$/i.test(value.trim()));

    validate.form();
});
```

#### Override an Existing Rule
To override an existing rule, you can also use the `addRules` method. This allows you to replace the validation logic of an existing rule with new logic.

```Javascript
validate.addRules('IsMinLength', (value, params) => {
    return value.length >= params.minLength;
});
```

#### Add or Remove a Form from Validation
It is possible to add or remove a form from validation to adapt it to specific needs.

##### Add a Form to Validation

To add a form to validation, use the `addRequireForm` method. This method takes one argument: the form to add.

```Javascript
// Add a form for validation
const myForm = document.querySelector('#myForm') as HTMLFormElement;
validate.addRequireForm(myForm);
```

##### Remove a Form to Validation

To remove a form from validation, use the `removeRequireForm` method. This method takes one argument: the form to remove.

```Javascript
// Remove a form from validation
validate.removeRequireForm(myForm);
```

#### Add or Remove One or More Fields to Validate

It is possible to dynamically add or remove one or more fields to validate based on user actions. This allows for real-time validation adjustments, such as showing or hiding mandatory fields depending on user responses.

##### Add or Remove a Field to Validate

To add or remove a field to validate, you can use the `addRequireField` and `removeRequireField` methods. Here is an example where a phone field is added or removed from validation based on the user's response:

```javascript
// Add a required field if the user answers 'yes' to 'add phone number'
if (document.getElementById('phone')) {
    let $phone = document.getElementById('phone');
    $phone.parentNode.style.display = 'none'; // Hide the field initially
    document.getElementsByName('validatePhone').forEach(($input) => {
        $input.addEventListener('change', (e) => {
            if (e.target.checked && e.target.id === "validatePhoneYes") {
                $phone.parentNode.style.display = 'block'; // Show the field
                validate.addRequireField($phone); // Add the field to validation
            } else {
                $phone.parentNode.style.display = 'none'; // Hide the field
                validate.removeRequireField($phone); // Remove the field from validation
            }
        });
    });
}
```
##### Add or Remove Multiple Fields to Validate

To manage multiple fields at once, you can iterate over a list of fields and apply the `addRequireField` or `removeRequireField` methods to each one. Here is an example where multiple hobby fields are added or removed from validation based on the user's response:

```javascript
// Add required fields if the user answers 'yes'
if (document.getElementsByName('hobbies')) {
    let $hobbies = document.getElementsByName('hobbies'),
        $hobbiesContainer = document.getElementById('hobbies-container');
    $hobbiesContainer.style.display = 'none'; // Hide the container initially

    document.getElementsByName('hobbiesChoice').forEach(($radio) => {
        $radio.addEventListener('change', (e) => {
            if (e.target.checked && e.target.id === "hobbiesYes") {
                $hobbiesContainer.style.display = 'block'; // Show the container
                $hobbies.forEach(($checkbox) => {
                    validate.addRequireField($checkbox); // Add each field to validation
                });
            } else {
                $hobbiesContainer.style.display = 'none'; // Hide the container
                $hobbies.forEach(($checkbox) => {
                    validate.removeRequireField($checkbox); // Remove each field from validation
                });
            }
        });
    });
}
```
#### Validate Data Simply

If you don’t want to use the entire HTML mechanism to validate fields, you can validate data directly using the `check` method. This method allows you to check if a value complies with a specific validation rule, without needing to create a form or interact with the DOM.

The `check` method takes three arguments:

1. **The value to validate**: This can be a string, a number, or any other type of data.
2. **The validation rule**: The name of the rule to apply (e.g., `isemail`, `isminlength`, etc.).
3. **The rule parameters (optional)**: Some rules require additional parameters to function (e.g., a minimum length for `isminlength`).

The method returns `true` if the value is valid according to the specified rule, and `false` otherwise.

Validate an Email Address:
```javascript
const isValid = validator.check('dom+dom@dom.com', 'isemail');
console.log(isValid); // true or false
```
Validate a Minimum Length:
```Javascript
console.log("format isminlength --> ", validate.check('d123', 'isminlength', 3))
```
#### Validate Multiple Forms Simply

The `validator.form()` method allows you to validate forms statically. However, if you add or remove fields or forms after calling this method, these changes will **not be taken into account**. To manage forms dynamically, it is better to use the `validator.checkForm()` method.

When using `validator.form()`, the form configuration is frozen at the time of the call. If you add or remove fields or forms afterward, these changes will not be reflected in the validation.

Problematic Example:
```javascript
let validate = new Validator();
validate.addRequireForm(document.getElementById('my-form'));
validate.form(); // Initialize validation
validate.addRequireForm(document.getElementById('my-other-form')); // Will not be taken into account!
```

#### Validate Multiple Forms Dynamically with `validator.checkForm()`

The `validator.checkForm()` method allows you to validate one or more forms dynamically. It is particularly useful when you have forms that can be added or modified after initialization.

Example:
```javascript
let validate = new Validator();
validate.addRequireForm(document.getElementById('my-form'));
validate.form();
validate.addRequireForm(document.getElementById('my-other-form')); // Will not be taken into account!
validate.addRequireForm(document.getElementById('my-other-form-again')); // Will not be taken into account!

let formsListSelector = [
    '#my-form',
    '#my-other-form',
    '#my-other-form-again',
];

document.querySelectorAll(formsListSelector.join(',')).forEach($form => {
    $form.addEventListener('submit', e => validate.checkForm($form, e));
});
```

#### Validate a Specific Field

In some cases, you may want to validate a specific field, for example, when it loses focus (`blur`). To do this, use the `validator.element()` method.

Example:
```javascript
let $lastname = document.getElementById('lastname');
$lastname?.addEventListener('blur', e => validate.element($lastname));
```

## API

<span id="api_fr"></span>
### français

Amet neque assumenda officiis libero alias eaque? Amet odio facere assumenda a consequuntur. Mollitia velit quaerat culpa sed quis Veritatis deserunt illo labore consectetur fugit quam Vitae consequatur eaque perspiciatis!

<span id="api_en"></span>
### english

Lorem assumenda quos nesciunt blanditiis nostrum? Excepturi rerum consequuntur nihil iusto provident? Architecto officiis rem veniam facere ullam blanditiis Blanditiis nobis recusandae sapiente tenetur minima aliquam possimus? Molestias aliquid quia

<span id="license"></span>
## License

MIT License

Copyright (c) 2018 Niuxe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
