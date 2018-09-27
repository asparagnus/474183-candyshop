// Модуль работы с карточками товаров и корзиной покупок:
'use strict';

(function () {
  var basketCardTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
  var basket = document.querySelector('.goods__cards');
  var basketEmpty = basket.querySelector('.goods__card-empty');
  var basketTotal = document.querySelector('.goods__total');
  var goodsTotal = document.querySelector('.goods__total-count');
  var totalAmount = document.querySelector('.goods__price');
  var basketHeaderAmount = document.querySelector('.main-header__basket');

  var amount = 0;
  var totalGoogs = 0;

  // 2.1 На основе данных, созданных в предыдущем пункте и шаблона catalog__card, создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива:
  var similarCandyTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

  function changeBasketTotal(index, isIncrease) {
    if (isIncrease) {
      totalGoogs += window.candies[index].price;
    } else {
      var input = basket.querySelector('[data-id="' + index + '"]').querySelector('.card-order__count');
      totalGoogs -= window.candies[index].price * input.value;
    }
    basketHeaderAmount.textContent = 'В корзине ' + amount + ' товаров';
    goodsTotal.childNodes[0].textContent = 'Итого за ' + amount + ' товаров:';
    totalAmount.textContent = totalGoogs + ' ₽';
  }

  function removeFromBasket(index, template, candyAmount) {
    window.candies[index].isBasket = false;
    amount -= 1;
    changeBasketTotal(index, false);
    template.remove();
    window.candies[index].amount = candyAmount;
    if (basket.children.length === 1) {
      changeEmptyBasketVisibility(false);
      basketHeaderAmount.textContent = 'В корзине ничего нет';
    }
  }

  function changeInputValue(index, operation) {
    var input = basket.querySelector('[data-id="' + index + '"]').querySelector('.card-order__count');
    switch (operation) {
      case 'increase':
        if (window.candies[index].amount !== 0) {
          changeGoodsAmount(index, 'increment');
          totalGoogs += window.candies[index].price;
          totalAmount.textContent = totalGoogs + ' ₽';
          changeAmount(index, false);
        }
        break;
      case 'decrease':
        if (input.value > 1) {
          changeGoodsAmount(index, 'decrement');
          totalGoogs -= window.candies[index].price;
          totalAmount.textContent = totalGoogs + ' ₽';
          changeAmount(index, true);
        }
        break;
      default:
        break;
    }
  }

  function changeAmount(index, isIncrease) {
    if (isIncrease) {
      window.candies[index].amount += 1;
    } else {
      window.candies[index].amount -= 1;
    }
  }

  function changeEmptyBasketVisibility(isVisible) {
    if (isVisible) {
      basket.classList.remove('goods__cards--empty');
      basketEmpty.classList.add('visually-hidden');
      basketTotal.classList.remove('visually-hidden');
    } else {
      basket.classList.add('goods__cards--empty');
      basketEmpty.classList.remove('visually-hidden');
      basketTotal.classList.add('visually-hidden');
    }

  }

  function changeGoodsAmount(index, operation) {
    var input = basket.querySelector('[data-id="' + index + '"]').querySelector('.card-order__count');
    var value = parseInt(input.value, 10);
    switch (operation) {
      case 'increment':
        value += 1;
        break;
      case 'decrement':
        value -= 1;
        break;
      default:
        break;
    }
    input.value = value;
  }

  function renderBasketGoods(index, template) {
    if (!window.candies[index].isBasket) {
      template.querySelector('.card-order__title').textContent = window.candies[index].name;
      template.querySelector('.card-order__img').src = 'img/cards/' + window.candies[index].picture;
      template.querySelector('.card-order__price').textContent = window.candies[index].price + ' ₽';
      template.dataset.id = index;
      window.candies[index].isBasket = true;
      basket.appendChild(template);
      amount += 1;
    } else {
      changeGoodsAmount(index, 'increment');
    }
    changeAmount(index, false);
  }
  // ОБРАБОТЧИК ДОБАВЛЕНИЯ В КОРЗИНУ:
  var btnAddToBasketHandler = function (event) {
    event.preventDefault();
    var template = basketCardTemplate.cloneNode(true);
    var index = event.target.closest('.catalog__card').id;
    var candyAmount = window.candies[index].amount;
    if (window.candies[index].amount !== 0) {
      renderBasketGoods(index, template);
      changeBasketTotal(index, true);

      if (basket.classList.contains('goods__cards--empty')) {
        changeEmptyBasketVisibility(true);
      }
      // Кнопки изменения input.value:
      // Кнопка уменьшения:
      var decreaseValueBtn = template.querySelector('.card-order__btn--decrease');
      decreaseValueBtn.addEventListener('click', function () {
        changeInputValue(index, 'decrease');
      });
      // Кнопка увеличения:
      var increaseValueBtn = template.querySelector('.card-order__btn--increase');
      increaseValueBtn.addEventListener('click', function () {
        changeInputValue(index, 'increase');
      });
      // Удалить из корзины:
      var deleteGoodsBtn = template.querySelector('.card-order__close');
      deleteGoodsBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        removeFromBasket(index, template, candyAmount);
      });
    }
  };
  // ОБРАБОТЧИК ДОБАВЛЕНИЯ В ИЗБРАННОЕ:
  var btnFavoriteClickHandler = function (event) {
    event.preventDefault();
    var btnFav = event.target;
    btnFav.classList.toggle('card__btn-favorite--selected');
    btnFav.blur();
    var index = btnFav.closest('.catalog__card').id;
    window.candies[index].isFavorite = !window.candies[index].isFavorite;
  };
  // ФУНКЦИЯ ГЕНЕРАЦИИ КАРТОЧКИ ТОВАРА:
  window.renderCandy = function (candy, id) {
    var candyElement = similarCandyTemplate.cloneNode(true);
    var cardTitle = candyElement.querySelector('.card__title');
    var candyImage = candyElement.querySelector('.card__img');
    var candyPrice = candyElement.querySelector('.card__price');
    var candyRating = candyElement.querySelector('.stars__rating');
    var candyRatingCount = candyElement.querySelector('.star__count');
    var candyCharacteristic = candyElement.querySelector('.card__characteristic');
    var candyComposition = candyElement.querySelector('.card__composition-list');
    var basketBtn = candyElement.querySelector('.card__btn');
    var cardBtnFav = candyElement.querySelector('.card__btn-favorite');

    candyElement.id = id;
    // в зависимости от количества amount добавьте следующий класс:
    if (candy.amount <= 5) {
      candyElement.classList.remove('card--in-stock');
      var amountClass = candy.amount === 0 ? 'card--soon' : 'card--little';
      candyElement.classList.add(amountClass);
    }
    // название вставьте в блок card__title:
    cardTitle.textContent = candy.name;
    // изменим картинку:
    candyImage.src = 'img/cards/' + candy.picture;
    // содержимое блока card__price должно выглядеть следующим образом:{{price}} <span class="card__currency">₽</span><span class="card__weight">/ {{weight}} Г</span>:
    candyPrice.textContent = candy.price;
    var candyPriceSpanFirst = document.createElement('span');
    candyPriceSpanFirst.classList.add('card__currency');
    candyPriceSpanFirst.textContent = ' ₽';
    candyPrice.appendChild(candyPriceSpanFirst);
    var candyPriceSpanSecond = document.createElement('span');
    candyPriceSpanSecond.classList.add('card__weight');
    candyPriceSpanSecond.textContent = '/ ' + candy.weight + ' Г';
    candyPrice.appendChild(candyPriceSpanSecond);
    // класс блока stars__rating должен соответствовать рейтингу:
    if (candy.rating.value < 5) {
      candyRating.classList.remove('stars__rating--five');
      var ratingValue = ['one', 'two', 'three', 'four'];
      candyRating.classList.add('stars__rating--' + ratingValue[candy.rating.value - 1]);
    }
    // В блок star__count вставьте значение rating.number:
    candyRatingCount.textContent = '(' + candy.rating.number + ')';
    // Блок card__characteristic должен формироваться следующим образом:
    var isSugarText = candy.nutritionFacts.sugar ? 'Содержит сахар. ' : 'Без сахара. ';
    candyCharacteristic.textContent = isSugarText + candy.nutritionFacts.energy + ' ккал';
    candyComposition.textContent = '' + candy.nutritionFacts.contents + '.';
    // СОБЫТИЯ КНОПОК добавления в корзину и в избранное:
    // ДОБАВИТЬ В КОРЗИНУ:
    basketBtn.addEventListener('click', btnAddToBasketHandler);
    // ДОБАВИТЬ В ИЗБРАННОЕ:
    cardBtnFav.addEventListener('click', btnFavoriteClickHandler);

    return candyElement;
  };
})();

