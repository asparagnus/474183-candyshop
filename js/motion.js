'use strict';
var sliderElem = document.querySelector('.range__filter');
var thumbMin = document.querySelector('.range__btn--left');
var thumbMax = document.querySelector('.range__btn--right');
var sliderCoords = getCoords(sliderElem);
var rangeEnd = sliderElem.offsetWidth - thumbMin.offsetWidth;
/*
var min = parseInt(getComputedStyle(thumbMin).left, 10);
var max = parseInt(getComputedStyle(thumbMax).left, 10);
 */
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
