export const pageYfromTouch = (e: TouchEvent) => {
  return e.changedTouches[0].pageY;
};

export const pageYfromClick = (e: MouseEvent) => {
  return e.pageY;
};

export const deltaDiff = (startPos: number, endPos: number) => {
  return startPos - endPos;
};
