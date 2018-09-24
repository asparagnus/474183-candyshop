'use strict';

var MAX_CARDS = 26;
var MIN_AMOUNT = 0;
var MAX_AMOUNT = 20;
var MIN_PRICE = 100;
var MAX_PRICE = 1500;
var MIN_WEIGHT = 30;
var MAX_WEIGHT = 300;
var MIN_VALUE = 1;
var MAX_VALUE = 5;
var MIN_NUMBER = 10;
var MAX_NUMBER = 900;
var MIN_ENERGY = 70;
var MAX_ENERGY = 500;
var MIN_INGREDIENT = 1;
var MAX_INGREDIENT = 18;

var PRODUCTS_LIST = ['Чесночные сливки', 'Oгуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PRODUCTS_IMAGES = ['img/cards/gum-cedar.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/soda-cob.jpg', 'img/cards/gum-chile.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/ice-italian.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-russian.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/soda-celery.jpg'];
var PRODUCTS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

var RATINGS = {
  1: 'stars__rating--one',
  2: 'stars__rating--two',
  3: 'stars__rating--three',
  4: 'stars__rating--four',
  5: 'stars__rating--five'
};

// рандомайзеры
var getRandomNumber = function () {
  return Math.round(Math.random());
};

var getRandomNumberRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomSugar = function () {
  var sugar = '';
  if (getRandomNumber() === 0) {
    sugar = 'без сахара';
    return sugar;
  } else {
    sugar = 'содержит сахар';
    return sugar;
  }
};

// для массива
var getRandomArray = function (array, count) {
  var j;
  var x;
  for (var i = count - 1; i > 0; i--) {
    j = getRandomNumberRange(0, i);
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

var getCreatIngredients = function (array) {
  var ingredientsArray = [];
  for (var i = 1; i < getRandomNumberRange(MIN_INGREDIENT, MAX_INGREDIENT); i++) {
    var ingredientItem = array[getRandomNumberRange(MIN_INGREDIENT, MAX_INGREDIENT)];
    ingredientsArray.push(ingredientItem);
  }
  return ingredientsArray.join(', ');
};


var createCard = function (amount) {
  var userCards = [];
  var onUserCard = {};
  var pics = getRandomArray(PRODUCTS_IMAGES, amount);
  var names = getRandomArray(PRODUCTS_LIST, amount);
  for (var i = 0; i < amount; i++) {
    onUserCard = {
      'name': names[i],
      'picture': pics[i],
      'amount': getRandomNumberRange(MIN_AMOUNT, MAX_AMOUNT),
      'price': getRandomNumberRange(MIN_PRICE, MAX_PRICE),
      'weight': getRandomNumberRange(MIN_WEIGHT, MAX_WEIGHT),
      'rating': {
        'value': getRandomNumberRange(MIN_VALUE, MAX_VALUE),
        'number': getRandomNumberRange(MIN_NUMBER, MAX_NUMBER),
      },
      'nutrition_facts': {
        'sugar': getRandomSugar(),
        'energy': getRandomNumberRange(MIN_ENERGY, MAX_ENERGY),
        'content': getCreatIngredients(PRODUCTS_CONTENTS)
      },
      'count': 1
    };
    userCards.push(onUserCard);
  }
  return userCards;
};

var userCards = createCard(MAX_CARDS);

// Определяем классы в завсисимости от значения

var addClassByAmount = function (amount) {
  var cardClass;
  if (amount > 5) {
    cardClass = 'card--in-stock';
  } else if (amount >= 1 && amount <= 5) {
    cardClass = 'card--little';
  } else if (amount === 0) {
    cardClass = 'card--soon';
  }
  return cardClass;
};

// Отрисовывает карточки
var catalogCards = document.querySelector('.catalog__cards');
var catalogLoad = catalogCards.querySelector('.catalog__load');

var createUserCards = function (cardData) {
  var fragment = document.createDocumentFragment();
  cardData.forEach(function (item) {
    var userCard = document.querySelector('#card').content.cloneNode(true);
    var cardPrice = userCard.querySelector('.card__price');
    var cardCurrency = userCard.querySelector('.card__currency');
    var cardWeight = userCard.querySelector('.card__weight');
    userCard.querySelector('.catalog__card').classList.remove('card--in-stock');
    userCard.querySelector('.catalog__card').classList.add(addClassByAmount(item.amount));
    userCard.querySelector('.card__img').src = item.picture;
    userCard.querySelector('.card__title').textContent = item.name;
    userCard.querySelector('.card__img').alt = item.name;
    cardPrice.textContent = item.price;
    cardPrice.appendChild(cardCurrency);
    cardPrice.appendChild(cardWeight);
    userCard.querySelector('.card__weight').textContent = '/ ' + item.weight + ' Г';
    userCard.querySelector('.stars__rating').classList.remove('stars__rating--five');
    userCard.querySelector('.stars__rating').classList.add(RATINGS[item.rating.value]);
    userCard.querySelector('.star__count').textContent = item.rating.number;
    userCard.querySelector('.card__characteristic').textContent = item.nutrition_facts.sugar + '. ' + item.nutrition_facts.energy + ' ккал';
    userCard.querySelector('.card__composition-list').textContent = item.nutrition_facts.content;
    fragment.appendChild(userCard);
  });
  return fragment;
};

catalogCards.appendChild(createUserCards(userCards));

var catalogCardsAll = document.querySelectorAll('.catalog__card');

// проверка по id
var addAtribute = function () {
  for (var i = 0; i < catalogCardsAll.length; i++) {
    catalogCardsAll[i].setAttribute('data-id', i + 1);
    catalogCardsAll[i].setAttribute('data-name', userCards[i].amount);
  }
};
addAtribute();

// рячет надпись пустого каталога Данные загружаются
var showUserCards = function () {
  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');
};
showUserCards();

// "Твои покупки" и другие надписи в корзине
var goodsWrap = document.querySelector('.goods__card-wrap');
var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = goodsCards.querySelector('.goods__card-empty');
var goodsCardTotal = goodsWrap.querySelector('.goods__total');

// скрыть надпись пустой корзины
var closeEmptyBasket = function () {
  goodsCards.classList.remove('goods__cards--empty');
  goodsCardTotal.classList.remove('visually-hidden');
  goodsCardEmpty.classList.add('visually-hidden');
};

// --- показываем надпись пустой корзины --------------------------------------
var openEmptyBasket = function () {
  if (goodsCards.children.length > 1) {
    return;
  } else {
    goodsCards.classList.add('catalog__cards--load');
    goodsCardTotal.classList.add('visually-hidden');
    goodsCardEmpty.classList.remove('visually-hidden');
  }
};

// добавление товар класса избранное
var addFavorite = document.querySelectorAll('.card__btn-favorite');
var favoriteToggleHandler = function (evt) {
  evt.preventDefault();
  var addSelected = document.querySelectorAll('.card__btn-favorite--selected');
  if (!evt.target.classList.contains('card__btn-favorite--selected')) {
    evt.target.classList.add('card__btn-favorite--selected');
    addCount.textContent = '(' + (addSelected.length + 1) + ')';
  } else {
    evt.target.classList.remove('card__btn-favorite--selected');
    addCount.textContent = '(' + (addSelected.length - 1) + ')';
  }
};

// обнулить избранные
var addCount = document.querySelector('label[for="filter-favorite"]+span');
addCount.textContent = '(' + 0 + ')';

// слушает избранное
[].forEach.call(addFavorite, function (item) {
  item.addEventListener('click', favoriteToggleHandler);
});

// добавляем в корзину
[].forEach.call(catalogCardsAll, function (item, i) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('card__btn')) {
      if (evt.currentTarget.classList.contains('card--soon')) {
        return;
      }
      addToCart(catalogCardsAll[i], i);
      enableOrder();
      closeEmptyBasket();
      var goodsCardsAll = goodsCards.querySelectorAll('article');
      [].forEach.call(goodsCardsAll, function (it) {
        it.addEventListener('click', amountIncreaseHandler);
        it.addEventListener('click', amoutDecreaseHandler);
        it.addEventListener('click', closeCardHandler);
      });
    }
    if (evt.target.classList.contains('card__btn-composition')) {
      item.querySelector('.card__composition').classList.toggle('card__composition--hidden');
    }
  });

});

