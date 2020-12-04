import Abstract from "../view/abstract.js";

const createFilmContainer = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class FilmContainer extends Abstract {

  getTemplate() {
    return createFilmContainer();
  }
}
