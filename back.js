const productsURL = 'https://striveschool-api.herokuapp.com/api/product/';

const addressBarContent = new URLSearchParams(location.search)

const id = addressBarContent.get('pId');

function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.classList.remove('d-none'); 
}
function showSuccess(message){
  const successDiv = document.getElementById('success-message');
  successDiv = message;
  successDiv.classList.remove('d-none');
}

function hideError() {
  const errorMessageDiv = document.getElementById('error-message');
  errorMessageDiv.classList.add('d-none'); 
}


if (id) {
    fetch(productsURL + id,{
        headers:{
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmEzYzc5YzQ1ZjAwMTU2OWI0YzUiLCJpYXQiOjE3Mjc0MjUwODQsImV4cCI6MTcyODYzNDY4NH0.hYHzkYMNfNvxz8F_k5VWBA8x51i7rOINFJpWYiC33TI"
        },
    }) 
      .then((response) => {
        if (response.ok) {
          return response.json()
        } 
        else {
          throw new Error('Errore nel recupero prodotto')
        }
      })
      .then((prodotto) => {
 
        const name = document.getElementById('name');
        const description = document.getElementById('description');
        const brand = document.getElementById('brand');
        const imageUrl = document.getElementById('imgUrl');
        const price = document.getElementById('price');
  

        name.value = prodotto.name
        description.value = prodotto.description
        brand.value = prodotto.brand
        imageUrl.value = prodotto.imageUrl
        price.value = prodotto.price

        document.getElementsByClassName('btn-primary')[0].innerText = "Modifica"
        document.getElementsByTagName('h1')[0].innerText = "Backoffice - Modifica"
        document.getElementsByClassName('nav-link')[1].src = './back.html'
      })
      .catch((err) => {
        console.log('ERROR', err)
      })
  }




class Product {
    constructor(_name, _description, _brand, _imageUrl, _price) {
      this.name = _name
      this.description = _description
      this.brand = _brand
      this.imageUrl = _imageUrl
      this.price = _price
    }
  }

  const form = document.getElementById('form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const imageUrl = document.getElementById('imgUrl').value;
    const price = document.getElementById('price').value;

    if (!name || !description || !brand || !imageUrl || !price) {
        showError("Per favore, compila tutti i campi."); 
        return; 
    }

    const prod = new Product (name,description,brand,imageUrl,price);

 
    let methodToUse = '';
    let adress;

    if(id){
        methodToUse = 'PUT'
        adress = productsURL + id
    }
    else {
        methodToUse = 'POST'
        adress = productsURL
    }

  fetch(adress,{
    method: methodToUse,
    body:JSON.stringify(prod),
    headers:{
        'Content-type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmEzYzc5YzQ1ZjAwMTU2OWI0YzUiLCJpYXQiOjE3Mjc0MjUwODQsImV4cCI6MTcyODYzNDY4NH0.hYHzkYMNfNvxz8F_k5VWBA8x51i7rOINFJpWYiC33TI"
    },
  })

  .then((response) =>{
    if (response.ok){
        alert(id ? 'prodotto modificato':'prodotto salvato');
        form.reset();
        location.assign('./index.html')
    }
    else{
        throw new Error ('errore in risposta server')
    }
  })
  .catch ((err)=>{
    console.log('errore',err)
  })
})


    const resetBtn = document.getElementsByClassName('btn-secondary');
    resetBtn[0].addEventListener('click',function(){
        if (confirm("Sei sicuro di voler resettare il modulo? Tutti i dati verranno persi.")) {
        form.reset(); }
    })

  
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