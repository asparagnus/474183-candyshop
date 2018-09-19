'use strict';
// goods
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
var CARDS_QUANTITY = 26;

var PRODUCTS_LIST = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок' ];
var PRODUCTS_IMAGES = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
var PRODUCTS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо' ];
// новый массив
var products = [];

// Объект для рейтинга
var ratings = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five'
};

var sugar = ['true', 'false'];


var getRandomBool = function () {
  return Math.random() >= 0.5;
};

// Функция для получения случайного значения из диапазона
var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

// Получаем случайные значения их массивов
var takeRandomElement = function (arr) {
  var i = getRandomValue(0, arr.length - 1);
  var randomElement = arr[i];
  arr.splice(i, 1);
  return randomElement;
};

// Функция для получения случайного изображения
var getRandomPicture = function () {
  return 'img/cards/' + takeRandomElement(PRODUCTS_IMAGES) + '.jpg';
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
var createProductCards = function () {
  return {
    name: takeRandomElement(PRODUCTS_LIST),
    picture: getRandomPicture(),
    amount: getRandomValue(MIN_AMOUT, MAX_AMOUT),
    price: getRandomValue(MIN_PRICE, MAX_PRICE),
    weight: getRandomValue(MIN_WEIGHT, MAX_WEIGHT),
    rating: {
      value: getRandomValue(MIN_VALUE, MAX_VALUE),
      number: getRandomValue(MIN_NUMBER, MAX_NUMBER)
    },
    nutritionFacts: {
      sugar: getRandomBool(sugar),
      energy: getRandomValue(MIN_ENERGY, MAX_ENERGY),
      contents: getRandomContents()
    }
  };
};

// Функция для создания массива карточек
var fillArray = function () {
  for (var i = 1; i <= CARDS_QUANTITY; i++) {
    products.push(createProductCards());
  }
  return products;
};

// ============================================
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = catalogCards.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

// Классы в зависимости от значения по заданию
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
var createCards = function (cardData) {
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
    cardPrice.textContent = item.price;
    cardPrice.appendChild(cardCurrency);
    cardPrice.appendChild(cardWeight);
    userCard.querySelector('.card__weight').textContent = '/ ' + item.weight + ' Г';
    userCard.querySelector('.stars__rating').classList.remove('stars__rating--five');
    userCard.querySelector('.stars__rating').classList.add(ratings[item.rating.value]);
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

catalogCards.appendChild(createCards(fillArray()));

// Отрисовываем товары в корзине

var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = goodsCards.querySelector('.goods__card-empty');

// добавить и бурать в избранное
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

var order = document.querySelector('.order');
var inputs = order.querySelectorAll('input');

// Добавляет и убирает атрибут disabled на инпуты
var addDisabledForInput = function () {
  var article = document.querySelector('.goods_card');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = (article === null);
  }
};

addDisabledForInput();

// Выводит и убирает сообщение о наличии товара в корзине
var alertMessage = function () {
  var article = document.querySelector('.goods_card');
  goodsCards.classList.toggle('goods__cards--empty', article === null);
  goodsCardEmpty.classList.toggle('visually-hidden', article !== null);
};

var addButtons = document.querySelectorAll('.card__btn');
var cardsOnCatalog = catalogCards.querySelectorAll('.catalog__card');

// Создает карточку товара в корзине
var createAddToBasketHandler = function (i) {
  return function (evt) {
    addToBasket(cardsOnCatalog[i], i);
    evt.preventDefault();
    alertMessage();
    addDisabledForInput();
  };
};

// Добавляет товары в корзину при клике на кнопку добавить
var addBasketAdditionHandlers = function () {
  for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', createAddToBasketHandler(i));
  }
};

addBasketAdditionHandlers();

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
  addDisabledForInput();
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
  var target = evt.target.closest('.card-order__btn--decrease');
  var card = evt.target.closest('.card-order__amount');
  var value = card.querySelector('.card-order__count');
  if (target === null) {
    return;
  } else if (value.value > 1) {
    value.value--;
  } else {
    var targetCard = evt.target.closest('.card-order');
    goodsCards.removeChild(targetCard);
    alertMessage();
    addDisabledForInput();
  }
});

// Увеличивает значение
var increaseValue = function (value) {
  value.value++;
};

// Добавляет дата атрибуты
var addDataAtribute = function () {
  for (var i = 0; i < cardsOnCatalog.length; i++) {
    cardsOnCatalog[i].setAttribute('data-id', i + 1);
  }
};
addDataAtribute();

// Добавляет карточки в корзину, если есть повтор, увеличивает значение
var addToBasket = function (target, i) {
  var dataAttribute = goodsCards.querySelector('[data-id="' + target.dataset.id + '"]');
  if (dataAttribute === null) {
    var cardsBasket = products[i];
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

// Показывает и скрывает форму оплаты

var payment = document.querySelector('.payment');
var paymentCard = payment.querySelector('.payment__card-wrap');
var paymentCash = payment.querySelector('.payment__cash-wrap');
var btnCard = payment.querySelector('input#payment__card');
var btnCash = payment.querySelector('input#payment__cash');
var paymentInputs = payment.querySelector('.payment__inputs');


btnCash.addEventListener('click', function () {
  addClassForPayment();
});

btnCard.addEventListener('click', function () {
  addClassForPayment();
});

var addClassForPayment = function () {
  paymentCash.classList.toggle('visually-hidden', btnCard.checked === true);
  paymentCard.classList.toggle('visually-hidden', btnCash.checked === true);
  addDisabledForInputPayment();
};


var inputsPayment = paymentInputs.querySelectorAll('input');

// Добавляет и убирает атрибут disabled на инпуты
var addDisabledForInputPayment = function () {
  for (var i = 0; i < inputsPayment.length; i++) {
    inputsPayment[i].disabled = btnCash.checked === true;
  }
};

// Переключает вкладки в блоке доставки

var delivery = document.querySelector('.deliver');
var store = delivery.querySelector('.deliver__store');
var courier = delivery.querySelector('.deliver__courier');
var btnStore = delivery.querySelector('input#deliver__store');
var btnCourier = delivery.querySelector('input#deliver__courier');
var fieldsetStore = store.querySelector('.deliver__stores');
var fieldsetCourier = courier.querySelector('.deliver__entry-fields-wrap');


btnStore.addEventListener('click', function () {
  addClassForDelivery();
});

btnCourier.addEventListener('click', function () {
    addClassForDelivery();
});

var addClassForDelivery = function () {
  courier.classList.toggle('visually-hidden', btnStore.checked === true);
  store.classList.toggle('visually-hidden', btnCourier.checked === true);
  addDisabledForFieldsetDelivery();
};

// Добавляет и убирает атрибут disabled на инпуты в блоке доставки
var addDisabledForFieldsetDelivery = function () {
  fieldsetCourier.disabled = btnCourier.checked === false;
  fieldsetStore.disabled = btnCourier.checked === true;
};

addDisabledForFieldsetDelivery();
