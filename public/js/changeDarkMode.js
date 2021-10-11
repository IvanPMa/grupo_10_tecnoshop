window.addEventListener('load', function(){
    const darkMode = document.getElementById('darkmode');
    const head = document.getElementsByTagName('head')[0];
    const logo = document.querySelector('.logo');
    const search = document.querySelector('.search-img');

    darkMode.addEventListener('change', function(){
        if(darkMode.checked){
            let links  = Array.from(document.getElementsByTagName('link'));
            let cssDarkMode = links.find(l => l.href.includes('/css/partials/darkmode.css'));
            
            // Agregar el css que vuelve oscuro la página
            if(!cssDarkMode){
                let addCssDarkMode = document.createElement('link');
                addCssDarkMode.rel = 'stylesheet';
                addCssDarkMode.href = '/css/partials/darkmode.css';
                head.appendChild(addCssDarkMode);
                logo.src = '/images/logodark.png';
                search.src = '/images/icons/searchwhite.png';
    
                // Mandar la información al servidor
                fetch('https://tecnoshop2.herokuapp.com/darkmode/1')
                    .catch(error => console.log(error));
            }
        }
        else{
            let links  = Array.from(document.getElementsByTagName('link'));
            let cssDarkMode = links.find(l => l.href.includes('/css/partials/darkmode.css'));

            // Quitar el css que vuelve oscuro la página
            if(cssDarkMode){
                head.removeChild(cssDarkMode);
                logo.src = '/images/logo.png';
                search.src = '/images/icons/search.png';

                // Mandar la información al servidor
                fetch('https://tecnoshop2.herokuapp.com/darkmode/0')
                    .catch(error => console.log(error));
            }
        }
    });
});
