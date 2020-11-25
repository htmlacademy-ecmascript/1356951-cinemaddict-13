/* const getResult = (films = {}) => {
  const {rating, releaseDate} = films;


};*/

export const createFilterTemplate = (/* films*/) => {
  // const result = getResult(films);
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
    </ul>`
  );
};
