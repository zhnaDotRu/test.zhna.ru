//import './index.html';
import './style.scss';

import './src/js/polyfill';
import './src/js/header';
import Slider from './src/js/Slider';


let sliderElements = document.querySelectorAll('.js-main-slider-element');
let sliderLeftbtn = document.querySelector('.js-main-slider-btn-left');
let sliderRightbtn = document.querySelector('.js-main-slider-btn-right');
let slider = document.querySelector('.js-main-slider-block');

let MainSlider = new Slider(sliderElements, 4, 171, 300);
//Обработчики кнопок
sliderLeftbtn.addEventListener('click', () => MainSlider.LBtn = -171, false);
sliderRightbtn.addEventListener('click', () => MainSlider.RBtn = 171, false);
//Обработчики устройств с тачь экраном
slider.addEventListener('touchstart', (e) => MainSlider.touchStart = e.changedTouches[0].clientX, false);
slider.addEventListener('touchmove', (e) => MainSlider.touchMove = e.changedTouches[0].clientX, false);
slider.addEventListener('touchend', () => MainSlider.touchEnd(), false);
