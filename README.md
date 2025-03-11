# ![validator](./static/img/logo.svg)

## introduction / introduction

### français
Vous cherchez une bibliothèque standard en Javascript très légère pour valider des données courantes (comme les adresses e-mail, les URL, les numéros de carte de crédit, etc.) ? Cette bibliothèque vous permet de déclencher des validations lors d'événements tels que la soumission d'un formulaire, la saisie dans un champ texte, ou la perte de focus sur un champ. En fonction des résultats de la validation, des messages d'erreur sont automatiquement insérés dans le DOM, affichés ou masqués pour guider l'utilisateur.

De plus, vous avez besoin de flexibilité pour définir des règles de validation adaptées à différents environnements côté serveur selon les projets. Pourquoi réinventer la roue à chaque fois ? Cette bibliothèque vous offre une solution réutilisable et personnalisable, vous faisant gagner du temps et des efforts.

### english
Are you looking for a standard library in Javascript very light to validate common data (such as email addresses, URLs, credit card numbers, etc.)? This library allows you to trigger validations during events like form submission, text field input, or loss of focus on a field. Based on the validation results, error messages are automatically inserted into the DOM, displayed, or hidden to guide the user.

Additionally, you need flexibility to define validation rules tailored to different server-side environments depending on the project. Why reinvent the wheel every time? This library provides a reusable and customizable solution, saving you time and effort.

## Table des Matières / Table of Contents
- français
    - [Installation](#installation_fr)
    - [Utilisation](#utilisation_fr)
    - [API](#api_fr)
    - [License](#license)
- english
    - [Installation](#installation_en)
    - [Utilisation](#utilisation_en)
    - [API](#api_en)
    - [License](#license)

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

Vous remarquerez que les champs ont soit la class require soit l'attribut required. Lorsque vous initilisez la libriairie et que les champs ont l'attribut required, l'attribut required sera supprimé et remplacé par la class require

##### objet statique

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
            'firstname': {
                "isnotempty" : {
                    "error" : "ce champs ne doit pas être vide"
                }
            },
            'lastname': {
                "isnotempty" : {
                    "error" : "ce champs ne doit pas être vide"
                }
            },
        }
    };
    let validate = new Validator(options);
    validate.form();
});
```

##### HTML

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
        <div class="large-6 medium-6 cell">
            <label>
                <span>prénom</span>
                <input type="text" name="firstname" value="" required data-validationrules="notempty minlength" data-errornotempty="ce champs ne doit pas être vide" data-errorminlength="minimum 3 caractères" data-validationminlengthargs="3">
            </label>
        </div>
        <div class="large-6 medium-6 cell">
            <label>
                <span>nom</span>
                <input type="text" name="lastname" value="" required data-validationrules="notempty minlength" data-errornotempty="ce champs ne doit pas être vide" data-errorminlength="minimum 3 caractères" data-validationminlengthargs="3">
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


#### Middleware

##### formOnError

Amet suscipit ipsam porro enim quidem. Exercitationem quis optio quibusdam voluptatibus iste, architecto? Hic quod perspiciatis id aperiam omnis Architecto incidunt doloribus ut accusamus quos veniam Dolore consequuntur maxime ab

##### formOnSuccess

Amet suscipit ipsam porro enim quidem. Exercitationem quis optio quibusdam voluptatibus iste, architecto? Hic quod perspiciatis id aperiam omnis Architecto incidunt doloribus ut accusamus quos veniam Dolore consequuntur maxime ab

##### fieldOnError

Amet suscipit ipsam porro enim quidem. Exercitationem quis optio quibusdam voluptatibus iste, architecto? Hic quod perspiciatis id aperiam omnis Architecto incidunt doloribus ut accusamus quos veniam Dolore consequuntur maxime ab

##### fieldOnSuccess

Amet suscipit ipsam porro enim quidem. Exercitationem quis optio quibusdam voluptatibus iste, architecto? Hic quod perspiciatis id aperiam omnis Architecto incidunt doloribus ut accusamus quos veniam Dolore consequuntur maxime ab

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
