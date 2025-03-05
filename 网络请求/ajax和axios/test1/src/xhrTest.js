export function getData () {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    console.log(xhr.readyState);
    console.log(xhr.response);
  };
  xhr.open('get', 'http://localhost:3000/get');
  xhr.send();
}