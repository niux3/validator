# Roadmap

Ce document présente les améliorations et les fonctionnalités prévues pour la librairie de validation de formulaires. Les idées sont classées par catégories et par priorité. N'hésitez pas à contribuer ou à suggérer des améliorations !

## Fonctionnalités à venir

### Gestion des erreurs et des messages personnalisés

**Objectif** : Permettre la personnalisation dynamique des messages d'erreur en fonction du contexte (langue, type de champ, etc.).

Exemple : 
```Javascript
validate.setErrorMessage('isemail', {
    fr: "L'adresse e-mail est invalide.",
    en: "The email address is invalid."
});
```

### Validation conditionnelle

**Objectif** : Ajouter des règles de validation conditionnelles pour valider un champ en fonction de la valeur d'un autre champ.

Exemple : 
```Javascript
validate.addConditionalRule('phone', {
    dependsOn: 'newsletter',
    condition: value => value === true,
    rule: 'isphone'
});
```

### Validation asynchrone

**Objectif** : Permettre des règles de validation asynchrones, par exemple pour vérifier la disponibilité d'un nom d'utilisateur.

Exemple : 
```Javascript
validate.addAsyncRule('username', async (value) => {
    const isAvailable = await checkUsernameAvailability(value);
    return isAvailable ? true : "Ce nom d'utilisateur est déjà pris.";
});
```

### Gestion des groupes de champs

**Objectif** : Valider des groupes de champs ensemble (par exemple, au moins un champ sur deux doit être rempli).

Exemple : 
```Javascript
validate.addGroup('contact', ['email', 'phone'], {
    rule: 'atLeastOne',
    message: "Veuillez remplir au moins un champ de contact."
})
```

### Intégration avec des frameworks frontend

**Objectif** : Fournir des wrappers ou des plugins pour faciliter l'intégration avec React, Vue.js, Angular, etc.

Exemple : 
```Javascript
const { register, errors } = useValidator(validate);
<input {...register('email', { rule: 'isemail' })} />
{errors.email && <span>{errors.email.message}</span>}
```

### Amélioration des middlewares

**Objectif** : Permettre des middlewares spécifiques à un formulaire ou à un champ.

Exemple : 
```Javascript
validate.addMiddleware('formOnError', 'my-form', (event, $el) => {
    console.log("Erreur spécifique au formulaire 'my-form'");
});
```

### Support des schémas de validation

**Objectif** : Ajouter un système de schémas de validation pour définir des règles complexes de manière déclarative.

Exemple : 
```Javascript
const schema = {
    email: { rule: 'isemail', message: "L'adresse e-mail est invalide." },
    password: { rule: 'isminlength', params: 8, message: "Le mot de passe doit contenir au moins 8 caractères." }
};
validate.setSchema(schema)
```

### Amélioration de la performance

**Objectif** : Optimiser la validation pour les formulaires avec un grand nombre de champs (validation "lazy").

Exemple : 
```Javascript
validate.setOptions({ lazy: true })
```

### Support des plugins

**Objectif** : Permettre aux utilisateurs d'étendre la librairie avec des plugins pour ajouter des règles de validation personnalisées.

Exemple : 
```Javascript
validate.usePlugin({
    name: 'customRules',
    rules: {
        isStrongPassword: value => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
    }
});
```

### Documentation interactive

**Objectif** : Créer une documentation interactive avec des exemples en direct pour permettre aux utilisateurs de tester la librairie dans leur navigateur.

## Priorités

1. Validation conditionnelle et groupes de champs : Ces fonctionnalités sont essentielles pour gérer des formulaires complexes.
2. Validation asynchrone : De plus en plus demandée pour les vérifications côté serveur.
3. Intégration avec les frameworks : Pour élargir l'audience de la librairie.
4. Amélioration des middlewares : Pour une meilleure personnalisation des comportements.

## Comment contribuer ?

1. Si vous souhaitez contribuer à l'une de ces fonctionnalités, n'hésitez pas à :
2. Ouvrir une issue pour discuter de l'implémentation.
3. Soumettre une pull request avec votre proposition.
4. Partager vos idées ou suggestions dans les discussions.
