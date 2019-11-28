Validation = function () {
    let myInputs;
    let inputName;
    let inputType;
    let inputValue;
    let e;
    let regExp;
    let msgErr = {};

    ovalidateur = {


        Initialiser: function (doc) {
            myInputs = document.forms['form1'].getElementsByTagName("input")
            console.log(myInputs)
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
                    ovalidateur.checkboxValidation(target, inputName, inputValue);
                    break;
                case 'submit':
                    ovalidateur.sabmitValidation();
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
                console.log(doc[inputName]['regExp'])
                regExp = new RegExp(doc[inputName]['regExp'])
                if (inputValue.trim() === '') {
                    msgErr[inputName] = doc[inputName]['msgErrVide']
                } else if (!regExp.test(inputValue.trim())) {
                    msgErr[inputName] = doc[inputName]['msgErr']
                }
            }


        },
        checkboxValidation: function (target, inputName, inputValue) {


            msgErr[inputName] = ''
            if (inputValue instanceof Array) {
                if (inputValue.length === 0) {
                    msgErr[inputName] = doc[inputName]['msgErr']
                }

            } else if (!target.checked) {
                msgErr[inputName] = doc[inputName]['msgErr']
            }

        },
        sabmitValidation: function () {
            Array.prototype.forEach.call(myInputs, inputTarget => {
                console.log(inputTarget.type)
                if (inputTarget.type !== 'submit')
                    ovalidateur.valider(inputTarget)
            });

        },
        ErrorDisplay: function (e) {
            if (Object.keys(msgErr).length === 0) return;
            Object.keys(msgErr).forEach((element) => {
                document.getElementById('err' + element.charAt(0).toUpperCase() + element.slice(1)).innerHTML = msgErr[element]
                e.preventDefault()
            });


        }





    }
    return ovalidateur;


}();
