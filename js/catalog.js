'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  window.ENTER_KEYCODE = ENTER_KEYCODE;
  var IMAGES_PATH = 'img/cards/';
  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');
  var catalogLoad = document.querySelector('.catalog__load');
  var catalogCard = document.querySelector('#card').content.querySelector('.catalog__card');
  var goodsCard = document.querySelector('#card-order').content.querySelector('.goods_card');
  var goodsCards = document.querySelector('.goods__cards');
  goodsCards.classList.remove('goods__cards--empty');

  var renderCards = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < goods.length; i++) {

      var good = goods[i];
      var ratingClass = 'stars__rating--one';
      if (good.rating.value === 2) {
        ratingClass = 'stars__rating--two';
      } else if (good.rating.value === 3) {
        ratingClass = 'stars__rating--three';
      } else if (good.rating.value === 4) {
        ratingClass = 'stars__rating--four';
      } else if (good.rating.value === 5) {
        ratingClass = 'stars__rating--five';
      }

      var amountClass = 'card--little';
      if (good.amount > 5) {
        amountClass = 'card--in-stock';
      } else if (good.amount === 0) {
        amountClass = 'card--soon';
      }

      var goodElement = catalogCard.cloneNode(true);
      goodElement.classList.remove('card--in-stock');
      goodElement.classList.add(amountClass);
      goodElement.setAttribute('data-index', i);
      goodElement.querySelector('.card__title').textContent = good.name;
      goodElement.querySelector('.card__img').src = IMAGES_PATH + good.picture;
      goodElement.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency"> ₽ </span>' + '<span class="card__weight">/ ' + good.weight + ' Г</span>';
      goodElement.querySelector('.stars__rating').textContent = good.rating.value;
      var starsRating = goodElement.querySelector('.stars__rating');
      starsRating.classList.remove('stars__rating--five');
      starsRating.classList.add(ratingClass);
      goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';
      goodElement.querySelector('.card__characteristic').textContent = good.nutritionFacts.sugarTF + good.nutritionFacts.energy + ' ккал';
      goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.consist;

      fragment.appendChild(goodElement);
    }
    catalogCards.appendChild(fragment);
    catalogLoad.classList.add('visually-hidden');
  };

  var goods = [];

  var loadSuccessHandler = function (objects) {
    goods = objects;
    renderCards();
    init();
  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);

  var mainHeaderBasket = document.querySelector('.main-header__basket');
  var trolleyGoods = [];
  window.trolleyGoods = trolleyGoods;

  var init = function () {
    var goodsCardEmpty = document.querySelector('.goods__card-empty');
    var cardFavoriteBtn = catalogCards.querySelectorAll('.card__btn-favorite');
    var allCatalogCards = catalogCards.querySelectorAll('.catalog__card');
    cardFavoriteBtn.forEach(function (element) {
      var onCardFavoriteBtnClick = function (evt) {
        evt.preventDefault();
        element.classList.toggle('.card__btn-favorite--selected');
      };
      element.addEventListener('click', onCardFavoriteBtnClick);
    });

    allCatalogCards.forEach(function (elt) {
      var cardBtn = elt.querySelector('.card__btn');
      var onCardBtnClick = function (evt) {
        evt.preventDefault();
        var eltData = elt.getAttribute('data-index');
        goodsCardEmpty.classList.add('visually-hidden');
        var chosenCard = goods[eltData];
        if (chosenCard.amount > 0) {
          chosenCard.amount -= 1;
          var trolleyCard = getTrolleyCard(chosenCard.name);
          if (trolleyCard) {
            trolleyCard.orderedAmount++;
          } else {
            trolleyGoods.push(createTrolleyCard(chosenCard));
          }
          renderTrolleyFragment();
        }
        updateBasketGoodsCount();
      };
      cardBtn.addEventListener('click', onCardBtnClick);
    });
  };

  var renderTrolleyCard = function (trolleyGood) {
    var trolleyGoodElement = goodsCard.cloneNode(true);
    trolleyGoodElement.name = trolleyGood.name;
    trolleyGoodElement.querySelector('.card-order__title').textContent = trolleyGood.name;
    trolleyGoodElement.querySelector('.card-order__img').src = IMAGES_PATH + trolleyGood.picture;
    trolleyGoodElement.querySelector('.card-order__price').textContent = trolleyGood.price + ' ₽';
    trolleyGoodElement.querySelector('.card-order__count').value = trolleyGood.orderedAmount;

    var orderCardClose = trolleyGoodElement.querySelector('.card-order__close');
    var orderCardDecrease = trolleyGoodElement.querySelector('.card-order__btn--decrease');
    var orderCardIncrease = trolleyGoodElement.querySelector('.card-order__btn--increase');

    orderCardClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      deleteCard(trolleyGoodElement);
    });

    orderCardClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        deleteCard(trolleyGoodElement);
      }
    });

    orderCardDecrease.addEventListener('click', function (evt) {
      evt.preventDefault();
      decreaseOrderCardAmount(trolleyGoodElement);
    });

    orderCardDecrease.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        decreaseOrderCardAmount(trolleyGoodElement);
      }
    });

    orderCardIncrease.addEventListener('click', function (evt) {
      evt.preventDefault();
      increaseOrderCardAmount(trolleyGoodElement);
    });

    orderCardIncrease.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        increaseOrderCardAmount(trolleyGoodElement);
      }
    });

    return trolleyGoodElement;
  };

  var createTrolleyCard = function (chosenCard) {
    var chCard = {};
    Object.assign(chCard, chosenCard);
    delete chCard.amount;
    delete chCard.weight;
    delete chCard.rating;
    delete chCard.nutritionFacts;
    chCard.orderedAmount = 1;
    return chCard;
  };

  var renderTrolleyFragment = function () {
    window.enable.enableForm();
    var trolleyFragment = document.createDocumentFragment();
    for (var l = 0; l < trolleyGoods.length; l++) {
      trolleyFragment.appendChild(renderTrolleyCard(trolleyGoods[l]));
    }
    goodsCards.innerHTML = '<div class="goods__card-empty visually-hidden"><p><b>Странно, ты ещё ничего не добавил.</b></p><p>У нас столько всего вкусного и необычного, обязательно попробуй.</p></div>';
    goodsCards.appendChild(trolleyFragment);
  };

  var updateBasketGoodsCount = function () {
    if (trolleyGoods.length > 0) {
      var basketGoods = '';
      if (trolleyGoods.length < 2) {
        basketGoods = ' товар';
      } else if (trolleyGoods.length < 5) {
        basketGoods = ' товара';
      } else {
        basketGoods = ' товаров';
      }
      mainHeaderBasket.textContent = 'В корзине ' + trolleyGoods.length + basketGoods;
    } else {
      mainHeaderBasket.textContent = 'В корзине ничего нет';
      goodsCards.innerHTML = '<div class="goods__card-empty"><p><b>Странно, ты ещё ничего не добавил.</b></p><p>У нас столько всего вкусного и необычного, обязательно попробуй.</p></div>';
      window.disable.disableForm();
    }
  };

  var getCatalogDescCard = function (name) {
    return goods.find(function (currentGood) {
      return name === currentGood.name;
    });
  };

  var getTrolleyCard = function (name) {
    return trolleyGoods.find(function (currentGood) {
      return name === currentGood.name;
    });
  };

  var deleteCard = function (element) {
    var catalogDescCard = getCatalogDescCard(element.name);
    var trolleyCard = getTrolleyCard(element.name);
    catalogDescCard.amount += trolleyCard.orderedAmount;

    goodsCards.removeChild(element);
    for (var e = 0; e < trolleyGoods.length; e++) {
      if (element.name === trolleyGoods[e].name) {
        trolleyGoods.splice(e, 1);
      }
    }
    updateBasketGoodsCount();

    if (trolleyGoods.length > 0) {
      renderTrolleyFragment();
    }
  };

  var decreaseOrderCardAmount = function (element) {
    var catalogDescCard = getCatalogDescCard(element.name);
    var trolleyCard = getTrolleyCard(element.name);

    catalogDescCard.amount++;
    trolleyCard.orderedAmount--;

    if (trolleyCard.orderedAmount <= 0) {
      deleteCard(element);
    }
    if (trolleyGoods.length > 0) {
      renderTrolleyFragment();
    }
  };

  var increaseOrderCardAmount = function (element) {
    var catalogDescCard = getCatalogDescCard(element.name);
    var trolleyCard = getTrolleyCard(element.name);

    if (catalogDescCard.amount > 0) {
      catalogDescCard.amount--;
      trolleyCard.orderedAmount++;
    }
    renderTrolleyFragment();
  };

})();
