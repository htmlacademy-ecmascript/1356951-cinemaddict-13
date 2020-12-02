import Abstract from "../view/abstract.js";

const createFilterTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends Abstract {

  getTemplate() {
    return createFilterTemplate();
  }
}
