export const pageYfromTouch = (e) => {
  return e.changedTouches[0].pageY;
};

export const pageYfromClick = (e) => {
  return e.pageY;
};

export const deltaDiff = (startPos, endPos) => {
  return startPos - endPos;
};
