window.addEventListener('load', function(){
    let seeMore = document.getElementsByClassName('more');
    let products = document.getElementsByClassName('products');

    for(let i = 0; i < seeMore.length; i++){
        seeMore[i].addEventListener('click', function(){
            products[i].style.display = (products[i].style.display == 'flex') ? 'none' : 'flex';
            this.innerText = (this.innerText == 'Ver más') ? 'Ver menos' : 'Ver más';
        });
    }
});