/* 'use strict';

(function () {
 var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
 var basket = document.querySelector('.goods__cards');
 var basketEmpty = basket.querySelector('.goods__card-empty');
 var basketTotal = document.querySelector('.goods__total');
 var goodsTotal = document.querySelector('.goods__total-count');
 var totalAmount = document.querySelector('.goods__price');
 var basketHeaderAmount = document.querySelector('.main-header__basket');
 var amount = 0;
 var totalGoogs = 0;

 // 2. Уберите у блока catalog__cards класс catalog__cards--load и скройте, добавлением класса visually-hidden блок catalog__load:
 var catalogCards = document.querySelector('.catalog__cards');
 catalogCards.classList.remove('catalog__cards--load');
 var catalogLoad = document.querySelector('.catalog__load');
 catalogLoad.classList.add('visually-hidden');

 // На основе шаблона и МОК создаем DOM-элементы
 var similarCardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
 // заполняем и меняем надпись
 function changeBasketTotal(index, isIncrease) {
  if (isIncrease) {
   totalGoogs += window.products[index].price;
  } else {
   var input = basket.querySelector('[data-id="' + index + '"]').querySelector('.card-order__count');
   totalGoogs -= window.products[index].price * input.value;
  }
  basketHeaderAmount.textContent = 'В корзине ' + amount + ' товаров';
  goodsTotal.childNodes[0].textContent = 'Итого за ' + amount + ' товаров:';
  totalAmount.textContent = totalGoogs + ' ₽';
 }
 // очищаем и меняем надпись
 function removeFromBasket(index, template, candyAmount) {
  window.products[index].isBasket = false;
  amount -= 1;
  changeBasketTotal(index, false);
  template.remove();
  window.products[index].amount = candyAmount;
  if (basket.children.length === 1) {
   changeEmptyBasketVisibility(false);
   basketHeaderAmount.textContent = 'В корзине ничего нет';
  }
 }
 // считаем и меняем число если добавляем или уменьшаем число товаров
 function changeInputValue(index, operation) {
  var input = basket.querySelector('[data-id="' + index + '"]').querySelector('.card-order__count');
  switch (operation) {
   case 'increase':
    if (window.products[index].amount !== 0) {
     changeGoodsAmount(index, 'increment');
     totalGoogs += window.products[index].price;
     totalAmount.textContent = totalGoogs + ' ₽';
     changeAmount(index, false);
    }
    break;
   case 'decrease':
    if (input.value > 1) {
     changeGoodsAmount(index, 'decrement');
     totalGoogs -= window.products[index].price;
     totalAmount.textContent = totalGoogs + ' ₽';
     changeAmount(index, true);
    }
    break;
   default:
    break;
  }
 }

 function changeAmount(index, isIncrease) {
  if (isIncrease) {
   window.products[index].amount += 1;
  } else {
   window.products[index].amount -= 1;
  }
 }

 function changeEmptyBasketVisibility(isVisible) {
  if (isVisible) {
   basket.classList.remove('goods__cards--empty');
   basketEmpty.classList.add('visually-hidden');
   basketTotal.classList.remove('visually-hidden');
  } else {
   basket.classList.add('goods__cards--empty');
   basketEmpty.classList.remove('visually-hidden');
   basketTotal.classList.add('visually-hidden');
  }

 }

 function changeGoodsAmount(index, operation) {
  var input = basket.querySelector('[data-id="' + index + '"]').querySelector('.card-order__count');
  var value = parseInt(input.value, 10);
  switch (operation) {
   case 'increment':
    value += 1;
    break;
   case 'decrement':
    value -= 1;
    break;
   default:
    break;
  }
  input.value = value;
 }

 function renderBasketGoods(index, template) {
  if (!window.products[index].isBasket) {
   template.querySelector('.card-order__title').textContent = window.products[index].name;
   template.querySelector('.card-order__img').src = window.products[index].picture;
   template.querySelector('.card-order__price').textContent = window.products[index].price + ' ₽';
   template.dataset.id = index;
   window.products[index].isBasket = true;
   basket.appendChild(template);
   amount += 1;
  } else {
   changeGoodsAmount(index, 'increment');
  }
  changeAmount(index, false);
 }
 // обработчик клика по кнопке добавления в корзину
 var btnAddToBasketHandler = function (event) {
  event.preventDefault();
  var template = basketTemplate.cloneNode(true);
  var index = event.target.closest('.catalog__card').id;
  var candyAmount = window.products[index].amount;
  if (window.products[index].amount !== 0) {
   renderBasketGoods(index, template);
   changeBasketTotal(index, true);

   if (basket.classList.contains('goods__cards--empty')) {
    changeEmptyBasketVisibility(true);
   }
   // Кнопки изменения input.value:
   // Кнопка уменьшения:
   var decreaseValueBtn = template.querySelector('.card-order__btn--decrease');
   decreaseValueBtn.addEventListener('click', function () {
    changeInputValue(index, 'decrease');
   });
   // Кнопка увеличения:
   var increaseValueBtn = template.querySelector('.card-order__btn--increase');
   increaseValueBtn.addEventListener('click', function () {
    changeInputValue(index, 'increase');
   });
   // Удалить из корзины:
   var deleteGoodsBtn = template.querySelector('.card-order__close');
   deleteGoodsBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    removeFromBasket(index, template, candyAmount);
   });
  }
 };
 // обавляем в избранное:
 var btnFavoriteClickHandler = function (event) {
  event.preventDefault();
  var btnFav = event.target;
  btnFav.classList.toggle('card__btn-favorite--selected');
  btnFav.blur();
  var index = btnFav.closest('.catalog__card').id;
  window.products[index].isFavorite = !window.products[index].isFavorite;
 };
 // карточка со всеми обработчиками
 var createUserCards = function (candy, id) {
  var userCard = similarCardTemplate.cloneNode(true);
  var cardTitle = userCard.querySelector('.card__title');
  var cardImage = userCard.querySelector('.card__img');
  var candyPrice = userCard.querySelector('.card__price');
  var candyRating = userCard.querySelector('.stars__rating');
  var candyRatingCount = userCard.querySelector('.star__count');
  var candyCharacteristic = userCard.querySelector('.card__characteristic');
  var candyComposition = userCard.querySelector('.card__composition-list');
  var basketBtn = userCard.querySelector('.card__btn');
  var cardBtnFav = userCard.querySelector('.card__btn-favorite');

  userCard.id = id;
  // в зависимости от количества amount добавьте следующий класс:
  if (candy.amount <= 5) {
   userCard.classList.remove('card--in-stock');
   var amountClass = candy.amount === 0 ? 'card--soon' : 'card--little';
   userCard.classList.add(amountClass);
  }
  cardTitle.textContent = candy.name; // название
  cardImage.src = candy.picture; // картинка
  // содержимое блока card__price должно выглядеть следующим образом:{{price}} <span class="card__currency">₽</span><span class="card__weight">/ {{weight}} Г</span>:
  candyPrice.textContent = candy.price;
  var candyPriceSpanFirst = document.createElement('span');
  candyPriceSpanFirst.classList.add('card__currency');
  candyPriceSpanFirst.textContent = ' ₽';
  candyPrice.appendChild(candyPriceSpanFirst);
  var candyPriceSpanSecond = document.createElement('span');
  candyPriceSpanSecond.classList.add('card__weight');
  candyPriceSpanSecond.textContent = '/ ' + candy.weight + ' Г';
  candyPrice.appendChild(candyPriceSpanSecond);
  // рейтинг
  if (candy.rating.value < 5) {
   candyRating.classList.remove('stars__rating--five');
   var ratingValue = ['one', 'two', 'three', 'four'];
   candyRating.classList.add('stars__rating--' + ratingValue[candy.rating.value - 1]);
  }
  candyRatingCount.textContent = '(' + candy.rating.number + ')';
  // состав
  var sugar = candy.nutritionFacts.sugar ? 'Содержит сахар. ' : 'Без сахара. ';
  candyCharacteristic.textContent = sugar + candy.nutritionFacts.energy + ' ккал';
  candyComposition.textContent = '' + candy.nutritionFacts.contents + '.';
  // добавить в корзину
  basketBtn.addEventListener('click', btnAddToBasketHandler);
  // добавить в избранное
  cardBtnFav.addEventListener('click', btnFavoriteClickHandler);

  return userCard;
 };

 // ОТРИСОВКА сгенерированных DOM-элементов в блок .catalog__cards:
 var fillBlock = function (block, createElement, data) {
  var fragment = document.createDocumentFragment();

  data.forEach(function (item, i) {
   fragment.appendChild(createElement(item, i));
  });
  block.appendChild(fragment);
 };
 fillBlock(catalogCards, createUserCards, window.products);
})();
*/
