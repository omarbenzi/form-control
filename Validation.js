class Validation {
    formName;
    target;
    myInputs;
    inputName;
    inputValue;
    inputType;
    e;
    regex;
    doc;
    checkboxes;
    selectedCboxes;
    msgErr = {};
    constructor(doc, formName) {
        this.doc = doc
        this.formName = formName;
        this.Initialiser();
    }

    Initialiser() {

        this.myInputs = document.forms[this.formName].elements
        Array.prototype.forEach.call(this.myInputs, input => {
            input.addEventListener(input.type === 'submit' ? 'click' : 'change', (evt) => {
                if (input.type === 'submit') this.e = evt;// closure besoin pour preventDefault()
                evt.stopPropagation()
                this.valider(evt.target)
            })

        });
    }
    valider(target) {
        this.target = target
        this.inputName = this.target.name;
        this.inputType = this.target.type;
        this.inputValue = this.target.value;

        switch (this.inputType) {
            case 'checkbox':
            case 'radio':
                this.RadioCheckboxValidation();
                break;
            case 'submit':
                this.sabmitValidation();
                break;
            case 'select-one':
                this.selectValidation();
                break;
            default:
                this.defaultValidation();
        }
        this.ErrorDisplay(); // affichage des erreur 
    }

    defaultValidation() { // validation des input text 
        this.msgErr[this.inputName] = ''
        this.regex = eval("`" + this.doc[this.inputName]['regExp'] + "`");
        if (this.inputValue.trim() === '') {
            this.msgErr[this.inputName] = this.doc[this.inputName]['msgErrVide']
        } else if (!this.inputValue.trim().match(this.regex)) {
            this.msgErr[this.inputName] = this.doc[this.inputName]['msgErr']
        }

    }
    RadioCheckboxValidation() {
        this.msgErr[this.inputName] = ''
        this.checkboxes = document.getElementsByName(this.inputName);
        this.selectedCboxes = Array.prototype.slice.call(this.checkboxes).filter(ch => ch.checked == true); // recuperation des checkboxes selectionés  
        if (this.selectedCboxes.length === 0) {
            this.msgErr[this.inputName] = this.doc[this.inputName]['msgErr']
        }
    }
    selectValidation() {
        this.msgErr[this.inputName] = ''
        if (this.target.options[this.target.selectedIndex].value === '')
            this.msgErr[this.inputName] = this.doc[this.inputName]['msgErr']
    }
    sabmitValidation() {
        Array.prototype.forEach.call(this.myInputs, inputTarget => {
            if (inputTarget.type !== 'submit' && inputTarget.type !== 'fieldset') // a cause que nous avons un fieldset à l'interieur du form 
                this.valider(inputTarget)
        });
        if (Object.keys(this.msgErr).length != 0) this.e.preventDefault(); // est executé apres la fonction ErrorDisplay()

    }
    ErrorDisplay() {
        Object.keys(this.msgErr).forEach(element => {
            document.getElementById('err' + element.charAt(0).toUpperCase() + element.slice(1)).innerHTML = this.msgErr[element]
            if (this.msgErr[element] === '') // suppression de la propreité si ca valeur est vide 
                delete this.msgErr[element];

        });


    }

};
