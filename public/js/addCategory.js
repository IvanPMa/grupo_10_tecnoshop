window.addEventListener("load", function(){
    const selectCategory = document.getElementById('category');
    const divNewCategory = document.querySelector('.addcategory');
    
    const showCategoryInput = function(){
        if(selectCategory.value === 'addcategory'){
            divNewCategory.style.display = 'inherit';
        }
        else{
            divNewCategory.style.display = 'none';
        }
    }

    showCategoryInput();
    selectCategory.addEventListener('change', showCategoryInput);
});