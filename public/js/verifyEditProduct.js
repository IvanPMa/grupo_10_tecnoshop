window.addEventListener('load', function(){
    let name = document.getElementById('name');
    let nameError = document.querySelector('.name');
    let description = document.getElementById('description');
    let descriptionError = document.querySelector('.description');
    let price = document.getElementById('price');
    let priceError = document.querySelector('.price');
    let categories = [document.getElementById('category'), document.getElementById('newcategory')];
    let categoryError = document.querySelector('.errorcategory');
    let submit = document.getElementById('button');
    let forms = document.querySelector('.edit-information-form');
    let image = document.getElementById('image');
    let imageError = document.querySelector('.image');

    let messageEmpty = 'Debes completar este campo';
    let approve = {
        name: name.value.length >= 5,
        description: description.value.length >= 20,
        price: parseInt(price.value) >= 0,
        category: category.value != 'addcategory'
    }

    // Prevenir que se mande el forms
    submit.addEventListener('click', function(e){
        e.preventDefault();

        for(let i = 0; i < Object.values(approve).length; i++){
            if(Object.values(approve)[i] == false) break;
            else if(i == Object.values(approve).length - 1) forms.submit();
        }
    });

    // Validaciones del nombre
    name.addEventListener('blur', function(){
        approve.name = false;
        if(!name.value.length) nameError.innerText = messageEmpty;
        else if(name.value.length < 5) nameError.innerText = 'Debe tener al menos cinco caracteres';
        else{
            approve.name = true;
            nameError.innerText = '';
        }
    });

    // Validaciones de la descripción
    description.addEventListener('blur', function(){
        approve.description = false;
        if(!description.value.length) descriptionError.innerText = messageEmpty;
        else if(description.value.length < 20) descriptionError.innerText = 'Debe tener al menos veinte caracteres';
        else{
            approve.description = true;
            descriptionError.innerText = '';
        }
    });

    // Validaciones de la categoría
    for(let i = 0; i < categories.length; i++){
        categories[i].addEventListener('change', function(){
            if(categories[0].value == 'addcategory'){
                approve.category = false;
                if(!categories[1].value.length) categoryError.innerText = messageEmpty;
                else if(categories[1].value.length < 2) categoryError.innerText = 'Debe tener al menos dos caracteres';
                else{
                    approve.category = true;
                    categoryError.innerText = '';
                }
            }else{
                approve.category = true;
                categoryError.innerText = '';
            }
        });
    }

    // Validaciones del precio
    price.addEventListener('blur', function(){
        approve.price = false;
        if(!price.value.length) priceError.innerText = messageEmpty;
        else if(price.value < 0) priceError.innerText = 'El precio debe ser mayor a cero';
        else{
            approve.price = true;
            priceError.innerText = '';
        }
    });

    // Validaciones del formato de imagen
    image.addEventListener('change', function(){
        approve.image = false;
        let nameSplit = image.value.split('.');
        let extension = nameSplit[nameSplit.length - 1];
        let aproveExtens = (extension == 'jpg' || extension == 'jpeg' || extension == 'png');

        if(!aproveExtens) imageError.innerText = 'Debe ser un archivo con formato válido (jpg, jpeg, png)';
        else{
            approve.image = true;
            imageError.innerText = '';
        }
    });
});
