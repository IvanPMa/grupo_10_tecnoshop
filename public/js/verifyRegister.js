window.addEventListener('load', function(){
    let firstName = document.getElementById('first_name');
    let firstNameError = document.querySelector('.first_name');
    let lastName = document.getElementById('last_name');
    let lastNameError = document.querySelector('.last_name');
    let email = document.getElementById('email');
    let emailError = document.querySelector('.email');
    let password = document.getElementById('password');
    let passwordError = document.querySelector('.password');
    let checkPassword = document.getElementById('checkpassword');
    let checkPasswordError = document.querySelector('.checkpassword');
    let terms = document.getElementById('terms');
    let termsError = document.querySelector('.terms');
    let submit = document.querySelector('.create-button');
    let form = document.getElementById('create-account-form');

    let messageEmpty = 'Debes completar este campo';
    let approve = { firstName: false, lastName: false, email: false, password: false, checkPassword: false, terms: false }

    // Validar nombre
    let validateFirstName = function(){
        approve.firstName = false;
        if(!firstName.value.length) firstNameError.innerText = messageEmpty;
        else if(firstName.value.length < 2) firstNameError.innerText = 'Debe tener al menos dos caracteres';
        else{
            approve.firstName = true;
            firstNameError.innerText = '';
        }
    }

    // Validar apellido
    let validateLastName = function(){
        approve.lastName = false;
        if(!lastName.value.length) lastNameError.innerText = messageEmpty;
        else if(lastName.value.length < 2) lastNameError.innerText = 'Debe tener al menos dos caracteres';
        else{
            approve.lastName = true;
            lastNameError.innerText = '';
        }
    }

    // Validar email
    let validateEmail = function(){
        approve.email = false;
        if(!email.value.length) emailError.innerText = messageEmpty;
        else if(!email.value.includes('@') || !email.value.includes('.')) emailError.innerText = 'Ingresa un correo electr??nico v??lido';
        else{
            approve.email = true;
            emailError.innerText = '';
        }
    }

    // Validar contrase??a
    let validatePassword = function(){
        approve.password = false;
        let passHasNumber = /\d/.test(password.value);
        let passHasLower = password.value.toUpperCase() !== password.value;
        let passHasUpper = password.value.toLowerCase() !== password.value;
        let passHasSpChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value);

        if(!password.value.length){
            passwordError.innerText = messageEmpty;
        }
        else if(password.value.length < 8){
            passwordError.innerText = 'La contrase??a debe tener al menos ocho caract??res';
        }
        else if(!passHasNumber || !passHasLower || !passHasUpper || !passHasSpChar){
            passwordError.innerText = 'La contrase??a debe tener letras may??sculas, min??sculas, un n??mero y un car??cter especial.';
        }
        else{
            approve.password = true;
            passwordError.innerText = '';
        }
    }

    // Validar la confirmaci??n de la contrase??a
    let validateCheckPassword = function(){
        approve.checkPassword = false;
        if(!checkPassword.value.length) checkPasswordError.innerText = messageEmpty;
        else if(password.value !== checkPassword.value) checkPasswordError.innerText = 'Las contrase??as no coinciden'
        else{
            approve.checkPassword = true;
            checkPasswordError.innerText = '';
        }
    }

    // Validar la aceptaci??n de t??rminos y condiciones
    let validateTerms = function(){
        approve.terms = false;
        if(!terms.checked){
            termsError.innerText = 'Debes aceptar los t??rminos y condiciones';
        }
        else{
            approve.terms = true;
            termsError.innerText = '';
        }
    }

    firstName.addEventListener('blur', validateFirstName);
    lastName.addEventListener('blur', validateLastName);
    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    checkPassword.addEventListener('blur', validateCheckPassword);
    terms.addEventListener('change', validateTerms);
    
    // Prevenir que se mande el forms
    submit.addEventListener('click', function(e){
        e.preventDefault();
        let canSubmit = true;

        // Comprobar que ning??n campo tenga error
        for(let i = 0; i < Object.values(approve).length; i++){
            if(Object.values(approve)[i] == false){
                canSubmit = false;
                break;
            }
        }

        if(!canSubmit){
            validateFirstName();
            validateLastName();
            validateEmail();
            validatePassword();
            validateCheckPassword();
            validateTerms();
        }
        else{
            form.submit();
        }
    });
});
