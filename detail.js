const productsURL = 'https://striveschool-api.herokuapp.com/api/product';

const addressBarContent = new URLSearchParams(location.search)

const id = addressBarContent.get('pId');
/* console.log(productsURL + '/' + id) */

const getProd = function () {
    fetch(productsURL + '/' + id,{
        method:'GET',
        headers:{
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmEzYzc5YzQ1ZjAwMTU2OWI0YzUiLCJpYXQiOjE3Mjc0MjUwODQsImV4cCI6MTcyODYzNDY4NH0.hYHzkYMNfNvxz8F_k5VWBA8x51i7rOINFJpWYiC33TI"
        },
    }) 
      .then((response) => {
        if (response.ok) {
          return response.json()} 
        else {
          throw new Error('errore nel recupero del singolo concerto')
        }
      })
      .then((product) => {
        const row = document.getElementById('row')
        const col = document.createElement('div') 
        col.classList.add('col')
        col.innerHTML = `
             <div class="card mb-3 border-0 mt-3">
                            <div class="row g-0">
                              <div class="col-md-4">
                                <img src="${product.imageUrl}" class="img-fluid rounded-start py-4" alt="guitar">
                              </div>
                              <div class="col-md-8">
                                <div class="card-body bodyCard">
                                  <h3 class="card-title">${product.name}</h3>
                                  <p class="card-text">${product.description}</p>
                                  <p class="card-text d-flex justify-content-between align-items-center"> 
                                    <small class="text-body-secondary" id="brand">Brand: ${product.brand} </small>
                                    <span id = "price">${product.price} €</span>
                                </p>
                                  <button class="btn btn-secondary mod">Modifica</button>
                                  <button class="btn btn-danger" id= "del" >Elimina</button>
                                </div>
                              </div>
                            </div>
                          </div>
          `
        row.appendChild(col)

        deleteProd();

        const modBtn = document.querySelector('.mod'); 
        modBtn.addEventListener('click',function(){
        location.href = `./back.html?pId=${product._id}`;
      }) 
        
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  getProd();



  //funzione per cancellare il prodotto
  const deleteProd = function(){
    const delBtn = document.querySelector('.btn-danger');
    console.log(delBtn);
    delBtn.addEventListener('click',function(){
        if (confirm("Sei sicuro di voler eliminare questo prodotto? Questa operazione è irreversibile.")) {
      fetch(productsURL + '/' + id,{
          method:'DELETE',
          headers:{
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmEzYzc5YzQ1ZjAwMTU2OWI0YzUiLCJpYXQiOjE3Mjc0MjUwODQsImV4cCI6MTcyODYzNDY4NH0.hYHzkYMNfNvxz8F_k5VWBA8x51i7rOINFJpWYiC33TI"
          },
      }) 
  
      .then((response)=>{
          if(response.ok){
              alert('prodotto eliminato')
              location.assign('./index.html')
          }
          else{
              throw new Error ("Errore nell'eliminazione")
          }
      })
      .catch((err)=>{
          console.log('errore',err)
      })
     }
    })
    
  }

