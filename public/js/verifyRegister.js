window.addEventListener('load', function(){
    let name = [document.getElementById('first_name'), document.getElementById('last_name')];
    let nameError = [document.querySelector('.first_name'), document.querySelector('.last_name')];
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
    let approve = { name: false, email: false, password: false, checkPassword: false, terms: false }

    // Prevenir que se mande el forms
    submit.addEventListener('click', function(e){
        e.preventDefault();

        for(let i = 0; i < Object.values(approve).length; i++){
            if(Object.values(approve)[i] == false) break;
            else if(i == Object.values(approve).length - 1) form.submit();
        }
    });

    // Validaciones del nombre y apellido
    for(let i = 0; i < name.length; i++){
        name[i].addEventListener('blur', function(){
            approve.name = false;
            if(!this.value.length) nameError[i].innerText = messageEmpty;
            else if(this.value.length < 2) nameError[i].innerText = 'Debe tener al menos dos caracteres';
            else{
                approve.name = true;
                nameError[i].innerText = '';
            }
        });
    }

    // Validar email
    // TODO: Que no se pueda repetir con la base de datos
    email.addEventListener('blur', function(){
        approve.email = false;
        if(!email.value.length) emailError.innerText = messageEmpty;
        else if(!email.value.includes('@') || !email.value.includes('.')) emailError.innerText = 'Ingresa un correo electrónico válido';
        else{
            approve.email = true;
            emailError.innerText = '';
        }
    });

    // Validar contraseña
    password.addEventListener('blur', function(){
        approve.password = false;
        let passHasNumber = /\d/.test(password.value);
        let passHasLower = password.value.toUpperCase() !== password.value;
        let passHasUpper = password.value.toLowerCase() !== password.value;
        let passHasSpChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value);

        if(!password.value.length){
            passwordError.innerText = messageEmpty;
        }
        else if(password.value.length < 8){
            passwordError.innerText = 'La contraseña debe tener al menos ocho caractéres';
        }
        else if(!passHasNumber || !passHasLower || !passHasUpper || !passHasSpChar){
            passwordError.innerText = 'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial.';
        }
        else{
            approve.password = true;
            passwordError.innerText = '';
        }
    });

    // Validar la confirmación de la contraseña
    checkPassword.addEventListener('blur', function(){
        approve.checkPassword = false;
        if(!checkPassword.value.length) checkPasswordError.innerText = messageEmpty;
        else if(password.value !== checkPassword.value) checkPasswordError.innerText = 'Las contraseñas no coinciden'
        else{
            approve.checkPassword = true;
            checkPasswordError.innerText = '';
        }
    });

    // Validar la aceptación de términos y condiciones
    terms.addEventListener('change', function(){
        approve.terms = false;
        if(!terms.checked){
            termsError.innerText = 'Debes aceptar los términos y condiciones';
        }
        else{
            approve.terms = true;
            termsError.innerText = '';
        }
    });
});
