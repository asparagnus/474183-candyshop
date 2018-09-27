'use strict';
(function () {
  var PRODUCTS_LIST = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
  var PRODUCTS_IMAGES = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];
  var PRODUCTS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
  var MAX_QUANTITY = 26;
  var MIN_ENERGY = 70;
  var MAX_ENERGY = 500;
  var cards = [];

  var getRandomValue = function (param) {
    var result = Math.round(Math.random() * (param.length - 1));
    return result;
  };
  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var getRandomBool = function () {
    return Math.random() >= 0.5;
  };

  // Генерация произвольных значений:
  var createRandomCards = function (names, pictures, contents, n) {
    cards = [];
    for (var i = 0; i < n; i++) {
      var randomName = names[getRandomValue(names)];
      var randomPicture = 'img/cards/' + pictures[getRandomValue(pictures)];
      var randomAmount = getRandomInRange(0, 20);
      var randomPrice = getRandomInRange(100, 1500);
      var randomWeight = getRandomInRange(30, 300);
      var randomRatingValue = getRandomInRange(1, 5);
      var randomRatingNumber = getRandomInRange(10, 900);
      var randomSugar = getRandomBool();
      var randomEnergy = getRandomInRange(MIN_ENERGY, MAX_ENERGY);
      var randomContents = contents[getRandomValue(contents)];
      for (var j = 0; j < getRandomInRange(0, contents.length - 1); j++) {
        randomContents += ', ' + contents[getRandomValue(contents)];
      }

      var getCard = {
        name: randomName,
        picture: randomPicture,
        amount: randomAmount,
        price: randomPrice,
        weight: randomWeight,
        rating: {
          value: randomRatingValue,
          number: randomRatingNumber
        },
        nutritionFacts: {
          sugar: randomSugar,
          energy: randomEnergy,
          contents: randomContents
        },
      };

      cards.push(getCard);
    }

    return cards;
  };

  // Создание коллекции с карточками товаров:
  window.products = createRandomCards(PRODUCTS_LIST, PRODUCTS_IMAGES, PRODUCTS_CONTENTS, MAX_QUANTITY);
  window.PRODUCTS_CONTENTS = PRODUCTS_CONTENTS;
})();
