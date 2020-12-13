import dayjs from "dayjs";
import {getRandomInteger} from "../utils.js";
import {MAX_SENTENCE_OF_DESCRIPTION,
  MIN_SENTENCE_OF_DESCRIPTION,
  MAX_COMMENTS,
  MIN_COMMENTS
} from "../const.js";

let nanoid = (t = 5)=>{
  let e = ``; let r = crypto.getRandomValues(new Uint8Array(t)); for (;t--;) {
    /*eslint-disable */
    let n = 63 & r[t]; e += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? `_` : `-`;
  /*eslint-disable */
  } return e;
};

const getDaysAgo = () => {
  const dayAgo = getRandomInteger(0, dayjs().format(`D`));
  return dayAgo;
};

const getDate = () => {
  const dayAgo = getRandomInteger(0, dayjs().format(`D`));
  return dayjs().subtract(dayAgo, `day`);
};

const getMessage = () => {
  const messages = [
    `Классный фильм`,
    `Полный отстой`,
    `Здорово посмеялась`,
    `Местами смешно`,
    `Плакала пока писала код`,
    `Иногда хочется перeсмотреть этот фильм`,
    `Почему в фильме не смотрят на дорогу, когда ведут машину`,
    `Тор красавчик`,
    `Вечером с сыном доклад про Кострому делать...и лайв еще...`
  ];
  const message = messages[getRandomInteger(0, messages.length - 1)];
return message;
};

const getAutor = () => {
  const autors = [
    `Кристина янь`,
    `Тон Су Ли`,
    `Здоровяк добряк`,
    `Аппетитный пирожок`,
    `ПОПУГАЙ`,
    `Веселый Антошка`,
    `Дед мороз`,
    `Тор`
  ];
  const autor = autors[getRandomInteger(0, autors.length - 1)];
return autor;
};

const getEmoji = () => {
const emojies = [
  `./images/emoji/smile.png`,
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
];
const emoji = emojies[getRandomInteger(0, emojies.length - 1)];
return emoji;
};

const generateComment = () => {
  return {
    id: nanoid(),
    text: getMessage(),
    emoji: getEmoji(),
    daysAgo: getDaysAgo(),
    date: getDate(),
    author: getAutor()
  };
};

const generateComments = (amount) => {
  let comments = {};
  for (let i = 0; i < amount; i++) {
    let comment = generateComment();
    comments[comment.id] = comment;
  }
return comments;
};
export const commentsCollection = generateComments(8);
export const createfilm = () => {
  const year = getYear();

  return {
    id: nanoid(),
    filmName: generateName(),
    poster: getPoster(),
    description: getDescription(),
    comments: getComments(),
    rating: getRating(),
    year,
    duration: getDuration(),
    genre: getGenre(),
    director: getDirector(),
    writers: getWriters(),
    actors: getActors(),
    releaseDate: dayjs().format(`D MMMM`) + ` ${year}`,
    country: getCountry(),
    //
    message: null,
    // isMessage: false,
    //
    isInHistory: Boolean(getRandomInteger(0, 1)),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isInFavorites: Boolean(getRandomInteger(0, 1))
  };
};

const shuffle = (arr) => {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const generateName = () => {
  const names = [
    `Сияние`,
    `Джентельмены`,
    `Побег из шоушенка`,
    `Убойные каникулы`,
    `Гарри Поттер`
  ];
  const getRandomIndex = getRandomInteger(0, names.length - 1);

  return names[getRandomIndex];
};

const getPoster = () => {
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];

  const getRandomIndex = getRandomInteger(0, posters.length - 1);

  return `./images/posters/${posters[getRandomIndex]}`;
};

const getDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const description = () => {
    let fullDescription = ``;
    const getRandom = getRandomInteger(MIN_SENTENCE_OF_DESCRIPTION, MAX_SENTENCE_OF_DESCRIPTION);
    for (let i = getRandom; i >= 1; i--) {
      const getRandomIndex = getRandomInteger(0, descriptions.length - 1);
      fullDescription += descriptions[getRandomIndex];
      if (getRandom > 1) {
        fullDescription = fullDescription + ` `;
      }
    }
    return fullDescription;
  };
  return description();
};

const getComments = () => {
  const commentQuantity = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];
  let commentsArray = Object.keys(commentsCollection);
  for (let i = 0; i < commentQuantity; i++) {
    comments.push(commentsArray[getRandomInteger(0,commentsArray.length - 1)]);
  }
  return comments;
};

const getRating = () => {
  const rate = `${getRandomInteger(1, 9)}.` + `${getRandomInteger(1, 9)}`;
  return rate;
};

const getYear = () => {
  const year = getRandomInteger(1980, 2020);
  return year;
};

const getDuration = () => {
  let duration = `${getRandomInteger(1, 2)}h ` + `${getRandomInteger(10, 59)}m`;
  return duration;
};

const getGenre = () => {
  const genres = [
    `Drama`,
    `Comedy`,
    `Triller`,
    `Crime`,
    `Romantic`,
    `Thriller`,
    `Biography`,
    `Adventure`
  ];
  const randomGentes = shuffle(genres);
  const quantityGenres = getRandomInteger(1, genres.length - 1);

  let genreX = [];
  for (let i = 0; i < quantityGenres; i++) {
    genreX.push(randomGentes[i]);
  }
  return genreX;
};

const getDirector = () => {

  const directors = [
    `Anthony Mann`,
    `Robert Zemekis`,
    `Christofer Nolan`,
    `Martin Scorsece`
  ];

  const director = directors[getRandomInteger(0, directors.length - 1)];
  return director;
};

const getWriters = () => {
  const writers = [
    `Lev Tolstoi`,
    `Prosto Gleb`,
    `Snegniy Cheloveck`,
    `Ne Letychaja Mish`,
    `Zeleniy Crocodil`,
    `Chelovek v maske`
  ];

  const randomWriters = shuffle(writers);
  const quantityWriters = getRandomInteger(1, writers.length - 1);
  const writersX = randomWriters.slice(0, quantityWriters).join(`, `);
  return writersX;
};

const getActors = () => {
  const actors = [
    `Jhonny Depp`,
    `Brad Pitt`,
    `Jim Carry`,
    `Nicole Kidman`,
    `Evan Macgregor`,
    `Zaika Pobegaika`
  ];

  const randomWriters = shuffle(actors);
  const quantityWriters = getRandomInteger(1, actors.length - 1);

  let actorsX = ``;
  for (let i = 0; i < quantityWriters; i++) {
    actorsX += randomWriters[i];
    if (i < quantityWriters - 1) {
      actorsX += `, `;
    }
  }
  return actorsX;
};

const getCountry = () => {
  const countries = [
    `USA`,
    `France`,
    `Albania`,
    `Belgium`,
    `China`,
    `Russia`,
    `Finland`
  ];
  const country = countries[getRandomInteger(0, countries.length - 1)];
  return country;
};


