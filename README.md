# Validator

## Pourquoi ?

Vous avez besoin d'une bibliothèque standard de méthodes de validation (telles que les courriels, les URL, les numéros de carte de crédit, etc.). Lorsque vous émettez un événement tel que la soumission d'un formulaire ou lorsque vous saisissez un champs texte ou lorsque vous supprimez le focus d'un champ ou etc., vous devez placer des messages d'erreur dans le DOM et les afficher ou les masquer.

Vous avez besoin de différentes façons de spécifier les règles de validation en fonction de l'environnement côté serveur que vous utilisez sur différents projets. Et après tout, vous ne voulez pas le refaire à chaque fois, n'est-ce pas ?

## Configurer, est ce difficile ?

Non pas du tout. Vous avez 2 manières de configurer vos validations de formulaire :
- objet static (dans un fichier js)
- html (dans le dom)

### Pourquoi une configuration HTML ?

Ça permet de mutualiser les messages erreurs avec le serveur. Aussi, les formulaires multi-langues sont plus simples à gérer puisque c'est l'application serveur qui gère ça.

## Comment configurer ?

### object



### html

## les méthodes

### form
La méthode form permet de valider les formulaires soumis suivant le sélecteur définit dans l'objet de configuration. Par default, le selector est "form".
```
var configuration = {
    'selector' : '.my_forms',
    // etc.
};

var validate = new Validator(configuration);
validate.form();
```

### checkForm



### element
### addRequireField
### removeRequireField
### addRequireForm
### removeRequireForm
### addRules
### formIsValid
### check

## middleware
Une fois un événement effectué, vous avez la possibilité d'avoir la main à différents endroits du script. Vous avez un 4 méthodes de callback : lorsque :
- le formulaire a des erreurs de saisie
- les champs sont correctement saisie et que le formulaire est prêt pour l'envoie des données au serveur
- un champ est en erreur
- la donnée d'un champs est correct

### formOnError



### formOnSuccess


### fieldOnError


### fieldOnSuccess
