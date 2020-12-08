import Abstract from "../view/abstract.js";

const createFilmListTop = () => {
  return (
    `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

    </section>`
  );
};

export default class FilmListTop extends Abstract {

  getTemplate() {
    return createFilmListTop();
  }
}
