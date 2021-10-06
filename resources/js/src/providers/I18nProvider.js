import merge from 'lodash/merge';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import frenchMessages from 'ra-language-french';

const messages = {
    'fr': merge(frenchMessages, {
        ra: {
            auth: {
                email: "Email",
                forgot: "Mot de passe oublié ?",
                back: "Retour",
                cancel: "Annuler",
                reset_password: "Réinitaliser le mot de passe",
                set_password: "Définir le mot de passe",
                password_confirmation: "Confirmation",
                new_password: "Nouveau mot de passe",
                current_password: "Mot de passe actuel",
                change_password: "Changer de mot de passe",
                password_changed: "Mot de passe modifié!",
                "2fa": {
                    ask: "Voulez-vous vraiment activer l'Authentification à deux Facteurs ?",
                    enable: "Activer l'A2F",
                    scan: "Veuillez scanner le QR code dans votre application d'A2F",
                    verify: "Entrez un code d'A2F pour valider",
                    verification_code: "Code d'A2F",
                    success: "L'Authentification à deux Facteurs et maintenant active.",
                    validate: "Terminé",
                    disabled: "L'Authentification à deux Facteurs a été désactivée.",
                    disable: "Désactiver l'A2F",
                    askdisable: "Voulez-vous vraiment désactiver l'Authentification à deux Facteurs ?",
                    login: "Continue"
                },
                token: {
                    new: {
                        ask: "Voulez vous vraiment créer un nouveau token d'API ?",
                        create: "Créer",
                        name: "Nom du token",
                        scan: "Voici votre nouveau token. Vous pouvez maintenant le scanner dans l'App ou le noter. Gardez le précieusement : vous ne le reverez jamais.",
                        validate: "Terminé"
                    },
                    clear: {
                        ask: "Voulez-vous vraiment effacer tous les tokens ? Attention: Vous devrez générer un nouveau token pour vous connecter dans l'Application.",
                        clear: "Effacer",
                        cleared: "Vos tokens ont étés effacés"
                    }
                }
            }
        },
        copying: {
            title: "Licence et attributions",
            notice: "Avis de droit d'auteur",
            agpl: {
                line1: "Copyright © 2021 - Association Amicale des Étudiants et Anciens Étudiants du Département Informatique de l'IUT Robert Schuman et al.",
                line2: "Seb est un logiciel libre : vous pouvez le redistribuer et/ou le modifier selon les termes de la Licence Publique Générale GNU Affero telle que publiée par la Free Software Foundation, soit la version 3 de la Licence, soit (à votre choix) toute version ultérieure. ",
                line3: {
                    start: "Ce programme est distribué dans l'espoir qu'il sera utile, mais SANS AUCUNE GARANTIE ; sans même la garantie implicite de QUALITÉ MARCHANDE ou D'ADAPTATION À UN USAGE PARTICULIER. Conformément aux exigences de la licence susmentionnée, vous pouvez obtenir une copie du code source de Seb",
                    here: "ici",
                    continue: "et lire la licence dans son intégralité (en anglais)",
                    there: "là",
                    end: "."
                }
            },
            dependencies: "Dependences",
            dependencies2: "Seb n'est pas construit à partir de zéro. Nos dépendances les plus notables sont : ",
            released: "Distribué sous",
            license: {
                mit: "Licence MIT"
            },
            contributors: "Contributeurs",
            bottommessage: "Copyright © 2021 Amicale CORE - Publié sous licence"
        },
        menu: {
            user: {
                copying: "Redistribution",
                profile: "Profil"
            },
            left: {
                dashboard: "Accueil",
                sell: "Vendre",
                buy: "Acheter",
                count_money: "Compter les comptes",
                count_stocks: "Compter les stocks",
                members: "Membres",
                stocks: "Stocks",
                products: "Produits",
                categories: "Catégories",
                products_counts: "Comptages de stocks",
                movements: "Mouvements de stocks",
                accounting: "Comptabilité",
                accounts: "Comptes",
                accounts_counts: "Comptages de comptes",
                automated_transactions: "Transactions Automatiques",
                transactions: "Transactions",
                transferts: "Virements",
                sales: "Ventes",
                purchases: "Achats",
                users: "Utilisateurs",
                logout: "Déconnexion",
                create: "Créer",
                show: "Voir",
                products_categories: "Catégories de Produits",
                transactions_categories: "Catégories de Transactions",
                profile: "Profil",
                archives: "Archives",
                archived_members: "Membres Archivés"
            }
        },
        resources: {
            members: {
                name: 'Membre |||| Membres',
                fields: {
                    id: '#',
                    firstname: 'Prénom',
                    lastname: 'Nom',
                    payed: 'Payé',
                    transaction: 'Transaction',
                    discord_id: 'ID Discord',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le'
                },
                mark_payed: "Marqué comme payé"
            },
            archived_members: {
                name: 'Membre Archivé |||| Membres Archivés',
                fields: {
                    id: '#',
                    firstname: 'Prénom',
                    lastname: 'Nom',
                    payed: 'Payé',
                    transaction: 'Transaction',
                    discord_id: 'ID Discord',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                    school_year: 'Année Scolaire'
                }
            },
            products: {
                name: 'Produit |||| Produits',
                fields: {
                    id: '#',
                    name: 'Nom',
                    category_id: 'Catégorie',
                    price: 'Prix',
                    count: 'Nombre',
                    alert_level: 'Niveau d\'alerte',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                    salable: 'Vendable'
                },
                mark_salabe: 'Marquer comme Vendable',
                mark_unsalable: 'Marquer comme Invendable'
            },
            products_categories: {
                name: 'Catégorie de Produits |||| Catégories de Produits',
                fields: {
                    id: '#',
                    name: 'Nom',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le'
                }
            },
            products_counts: {
                name: 'Comptage de Stocks |||| Compatages de Stocks',
                fields: {
                    id: '#',
                    movement_id: 'Mouvement',
                    'movement.user_id': 'Créateur',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                    data: 'Produits'
                }
            },
            movements: {
                name: 'Mouvement |||| Mouvements',
                fields: {
                    id: '#',
                    name: 'Nom',
                    rectification: 'Réctification',
                    user_id: 'Créateur',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                    product_id: '#',
                    'product.name': 'Nom',
                    count: 'Différence',
                    products: 'Produits',
                    diff: 'Différence'
                }
            },
            accounts: {
                name: 'Compte |||| Comptes',
                fields: {
                    id: '#',
                    name: 'Nom',
                    iban: 'IBAN',
                    bic: 'BIC',
                    balance: 'Solde',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le'
                }
            },
            accounts_counts: {
                name: 'Comptage de Comptes |||| Compatages de Comptes',
                fields: {
                    id: '#',
                    type: 'Type',
                    balance: 'Solde',
                    transaction: 'Transaction',
                    'transaction.account_id': 'Compte',
                    'transaction.user_id': 'Créateur',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                    data: 'Données',
                    value: 'Valeur',
                    count: 'Nombre',
                    total: 'Total'
                }
            },
            transactions: {
                name: 'Transaction |||| Transactions',
                fields: {
                    id: '#',
                    name: 'Nom',
                    amount: 'Montant',
                    rectification: 'Réctification',
                    account_id: 'Compte',
                    category_id: 'Catégorie',
                    user_id: 'Créateur',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                }
            },
            automated_transactions: {
                name: 'Transaction Automatique |||| Transactions Automatiques',
                fields: {
                    id: '#',
                    name: 'Nom',
                    amount: 'Montant',
                    rectification: 'Réctification',
                    account_id: 'Compte',
                    category_id: 'Catégorie',
                    user_id: 'Créateur',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                    frequency: 'Fréquence',
                    day: 'Jour'
                },
                frequencies: {
                    yearly: 'Annuelle',
                    monthly: 'Mensuelle',
                    weekly: 'Hébdomadaire',
                    dayly: 'Journalière'
                }
            },
            transferts: {
                name: 'Virement |||| Virements',
                fields: {
                    id: '#',
                    amount: 'Montant',
                    'sub_transaction.user_id': 'Créateur',
                    'add_transaction.amount': 'Montant',
                    'sub_transaction.account_id': 'Depuis',
                    'add_transaction.account_id': 'Vers',
                    sub_transaction_id: 'Transaction soustraction',
                    add_transaction_id: 'Transaction addition',
                    from_account_id: 'Depuis',
                    to_account_id: 'Vers',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le'
                }
            },
            transactions_categories: {
                name: 'Catégorie de Transactions |||| Catégories de Transactions',
                fields: {
                    id: '#',
                    name: 'Nom',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                }
            },
            sales: {
                name: 'Vente |||| Ventes',
                fields: {
                    id: '#',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                    'transaction.amount': 'Montant',
                    'transaction.amount.user_id': 'Créateur',
                    movement_id: 'Mouvement',
                    transaction_id: 'Transaction',
                    'movement.products': 'Produits',
                    product_id: '#',
                    'product_id.name': 'Nom',
                    'product.name': 'Nom',
                    count: 'Nombre'
                }
            },
            purchases: {
                name: 'Achat |||| Achats',
                fields: {
                    id: '#',
                    name: 'Nom',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                    'transaction.amount': 'Montant',
                    'transaction.user_id': 'Créateur',
                    movement_id: 'Mouvement',
                    transaction_id: 'Transaction',
                    'movement_id.products': 'Produits',
                    'movement.products': 'Produits',
                    product_id: '#',
                    'product.name': 'Nom',
                    count: 'Nombre',
                    account_id: 'Compte',
                    category_id: 'Catégorie',
                    amount: 'Montant',
                    has_products: '',
                    has_products: 'L\'achat concerne des produits'
                }
            },
            users: {
                name: 'Utilisateur |||| Utilisateurs',
                fields: {
                    id: '#',
                    username: 'Login',
                    password: 'Mot de passe',
                    firstname: 'Prénom',
                    lastname: 'Nom',
                    email: 'Adresse email',
                    permissions: 'Permissions',
                    created_at: 'Créé le',
                    updated_at: 'Modifié le',
                    password_changed_at: 'MDP changé le'
                }
            },
            profile: {
                name: 'Profile',
                fields: {
                    username: 'Login',
                    firstname: 'Prénom',
                    lastname: 'Nom',
                    email: 'Adresse email'
                },
                me: "Mon Profil",
                permissions:  {
                    title: "Permissions",
                },
                password: {
                    title: "Mot de passe",
                    last_change: "Dernier changement",
                    never: "Jamais",
                    change: 'Changer le mot de passe'
                },
                '2fa': {
                    title: 'Authentification à deux Facteurs',
                    enable: 'Activer l\'A2F',
                    disable: 'Désactiver l\'A2F',
                    enabled: 'L\'A2F est activée',
                    disabled: 'L\'A2F est désactivée',
                    status: 'Status de l\'A2F',
                    recovery: 'Codes de récupération',
                    recovery_message: 'Ces codes vous permettent de récupérer votre compte en ça de perte de votre périphérique d\'A2F. Veuillez les conserver précieusement.'
                },
                tokens: {
                    title: 'Tokens d\'API',
                    id: '#',
                    name: 'Nom',
                    last_used_at: 'Dernière utilisation',
                    created_at: 'Créé le',
                    clear: 'Effacer les tokens',
                    new: 'Nouveau token',
                    none: 'Vous n\'avez pas de tokens d\'API'
                }
            }
        },
        actions: {
            recalculate: "Recalculer",
            clear: "Réinitialiser",
            archive: "Archiver"
        },
        dashboard: {
            welcome: "Bienvenue sur Seb™",
            statistics: {
                title: "Statistiques"
            },
            products: {
                title: "Classement des produits"
            },
            alerts: {
                none: "Pas d'alertes",
                title: "Alertes de stocks",
                id: "#",
                name: "Nom",
                count: "Nombre",
                treshold: "Seuil d'alerte"
            },
            accounts: {
                none: "Pas de comptes",
                title: 'Comptes',
                stocks_value: 'Valeur Stocks'
            },
            transactions: {
                title: "Graphe des comptes"
            },
            categories_positive: {
                title: "Répartitions des bénéfices"
            },
            categories_negative: {
                title: "Répartitions des dépenses"
            },
            categories: {
                title: "Répartition de la valeur"
            }
        },
        sell: {
            account: "Compte",
            type: 'Type',
            cash: 'Liquide',
            value: 'Valeur absolue',
            balance: 'Solde'
        },
        inputs: {
            multiproductcount: {
                filters: {
                    name: 'Nom',
                    category: 'Catégorie',
                    none: 'Aucun'
                },
                price: 'Totale'
            }
        }
    }),
};

// TODO: Make this a setting
const locale = 'fr';

axios.defaults.params = {}
axios.defaults.params['lang'] = locale;

export default polyglotI18nProvider(locale => messages[locale], locale);
