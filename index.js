let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "Create";
let temp; //global
//Get Total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value; //these are strings to convert it to number we put +before like +price
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(151, 14, 78)";
  }
}

//Create product
//let dataProduct =[]; //not true to every reload make our array empty
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  //Count
  if(title.value != '' && price.value != '' && category.value != '' && newProduct.count <= 100)

{  if (mood === "Create") {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct); //we save all created products into array
    }
  } else {
    dataProduct[temp] = newProduct; // we use temp to  access var just uses in one function "i" and we want to use it in other function
    mood = "Create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }
  clearData(); // make inputs empty after add a product

}else alert("Title, Price and category must not be empty !! and Price must be 100 or less")
  //Save localStorage
  //to keep data after reloading we use localStorage
  localStorage.setItem("product", JSON.stringify(dataProduct));
  showProduct();
};

//Clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  taxes.value = "";
  total.innerHTML = "";
}

//Read
showProduct();

function showProduct() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `<tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick=updateProduct(${i}) id="update">Update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
    </tr> `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All(${dataProduct.length})</button>
        `;
  } else {
    btnDelete.innerHTML = "";
  }
}

//Delete

function deleteProduct(index) {
  dataProduct.splice(index, 1); // splice(index , number of products) , just from array but localStorage
  localStorage.product = JSON.stringify(dataProduct); //update local storage with new array after delete
  showProduct(); //to update table immediately not just after refresh
}

//Delete All
function deleteAll() {
  dataProduct.splice(0);
  localStorage.clear();
  showProduct();
}

//Update
function updateProduct(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;

  //count.value=dataProduct[i].count;
  count.style.display = "none";

  taxes.value = dataProduct[i].taxes;
  category.value = dataProduct[i].category;

  // total.innerHTML=dataProduct[i].total;
  getTotal();

  submit.innerHTML = "Update";
  mood = "Update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//Search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  // if(id === 'searchTitle'){
  //     searchMood = 'title';
  //     search.placeholder = 'Search by Title'
  // }else{
  //     searchMood = 'category';
  //     search.placeholder = 'Search by Category'

  // }
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search by " + searchMood;

  search.focus();
  search.value = "";
  showProduct();
}

function searchProducts(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `<tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick=updateProduct(${i}) id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr> `;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `<tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick=updateProduct(${i}) id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr> `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//Clean data
