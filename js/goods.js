'use strict';
// .............................................................................................goods
var MIN_AMOUT = 0;
var MAX_AMOUT = 20;
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
var MAX_CARDS = 26;

var PRODUCTS_LIST = ['Чесночные сливки', 'Oгуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PRODUCTS_IMAGES = ['img/cards/gum-cedar.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/soda-cob.jpg', 'img/cards/gum-chile.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/ice-italian.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-russian.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/soda-celery.jpg'];
var PRODUCTS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var RATINGS = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five'
};

var cards = [];

var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomBool = function () {
  return Math.random() >= 0.5;
};

// Получаем случайные значения их массивов
var takeRandomElement = function (arr) {
  var i = getRandomValue(0, arr.length - 1);
  var randomElement = arr[i];
  arr.splice(i, 1);
  return randomElement;
};

// Функция для получени нескольких значений и склеивания
var getRandomContents = function () {
  var contentRandomValue = Math.round(Math.random() * PRODUCTS_CONTENTS.length - 1);
  var newContents = [];
  var contentsCopy = PRODUCTS_CONTENTS.slice();
  for (var i = 0; i <= contentRandomValue; i++) {
    var randomElement = getRandomValue(0, PRODUCTS_CONTENTS.length - 1);
    newContents.push(contentsCopy[randomElement]);
  }
  return newContents.join(', ');
};

// Функция для создания карточки
var getCard = function () {
  return {
    name: takeRandomElement(PRODUCTS_LIST),
    picture: PRODUCTS_IMAGES[getRandomValue(0, PRODUCTS_IMAGES.length)],
    amount: getRandomValue(MIN_AMOUT, MAX_AMOUT),
    price: getRandomValue(MIN_PRICE, MAX_PRICE),
    weight: getRandomValue(MIN_WEIGHT, MAX_WEIGHT),
    rating: {
      value: getRandomValue(MIN_VALUE, MAX_VALUE),
      number: getRandomValue(MIN_NUMBER, MAX_NUMBER)
    },
    nutritionFacts: {
      sugar: getRandomBool(),
      energy: getRandomValue(MIN_ENERGY, MAX_ENERGY),
      contents: getRandomContents()
    }
  };
};

// Функция для создания массива карточек
var fillArray = function () {
  for (var i = 1; i <= MAX_CARDS; i++) {
    cards.push(getCard());
  }
  return cards;
};

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = catalogCards.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

// Определяем классы в завсисимости от значения
var addClassByAmount = function (amount) {
  var cardClass;
  if (amount > 5) {
    cardClass = 'card--in-stock';
  } else if (amount > 1 && amount <= 5) {
    cardClass = 'card--little';
  } else if (amount === 0) {
    cardClass = 'card--soon';
  }
  return cardClass;
};

// Отрисовывает карточки
var createUserCards = function (cardData) {
  var fragment = document.createDocumentFragment();
  cardData.forEach(function (item) {
    var userCard = document.querySelector('#card').content.cloneNode(true);
    var cardPrice = userCard.querySelector('.card__price');
    var cardCurrency = userCard.querySelector('.card__currency');
    var cardWeight = userCard.querySelector('.card__weight');
    userCard.querySelector('.catalog__card').classList.remove('card--in-stock');
    userCard.querySelector('.catalog__card').classList.add(addClassByAmount(item.amount));

    var productImage = userCard.querySelector('.card__img');
    productImage.src = item.picture;
    productImage.alt = item.name;

    userCard.querySelector('.card__title').textContent = item.name;
    cardPrice.textContent = item.price;
    cardPrice.appendChild(cardCurrency);
    cardPrice.appendChild(cardWeight);
    userCard.querySelector('.card__weight').textContent = '/ ' + item.weight + ' Г';
    var productRating = userCard.querySelector('.stars__rating');
    if (item.rating.value < 5) {
      productRating.classList.remove('stars__rating--five');
      productRating.classList.add('stars__rating--' + RATINGS[item.rating.value]);
      productRating.textContent = item.rating.value > 1 ? 'Рейтинг: ' + item.rating.value + ' звёзды' : 'Рейтинг: ' + item.rating.value + ' звёзда';
    }
    userCard.querySelector('.star__count').textContent = item.rating.number;

    var cardCharacteristic = item.nutritionFacts.sugar ? 'Содержит сахар. ' : 'Без сахара. ';
    cardCharacteristic += item.nutritionFacts.energy + ' ккал';
    userCard.querySelector('.card__characteristic').textContent = cardCharacteristic;
    userCard.querySelector('.card__composition-list').textContent = item.nutritionFacts.PRODUCTS_CONTENTS;
    userCard.querySelector('.card__composition-list').textContent = 'Состав: ' + item.nutritionFacts.contents;
    fragment.appendChild(userCard);
  });
  return fragment;
};

