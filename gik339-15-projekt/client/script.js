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
                <div class="mb-3 p-3 text-primary-emphasis bg-${grocery.groceryCategory} border border-primary-subtle rounded-3 col-8 offset-2 col-xl-3 offset-xl-0">
                  <li>
                    <h3>${grocery.groceryType}</h3>
                    <p>${grocery.amount} st</p>
                    <p>Märke: ${grocery.brand}</p>
                    <p>Kategori: ${grocery.groceryCategory}</p>
                    <p class="--bs-danger">Anteckning: ${grocery.note}</p>
                    <div>
                      <button>Ändra</button>
                      <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Inhandlat</label>
        </div>
                  <button>Ta Bort</button>
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

const request = new Request(url, {
  method: 'POST',
  headers: {
    'content-type': 'application'
  },
  body: JSON.stringify(serverGroceryObject)
});

fetch(request).then((response) => {
  fetchData();
  groceryForm.reset();
})

}

console.log()