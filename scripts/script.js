/* Load functions important at the start of the website */

function onload() {
  getFromLocalStorage();
  renderBasketFood();
  getFoodInformation();
}

/* hide and show menüs  */

function burgerMenu() {
  var x = document.getElementById("myLinks");
  x.style.display = x.style.display === "flex" ? "none" : "flex";
}

function showBasket() {
  var x = document.getElementById("basket");
  x.style.display = x.style.display === "flex" ? "none" : "flex";
}

function showOrderBasket() {
  var x = document.getElementById("basket");
  x.style.display = "flex";
}

function closeBasket() {
  var x = document.getElementById("basket");
  x.style.display = "none";
}

function orderComplete() {
  var x = document.getElementById("orderClosed");
  x.style.display = "flex";
  clearBasket();
}

function closeOrder() {
  var x = document.getElementById("orderClosed");
  x.style.display = "none";
}

/* to render the  database*/

function getFoodInformation() {
  let contentRef = document.getElementById("main_food");
  contentRef.innerHTML = "";

  for (let indexFood = 0; indexFood < food.length; indexFood++) {
    contentRef.innerHTML += renderFood(indexFood);
  }
}

function renderBasketFood() {
  let basketContent = document.getElementById("basket_food");
  basketContent.innerHTML = "";

  for (let indexBasket = 0; indexBasket < foodBasket.length; indexBasket++) {
    basketContent.innerHTML += foodOrderTemplate(indexBasket);
  }
  getFromLocalStorage();
  updateSummary();
}

/* to move the arrays in another div */

function moveFood(indexBasket) {
  let orderFood = food[indexBasket];
  let existingFood = foodBasket.find((item) => item.name === orderFood.name);

  if (existingFood) {
    existingFood.quantity++;
  } else {
    foodBasket.push({ ...orderFood, quantity: 1 });
  }
  saveToLocalStorage(indexBasket);
  renderBasketFood();
}

/* to increase or decrease the number */

function increaseQuantity(indexBasket) {
  foodBasket[indexBasket].quantity++;
  saveToLocalStorage(indexBasket);
  renderBasketFood();
}

function decreaseQuantity(indexBasket) {
  if (foodBasket[indexBasket].quantity > 1) {
    foodBasket[indexBasket].quantity--;
  } else {
    foodBasket.splice(indexBasket, 1);
    localStorage.removeItem(`foodBasket${indexBasket}`);
  }
  saveToLocalStorage(indexBasket);
  renderBasketFood();
}

function updateQuantity(indexBasket) {
  let quantityInput = document.getElementById(`food_quantity_${indexBasket}`);
  foodBasket[indexBasket].quantity = parseInt(quantityInput.value);
  saveToLocalStorage(indexBasket);
  renderBasketFood();
}

/* calculate the summerys */

function calcTotalQuantity(basket) {
  let subTotal = 0;
  for (let item of basket) {
    subTotal += item.price * item.quantity;
  }
  return subTotal;
}

function calcSubtotal(basket) {
  let endPrice = 0;
  for (let item of basket) {
    endPrice += item.price * item.quantity;
  }
  let deliveryFee = 0;
  if (!document.getElementById("toggleSwitch").checked) {
    deliveryFee = 5;
  }
  return endPrice + deliveryFee;
}

function updateSummary() {
  let subTotal = calcTotalQuantity(foodBasket);
  let endPrice = calcSubtotal(foodBasket);

  document.getElementById("subTotal").textContent = subTotal.toFixed(2) + " €";
  document.getElementById("endPrice").textContent = endPrice.toFixed(2) + " €";
}

/* to save/delete and load the objects */

function saveToLocalStorage() {
  localStorage.setItem("foodBasket", JSON.stringify(foodBasket));
}

function getFromLocalStorage() {
  let storedFood = JSON.parse(localStorage.getItem("foodBasket"));
  if (storedFood) {
    foodBasket = storedFood;
  }
}

function deleteFood(indexBasket) {
  if (indexBasket >= 0 && indexBasket < foodBasket.length) {
    foodBasket.splice(indexBasket, 1);
    updateLocalStorage();

    renderBasketFood();
  }
}

function clearBasket() {
  foodBasket.length = 0;
  updateLocalStorage();
  renderBasketFood();
}

function updateLocalStorage() {
  localStorage.clear();
  for (let i = 0; i < foodBasket.length; i++) {
    localStorage.setItem(`foodBasket${i}`, JSON.stringify(foodBasket[i]));
  }
}

/* the deliver and pickup button function */

function handleToggle() {
  const toggleSwitch = document.getElementById("toggleSwitch");
  const costAmount = document.getElementById("costAmount");

  if (toggleSwitch.checked) {
    costAmount.textContent = "0.00 €";
  } else {
    costAmount.textContent = "5.00 €";
  }
}

function toggleColor() {
  const toggleSwitch = document.getElementById("toggleSwitch");
  const textDelivery = document.getElementById("delivery");
  const textPickup = document.getElementById("pickup");

  if (toggleSwitch.checked) {
    textDelivery.style.color = "#ccc";
    textPickup.style.color = "#ff8000";
    textPickup.style.fontSize = "15px";
    textDelivery.style.fontSize = "12px";
  } else {
    textDelivery.style.color = "#ff8000";
    textPickup.style.color = "#ccc";
    textDelivery.style.fontSize = "15px";
    textPickup.style.fontSize = "12px";
  }
}
