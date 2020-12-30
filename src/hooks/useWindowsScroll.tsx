import { useLayoutEffect, useState } from "react";

type Direction = "up" | "down" | null;

function useWindowsScroll() {
  const [direction, setDirection] = useState<Direction>(null);
  const [lastYOffset, setLastYOffset] = useState<number>(0);

  const handleListener = () => {
    const yOffset = window.scrollY;
    setDirection(yOffset > lastYOffset ? "down" : "up");
    setLastYOffset(window.scrollY);
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleListener);
    return () => {
      window.removeEventListener("scroll", handleListener);
    };
  });

  return { direction };
}

export default useWindowsScroll;
