import Abstract from "../view/abstract.js";

const createFilmList = () => {
  return (
    `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

    </section>`
  );
};

export default class FilmListCommented extends Abstract {

  getTemplate() {
    return createFilmList();
  }
}