catalogCards.appendChild(createUserCards(fillArray()));


// Добавляет и убирает классы в избранное
catalogCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card__btn-favorite');
  if (!target) {
    return;
  }
  target.classList.toggle('card__btn-favorite--selected');
});

// Показывает и скрывает состав
catalogCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  var cardMain = evt.target.closest('.card__main');
  var target = evt.target.closest('.card__btn-composition');
  var composition = cardMain.querySelector('.card__composition');
  if (!target) {
    return;
  }
  composition.classList.toggle('card__composition--hidden');
});

// ..........................................................................................................basket
// Отрисовка карточек в  в корзине
var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = goodsCards.querySelector('.goods__card-empty');

// Добавляет и убирает классы сообщения о наличии товара в корзине
var alertMessage = function () {
  var article = document.querySelector('.goods_card');
  goodsCards.classList.toggle('goods__cards--empty', article === null);
  goodsCardEmpty.classList.toggle('visually-hidden', article !== null);
};

var order = document.querySelector('.order');
var inputs = order.querySelectorAll('input');

// Добавляет и убирает атрибут disabled
var addDisabledInput = function () {
  var article = document.querySelector('.goods_card');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = (article === null);
  }
};
addDisabledInput();

var addButtons = document.querySelectorAll('.card__btn');
var cardsOnCatalog = catalogCards.querySelectorAll('.catalog__card');

// Создает карточку товара в корзине
var addBasketHandler = function (i) {
  return function (evt) {
    addToBasket(cardsOnCatalog[i], i);
    evt.preventDefault();
    alertMessage();
    addDisabledInput();
  };
};

// Добавляет товары в корзину при клике на кнопку добавить
var addBasketBtnHandler = function () {
  for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', addBasketHandler(i));
  }
};
addBasketBtnHandler();

// Удаляет товары из корзины
goodsCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__close');
  if (target === null) {
    return;
  }
  var targetCard = evt.target.closest('.card-order');
  goodsCards.removeChild(targetCard);
  alertMessage();
  addDisabledInput();
});

// Увеличивает кол-во товаров в корзине
goodsCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__btn--increase');
  var card = evt.target.closest('.card-order__amount');
  var value = card.querySelector('.card-order__count');
  if (target === null) {
    return;
  }
  increaseValue(value);
});

// Уменьшает кол-во товаров в корзине
goodsCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  var card = evt.target.closest('.card-order__amount');
  var value = card.querySelector('.card-order__count');
  var target = evt.target.closest('.card-order__btn--decrease');
  if (target === null) {
    return;
  } else if (value.value > 1) {
    value.value--;
  } else {
    var targetCard = evt.target.closest('.card-order');
    goodsCards.removeChild(targetCard);
    alertMessage();
    addDisabledInput();
  }
});

// Увеличивает значение
var increaseValue = function (value) {
  value.value++;
};

// Добавляет id
var addDataAtribute = function () {
  for (var i = 0; i < cardsOnCatalog.length; i++) {
    cardsOnCatalog[i].setAttribute('data-id', i + 1);
  }
};
addDataAtribute();

