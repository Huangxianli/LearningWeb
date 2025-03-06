export function getData () {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    console.log(xhr.response);
    if (xhr.readyState === 4) {
      console.log(2);
    }
  };

  xhr.onload = function () {
    console.log(1);
    console.log(xhr.status)
  };

  xhr.open('get', 'http://localhost:5500/get');
  xhr.send();
}