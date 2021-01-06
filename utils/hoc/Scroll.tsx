import React, { useEffect, useState } from "react";
import useWindowsScroll from "../hooks/useWindowsScroll";
import styles from "../../styles/Pages.module.css";
import classes from "../helpers/classes";

interface Props {
  children: JSX.Element[];
  page?: number;
}

function Scroll({ children, page = 0 }: Props) {
  const [currentPage, setCurrentPage] = useState(page);
  const { direction, trigger } = useWindowsScroll();

  const pageStyle = styles.page;

  const childrenWithProps = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      const childClasses = (child.props as any).className;
      return React.cloneElement(child, {
        key: i,
        //@ts-ignore
        className: classes(childClasses, pageStyle),
      });
    }
    return child;
  });

  const CurrentPage = childrenWithProps[currentPage];
  const pagesCount = children.length;

  // console.log("direction", direction);
  // console.log("currentPage", currentPage);
  // console.log("pagesCount", pagesCount);
  // console.log("pagesCount", pagesCount);

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

  return CurrentPage;
}

export default Scroll;
