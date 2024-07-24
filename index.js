let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
// get total
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +tax.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";

    total.style.background = " rgb(166, 54, 54)";
  }
}

// array of project
let arrayOfproduct = [];

submit.onclick = function () {
  let newProd = {
    title: title.value,
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value,
    total: total.innerHTML,
  };

  localStorage.setItem("product", JSON.stringify(arrayOfproduct));
  if (mood === "create") {
    if (newProd.count > 1) {
      for (let i = 0; i < newProd.count; i++) {
        arrayOfproduct.push(newProd);
      }
    } else {
      arrayOfproduct.push(newProd);
    }
  } else {
    arrayOfproduct[tmp] = newProd;
    submit.style.background = "black";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  //trigger
  clearData();
  //trigger showData
  showData();
};

if (localStorage.product !== null) {
  arrayOfproduct = JSON.parse(localStorage.product);
}
//save localstorage

//clear Data
function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.style.background = " rgb(166, 54, 54)";
}
// Show data In Body
function showData() {
  let table = "";

  for (let i = 0; i < arrayOfproduct.length; i++) {
    table += `
    <tr>
    <td>${i}</td>
    <td>${arrayOfproduct[i].title}</td>
    <td>${arrayOfproduct[i].price}</td>
    <td>${arrayOfproduct[i].tax}</td>
    <td>${arrayOfproduct[i].ads}</td>
    <td>${arrayOfproduct[i].discount}</td>
    <td>${arrayOfproduct[i].category}</td>
    <td>${arrayOfproduct[i].count}</td>
    <td><button onclick='UpDate(${i})' id="update">update</button></td>
    <td><button onclick='delData(${i})' id='delete' >delete</button></td>

    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  // Delete All Item
  let btnDeleteAll = document.getElementById("deleteAll");
  if (arrayOfproduct.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick='btnDelAll()'>deleteAll (${arrayOfproduct.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();
// Delete Item
function delData(i) {
  arrayOfproduct.splice(i, 1);
  localStorage.product = JSON.stringify(arrayOfproduct);
  showData();
}

// Delete All

function btnDelAll(i) {
  localStorage.clear();
  arrayOfproduct.splice(0);
  showData();
}

function UpDate(i) {
  title.value = arrayOfproduct[i].title;
  price.value = arrayOfproduct[i].price;
  tax.value = arrayOfproduct[i].tax;
  ads.value = arrayOfproduct[i].ads;
  discount.value = arrayOfproduct[i].discount;
  category.value = arrayOfproduct[i].category;
  count.style.display = "none";
  mood = "update";
  getTotal();
  tmp = i;
  submit.innerHTML = "update";
  submit.style.background = "green";
}

////////////////////

let SearchMood = "title";
function btnGetsearch(id) {
  let search = document.getElementById("search");
  if (id == "searchByTitle") {
    SearchMood = "title";
  } else {
    SearchMood = "category";
  }
  search.focus();
  search.placeholder = "Search By " + SearchMood ;
}

function searchData(value) {
  let table = ``;
  for (let i = 0; i < arrayOfproduct.length; i++) {
    if (SearchMood == "title") {
      if (arrayOfproduct[i].title.includes(value)) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${arrayOfproduct[i].title}</td>
        <td>${arrayOfproduct[i].price}</td>
        <td>${arrayOfproduct[i].tax}</td>
        <td>${arrayOfproduct[i].ads}</td>
        <td>${arrayOfproduct[i].discount}</td>
        <td>${arrayOfproduct[i].category}</td>
        <td>${arrayOfproduct[i].count}</td>
        <td><button onclick='UpDate(${i})' id="update">update</button></td>
        <td><button onclick='delData(${i})' id='delete' >delete</button></td>
    
        </tr>
        `;
      }
    } else {
      if (arrayOfproduct[i].category.includes(value)) {
        table += `
      <tr>
      <td>${i}</td>
      <td>${arrayOfproduct[i].title}</td>
      <td>${arrayOfproduct[i].price}</td>
      <td>${arrayOfproduct[i].tax}</td>
      <td>${arrayOfproduct[i].ads}</td>
      <td>${arrayOfproduct[i].discount}</td>
      <td>${arrayOfproduct[i].category}</td>
      <td>${arrayOfproduct[i].count}</td>
      <td><button onclick='UpDate(${i})' id="update">update</button></td>
      <td><button onclick='delData(${i})' id='delete' >delete</button></td>
  
      </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
