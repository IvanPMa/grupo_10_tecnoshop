window.addEventListener("load", function(){
    const darkMode = document.getElementById('darkmode');
    const body = document.querySelector('body');
    const text = document.querySelector('.darkmode-label a');

    if(darkMode.checked){
        body.style.backgroundColor = 'black';
        text.innerHTML = '<img src="/images/icons/dark.png">Tema oscuro';
        text.href = '/darkmode/0';
    }
});
