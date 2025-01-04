import img1 from '../assets/imgs/image1.png';
(function () {
  const img = new Image();
  img.src = img1;
  img.style.width = '300px';
  img.style.height = '300px';
  img.style.objectFit = 'cover';
  const body = document.getElementsByTagName('body');
  body[0].appendChild(img);
})();