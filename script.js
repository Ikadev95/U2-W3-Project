const productsURL = 'https://striveschool-api.herokuapp.com/api/product/';

const getProducts = function (){

    fetch(productsURL,{
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmEzYzc5YzQ1ZjAwMTU2OWI0YzUiLCJpYXQiOjE3Mjc0MjUwODQsImV4cCI6MTcyODYzNDY4NH0.hYHzkYMNfNvxz8F_k5VWBA8x51i7rOINFJpWYiC33TI"
        }
    })
    .then((response) => {
        if(response.ok){
            return response.json()
        }
        else{
            throw new Error ('errore nella risposta server');
        }
    })
    .then((products)=>{
        console.log('prodotti disponibili', products)

       
        createCards(products)

        const loadingIndicator = document.getElementById('loading'); 
        loadingIndicator.classList.add('d-none'); 

    })
    .catch ((err)=>{
        console.log('errore', err)
    })
}

const createCards = function (products){
    products.forEach(product => {
        const col = document.createElement('div');
        col.classList.add('col', 'col-12', 'col-md-6','col-lg-3')
        col.innerHTML = `
                    <div class="card shadow border-0">
                        <img src="${product.imageUrl}" class="card-img-top mt-3 px-3" alt="guitar image">
                        <div class="card-body d-flex flex-column">
                          <h5 class="card-title flex-grow-1">${product.name}</h5>
                          <p class="cardText" >${product.description}</p>
                          <div class="row gap-lg-0 gap-2">
                              <div class="col-12 col-lg-6 pe-lg-1"><button class="btn btn-primary view"> <i class="fa-regular fa-eye"></i> Dettaglio</button></div>
                              <div class="col-12 col-lg-6 ps-lg-1"><button class="btn btn-outline-secondary mod modify "><i class="fa-solid fa-pen-to-square"></i> Modifica</button></div>
                          </div>
                        </div>
                      </div>
        `
        const row = document.getElementById('row-prod');
        row.appendChild(col);

        const viewBtn = col.querySelector('.view');
        const modBtn = col.querySelector('.mod'); 
        
        viewBtn.addEventListener('click',function(){
            location.href = `./detail.html?pId=${product._id}`;
        });

        modBtn.addEventListener('click',function(){
            location.href = `./back.html?pId=${product._id}`;
        }) 
        

    });
}

getProducts();

const nav = document.getElementsByClassName('navbar')[0];
window.onscroll = function () { 
    if (document.body.scrollTop >= 150  || document.documentElement.scrollTop >= 150 ) {
        nav.classList.add("nav-colored");
        nav.classList.add("shadow");
    } 
    else {
        nav.classList.remove("shadow");
        nav.classList.remove("nav-colored");
    }
};