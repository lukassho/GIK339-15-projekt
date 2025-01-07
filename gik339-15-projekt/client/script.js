const url = 'http://localhost:3000/groceries';

fetch(url)
.then(result => result.json())
.then(groceries => {
  let html = `<ul>`; //LÄGG TILL KLASSER
  groceries.forEach(grocery => {
    html += `<li>
          <h3>${grocery.groceryType}</h3>
          <p>${grocery.amount}</p>
          <p>${grocery.brand}</p>
          <p>${grocery.groceryCategory}</p>
          <p>${grocery.note}</p>
          <div>
            <button>Ändra</button>
            <button>Ta Bort</button>
          </div>
        </li>`;
  });
  html += `</ul>`;

  const listContainer = document.getElementById('listContainer');
  listContainer.innerHTML = '';
  listContainer.insertAdjacentHTML('beforeend', html);
});