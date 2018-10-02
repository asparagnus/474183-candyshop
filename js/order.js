'use strict';

(function () {

  var MAP_PATH = 'img/map/';
  var MAP_ADDRESS = ['academicheskaya.jpg', 'vasileostrovskaya.jpg', 'rechka.jpg', 'petrogradskaya.jpg', 'proletarskaya.jpg', 'vostaniya.jpg', 'prosvesheniya.jpg', 'frunzenskaya.jpg', 'chernishevskaya.jpg', 'tehinstitute.jpg'];
  var ESC_KEYCODE = 27;

  var paymentCardWrap = document.querySelector('.payment__card-wrap');
  var cardNumber = paymentCardWrap.querySelector('input[name = "card-number"]');
  var paymentCard = document.querySelector('#payment__card');
  var paymentCash = document.querySelector('#payment__cash');
  var paymentCashWrap = document.querySelector('.payment__cash-wrap');
  var cardDate = paymentCardWrap.querySelector('input[name = "card-date"]');
  var cardCvc = paymentCardWrap.querySelector('input[name = "card-cvc"]');
  var cardholder = paymentCardWrap.querySelector('input[name = "cardholder"]');
  var deliverStore = document.querySelector('#deliver__store');
  var deliverCourier = document.querySelector('#deliver__courier');
  var deliverStoreWrap = document.querySelector('.deliver__store');
  var deliverCourierWrap = document.querySelector('.deliver__courier');
  var deliverStreet = deliverCourierWrap.querySelector('input[name = "deliver-street"]');
  var deliverHouse = deliverCourierWrap.querySelector('input[name = "deliver-house"]');
  var deliverFloor = deliverCourierWrap.querySelector('input[name = "deliver-floor"]');
  var deliverRoom = deliverCourierWrap.querySelector('input[name = "deliver-room"]');
  var deliverDescription = deliverCourierWrap.querySelector('textarea[name = "deliver-description"]');
  var storeAddress = document.querySelectorAll('input[name = "store"]');
  var storeAddressMap = document.querySelector('.deliver__store-map-img');
  var buySubmitButton = document.querySelector('.buy__submit-btn');
  var contactData = document.querySelector('.contact-data__inputs');
  var contactDataName = contactData.querySelector('input[name = "name"]');
  var contactDataTel = contactData.querySelector('input[name = "tel"]');
  var contactDataEmail = contactData.querySelector('input[name = "email"]');
  var paymentCardStatus = paymentCardWrap.querySelector('.payment__card-status');
  var orderCreation = document.querySelector('.buy').querySelector('form');
  var orderCreationSuccess = document.querySelector('.order-creation__success');
  var orderCreationError = document.querySelector('.order-creation__error');
  var modalCloseSuccess = orderCreationSuccess.querySelector('.modal__close');
  var modalCloseError = orderCreationError.querySelector('.modal__close');

  var luhnAlgorithm = function () {
    var arr = cardNumber.value.split('');
    var digitSum = 0;
    for (var a = 0; a < arr.length; a++) {
      var digit = parseInt(arr[a], 10);
      if (a % 2 === 0) {
        var digit2X = digit * 2;
        digit = digit2X > 9 ? digit2X - 9 : digit2X;
      }
      digitSum += digit;
    }
    return digitSum % 10 === 0;
  };

  window.disable = {
    disableForm: function () {
      cardNumber.disabled = true;
      cardDate.disabled = true;
      cardCvc.disabled = true;
      cardholder.disabled = true;
      contactDataName.disabled = true;
      contactDataTel.disabled = true;
      contactDataEmail.disabled = true;
      deliverStreet.disabled = true;
      deliverHouse.disabled = true;
      deliverFloor.disabled = true;
      deliverRoom.disabled = true;
      deliverDescription.disabled = true;
      buySubmitButton.disabled = true;
    }
  };

  window.disable.disableForm();

  window.enable = {
    enableForm: function () {
      cardNumber.disabled = false;
      cardDate.disabled = false;
      cardCvc.disabled = false;
      cardholder.disabled = false;
      contactDataName.disabled = false;
      contactDataTel.disabled = false;
      contactDataEmail.disabled = false;
      if (deliverStoreWrap.classList.contains('visually-hidden')) {
        deliverStreet.disabled = false;
        deliverHouse.disabled = false;
        deliverFloor.disabled = false;
        deliverRoom.disabled = false;
        deliverDescription.disabled = false;
      }
      buySubmitButton.disabled = false;
    }
  };

  var choosePaymentCash = function () {
    paymentCashWrap.classList.remove('visually-hidden');
    paymentCardWrap.classList.add('visually-hidden');
    cardNumber.disabled = true;
    cardDate.disabled = true;
    cardCvc.disabled = true;
    cardholder.disabled = true;
    cardNumber.required = false;
    cardDate.required = false;
    cardCvc.required = false;
    cardholder.required = false;
  };

  var choosePaymentCard = function () {
    paymentCashWrap.classList.add('visually-hidden');
    paymentCardWrap.classList.remove('visually-hidden');
    cardNumber.disabled = false;
    cardDate.disabled = false;
    cardCvc.disabled = false;
    cardholder.disabled = false;
    cardNumber.required = true;
    cardDate.required = true;
    cardCvc.required = true;
    cardholder.required = true;
  };

  paymentCash.addEventListener('click', function () {
    choosePaymentCash();
  });

  paymentCash.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      choosePaymentCash();
    }
  });

  paymentCard.addEventListener('click', function () {
    choosePaymentCard();
  });

  paymentCard.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      choosePaymentCard();
    }
  });

  var chooseDeliverStore = function () {
    deliverStoreWrap.classList.remove('visually-hidden');
    deliverCourierWrap.classList.add('visually-hidden');
    deliverStreet.disabled = true;
    deliverHouse.disabled = true;
    deliverFloor.disabled = true;
    deliverRoom.disabled = true;
    deliverDescription.disabled = true;
    deliverStreet.required = false;
    deliverHouse.required = false;
    deliverRoom.required = false;
  };

  var chooseDeliverCourier = function () {
    deliverCourierWrap.classList.remove('visually-hidden');
    deliverStoreWrap.classList.add('visually-hidden');
    if (window.trolleyGoods.length > 0) {
      deliverStreet.disabled = false;
      deliverHouse.disabled = false;
      deliverFloor.disabled = false;
      deliverRoom.disabled = false;
      deliverDescription.disabled = false;
    }
    deliverStreet.required = true;
    deliverHouse.required = true;
    deliverRoom.required = true;
  };

  deliverStore.addEventListener('click', function () {
    chooseDeliverStore();
  });

  deliverStore.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      chooseDeliverStore();
    }
  });

  deliverCourier.addEventListener('click', function () {
    chooseDeliverCourier();
  });

  deliverCourier.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      chooseDeliverCourier();
    }
  });

  orderCreation.addEventListener('click', function () {
    for (var s = 0; s < storeAddress.length; s++) {
      if (storeAddress[s].checked) {
        storeAddressMap.src = MAP_PATH + MAP_ADDRESS[s];
      }
    }
  });

  cardNumber.addEventListener('blur', function () {
    if (!luhnAlgorithm()) {
      cardNumber.setCustomValidity('Номер банковской карты введен неверно');
    } else {
      cardNumber.setCustomValidity('');
    }
  });

  cardDate.addEventListener('blur', function () {
    if (!cardDate.checkValidity()) {
      cardDate.setCustomValidity('Дата указана неверно');
    } else {
      cardDate.setCustomValidity('');
    }
  });

  cardCvc.addEventListener('blur', function () {
    if (!cardCvc.checkValidity()) {
      cardCvc.setCustomValidity('Введите данные в указаном формате');
    } else {
      cardCvc.setCustomValidity('');
    }
  });

  cardholder.addEventListener('blur', function () {
    if (!cardholder.checkValidity()) {
      cardholder.setCustomValidity('Пожалуйста, введите имя');
    } else {
      cardholder.setCustomValidity('');
    }
  });

  var onCardInputsChange = function () {
    if (cardDate.checkValidity() && cardCvc.checkValidity() && cardholder.checkValidity() && luhnAlgorithm()) {
      paymentCardStatus.textContent = 'Одобрен';
    } else {
      paymentCardStatus.textContent = 'Неизвестен';
    }
  };

  cardNumber.addEventListener('change', onCardInputsChange);
  cardDate.addEventListener('change', onCardInputsChange);
  cardCvc.addEventListener('change', onCardInputsChange);
  cardholder.addEventListener('change', onCardInputsChange);

  var onModalEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeOrderCreationSuccess();
      closeOrderCreationError();
    }
  };

  var closeOrderCreationSuccess = function () {
    orderCreationSuccess.classList.add('modal--hidden');
    document.removeEventListener('keydown', onModalEscPress);
  };

  modalCloseSuccess.addEventListener('click', function () {
    closeOrderCreationSuccess();
  });

  modalCloseSuccess.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      closeOrderCreationSuccess();
    }
  });

  var closeOrderCreationError = function () {
    orderCreationError.classList.add('modal--hidden');
    document.removeEventListener('keydown', onModalEscPress);
  };

  modalCloseError.addEventListener('click', function () {
    closeOrderCreationError();
  });

  modalCloseError.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      closeOrderCreationError();
    }
  });

  var saveSuccessHandler = function () {
    orderCreationSuccess.classList.remove('modal--hidden');
    document.addEventListener('keydown', onModalEscPress);
    orderCreation.reset();
  };

  var saveErrorHandler = function (errorMessage) {
    orderCreationError.classList.remove('modal--hidden');
    document.addEventListener('keydown', onModalEscPress);
    var orderErrorMessage = document.querySelector('.error__code');
    orderErrorMessage.textContent = errorMessage;
  };

  orderCreation.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(orderCreation), saveSuccessHandler, saveErrorHandler);
    evt.preventDefault();
  });

})();