// id
var getIdName = function (obj) {
  var pathToStroke = obj.picture.split('.').reverse();
  var idname = String(pathToStroke[1]).split('/')[2];
  return idname;
};

// крточка товара в корзине
var totalPrice = 0;
var totalValue = 0;
var addToCart = function (target, i) {
  var dataAttributeId = goodsCards.querySelector('[data-id="' + target.dataset.id + '"]');
  if (dataAttributeId === null) {
    var cardsBasket = userCards[i];
    var cardBasketElement = document.querySelector('#card-order').content.cloneNode(true);
    cardBasketElement.querySelector('.card-order__title').textContent = cardsBasket.name;
    cardBasketElement.querySelector('.card-order__img').src = cardsBasket.picture;
    cardBasketElement.querySelector('.card-order__price').textContent = cardsBasket.price + ' ₽';
    cardBasketElement.querySelector('.card-order__count').value = 1;
    cardBasketElement.querySelector('.card-order__count').name = getIdName(userCards[i]);
    cardBasketElement.querySelector('.card-order__count').id = '#card-order__' + getIdName(userCards[i]);
    cardBasketElement.querySelector('.goods_card').setAttribute('data-id', i + 1);
    cardBasketElement.querySelector('.goods_card').setAttribute('data-name', userCards[i].amount);
    goodsCards.appendChild(cardBasketElement);
    totalPrice += cardsBasket.price;
    totalValue++;
    arrangeFooterBasket(totalPrice, totalValue);
    arrangeHeaderBasket(totalValue);
  } else {
    var value = dataAttributeId.querySelector('.card-order__count');
    var amount = target.dataset.name;

    increasePrice(value, amount, userCards[i].price);
    increaseValue(value, amount);
  }
};

