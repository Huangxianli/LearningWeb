export const createDiv = (text) => {
  const div = document.createElement('div');
  div.innerHTML = text;
  document.body.appendChild(div);
};
