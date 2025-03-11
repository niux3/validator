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

Non pas du tout. Vous avez 2 manières de configurer vos validations de formulaire :

- objet static (dans un fichier js)
- html (dans le dom)

#### Pourquoi une configuration HTML ?

Ça permet de mutualiser les messages erreurs avec le serveur. Aussi, les formulaires multi-langues sont plus simples à gérer puisque c'est l'application serveur qui gère ça.

#### Comment configurer ?

Vous remarquerez que les champs ont soit la class require, soit l'attribut required. Lorsque vous initilisez la libriairie et que les champs ont l'attribut required, l'attribut required sera supprimé et remplacé par la class require

**La validation se fait sur l'attribut name d'un champ. Il est aussi impératif que les champs du formulaire soient dans un élément [form](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form)**

##### objet statique

la clef selector (par defaut : form) permet de spécifier quels sont les formulaires à valider avec cette libriairie. 

La clef target est optionnelle. Par défaut, le message d'erreur se place après le champ [ afterend ](https://developer.mozilla.org/fr/docs/Web/API/Element/insertAdjacentHTML#visualisation_des_noms_de_position). Si vous optez pour paramètrer "target", le message se place à la fin de la cible [ beforeend ](https://developer.mozilla.org/fr/docs/Web/API/Element/insertAdjacentHTML#visualisation_des_noms_de_position). 
Les clefs suivantes ont le nom de la règle en minuscule. Vous devez impérativement indiquer un message d'erreur. La clef "success" est optionnelle. La clef "params" peut être obligatoire dans le cas où la règle l'exige.

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

##### HTML

Quel sont les formats des attributs de validation dans un champ ? 

Pour déclarer des règles dans un champ : 
```
data-validate-rules="isnotempty isemail"
```

Pour déclarer le message erreur d'une règle (**il est obligatoire d'indiquer ce message pour chaque règle**) :  
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

Pour déclarer l'endroit dans lequel le message d'erreur doit se placer. **n'oubliez pas de placer la cible**
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
#### Ajouter une règle de validation ou surcharger une règle

Il est possible de surcharger une règle ou d'ajouter une nouvelle. 

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

Dans le cas où vous auriez des paramètres dynamiques : 

```Javascript
validate.addRules('une_regle', (value, params) => {
    // etc.
})
```

#### Middleware

Les middleware permettent d'intercepter l'état d'un ou plusieurs formulaires ou d'un ou plusieurs champs. Pour ce faire, vous devez initialiser ces hooks. Vous remarquerez que l'état d'un formulaire ou d'un champ sera indiqué via une class (error ou success) après chaque événements.

##### formOnError

Lorsque le formulaire avec l'id "my-form" est en état error : 

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

##### formOnSuccess

Lorsque le formulaire avec l'id "my-form" est en état success : 

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

##### fieldOnError

Lorsque le champ avec l'id "my-form" est en état error : 

```Javascript
validate.middleware.fieldOnError = ($el) =>{
    if($el.id === 'my-field'){
        console.log("my field n'est pas valide")
    }
}
// ....
validate.form()
```

##### fieldOnSuccess

Lorsque le champ avec l'id "my-form" est en état success : 

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

Lorem assumenda quos nesciunt blanditiis nostrum? Excepturi rerum consequuntur nihil iusto provident? Architecto officiis rem veniam facere ullam blanditiis Blanditiis nobis recusandae sapiente tenetur minima aliquam possimus? Molestias aliquid quia

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