// увеличиь уменьшить в корзине
var goodsPrice = goodsCardTotal.querySelector('.goods__total-count');
var increasePrice = function (value, amount, price) {
  var basketCards = document.querySelectorAll('.goods_card .card-order__price');
  if (value.value === amount) {
    return;
  }
  totalPrice += price;
  arrangeFooterBasket(totalPrice, basketCards.length);
  return;
};
var decreasePrice = function (price) {
  var basketCards = document.querySelectorAll('.goods_card .card-order__price');
  totalPrice -= price;
  arrangeFooterBasket(totalPrice, basketCards.length);
};

// увеличить уменьшить товар
var increaseValue = function (value, amount) {
  if (value.value !== amount) {
    value.value++;
  }
  return;
};
var decreaseValue = function (value) {
  return value.value--;
};

// увеличить какой-то товар в корзине
var amountIncreaseHandler = function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__btn--increase');
  var card = evt.target.closest('.card-order');
  var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
  var value = card.querySelector('.card-order__count');
  var amount = card.dataset.name;
  if (target === null) {
    return;
  }
  increasePrice(value, amount, price);
  increaseValue(value, amount);
};

// ументшить количество товара в корзине
var amoutDecreaseHandler = function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__btn--decrease');
  var card = evt.target.closest('.card-order');
  var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
  var value = card.querySelector('.card-order__amount .card-order__count');
  if (target === null) {
    return;
  } else if (value.value > 1) {
    totalValue--;
    decreaseValue(value);
    decreasePrice(price);
  } else {
    goodsCards.removeChild(card);
    decreasePrice(price);
    if (goodsCards.children.length === 1) {
      totalPrice = 0;
      totalValue = 0;
      arrangeHeaderBasket(totalValue);
      openEmptyBasket();
    }
    if (goodsCards.children.length > 1) {
      totalValue--;
      arrangeHeaderBasket(totalValue);
    }
    disableOrder();
  }
};