// Добавляет карточки в корзину и проверяет наличие в корзине. Если она есть добавляет 1 шт к уже существующей
var addToBasket = function (target, i) {
  var dataAttribute = goodsCards.querySelector('[data-id="' + target.dataset.id + '"]');
  if (dataAttribute === null) {
    var cardsBasket = cards[i];
    var cardBasketElement = document.querySelector('#card-order').content.cloneNode(true);
    cardBasketElement.querySelector('.card-order__title').textContent = cardsBasket.name;
    cardBasketElement.querySelector('.card-order__img').src = cardsBasket.picture;
    cardBasketElement.querySelector('.card-order__price').textContent = cardsBasket.price + ' ₽';
    cardBasketElement.querySelector('.goods_card').setAttribute('data-id', i + 1);
    goodsCards.appendChild(cardBasketElement);
  } else {
    var value = dataAttribute.querySelector('.card-order__count');
    increaseValue(value);
  }
};

// ...................................................................... pay
// Показывает и скрывает форму оплаты
var payment = document.querySelector('.payment');
var paymentCard = payment.querySelector('.payment__card-wrap');
var paymentCash = payment.querySelector('.payment__cash-wrap');
var btnCard = payment.querySelector('input#payment__card');
var btnCash = payment.querySelector('input#payment__cash');
var paymentInputs = payment.querySelector('.payment__inputs');

// переключение формы карточка - наличка
var basketGoods = [];

var togglePayForm = function (form, enable) {
  form.querySelectorAll('input').forEach(function (input) {
    input.removeAttribute('disabled');
    if (!enable) {
      input.setAttribute('disabled', undefined);
  }
});
  form.querySelectorAll('fieldset').forEach(function (input) {
    input.removeAttribute('disabled');
    if (!enable) {
      input.setAttribute('disabled', undefined);
    }
  });
};

var form = document.querySelector('.buy form');
if (basket.length > 0) {
  goodsCards.classList.remove('goods__cards--empty');
  togglePayForm(form, true);
} else {
  togglePayForm(form, false);
}


// проверка номера карты
btnCash.addEventListener('click', function () {
  addClassForPayment();
});

btnCard.addEventListener('click', function () {
  addClassForPayment();
});

var addClassForPayment = function () {
  paymentCash.classList.toggle('visually-hidden', btnCard.checked === true); // сообщение валюту не предлагать
  paymentCard.classList.toggle('visually-hidden', btnCash.checked === true);
  addDisabledPay();
};


var inputsPayment = paymentInputs.querySelectorAll('input');
// Добавляет и убирает атрибут disabled на инпуты
var addDisabledPay = function () {
  for (var i = 0; i < inputsPayment.length; i++) {
    inputsPayment[i].disabled = btnCash.checked === true;
  }
};





// Переключает вкладки в блоке доставки
var delivery = document.querySelector('.deliver');
var store = delivery.querySelector('.deliver__store');
var courier = delivery.querySelector('.deliver__courier');
var deliverStores = store.querySelector('.deliver__stores');
var deliverEntry = courier.querySelector('.deliver__entry-fields-wrap');
var btnStore = delivery.querySelector('input#deliver__store');
btnStore.addEventListener('click', function () {
  addClassDelivery();
});

var btnCourier = delivery.querySelector('input#deliver__courier');
btnCourier.addEventListener('click', function () {
  addClassDelivery();
});

var addClassDelivery = function () {
  courier.classList.toggle('visually-hidden', btnStore.checked === true);
  store.classList.toggle('visually-hidden', btnCourier.checked === true);
  addDisabledDelivery();
};

// Добавляет и убирает атрибут disabled на инпуты в блоке доставки
var addDisabledDelivery = function () {
  deliverEntry.disabled = btnCourier.checked === false;
  deliverStores.disabled = btnCourier.checked === true;
};

addDisabledDelivery();

