const inputsCheckbox = document.querySelectorAll(
  ".container-custom-checkbox input"
);
const ingredients = document.querySelectorAll(".current-pizza-item");
const drinks = document.querySelectorAll(".select-drink-item");
const totalAmount = document.querySelector(".total-amount>.summa");
const orderBtn = document.querySelector(".typical-btn");
const modalWindow = document.querySelector(".modal-window");
const submitBtn = document.querySelector(".modal-window__submit-btn");
const subject = document.querySelector(".modal-window__subject");
const ingredientsSpan = document.querySelector(".modal-window__ingredients");
const DrinksSpan = document.querySelector(".modal-window__drinks");
//
const addEngredients = (checkboxes) => {
  const nodesArray = Array.from(checkboxes);
  const ingredientsArray = Array.from(ingredients);
  ingredientsArray.splice(0, 2);
  checkboxes.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.parentNode.classList.toggle("active");
      const index = nodesArray.indexOf(e.target);
      ingredientsArray[index].classList.toggle("active");
      calculateOrder();
    });
  });
};
addEngredients(inputsCheckbox);
//

const addDrinks = (drinkItem) => {
  drinkItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.parentNode.classList.toggle("active");
      calculateOrder();
    });
  });
};
addDrinks(drinks);

const calculateOrder = () => {
  const ingredients = document.querySelectorAll(".current-pizza-item.active");
  const drinks = document.querySelectorAll(".select-drink-item.active");
  const startPrice = 500;
  const ingredientsPrice = ingredients.length * 35;
  const drinkPrice = drinks.length * 15;
  totalAmount.innerHTML = `${startPrice + ingredientsPrice + drinkPrice}$`;
};
const windowModalContent = () => {
  subject.innerHTML = "";
  ingredientsSpan.innerHTML = "";
  DrinksSpan.innerHTML = "";

  const Addingredients = document.querySelectorAll(
    ".container-custom-checkbox.active"
  );
  const AddDrinks = document.querySelectorAll(".select-drink-item.active");
  let ingredientsList = [];
  if (Addingredients) {
    Addingredients.forEach((item) => {
      ingredientsList.push(item.innerText);
    });
  }
  let DrinkList = [];
  if (addDrinks) {
    AddDrinks.forEach((item) => {
      DrinkList.push(item.dataset.name);
    });
  }
  const totalIngredients = ingredientsList.join(", ") || "Нет ингрединтов";
  const totalDrinks = ingredientsList.join(", ") || "Нет выпивки";
  const totalText = `Вы заказали пиццу, с ингредиентами: ${totalIngredients}<br/\>
  А так же напитки: ${totalDrinks}<br/\>
  C вас ${totalAmount.innerHTML}
  
  `;
  subject.innerHTML = totalText;
};

orderBtn.addEventListener("click", () => {
  modalWindow.classList.remove("none");
  windowModalContent();
});
window.addEventListener("click", (e) => {
  if (e.target === modalWindow) {
    modalWindow.classList.add("none");
  }
});
submitBtn.addEventListener("click", () => {
  modalWindow.classList.add("none");
});