// закрыть крестиком
var closeCardHandler = function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__close');
  var card = evt.target.closest('.card-order');
  var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
  var value = card.querySelector('.card-order__amount .card-order__count');
  price = price * value.value;
  if (target === null) {
    return;
  } else {
    goodsCards.removeChild(card);
    if (goodsCards.children.length === 1) {
      totalPrice = 0;
      totalValue = 0;
      disableOrder();
      arrangeHeaderBasket(totalValue);
      openEmptyBasket();
    }
    if (goodsCards.children.length > 1) {
      totalValue--;
      decreaseValue(value);
      decreasePrice(price);
      arrangeHeaderBasket(totalValue);
    }
  }
};

// количество и цена в верхней корзине
var arrangeHeaderBasket = function (basketValue) {
  var headerBasket = document.querySelector('.main-header__basket');
  var array = basketValue.toString().split('').reverse().map(function (item) {
    return parseInt(item, 10);
  });
  var basketValueNumber = array[0];
  var basketValueNumberSecond = array[1];
  if (array.length === 1 || basketValueNumberSecond === 1) {
    if (basketValue === 0) {
      headerBasket.textContent = 'В корзине нет товаров';
    }
    if (basketValue === 1) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товар';
    }
    if (basketValue > 1 && basketValue <= 4) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товара';
    }
    if (basketValue > 4 && basketValue <= 19) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товаров';
    }
  }
  if (array.length > 1 && basketValueNumberSecond !== 1) {
    if (basketValueNumber === 0) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товаров';
    }
    if (basketValueNumber === 1) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товар';
    }
    if (basketValueNumber >= 2 && basketValueNumber <= 4) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товара';
    }
    if (basketValueNumber > 4 && basketValueNumber <= 9) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товаров';
    }
  }
};

// цена и количество в нижней корзине
var arrangeFooterBasket = function (obj, basketValue) {
  var array = basketValue.toString().split('').reverse().map(function (item) {
    return parseInt(item, 10);
  });
  var basketValueNumber = array[0];
  var basketValueNumberSecond = array[1];
  if (array.length === 1 || basketValueNumberSecond === 1) {

    if (basketValue === 1) {
      goodsPrice.textContent = 'Итого за ' + basketValue + ' товар ' + obj + ' ₽';
    }
    if (basketValue > 1 && basketValue <= 4) {
      goodsPrice.textContent = 'Итого за ' + basketValue + ' товара ' + obj + ' ₽';
    }
    if (basketValue > 4 && basketValue <= 19) {
      goodsPrice.textContent = 'Итого за ' + basketValue + ' товаров ' + obj + ' ₽';
    }
  }
  if (array.length > 1 && basketValueNumberSecond !== 1) {
    if (basketValueNumber === 0) {
      goodsPrice.textContent = 'Итого за ' + basketValue + ' товаров ' + obj + ' ₽';
    }
    if (basketValueNumber === 1) {
      goodsPrice.textContent = 'Итого за ' + basketValue + ' товар ' + obj + ' ₽';
    }
    if (basketValueNumber >= 2 && basketValueNumber <= 4) {
      goodsPrice.textContent = 'Итого за ' + basketValue + ' товара ' + obj + ' ₽';
    }
    if (basketValueNumber > 4 && basketValueNumber <= 9) {
      goodsPrice.textContent = 'Итого за ' + basketValue + ' товаров ' + obj + ' ₽';
    }
  }
};

// поля данных блокировка
var orderButton = document.querySelector('.buy__submit-btn');
var disableOrder = function () {
  var orderInputs = document.querySelectorAll('#order input');
  [].forEach.call(orderInputs, function (item) {
    item.disabled = true;
  });
  orderButton.disabled = true;
};

// разблокирует поля если в корзине что-то есть
var enableOrder = function () {
  var orderInputs = document.querySelectorAll('#order input');
  [].forEach.call(orderInputs, function (item) {
    item.disabled = false;
  });
  [].forEach.call(creditCardInputs, function (item) {
    item.required = true;
  });
  orderButton.disabled = false;
};
disableOrder();

