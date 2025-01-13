const url = 'http://localhost:3000/groceries';

window.addEventListener('load', fetchData);

function fetchData() {
    fetch(url)
  .then(result => result.json())
  .then(groceries => {
    if (groceries.length > 0) {
    let html = `<ul class="p-0">`; //LÄGG TILL KLASSER
    groceries.forEach(grocery => {
      html += `<section>
                <div class="mb-3 p-4 border border-5 rounded-3 col-8 offset-2 col-xl-3 offset-xl-0" style="background-color: ${grocery.groceryCategory};">
                  <li>
                    <h3>${grocery.groceryType}</h3>
                    <p>${grocery.amount} st</p>
                    <p>Märke:${grocery.brand}</p>
                    <p>Kategori:${grocery.groceryCategory}</p>
                    <p class="--bs-danger">Anteckning: ${grocery.note}</p>
                    <div>
                              <input class="form-check-input" type="checkbox" role="switch">
          <label class="form-check-label" for="flexSwitchCheckDefault">Inhandlat</label>
        </div>
                      <button class="btn btn-secondary mt-3" onclick="setCurrentGrocery(${grocery.id})">Ändra</button>
                      <div class="form-check form-switch">
                  <button class="btn btn-secondary mt-3" onclick="deleteGrocery(${grocery.id})">Ta Bort</button>
                </div>
          </li>
          </div>
        </section>`;
    });
    html += `</ul>`;

    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';
    listContainer.insertAdjacentHTML('beforeend', html);
  }
  });
}

function setCurrentGrocery(id) {
  console.log('current', id);

  fetch(`${url}/${id}`)
  .then((result) => result.json())
  .then((grocery) => {
    console.log(grocery);
    groceryForm.groceryType.value = grocery.groceryType;
    groceryForm.amount.value = grocery.amount;
    groceryForm.brand.value = grocery.brand;
    groceryForm.groceryCategory.value = grocery.groceryCategory;
    groceryForm.note.value = grocery.note;

    localStorage.setItem('currentId', grocery.id);
  });

}

function deleteGrocery(id) {
  console.log('delete', id);

  // Kör DELETE-begäran
  fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => fetchData());

  openModal();
}


groceryForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverGroceryObject = {
    groceryType: '',
    amount: '',
    brand: '',
    groceryCategory: '',
    note: ''
  };
  serverGroceryObject.groceryType = groceryForm.groceryType.value;
  serverGroceryObject.amount = groceryForm.amount.value;
  serverGroceryObject.brand = groceryForm.brand.value;
  serverGroceryObject.groceryCategory = groceryForm.groceryCategory.value;
  serverGroceryObject.note = groceryForm.note.value;

  const id = localStorage.getItem('currentId');
  if (id) {
    serverGroceryObject.id = id;
  }

  openModal();

const request = new Request(url, {
  method: serverGroceryObject.id ? 'PUT' : 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(serverGroceryObject)
});

fetch(request).then((response) => {
  console.log(response);
  fetchData();

  localStorage.removeItem('currentId');
  groceryForm.reset();
})

}

function openModal(id) {
  const main = document.querySelector('main');
  let html = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Listan har uppdaterats!
      </div>
      </div>
    </div>
  </div>`;

main.insertAdjacentHTML('beforeend', html);

// Aktivera modalen med Bootstrap's API
const modalElement = document.getElementById('exampleModal');
const modalInstance = new bootstrap.Modal(modalElement);
modalInstance.show();
};