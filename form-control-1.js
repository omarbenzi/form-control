class Validation {
    formName;
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
        this.Initialiser(doc, formName);
    }
    Initialiser(doc, formName) {
        this.doc = doc
        this.formName = formName;
        console.log(this.formName)
        this.myInputs = document.forms[formName].elements
        Array.prototype.forEach.call(this.myInputs, input => {
            input.addEventListener(input.type === 'submit' ? 'click' : 'change', (evt) => {
                if (input.type === 'submit') this.e = evt;// closure besoin pour preventDefault()
                evt.stopPropagation()
                this.valider(evt.target)
            })

        });
    }
    valider(target) {
        this.inputName = target.name;
        this.inputType = target.type;
        this.inputValue = target.value;
        switch (this.inputType) {
            case 'checkbox':
            case 'radio':
                this.RadioCheckboxValidation(this.inputName);
                break;
            case 'submit':
                this.sabmitValidation();
                break;
            case 'select-one':
                this.selectValidation(target, this.inputName);
                break;
            default:
                this.defaultValidation(this.inputName, this.inputValue);
        }
        this.ErrorDisplay(this.e);
    }
    defaultValidation(inputName, inputValue) {
        this.msgErr[this.inputName] = ''
        this.regex = eval("`" + this.doc[this.inputName]['regExp'] + "`");
        console.log(this.regex)
        this.regex = new RegExp(this.regex)
        console.log(this.regex)
        if (this.inputValue.trim() === '') {
            this.msgErr[this.inputName] = this.doc[this.inputName]['msgErrVide']
        } else if (!this.regex.test(this.inputValue.trim())) {
            this.msgErr[this.inputName] = this.doc[this.inputName]['msgErr']
        }

    }
    RadioCheckboxValidation(inputName) {
        this.msgErr[this.inputName] = ''
        this.checkboxes = document.getElementsByName(this.inputName);
        this.selectedCboxes = Array.prototype.slice.call(this.checkboxes).filter(ch => ch.checked == true);
        if (this.selectedCboxes.length === 0) {
            this.msgErr[this.inputName] = this.doc[this.inputName]['msgErr']
        }
    }
    selectValidation(target, inputName) {
        this.msgErr[this.inputName] = ''
        if (target.options[target.selectedIndex].value === '')
            this.msgErr[this.inputName] = this.doc[this.inputName]['msgErr']
    }
    sabmitValidation() {
        Array.prototype.forEach.call(this.myInputs, inputTarget => {
            if (inputTarget.type !== 'submit' && inputTarget.type !== 'fieldset')
                this.valider(inputTarget)
        });
        if (Object.keys(this.msgErr).length != 0) this.e.preventDefault();

    }
    ErrorDisplay() {
        Object.keys(this.msgErr).forEach(element => {
            document.getElementById('err' + element.charAt(0).toUpperCase() + element.slice(1)).innerHTML = this.msgErr[element]
            if (this.msgErr[element] === '')
                delete this.msgErr[element];

        });


    }

};
