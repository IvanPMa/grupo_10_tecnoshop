window.addEventListener('load', function(){
    let email = document.getElementById('email');
    let emailError = document.querySelector('.email');
    let password = document.getElementById('password');
    let passwordError = document.querySelector('.password');
    let submit = document.querySelector('.login--form--button');
    let forms = document.querySelector('.login--form');

    let messageEmpty = 'Debes completar este campo';
    let approve = { email: false, password: false }

    // Prevenir que se mande el forms
    submit.addEventListener('click', function(e){
        e.preventDefault();

        for(let i = 0; i < Object.values(approve).length; i++){
            if(Object.values(approve)[i] == false) break;
            else if(i == Object.values(approve).length - 1) forms.submit();
        }
    });

    // Validar email
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
        if(!password.value.length){
            passwordError.innerText = messageEmpty;
        }
        else if(password.value.length < 8){
            passwordError.innerText = 'La contraseña debe tener al menos ocho caractéres';
        }
        else{
            approve.password = true;
            passwordError.innerText = '';
        }
    });
});
