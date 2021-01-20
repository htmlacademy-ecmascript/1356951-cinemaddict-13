export const diff = function (prev, newElement) {
  return prev.filter(function (i) {
    return newElement.indexOf(i) < 0;
  });
};

export const State = {
  SENDING: `SENDING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};


