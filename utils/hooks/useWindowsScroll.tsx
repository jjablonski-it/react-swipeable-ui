import { useLayoutEffect, useState } from "react";
import { pageYfromTouch, deltaFormTouch } from "../helpers/windowEvents";

export type Direction = "up" | "down" | null;

function useWindowsScroll() {
  const [direction, setDirection] = useState<Direction>(null);
  const [touchStartPos, setTouchStartPos] = useState<number | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);

  const updateDirection = (delta: number) => {
    let dir: Direction;

    if (delta < 0) {
      dir = "up";
    } else if (delta > 0) {
      dir = "down";
    } else {
      dir = null;
    }
    setDirection(dir);
    setTrigger(!trigger);
  };

  const handleScroll = (e) => {
    const delta = e.deltaY;
    updateDirection(delta);
  };

  const handleTouchStart = (e) => {
    setTouchStartPos(pageYfromTouch(e));
  };

  const handleTouchEnd = (e) => {
    const endPos = pageYfromTouch(e);
    const delta = deltaFormTouch(touchStartPos, endPos);
    updateDirection(delta);
    setTouchStartPos(null);
    setOffset(0);
  };

  const handleTouchMove = (e) => {
    const endPos = pageYfromTouch(e);
    setOffset(deltaFormTouch(touchStartPos, endPos));
  };

  useLayoutEffect(() => {
    window.addEventListener("mousewheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousewheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  });

  return { direction, trigger, offset };
}

export default useWindowsScroll;
