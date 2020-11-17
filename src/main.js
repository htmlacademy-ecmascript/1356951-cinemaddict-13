const render = (parent, element) => {
  const newFragment = document.createDocumentFragment();
  parent.innerHTML = ``;
  newFragment.appendChild(element);
  parent.appendChild(newFragment);
};
