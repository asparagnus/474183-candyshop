'use strict';

(function () {

  var RANGE_BTN_WIDTH = 10;
  var RANGE_WIDTH = 245;

  var catalogFilterRange = document.querySelector('.range__filter');
  var leftRange = catalogFilterRange.querySelector('.range__btn--left');
  var rightRange = catalogFilterRange.querySelector('.range__btn--right');
  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');
  rangePriceMin.textContent = 0;
  rangePriceMax.textContent = 100;
  var rangeFillLine = document.querySelector('.range__fill-line');

  var priceMx = Math.floor((rightRange.offsetLeft - RANGE_BTN_WIDTH / 2) / RANGE_WIDTH * 100);
  var priceMn = Math.floor((leftRange.offsetLeft - RANGE_BTN_WIDTH / 2) / RANGE_WIDTH * 100);
  rangePriceMax.textContent = priceMx;
  rangePriceMin.textContent = priceMn;

  var onLeftRangeMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX - RANGE_BTN_WIDTH / 2;
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      leftRange.style.left = (leftRange.offsetLeft - shift) + 'px';
      var leftRangePos = parseInt(leftRange.style.left, 10);

      rangeFillLine.style.left = leftRangePos + RANGE_BTN_WIDTH / 2 + 'px';

      if (leftRangePos < 0) {
        leftRange.style.left = '0px';
      } else if (leftRangePos > rightRange.offsetLeft) {
        leftRange.style.left = rightRange.offsetLeft + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!dragged) {
        leftRange.style.left = leftRange.offsetLeft + 'px';
      }

      var priceMin = Math.floor(parseInt(leftRange.style.left, 10) / RANGE_WIDTH * 100);
      rangePriceMin.textContent = priceMin;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  leftRange.addEventListener('mousedown', onLeftRangeMouseDown);

  var onRightRangeMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX - RANGE_BTN_WIDTH / 2;
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      rightRange.style.left = (rightRange.offsetLeft - shift) + 'px';
      var rightRangePos = parseInt(rightRange.style.left, 10);

      rangeFillLine.style.right = catalogFilterRange.offsetWidth - rightRangePos + 'px';

      if (rightRangePos > RANGE_WIDTH) {
        rightRange.style.left = RANGE_WIDTH + 'px';
      } else if (rightRangePos < leftRange.offsetLeft) {
        rightRange.style.left = leftRange.offsetLeft + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!dragged) {
        rightRange.style.left = rightRange.offsetLeft + 'px';
      }

      var priceMax = Math.floor(parseInt(rightRange.style.left, 10) / RANGE_WIDTH * 100);
      rangePriceMax.textContent = priceMax;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  rightRange.addEventListener('mousedown', onRightRangeMouseDown);

})();