// бегунок ..................................................................................................
var sliderElem = document.querySelector('.range__filter');
var thumbMin = document.querySelector('.range__btn--left');
var thumbMax = document.querySelector('.range__btn--right');
var sliderCoords = getCoords(sliderElem);
var rangeEnd = sliderElem.offsetWidth - thumbMin.offsetWidth;
/*
var min = parseInt(getComputedStyle(thumbMin).left, 10);
var max = parseInt(getComputedStyle(thumbMax).left, 10);

var min = parseInt(0, 10);
var max = parseInt(100, 10);

thumbMin.onmousedown = function (e) {
  var thumbCoords = getCoords(thumbMin);
  var shiftX = e.pageX - thumbCoords.left;


  document.onmousemove = function (e) {
    var newLeft = e.pageX - shiftX - sliderCoords.left;
    if (newLeft < 0) {
      newLeft = 0;
    }

    if (newLeft > max - thumbMin.offsetWidth / 2) {
      newLeft = max - thumbMin.offsetWidth / 2;
    }

    min = newLeft;
    thumbMin.style.left = newLeft + 'px';
  };

  document.onmouseup = function () {
    document.onmousemove = document.onmouseup = null;
  };
  return false;
};

thumbMax.onmousedown = function (e) {
  var thumbCoords = getCoords(thumbMax);
  var shiftX = e.pageX - thumbCoords.left;

  document.onmousemove = function (e) {
    var newLeft = e.pageX - shiftX - sliderCoords.left;

    // если вне слайдера
    if (newLeft < min + thumbMin.offsetWidth / 2) {
      newLeft = min + thumbMin.offsetWidth / 2;
    }

    if (newLeft > rangeEnd) {
      newLeft = rangeEnd;
    }
    max = newLeft;

    thumbMax.style.left = newLeft + 'px';
  };
  document.onmouseup = function () {
    document.onmousemove = document.onmouseup = null;
  };
  return false;
};

thumbMin.ondragstart = function() {
  return false;
};

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
*/
var rangeFilter = document.querySelector('.range__filter');
var priceRangeFilterLeft = rangeFilter.querySelector('.range__btn--left');
var priceRangeFilterRight = rangeFilter.querySelector('.range__btn--right');
var priceRangeFilterLine = rangeFilter.querySelector('.range__fill-line');
var filterMinPrice;
var filterMaxPrice;
var minX = rangeFilter.clientLeft;
var maxX = rangeFilter.clientLeft + rangeFilter.clientWidth;
var TOTAL_MAX_PRICE = 1500;
var MIN_PRICE = TOTAL_MAX_PRICE;
var updatePriceFilter = function () {
    document.querySelector('.range__prices .range__price--min').textContent = filterMinPrice;
    document.querySelector('.range__prices .range__price--max').textContent = filterMaxPrice;
};
var renderCatalog = function () {
    var catalog = document.querySelector('.catalog__cards');
    catalog.querySelectorAll('.catalog__card').forEach(function (child) {
        catalog.removeChild(child);
    });
var calcFilterValue = function (element, shift) {
    var filterLeft = (element.offsetLeft - shift);
    if (filterLeft > maxX) {
        filterLeft = maxX;
    }
    if (filterLeft < minX) {
        filterLeft = minX;
    }
    return Math.round((TOTAL_MAX_PRICE * filterLeft) / rangeFilter.clientWidth);
};
priceRangeFilterRight.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;
    var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = startX - moveEvt.clientX;
        startX = moveEvt.clientX;
        var filterValue = calcFilterValue(priceRangeFilterRight, shift);
        filterValue = (filterValue < filterMinPrice) ? filterMinPrice : filterValue;
        var percentLeft = (filterValue * 100) / TOTAL_MAX_PRICE;
        priceRangeFilterRight.style.left = percentLeft + '%';
        priceRangeFilterLine.style.right = (100 - percentLeft) + '%';
        filterMaxPrice = filterValue;
    };
    var onMouseUp = function (upEvt) {
        updatePriceFilter();
        renderCatalog();
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

priceRangeFilterLeft.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;
    var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = startX - moveEvt.clientX;
        startX = moveEvt.clientX;
        var filterValue = calcFilterValue(priceRangeFilterLeft, shift);
        filterValue = (filterValue > filterMaxPrice) ? filterMaxPrice : filterValue;
        var percentLeft = (filterValue * 100) / TOTAL_MAX_PRICE;
        priceRangeFilterLeft.style.left = percentLeft + '%';
        priceRangeFilterLine.style.left = priceRangeFilterLeft.style.left;
        filterMinPrice = filterValue;
    };

    var onMouseUp = function (upEvt) {
        updatePriceFilter();
        renderCatalog();
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});
