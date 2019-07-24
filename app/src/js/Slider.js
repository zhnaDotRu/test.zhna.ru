
export default class Slider {
  /**
   * 
   * @param {NodeList} elements Элементы слайдера
   * @param {number} maxVisibility Сколько элементов видно на экране
   * @param {number} sizeElement Размер элемента
   * @param {number} duration Время анимации
   */
  constructor(elements, maxVisibility, sizeElement, duration) {
    this._elements = elements;
    this._count = 0;
    this._maxVisibility = maxVisibility;
    this._sizeElement = sizeElement;
    this._duration = duration;
    this._posicion;
    this._posicionTouchStart;
    this._posicionTouch;
    this._isAnimate = true;
    for(let i = 0; i <= 4; i++) {
      this._elements[i].style.left = 171 * i + 'px';
    }
  }

  /**
   * (public) Сеттер
   * @param {number} val принимает e.changedTouches[0].clientX
   */
  set touchStart(val) {
    if(this._isAnimate) this._posicionTouchStart = val;
  }

  /**
   * (public) Сеттер 
   * @param {number} val принимает e.changedTouches[0].clientX
   */
  set touchMove(val) {
    if(this._isAnimate) {
      this._posicionTouch = Math.round(this._posicionTouchStart - val);
      this._posicionTouchStart = val;
      this._posicion = parseInt(this._elements[this._count].style.left);
      this._elements.forEach(element => {
        element.style.left = parseInt(element.style.left) - this._posicionTouch + 'px';
      });
      if(this._posicion < -171) {
        this._count = this._isMin(this._count+1, this._elements.length);
      }else if(this._posicion > 171) {
        this._count = this._isMin(this._count-1, this._elements.length);
      }
      if(this._posicion < 0) {
        this._addElementRight();
      }else if(this._posicion > 0){
        this._addElementLeft();
      }
    }
  }

  /**
   * Окончание тачь события
   */
  touchEnd() {
    if(this._isAnimate) {
      this._posicion = parseInt(this._elements[this._count].style.left);
      if(this._posicionTouch < 0) {
        this.RBtn = this._sizeElement - this._posicion;
      }else {
        this.LBtn = -this._sizeElement - this._posicion;
      }
    }
  }
  /**
   * (public) Сеттер
   * @param {number} val Число для смещения слайдов
   */
  set LBtn(val) {
    if(this._isAnimate) {
      this._isAnimate = false;
      this._addElementRight();
      this._draw(val);
      this._count = this._isMin(this._count+1, this._elements.length);
    }
  }

  /**
   * (public) Сеттер
   * @param {number} val Число для смещения слайдов
   */
  set RBtn(val) {
    if(this._isAnimate) {
      this._isAnimate = false;
      this._addElementLeft();
      this._draw(val);
      this._count = this._isMin(this._count-1, this._elements.length);
    }
  }

  /**
   * (private) Добавить элемент справа
   */
  _addElementRight() {
    this._posicion = parseInt(this._elements[this._count].style.left);
    let n = this._isMin(this._count + this._maxVisibility, this._elements.length);
    this._elements[n].style.left = this._posicion + this._sizeElement * this._maxVisibility + 'px';
  }

  /**
   * (private) Добавить элемент слева
   */
  _addElementLeft() {
    this._posicion = parseInt(this._elements[this._count].style.left);
    let n = this._isMin(this._count-1, this._elements.length);
    this._elements[n].style.left = this._posicion -this._sizeElement + 'px';
  }

  /**
   * (private) Передвигаем элементы
   * @param {number} posicion  На сколько передвинуть элементы
   */
  _draw(posicion) {
    this._elements.forEach(element => {
      let pos = parseInt(element.style.left);
      this._animate((t) => {
        element.style.left = pos + posicion / this._duration * t + 'px';
      }, () => this._isAnimate = true, this._duration);
    });
  }

  /**
   * (private) Вернет val в диапазоне от 0 до max 
   * @param {number} val Число для проверки
   * @param {number} max Максимальное число
   */
  _isMin(val, max) {
    if(val < 0) val = max + val;
    return val % max;
  }

  /**
   * (private) Анимация
   * @param {function} draw Функция вызывается при перерисовке страницы принимает timePassed - прошедшее время анимации 
   * @param {function} stop Функция вызваться по окончанию анимации
   * @param {number} duration Время анимации
   */
  _animate(draw, stop, duration) {
    let start = window.performance.now();
    requestAnimationFrame(function animate(time) {
      let timePassed = time - start;
      if(timePassed > duration) {
        timePassed = duration;
        draw(timePassed);
        stop();
      }else{
        if(timePassed < 0) timePassed = 0;
        draw(timePassed);
        if (timePassed < duration) requestAnimationFrame(animate);
      }
    });
  }
}
