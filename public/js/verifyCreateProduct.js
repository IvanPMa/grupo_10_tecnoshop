window.addEventListener('load', function(){
    let name = document.getElementById('name');
    let nameError = document.querySelector('.name');
    let description = document.getElementById('description');
    let descriptionError = document.querySelector('.description');
    let price = document.getElementById('price');
    let priceError = document.querySelector('.price');
    let category = document.getElementById('category');
    let newCategory = document.getElementById('newcategory');
    let categoryError = document.querySelector('.category');
    let submit = document.getElementById('button');
    let form = document.querySelector('.create-product-form');

    let messageEmpty = 'Debes completar este campo';
    let approve = {
        name: name.value.length >= 5,
        description: description.value.length >= 20,
        price: parseInt(price.value) >= 0,
        category: category.value != 'addcategory'
    }

    // Validaciones del nombre
    let validateName = function(){
        approve.name = false;
        if(!name.value.length) nameError.innerText = messageEmpty;
        else if(name.value.length < 5) nameError.innerText = 'Debe tener al menos cinco caracteres';
        else{
            approve.name = true;
            nameError.innerText = '';
        }
    }

    // Validaciones de la descripción
    let validateDescription = function(){
        approve.description = false;
        if(!description.value.length) descriptionError.innerText = messageEmpty;
        else if(description.value.length < 20) descriptionError.innerText = 'Debe tener al menos veinte caracteres';
        else{
            approve.description = true;
            descriptionError.innerText = '';
        }
    }

    // Validaciones del precio
    let validatePrice = function(){
        approve.price = false;
        if(!price.value.length) priceError.innerText = messageEmpty;
        else if(price.value < 0) priceError.innerText = 'El precio debe ser mayor a cero';
        else{
            approve.price = true;
            priceError.innerText = '';
        }
    }

    // Validaciones de la categoría
    let validateCategory = function(){
        if(category.value == 'addcategory'){
            approve.category = false;
            if(!newCategory.value.length) categoryError.innerText = messageEmpty;
            else if(newCategory.value.length < 2) categoryError.innerText = 'Debe tener al menos dos caracteres';
            else{
                approve.category = true;
                categoryError.innerText = '';
            }
        }else{
            approve.category = true;
            categoryError.innerText = '';
        }
    }

    name.addEventListener('blur', validateName);
    description.addEventListener('blur', validateDescription);
    price.addEventListener('blur', validatePrice);
    category.addEventListener('change', validateCategory);
    newCategory.addEventListener('change', validateCategory);

    // Prevenir que se mande el forms
    submit.addEventListener('click', function(e){
        e.preventDefault();
        let canSubmit = true;

        // Comprobar que ningún campo tenga error
        for(let i = 0; i < Object.values(approve).length; i++){
            if(Object.values(approve)[i] == false){
                canSubmit = false;
                break;
            }
        }

        if(!canSubmit){
            validateName();
            validateDescription();
            validatePrice();
            validateCategory();
        }
        else{
            form.submit();
        }
    });
});
