import '../styles/app.scss';
import {square} from './slider.js';
if (module.hot) {
  module.hot.accept();
}
var startTime = new Date().getSeconds();
console.log(square(Math.PI));
console.log(new Date().getSeconds() - startTime);