// платежи
var payment = document.querySelector('.payment');
var payMethodToggle = payment.querySelector('.payment__method');
var payCard = payment.querySelector('#payment__card');
var creditCard = payment.querySelector('.payment__card-wrap');
var creditCardInputs = creditCard.querySelectorAll('input');
var cash = payment.querySelector('.payment__cash-wrap');
var payMethodToggleHandler = function () {
  if (payCard.checked === true) {
    creditCard.classList.remove('visually-hidden');
    cash.classList.add('visually-hidden');
    [].forEach.call(creditCardInputs, function (item) {
      item.required = true;
    });
  } else {
    creditCard.classList.add('visually-hidden');
    cash.classList.remove('visually-hidden');
    [].forEach.call(creditCardInputs, function (item) {
      item.required = false;
    });
  }
};
payMethodToggle.addEventListener('click', payMethodToggleHandler);

// доставка
var delivery = document.querySelector('.deliver');
var store = delivery.querySelector('#deliver__store');
var deliveryField = delivery.querySelector('.deliver__entry-fields-wrap');
var deliveryInputs = deliveryField.querySelectorAll('input');
var deliveryStore = delivery.querySelector('.deliver__store');
var deliveryCourier = delivery.querySelector('.deliver__courier');
var deliveryToggle = delivery.querySelector('.deliver__toggle');
var deliveryFloor = delivery.querySelector('#deliver__floor');
var deliveryToggleHandler = function () {
  if (store.checked === true) {
    deliveryStore.classList.remove('visually-hidden');
    deliveryCourier.classList.add('visually-hidden');
    [].forEach.call(deliveryInputs, function (item) {
      item.required = false;
    });
  } else {
    deliveryStore.classList.add('visually-hidden');
    deliveryCourier.classList.remove('visually-hidden');
    [].forEach.call(deliveryInputs, function (item) {
      item.required = true;
    });
    deliveryFloor.required = false;
  }
};
deliveryToggle.addEventListener('click', deliveryToggleHandler);


// алгоритм Луна для карты
var cardNumber = payment.querySelector('#payment__card-number');
var cardDate = payment.querySelector('#payment__card-date');
var cardCvc = payment.querySelector('#payment__card-cvc');
var cardHolder = payment.querySelector('#payment__cardholder');

var luhnCheck = function (string) {
  var stringArray = string.split('');
  var sum = 0;
  var result;
  if (stringArray.length >= 13 && stringArray.length <= 16) {
    for (var i = 0; i < stringArray.length; i++) {
      var number = parseInt(stringArray[i], 10);
      if (stringArray.length % 2 === 0) {
        if (i % 2 !== 0) {
          sum += number;
        } else {
          var oddIndex = number * 2;
          if (oddIndex > 9) {
            oddIndex -= 9;
            sum += oddIndex;
          } else {
            sum += oddIndex;
          }
        }
      } else {
        if (i % 2 !== 0) {
          var evenIndex = number * 2;
          if (evenIndex > 9) {
            evenIndex -= 9;
            sum += evenIndex;
          } else {
            sum += evenIndex;
          }
        } else {
          sum += number;
        }
      }
    }
  } else {
    return false;
  }
  result = sum % 10 === 0 ? true : false;
  return result;
};

// проверить дату на карте
var dateCheck = function () {
  var date = cardDate.value;
  var currentYear = (new Date()).getFullYear();
  var currentMonth = (new Date()).getMonth();
  var dateArr = date.split('/');
  var result;
  if (parseInt(dateArr[0], 10) < (currentMonth + 1) && ('20' + parseInt(dateArr[1], 10)) <= currentYear) {
    result = false;
  } else {
    result = true;
  }
  return result;
};

// проверить имя на карте
var holderCheck = function (name) {
  var holderArray = name.split(' ');
  var result;
  if (holderArray.length < 2 || holderArray.length > 25) {
    result = false;
  } else {
    result = true;
  }
  return result;
};

// валидация полей
var cardCheckHanler = function () {
  var cardValue = cardNumber.value;
  var cardHolderName = cardHolder.value;
  var cardStatus = document.querySelector('.payment__card-status');
  if (luhnCheck(cardValue) === true && dateCheck() === true && cardCvc.value !== '' && holderCheck(cardHolderName) === true) {
    cardStatus.textContent = 'Одобрен';
  } else {
    cardStatus.textContent = 'Неизвестен';
  }
};

