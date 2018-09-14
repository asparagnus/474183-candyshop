'use strict';
// data
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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomIntRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBool = function () {
  return Math.random() >= 0.5;
};
// для строк
var getRandomString = function (data) {
  var randomString = '';
  var count = getRandomInt(1, data.length);
  for (var i = 1; i <= count; i++) {
    randomString += (i < count ? data[i] + ', ' : data[i]);
  }
  return randomString;
};

var createProductCards = function (counts) {
  var products = []; // новый массив

  for (var i = 0; i < counts; i++) {
    var product = {
      name: PRODUCTS_LIST[getRandomInt(0, PRODUCTS_LIST.length)],
      picture: PRODUCTS_IMAGES[getRandomInt(0, PRODUCTS_IMAGES.length)],
      amount: getRandomIntRange(0, 20),
      price: getRandomIntRange(100, 1500),
      weight: getRandomIntRange(30, 300),
      rating: {
        value: getRandomIntRange(1, 5),
        number: getRandomIntRange(10, 900)
      },
      nutritionFacts: {
        sugar: getRandomBool(),
        energy: getRandomIntRange(70, 500),
        PRODUCTS_CONTENTS: getRandomString(PRODUCTS_CONTENTS),
      }
    };
    products.push(product); // отправляем данные в новый массив
  }
  return products; // вызываем
};


var CARDS_QUANTITY = 26;
var CART_COUNT = 3;
// функция генерирующая массив зависит от продукта(нет продукта - нет функции)
// Напишите функцию, для создания массива из 26 сгенерированных объектов.
var getProductCard = function (product, catalogCardTemplate) {
  var userCard = catalogCardTemplate.cloneNode(true); // копирую узел
  // создайте DOM-элементы, соответствующие товарам и заполните их данными из массива
  // в зависимости от количества amount добавьте следующий класс
  if (product.amount > 5) {
    userCard.classList.add('card--in-stock');
  } else if (product.amount <= 5 && product.amount >= 1) {
    userCard.classList.add('card--little');
  } else if (product.amount === 0) {
    userCard.classList.add('card--soon');
  }

  userCard.querySelector('.card__title').textContent = product.name;
  userCard.querySelector('.card__price').innerHTML = product.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + product.weight + ' Г</span>';

  var productImage = userCard.querySelector('.card__img');
  productImage.src = product.picture;
  productImage.alt = product.name;
  var productRating = userCard.querySelector('.stars__rating');

  if (product.rating.value < 5) {
    productRating.classList.remove('stars__rating--five');
    productRating.classList.add('stars__rating--' + RATINGS[product.rating.value]);
    productRating.textContent = product.rating.value > 1 ? 'Рейтинг: ' + product.rating.value + ' звёзды' : 'Рейтинг: ' + product.rating.value + ' звёзда';
  }
  userCard.querySelector('.star__count').textContent = product.rating.number;

  var cardCharacteristic = product.nutritionFacts.sugar ? 'Содержит сахар. ' : 'Без сахара. ';
  cardCharacteristic += product.nutritionFacts.energy + ' ккал';
  userCard.querySelector('.card__characteristic').textContent = cardCharacteristic;
  userCard.querySelector('.card__composition-list').textContent = product.nutritionFacts.PRODUCTS_CONTENTS;
  return userCard;
};

var renderProductCards = function (products) {
  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');
  var catalogLoad = document.querySelector('.catalog__load');
  catalogLoad.classList.add('visually-hidden');
  var catalogCardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < products.length; i++) {
    fragment.appendChild(getProductCard(products[i], catalogCardTemplate)); // клеиваем шаблоны
  }
  catalogCards.appendChild(fragment);
};
// корзина по аналогии
var getCartItem = function (product, cartItemTemplate) {
  var cartItem = cartItemTemplate.cloneNode(true);
  cartItem.querySelector('.card-order__title').textContent = product.name;
  var cartItemImage = cartItem.querySelector('.card-order__img');
  cartItemImage.src = product.picture;
  cartItemImage.alt = product.name;
  cartItem.querySelector('.card-order__price').textContent = product.price + ' ₽';
  return cartItem;
};

var renderCart = function (products) {
  var goodsCards = document.querySelector('.goods__cards');
  goodsCards.classList.remove('goods__cards--empty');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');
  goodsCardEmpty.classList.add('visually-hidden');
  var cartItemTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < products.length; i++) {
    fragment.appendChild(getCartItem(products[i], cartItemTemplate));
  }
  goodsCards.appendChild(fragment);
};

renderProductCards(createProductCards(CARDS_QUANTITY));

renderCart(createProductCards(CART_COUNT));
