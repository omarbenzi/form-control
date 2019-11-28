class Validation {

    constructor(doc) {
        this.Initialiser(doc);
    }

    Initialiser = function (doc) {
        console.log(Object.keys(doc))
        Object.keys(doc).forEach(element => {
            document.getElementsByName(element)[0].addEventListener('change',e => )
        });

    }

    controleur = function () {


    }
}
