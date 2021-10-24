window.addEventListener('load', function(){
    let name = [document.getElementById('first_name'), document.getElementById('last_name')];
    let nameError = [document.querySelector('.first_name'), document.querySelector('.last_name')];
    let email = document.getElementById('email');
    let emailError = document.querySelector('.email');
    let picture = document.getElementById('userPicture');
    let pictureError = document.querySelector('.picture');
    let password = document.getElementById('password');
    let passwordError = document.querySelector('.passworderror');
    let checkPassword = document.getElementById('checkpassword');
    let checkPasswordError = document.querySelector('.checkpassworderror');
    let submit = document.getElementById('button');
    let form = document.querySelector('.edit-information-form');

    let messageEmpty = 'Debes completar este campo';
    let approve = {
        name: name[0].value.length >= 2 || name[1].value.length >= 2,
        email: email.value.includes('@') && email.value.includes('.'),
        password: true,
        checkPassword:true,
        picture: true
    };

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
        name[i].addEventListener('change', function(){
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
    email.addEventListener('change', function(){
        approve.email = false;
        if(!email.value.length) emailError.innerText = messageEmpty;
        else if(!email.value.includes('@') || !email.value.includes('.')) emailError.innerText = 'Ingresa un correo electrónico válido';
        else{
            approve.email = true;
            emailError.innerText = '';
        }
    });

    // Validar contraseña
    password.addEventListener('change', function(){
        if(password.value.length > 0){
            approve.password = false;
            let passHasNumber = /\d/.test(password.value);
            let passHasLower = password.value.toUpperCase() !== password.value;
            let passHasUpper = password.value.toLowerCase() !== password.value;
            let passHasSpChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value);

            if(password.value.length < 8){
                passwordError.innerText = 'La contraseña debe tener al menos ocho caractéres';
            }
            else if(!passHasNumber || !passHasLower || !passHasUpper || !passHasSpChar){
                passwordError.innerText = 'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial.';
            }
            else{
                approve.password = true;
                passwordError.innerText = '';
            }
        }
    });

    // Validar la confirmación de la contraseña
    checkPassword.addEventListener('change', function(){
        if(password.value.length > 0){
            approve.checkPassword = false;
            if(password.value !== checkPassword.value) checkPasswordError.innerText = 'Las contraseñas no coinciden'
            else{
                approve.checkPassword = true;
                checkPasswordError.innerText = '';
            }
        }
    });

    // Validaciones del formato de imagen
    picture.addEventListener('change', function(){
        approve.picture = false;
        let nameSplit = picture.value.split('.');
        let extension = nameSplit[nameSplit.length - 1];
        let aproveExtens = (extension == 'jpg' || extension == 'jpeg' || extension == 'png');

        if(!aproveExtens) pictureError.innerText = 'Debe ser un archivo con formato válido (jpg, jpeg, png)';
        else{
            approve.picture = true;
            pictureError.innerText = '';
        }
    });
});