cardNumber.addEventListener('change', cardCheckHanler);
cardDate.addEventListener('change', cardCheckHanler);
cardCvc.addEventListener('change', cardCheckHanler);
cardHolder.addEventListener('change', cardCheckHanler);

// бегунок
var right = 250;
var left = 0;
var range = document.querySelector('.range');
var rangeMin = range.querySelector('.range__price--min');
var rangeMax = range.querySelector('.range__price--max');
var rangeFillLine = range.querySelector('.range__fill-line');
var rangeBtnLeft = range.querySelector('.range__btn--left');
var rangeBtnRight = range.querySelector('.range__btn--right');

rangeBtnLeft.style.left = -10 + 'px';
rangeBtnLeft.style.zIndex = 1000; // полоска ранжа
rangeMin.textContent = '0';
rangeFillLine.style.left = 0;
rangeBtnRight.style.right = -5 + 'px';
rangeBtnRight.style.zIndex = 1000; // полоска ранжа
rangeMax.textContent = '100';
rangeFillLine.style.right = 0;

var currentPositionInPct = function (currentPosition) {
  return Math.round(currentPosition * 100 / right);
};
// собтие на левый
rangeBtnLeft.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
  };
  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX
    };
    startCoords = {
      x: moveEvt.clientX
    };
    var positionLeftShifted = (rangeBtnLeft.offsetLeft - shift.x);
    if (positionLeftShifted <= -10) {
      positionLeftShifted = -10;
    } else if (positionLeftShifted >= right) {
      positionLeftShifted = right + 'px';
    } else if (positionLeftShifted >= rangeBtnRight.offsetLeft - 10) {
      positionLeftShifted = rangeBtnRight.offsetLeft - 10;
      rangeBtnLeft.style.left = positionLeftShifted + 'px';
    } else {
      rangeBtnLeft.style.left = positionLeftShifted + 'px';
      rangeMin.textContent = currentPositionInPct(positionLeftShifted + 10);
    }
    rangeFillLine.style.left = positionLeftShifted + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    var positionLeftUp = rangeBtnLeft.offsetLeft;
    rangeMin.textContent = currentPositionInPct(positionLeftUp + 10);

    if (dragged) {
      var onClickPreventDefault = function () {
        evt.preventDefault();
        rangeBtnLeft.removeEventListener('click', onClickPreventDefault);
      };
      rangeBtnLeft.addEventListener('click', onClickPreventDefault);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
// событие на правый
rangeBtnRight.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX
  };
  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX
    };
    startCoords = {
      x: moveEvt.clientX
    };
    var positionRightStop = (right - rangeBtnRight.offsetLeft - shift.x);
    var positionRightShifted = (rangeBtnRight.offsetLeft - shift.x);
    if (positionRightShifted > right) {
      positionRightShifted = right + 'px';
    } else if (positionRightShifted <= left) {
      positionRightShifted = left + 'px';
    } else if (positionRightShifted <= rangeBtnLeft.offsetLeft + 10) {
      positionRightShifted = rangeBtnLeft.offsetLeft;
      rangeBtnRight.style.left = positionRightShifted + 10 + 'px';
    } else {
      rangeBtnRight.style.left = positionRightShifted + 'px';
      rangeMax.textContent = currentPositionInPct(positionRightShifted);
    }
    if (positionRightStop <= 0) {
      positionRightStop = 0;
    } else {
      rangeFillLine.style.right = positionRightStop + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    var positionRightUp = rangeBtnRight.offsetLeft;
    rangeMax.textContent = currentPositionInPct(positionRightUp);
    if (dragged) {
      var onClickPreventDefault = function () {
        evt.preventDefault();
        rangeBtnRight.removeEventListener('click', onClickPreventDefault);
      };
      rangeBtnRight.addEventListener('click', onClickPreventDefault);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

/*
// имя большими буквами в поле карты
var nameChangeHandler = function () {
  var cardHolderValue = cardHolder.value;
  cardHolder.value = cardHolderValue.toUpperCase();
};
*/

