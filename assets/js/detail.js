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
             <div class="card mb-3 border-0 mt-5">
                            <div class="row g-0">
                              <div class="col-md-7">
                                <img src="${product.imageUrl}" class="img-fluid rounded-start py-1 detImg" alt="guitar">
                              </div>
                              <div class="col-md-5">
                                <div class="card-body bodyCard">
                                  <h1 class="card-title">${product.name}</h1>
                                  <p class="card-text mt-2">${product.description}</p>
                                  <p class=" d-flex justify-content-between align-items-center"> 
                                    <small class="" id="brand"> Brand: ${product.brand} </small>
                                    <span class="fs-1 text" id = "price">${product.price} €</span>
                                  </p>
                                  <div>
                                      <button class="btn btn-primary mod"><i class="fa-solid fa-pen-to-square"></i> Modifica</button>
                                      <button class="btn btn-danger" id= "del" > <i class="fa-solid fa-trash-can"></i> Elimina</button>
                                  </div>
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