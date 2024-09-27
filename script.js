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

        //qui invoco la funzione per creare le card 
        createCards(products)
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
                        <img src="${product.imageUrl}" class="card-img-top mt-3" alt="guitar image">
                        <div class="card-body">
                          <h5 class="card-title">${product.name}</h5>
                          <p class="card-text">${product.description}</p>
                          <button class="btn btn-primary view"> <i class="fa-regular fa-eye"></i> Dettaglio</button>
                          <button class="btn btn-secondary mod"><i class="fa-solid fa-pen-to-square"></i> Modifica</button>
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
