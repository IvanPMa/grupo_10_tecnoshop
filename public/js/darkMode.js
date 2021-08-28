window.addEventListener("load", function(){
    const darkMode = document.getElementById('darkmode');
    const body = document.querySelector('body');
    const main = document.querySelector('.product-management-box');

    darkMode.addEventListener('change', function(){
        
        body.classList.toggle('darkMode');

        if(body.classList.contains('darkMode')){
            body.style.backgroundColor = 'black';
            main.style.backgroundColor = 'black';
        }
        else{
            body.style.backgroundColor = 'white';
            main.style.backgroundColor = 'black';
        }
    });
});