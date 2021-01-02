import { ComponentType, ReactNode, useEffect, useState } from "react";
import useWindowsScroll from "../hooks/useWindowsScroll";

interface Props {
  children: ReactNode;
  page: number;
}

function Scroll({ children, page = 0 }: Props) {
  const [currentPage, setCurrentPage] = useState(page);
  const { direction, trigger } = useWindowsScroll();

  const CurrentPage: ComponentType = children[currentPage];
  const pagesCount = (children as Array<ComponentType>).length;

  console.log("direction", direction);
  console.log("currentPage", currentPage);
  console.log("pagesCount", pagesCount);
  console.log("pagesCount", pagesCount);

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

  return <CurrentPage key={currentPage} />;
}

export default Scroll;
