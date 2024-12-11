function renderFood(indexFood) {
  let foodItem = food[indexFood];

  return ` <div onclick="moveFood(${indexFood}), showOrderBasket()" class="food_container">
<div class = "food_header"> <h2> ${foodItem.name}</h2>   
<button  class = "food_button" style="font-size:24px"><i class="fa fa-plus fa-fa-plus"></i></button>  </div>
   <p> ${foodItem.description}</p>
       <strong> <p>${foodItem.price} €</p>  </strong>
        
    `;
}

function foodOrderTemplate(indexBasket) {
  let foodItem = foodBasket[indexBasket];
  let subtotal_price = foodItem.price * foodItem.quantity;

  return `<div class="basket_start"><strong> ${foodItem.name}</strong>
</div>
<div class="quantity_container">

    <button onclick="decreaseQuantity(${indexBasket})">-</button>
    <input type="number" id="food_quantity_${indexBasket}"  value="${
    foodItem.quantity
  }" min="1" onchange="updateQuantity(${indexBasket})"/>
    <button onclick="increaseQuantity(${indexBasket})">+</button>

    <div id="total_price" class="price_container">
           <strong> ${subtotal_price.toFixed(2)} € </strong>
               <button onclick="deleteFood(${indexBasket})"<i class="fas fa-trash-alt"></i></button>
  </div>
</div>`;
}
