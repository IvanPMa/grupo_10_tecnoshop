window.addEventListener("load", function(){
    const darkMode = document.getElementById('darkmode');
    const body = document.querySelector('body');
    const darkModeText = document.querySelector('.darkmode-label a');
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo img');
    const search = document.querySelector('.searchbar form');
    const searchbtn = document.querySelector('.searchbar button img');
    const searchinput = document.querySelector('.searchbar input');
    const menubtn = document.querySelector('.menu-button-label img');
    const navbarMenu = document.querySelector('nav ul');
    const navbarMenuBtn = document.querySelectorAll('.navbar-button');

    if(darkMode.checked){
        // Logo
        logo.src = '/images/logodark2.png';
        header.style.backgroundColor = '#2b373d';

        // Search
        searchbtn.src = '/images/icons/searchwhite.png';
        search.style.backgroundColor = '#38454c';
        searchinput.style.color = 'whitesmoke';

        // Menu
        menubtn.src = '/images/icons/menuwhite.png';
        navbarMenu.style.backgroundColor = '#2b373d';
        navbarMenuBtn.forEach(btn => {
            btn.style.backgroundColor = '#445760';
            btn.style.color = 'whitesmoke';
        });
        darkModeText.style.color = 'whitesmoke';
        darkModeText.innerHTML = '<img src="/images/icons/dark.png">Tema oscuro';
        darkModeText.href = '/darkmode/0';

        // Body
        body.style.backgroundColor = '#445760';
    }
});
