window.addEventListener('load', function(){
    let change = document.querySelector('.changepassword');
    let password = document.querySelectorAll('.password');

    change.addEventListener('click', function(){
        password.forEach(p => {
            p.classList.toggle('js-show');
        });
    });
});
