import { useLayoutEffect, useState } from "react";
import {
  pageYfromTouch,
  deltaDiff,
  pageYfromClick,
} from "../../helpers/windowEvents";

export type Direction = "up" | "down" | null;

function useWindowsScroll() {
  const [direction, setDirection] = useState<Direction>(null);
  const [startPos, setStartPos] = useState<number | null>(null);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
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
    setStartPos(pageYfromTouch(e));
  };

  const handleTouchEnd = (e) => {
    const endPos = pageYfromTouch(e);
    const delta = deltaDiff(startPos, endPos);
    updateDirection(delta);
    setStartPos(null);
    setOffset(0);
  };

  const handleTouchMove = (e) => {
    const currentPos = pageYfromTouch(e);
    console.log("start", startPos);
    console.log("current", currentPos);
    setOffset(deltaDiff(startPos, currentPos));
  };

  const handleMouseDown = (e) => {
    setStartPos(pageYfromClick(e));
    setMouseDown(true);
  };

  const handleMouseMove = (e) => {
    if (!mouseDown) return;
    const currentPos = pageYfromClick(e);
    setOffset(deltaDiff(startPos, currentPos));
  };

  const handleMouseUp = (e) => {
    if (!mouseDown) return;
    const endPos = pageYfromClick(e);
    const delta = deltaDiff(startPos, endPos);
    updateDirection(delta);
    setMouseDown(false);
    setStartPos(null);
    setOffset(0);
  };

  useLayoutEffect(() => {
    window.removeEventListener("mousewheel", handleScroll);

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseout", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousewheel", handleScroll);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);

      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseout", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return { direction, trigger, offset };
}

export default useWindowsScroll;
