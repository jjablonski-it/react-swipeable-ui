export const pageYfromTouch = (e) => {
  return e.changedTouches[0].pageY;
};

export const deltaFormTouch = (startPos, endPos) => {
  return startPos - endPos;
};
