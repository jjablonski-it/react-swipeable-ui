import { useLayoutEffect, useState } from "react";
import pageYfromTouch from "../helpers/pageYfromTouch";

export type Direction = "up" | "down" | null;

function useWindowsScroll() {
  const [direction, setDirection] = useState<Direction>(null);
  const [touchStartPos, setTouchStartPos] = useState<number | null>(null);
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
    const delta = touchStartPos - endPos;
    updateDirection(delta);
    setTouchStartPos(null);
  };

  useLayoutEffect(() => {
    window.addEventListener("mousewheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mousewheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  });

  return { direction, trigger };
}

export default useWindowsScroll;
