Validation = function () {
    var inputName;
    var regExp;
    var type;
    var msgErr = {};

    ovalidateur = {


        Initialiser: function (doc) {
            inputs = document.forms["form1"].getElementsByTagName("input")
            console.log(inputs)
            Array.prototype.forEach.call(inputs, input => {
                console.log(input)
            });
            // inputs.forEach(hello => console.logé(hello))hello
            // document.form1.envoi.addEventListener('click', e => ovalidateur.valider(e.target, e.target.type, e.target.value));


            document.form1.getElementsByTagName("input").forEach(inputName => {
                document.form1[inputName].addEventListener('change', e => ovalidateur.valider(e.target, e.target.type, e.target.value, inputName))
            });


        },

        valider: function (target, InputType, inputValue, inputName) {
            e = e || null
            inputName = inputName || null
            switch (type) {
                case 'checkbox':
                    ovalidateur.checkboxValidation(target, InputType, inputValue, inputName);
                    break;
                case 'submit':
                    ovalidateur.sabmitValidation();
                    break;
                default:
                    ovalidateur.defaultValidation(inputValue, inputName);
            }
            ovalidateur.ErrorDisplay();
        },
        defaultValidation: function (value, inputName) {
            msgErr[inputName] = ''
            if (inputName === 'confirmationMotDePasse') {
                if (value !== document.form1.motDePasse.value)
                    msgErr[inputName] = doc[inputName]['msgErr']
            } else {
                regExp = new RegExp(doc[inputName]['regExp'])
                if (value.trim() === '') {
                    msgErr[inputName] = doc[inputName]['msgErrVide']
                } else if (!regExp.test(value.trim())) {
                    msgErr[inputName] = doc[inputName]['msgErr']
                }
            }


        },
        checkboxValidation: function (e, type, value, inputName) {
            console.log(e.checked)
            console.log(type)
            console.log(value)
            msgErr[inputName] = ''
            if (typeof value === Array) {
                if (value.length == 0) {
                    msgErr[inputName] = doc[inputName]['msgErr']
                }

            } else if (!e.checked) {
                msgErr[inputName] = doc[inputName]['msgErr']
            }

        },
        sabmitValidation: function (e) {
            Object.keys(doc).forEach(inputName => {
                console.log(inputName)

                ovalidateur.valider(document.form1[inputName], document.form1[inputName].type, document.form1[inputName].value, inputName)
                if (Object.keys(msgErr).length != 0) e.preventDefault()
            });

        },
        ErrorDisplay: function () {
            if (Object.keys(msgErr).length === 0) return;
            Object.keys(msgErr).forEach((element) => {
                document.getElementById('err' + element.charAt(0).toUpperCase() + element.slice(1)).innerHTML = msgErr[element]
            });


        }





    }
    return ovalidateur;


}();
