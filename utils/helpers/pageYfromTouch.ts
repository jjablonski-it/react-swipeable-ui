const pageYfromTouch = (e) => {
  console.log(e);

  return e.changedTouches[0].pageY;
};

export default pageYfromTouch;
