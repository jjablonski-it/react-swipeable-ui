import { useLayoutEffect, useState } from "react";

export type Direction = "up" | "down" | null;

function useWindowsScroll() {
  const [direction, setDirection] = useState<Direction>(null);
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleListener = (e) => {
    const delta = e.deltaY;
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

  useLayoutEffect(() => {
    window.addEventListener("mousewheel", handleListener);
    return () => {
      window.removeEventListener("mousewheel", handleListener);
    };
  });

  return { direction, trigger };
}

export default useWindowsScroll;
