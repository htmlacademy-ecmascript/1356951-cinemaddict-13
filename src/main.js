import {createUserTemplate} from "./view/user.js";




const render = (parent, element) => {
  const newFragment = document.createDocumentFragment();
  parent.innerHTML = ``;
  newFragment.appendChild(element);
  parent.appendChild(newFragment);
};

const headerElement = document.querySelector(`.header`);
render(headerElement, createUserTemplate());
