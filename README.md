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

Dans les dossiers configuration-en-objet et configuration-en-html, vous trouverez des exemples pertinents afin de mieux vous servir de cet outil

## les méthodes

### form
La méthode form permet de valider les formulaires soumis suivant le sélecteur définit dans l'objet de configuration. Par default, le selector est "form".

/examples/configuration-en-objet/basique.html

### checkForm
Cette méthode permet de vérifier un formulaire alors qu'il n'était pas dans le html lors du lancement du validateur. Cette méthode est très utile lorsque vous souhaitez faire une requête ajax.

/examples/configuration-en-objet/ajax.html


### element
permet de savoir si un élément est valide suivant les règles qui lui sont associées.

### addRequireField & removeRequireField
permet en cours de route d'associer ou de retirer une validation du champ.

### addRequireForm & removeRequireForm
permet en cours de route d'associer ou de retirer une validation du formulaire en question.  

### addRules
ajout d'une règle qui n'est pas comprise dans le set du validateur de données.  

### formIsValid & check
Ces méthodes vont retourner un boolean. FormIsValid permet de savoir si le formulaire en question est valid. La méthode check permet de savoir si une valeur est valide suivant la règle de validation passée en paramètres


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
