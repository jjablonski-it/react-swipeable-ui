import { cloneElement, ReactElement, useEffect, useState } from "react";
import useWindowsScroll from "../hooks/useWindowsScroll";

interface Props {
  children: JSX.Element[];
  page?: number;
}

function Scroll({ children, page = 0 }: Props) {
  const [currentPage, setCurrentPage] = useState(page);
  const { direction, trigger } = useWindowsScroll();

  const CurrentPage = children[currentPage];
  const pagesCount = children.length;

  console.log("direction", direction);
  console.log("currentPage", currentPage);
  console.log("pagesCount", pagesCount);
  console.log("pagesCount", pagesCount);

  const getFinalPage = (Component: JSX.Element, key: number) => {
    const clone = cloneElement(Component, {
      key,
    });
    console.log(clone);

    return clone;
  };

  const handlePageChange = (direction) => {
    let newCurrentPage: number;
    if (direction === "up") {
      newCurrentPage = currentPage - 1;
    } else if (direction === "down") {
      newCurrentPage = currentPage + 1;
    }
    if (newCurrentPage >= 0 && newCurrentPage < pagesCount) {
      setCurrentPage(newCurrentPage);
    }
  };

  useEffect(() => {
    handlePageChange(direction);
  }, [trigger]);

  return getFinalPage(CurrentPage, currentPage);
}

export default Scroll;
