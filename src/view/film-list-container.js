import Abstract from "../view/abstract.js";

const createFilmList = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmListContainer extends Abstract {

  getTemplate() {
    return createFilmList();
  }
}
