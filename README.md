Loading Images

use url-loader with a limit option to load images as a data uri and name option if it exceeds limit
pug-loader - in html, use require to properly load images

import image from '../images/download.jpeg';

var img = document.getElementById('images');
img.src = image;