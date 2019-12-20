/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i = 0; Product.allProducts[i]; i++) {
    var optionsEl = document.createElement('option');
    optionsEl.textContent = Product.allProducts[i].name;
    selectElement.appendChild(optionsEl);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  var product = Product.allProducts[document.getElementById('items').selectedIndex].name;
  // TODO: get the quantity
  var quantity = document.getElementById('quantity').value;
  // TODO: using those, add one item to the Cart
  cart.addItem(product, quantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
var itemCountEl = 0;
function updateCounter() {
  itemCountEl = document.getElementById('itemCount');
  itemCountEl.textContent=cart.items.length;


}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  var listContainer = document.createElement('ul');

  var listItem = document.createElement('li');
  listItem.textContent = `Item: ${cart.items[cart.items.length - 1].product}, Quantity: ${cart.items[cart.items.length - 1].quantity}.`;
  listContainer.appendChild(listItem);

  var cartContentsEl = document.getElementById('cartContents');
  cartContentsEl.appendChild(listContainer);

}


// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
