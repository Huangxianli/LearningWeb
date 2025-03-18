import image3 from '../assets/img/image3.png';
// webpack 原生是不知道如何处理 .png 的，需要 type 来出来
const img = document.createElement('img');
img.src = image3;
document.body.appendChild(img);