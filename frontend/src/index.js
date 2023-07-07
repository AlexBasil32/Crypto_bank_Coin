import u from 'umbrellajs';  // импортируем библиотеку umbrellajs чтобы проще отобразить дом элементы
import logo from './style/assert/img/Logo.svg';
import { initRouter } from './routing.js';  // импортируем функцию для инициализации роутера из файла routing.js
import 'simplebar'; // импортируем библиотеку для создания скролл-бара
import './style/normalize.css';
import '../node_modules/choices.js/public/assets/styles/choices.min.css';
import 'simplebar/dist/simplebar.css';
import './style/style.scss';
import './style/media.scss';


// Добавляем элементы на страницу при помощи umbrellajs
u('body').append(u('<header>').addClass('header'));
u('body').append(u('<main>').addClass('main'));
u('.header').append(u('<div>').addClass('container'));
u('.container').append(
  u('<div>')
    .addClass('header__line')
    .append(
      u('<img>').attr({ src: logo, alt: 'Логотип' }).addClass('header__logo')
    )
);

// Добавляем слушатель события DOMContentLoaded, который запускает функцию initRouter()
window.addEventListener('DOMContentLoaded', () => {
  initRouter();
});
