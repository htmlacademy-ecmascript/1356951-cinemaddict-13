import dayjs from "dayjs";
import {getRandomInteger} from "../utils.js";
import {MAX_SENTENCE_OF_DESCRIPTION,
  MIN_SENTENCE_OF_DESCRIPTION,
  MAX_COMMENTS,
  MIN_COMMENTS
} from "../const.js";

export const createfilm = () => {
  const year = getYear();

  return {
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

const getDaysAgo = () => {
  const dayAgo = getRandomInteger(0, dayjs().format(`D`));
  return dayAgo;
};

const getDate = () => {
  const dayAgo = getRandomInteger(0, dayjs().format(`D`));
  return dayjs().subtract(dayAgo, `day`);
};

const commentsCollection = [
  {
    id: 1,
    text: `класс`,
    emoji: `./images/emoji/smile.png`,
    daysAgo: getDaysAgo(),
    date: getDate(),
    author: `Roza`
  },
  {
    id: 2,
    text: `супер`,
    emoji: `./images/emoji/smile.png`,
    daysAgo: getDaysAgo(),
    date: getDate(),
    author: `Keks`
  },
  {
    id: 3,
    text: `ужас`,
    emoji: `./images/emoji/angry.png`,
    daysAgo: getDaysAgo(),
    date: getDate(),
    author: `Colobock`
  },
  {
    id: 4,
    text: `здорово`,
    emoji: `./images/emoji/smile.png`,
    daysAgo: getDaysAgo(),
    date: getDate(),
    author: `Compot`
  },
  {
    id: 5,
    text: `зря потраченной время`,
    emoji: `./images/emoji/angry.png`,
    daysAgo: getDaysAgo(),
    date: getDate(),
    author: `Clava`
  },
  {
    id: 6,
    text: `веселый`,
    emoji: `./images/emoji/puke.png`,
    daysAgo: getDaysAgo(),
    date: getDate(),
    author: `Chaplin`
  },
  {
    id: 7,
    text: `великолепный`,
    emoji: `./images/emoji/sleeping.png`,
    daysAgo: getDaysAgo(),
    date: getDate(),
    author: `Doll`
  }
];

const comments = shuffle(commentsCollection);

const getComments = () => {
  const commentQuantity = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);

  let commentsArray = comments.slice(0, commentQuantity);
  /* = [];
  if (commentQuantity > 0) {
    for (let i = 0; i < commentQuantity; i++) {
      commentsArray.push(comments[i]);
    }
  }*/

  /* const commentsId = new Array(commentsArray.length)
  .fill().map(commentsArray.id);*/
  return commentsArray;
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

  /* let writersX = ``;
  for (let i = 0; i < quantityWriters; i++) {
    writersX += randomWriters[i];
    if (i < quantityWriters - 1) {
      writersX += `, `;
    }
  }*/
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


