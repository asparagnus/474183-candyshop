'use strict';

var LIST_PRODUCTS = ['Чесночные сливки', 'Oгуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок']
var Amount = randomInteger(0, 20); // количество, число от 0 до 20
var Price = randomInteger(100, 1500); // cтоимость, от 100 до 1500;
var Weight = randomInteger(30, 3000); // вес в граммах, от 30 до 300;

// Случайный элемент из массива
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Генераци случайных чисел
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

// картинки изображения для товара
var picture = document.createElement('img');
picture.src = getRandomElement('img/cards');

// рейтинг:
var rating = [];
var RATING_VALUE = [1, 2, 3, 4, 5];
for (var i = 0; i < RATING_VALUE; i++) {
  var newRating = {
    value: randomInteger(1, 5), // оценка: целое число от 1 до 5;
    number: randomInteger(10, 900) // количество оценок: целое число от 10 до 900
  };
  rating.push(newRating);
}
// состав: объект со следующими полями:
var nutritionFacts = [];
// var random_boolean = Math.random() >= 0.5; булево значение
var PRODUCTS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
for (var j = 0; i < PRODUCTS_CONTENTS; j++) {
  var newNutritionFacts = {
    sugar: Math.random() >= 0.5, // булево значение — содержание сахара. Значение генерируется случайным образом;
    energy: randomInteger(70, 500), // энергетическая ценность: целое число от 70 до 500
    contents: getRandomElement(PRODUCTS_CONTENTS) + ' ' + getRandomElement(PRODUCTS_CONTENTS) // состав: сгенерированная случайным образом строка
  };
  nutritionFacts.push(newNutritionFacts);
}
