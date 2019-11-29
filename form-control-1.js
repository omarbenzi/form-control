Validation = function () {
    let myInputs;
    let inputName;
    let inputType;
    let inputValue;
    let e;
    let regExp;
    let msgErr = {};

    ovalidateur = {
        Initialiser: function (doc, formName) {
            myInputs = document.forms[formName].elements
            Array.prototype.forEach.call(myInputs, input => {
                input.addEventListener(input.type === 'submit' ? 'click' : 'change', function (evt) {
                    e = evt;// closure
                    ovalidateur.valider(e.target)
                })

            });
        },
        valider: function (target) {
            inputName = target.name;
            inputType = target.type;
            inputValue = target.value;
            switch (inputType) {
                case 'checkbox':
                case 'radio':
                    ovalidateur.RadioCheckboxValidation(inputName);
                    break;
                case 'submit':
                    ovalidateur.sabmitValidation();
                    break;
                case 'select-one':
                    ovalidateur.selectValidation(target, inputName);
                    break;
                default:
                    ovalidateur.defaultValidation(inputName, inputValue);
            }
            ovalidateur.ErrorDisplay(e);
        },
        defaultValidation: function (inputName, inputValue) {
            msgErr[inputName] = ''
            if (inputName === 'confirmationMotDePasse') {
                if (inputValue !== document.form1.motDePasse.value)
                    msgErr[inputName] = doc[inputName]['msgErr']
            } else {
                regExp = new RegExp(doc[inputName]['regExp'])
                if (inputValue.trim() === '') {
                    msgErr[inputName] = doc[inputName]['msgErrVide']
                } else if (!regExp.test(inputValue.trim())) {
                    msgErr[inputName] = doc[inputName]['msgErr']
                }
            }
        },
        RadioCheckboxValidation: function (inputName) {
            msgErr[inputName] = ''
            checkboxes = document.getElementsByName(inputName);
            selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked == true);
            if (selectedCboxes.length === 0) {
                msgErr[inputName] = doc[inputName]['msgErr']
            }
        },
        selectValidation: function (target, inputName) {
            msgErr[inputName] = ''
            if (target.options[target.selectedIndex].value === '')
                msgErr[inputName] = doc[inputName]['msgErr']
        },
        sabmitValidation: function () {
            Array.prototype.forEach.call(myInputs, inputTarget => {
                if (inputTarget.type !== 'submit' && inputTarget.type !== 'fieldset')
                    ovalidateur.valider(inputTarget)
            });

        },
        ErrorDisplay: function (e) {
            if (Object.keys(msgErr).length === 0) return;
            Object.keys(msgErr).forEach((element) => {
                document.getElementById('err' + element.charAt(0).toUpperCase() + element.slice(1)).innerHTML = msgErr[element]
            });
            //e.preventDefault()
        }
    }
    return ovalidateur;
}();
