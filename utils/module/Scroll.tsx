import React, { useEffect, useState } from "react";
import useWindowsScroll, { Direction } from "./hooks/useWindowsScroll";
import styles from "../../styles/Pages.module.css";
import classes from "../helpers/classes";
import { motion, AnimatePresence } from "framer-motion";
import PageIndicator from "./comps/PageIndicator";

interface Props {
  children: JSX.Element[];
  page?: number;
  pageIndicator?: boolean;
}

function Scroll({ children, page = 0, pageIndicator = true }: Props) {
  const [currentPage, setCurrentPage] = useState(page);
  const [animating, setAnimating] = useState(true);
  const [realDirection, setRealDirection] = useState<Direction>(null);
  const { direction, trigger, offset } = useWindowsScroll();

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
  // console.log("offset", offset);

  const safePageChange = (page: number) => {
    if (!animating) {
      setCurrentPage(page);
      setAnimating(true);
    }
  };

  const handlePageChange = (direction) => {
    let newCurrentPage: number;
    if (direction === "up") {
      newCurrentPage = currentPage - 1;
    } else if (direction === "down") {
      newCurrentPage = currentPage + 1;
    }
    if (newCurrentPage >= 0 && newCurrentPage < pagesCount) {
      safePageChange(newCurrentPage);
    }
  };

  useEffect(() => {
    setAnimating(false);
  }, []);

  useEffect(() => {
    setRealDirection(direction);
  }, [direction]);

  useEffect(() => {
    if (!animating) handlePageChange(direction);
  }, [trigger]);

  return (
    <>
      {pageIndicator && (
        <PageIndicator
          pages={children}
          currentPage={currentPage}
          setCurrentPage={safePageChange}
        />
      )}
      <AnimatePresence initial={false}>
        <motion.div
          initial={{
            y: `${realDirection === "up" ? "-" : "+"}100%`,
          }}
          animate={{ y: -offset / 5 }}
          exit={{
            y: `${realDirection === "up" ? "+" : "-"}100%`,
          }}
          onAnimationComplete={() => {
            setAnimating(false);
          }}
          transition={{ type: "spring", damping: 100, stiffness: 1500 }}
          key={currentPage}
          className={styles.wrapper}
        >
          {CurrentPage}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Scroll;
