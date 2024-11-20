// =========================================================================
// Déclaration des variables                                               =
// =========================================================================
const inp = document.getElementById("cle-activation");
const box = document.getElementById("declaration");
const form = document.getElementById("form-activation");
const erreur = document.getElementById("message-erreur");

const REGEX_CODE_PRODUIT = /(([\d\w]){5}-){2,4}([\d\w]){5}/;
const listeProduits = {
    "Q1JBC-3ZPX8-TVHUH": "Final Fantasy 1",
    "P3CJN-JNGJM-XYYT4": "Contra",
    "2RCWA-XPRPX-GJHPR": "The Legend of Zelda",
    "H4LS8-L1L3T-08D9X": "Rygar",
    "KBZB7-PQYDY-D5TMZ-MUABS-JNGJM": "Metroid",
    "VPTU1-9UZXA-X4ED4-F596J-XPRPX": "Ninja Gaiden",
    "SUY17-21D57-5QYJU-UE6PN-HZ452": "Kirby's Adventure"
};
const erreurValidation = {
    "terme": "Vous devez accepter les termes de l’Accord de souscription Vapeur pour finaliser la transaction.",
    "formatInvalide": "Le code produit que vous avez saisi est invalide, il ne respecte pas le format requis.",
    "produitInexistant": "Aucun produit n'est associé au code de produit saisi."
};

// =========================================================================
// Code pour provoquer une animation sur le bouton Activer                 =
// =========================================================================
const boutonActiver = document.querySelector('.bouton-activation');
boutonActiver.addEventListener('click', (e) => e.target.classList.add('bouton-click'));
boutonActiver.addEventListener('transitionend', (e) => e.target.classList.remove('bouton-click'));

/**
 * Vérifie si le produit existe dans la liste des produits.
 * @param {string} codeProduit - Le code produit à valider.
 * @returns {boolean} - Retourne true si le produit existe.
 */
function isProduitExiste(codeProduit) {
    return listeProduits[codeProduit.toUpperCase()] ? true : false;
}

// =========================================================================
// Ajoutez votre code plus bas                                             =
// =========================================================================

/**
 * Affiche un message d'erreur dans la div dédiée.
 * @param {string} message - Le message à afficher.
 */
function afficherMessageErreur(message) {
    erreur.textContent = message;
    erreur.classList.remove("hidden");
}

/**
 * Valide le formulaire lors de la soumission.
 * @param {Event} event - L'événement de soumission du formulaire.
 */
function validerFormulaire(event) {
    // Réinitialise les messages d'erreur
    erreur.textContent = "";
    erreur.classList.add("hidden");
    box.style.color = ""; // Réinitialiser la couleur du texte de la case à cocher

    let codeProduit = inp.value.trim();

    // Validation du format du code produit
    if (!REGEX_CODE_PRODUIT.test(codeProduit)) {
        event.preventDefault();
        afficherMessageErreur(erreurValidation.formatInvalide);
        return;
    }

    // Validation de l'existence du code produit
    if (!isProduitExiste(codeProduit)) {
        event.preventDefault();
        afficherMessageErreur(erreurValidation.produitInexistant);
        return;
    }

    // Validation de la case à cocher
    if (!box.checked) {
        event.preventDefault();
        afficherMessageErreur(erreurValidation.terme);
        box.style.color = "var(--couleur-texte-invalide)";
        return;
    }
}

// Ajout de l'événement submit au formulaire
form.addEventListener("submit", validerFormulaire);

