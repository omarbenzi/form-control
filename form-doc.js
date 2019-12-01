let doc1 = {
    'identifiant': {
        'regExp': '^[a-z0-9]{8,}$',
        'msgErr': 'alphanumériques et minuscules uniquement, premier caractère alphabétique',
        'msgErrVide': 'minimum 8 caractères'
    },
    'motDePasse': {
        'regExp': '^[a-z0-9W]{8,}$',
        'msgErr': 'avec au moins un caractère spécial non alphanumérique (comme par exemple: %!:&)',
        'msgErrVide': 'minimum 8 caractères'
    },
    'confirmationMotDePasse': {
        'regExp': '^' + '${document.forms[this.formName].motDePasse.value}' + '$',
        'msgErr': 'identique au champ précédent',
        'msgErrVide': 'identique au champ précédent (minimum 8 caractères)',
    },

    'cgu': {
        'msgErr': 'case qui doit être cochée',
    }
}
let doc2 = {

    'satisfaction': {
        'msgErr': 'tous les champs sont obligatoires.'
    },
    'recommander': {
        'msgErr': 'tous les champs sont obligatoires.'
    },
    'services[]': {
        'msgErr': 'tous les champs sont obligatoires.'
    }

}


