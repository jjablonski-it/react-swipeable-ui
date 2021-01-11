import React, { useEffect, useState } from "react";
import useWindowsScroll, { Direction } from "./hooks/useWindowsScroll";
import styles from "../../styles/Pages.module.css";
import classes from "../helpers/classes";
import { motion, Variants } from "framer-motion";
import PageIndicator from "./comps/PageIndicator";
import { useRouter } from "next/dist/client/router";
interface Props {
  children: JSX.Element[];
  page?: number;
  pageIndicator?: boolean;
}

const initialVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.75 },
  },
  exit: { opacity: 1 },
};

const baseVariants = (direction, offset): Variants => ({
  initial: {
    y: `${direction === "up" ? "-" : "+"}100%`,
  },
  animate: {
    y: -offset / 3,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 90,
      stiffness: 1250,
    },
  },
  exit: {
    y: `${direction === "up" ? "+" : "-"}100%`,
  },
});

function Scroll({ children, page = 0, pageIndicator = true }: Props) {
  const [currentPage, setCurrentPage] = useState(page);
  const [animating, setAnimating] = useState(true);
  const [realDirection, setRealDirection] = useState<Direction>(null);
  const [destPage, setDestPage] = useState<number>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const router = useRouter();
  console.log(router);

  const currentPageId = +router.asPath.replace("/#", "");

  // Custom use window hook
  const { direction, trigger, offset } = useWindowsScroll();

  // Load page from url

  const pageStyle = styles.page;

  const mapChild = (child: JSX.Element, key: number): JSX.Element => {
    if (React.isValidElement(child)) {
      const childClasses = (child.props as any).className;
      return React.cloneElement(child, {
        key,
        //@ts-ignore
        className: classes(childClasses, pageStyle),
      });
    }
    return child;
  };

  const childrenWithProps = React.Children.map(children, mapChild);

  const PreviousPage = childrenWithProps[currentPage - 1];
  const CurrentPage = childrenWithProps[currentPage];
  const NextPage = childrenWithProps[currentPage + 1];
  const pagesCount = children.length;

  const updatePage = (page: number) => {
    if (!animating && page >= 0 && page < pagesCount) {
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
    updatePage(newCurrentPage);
  };

  const forcePageChange = (page) => {
    if (animating || page === currentPage) return;
    if (page < currentPage) setRealDirection("up");
    else if (page > currentPage) setRealDirection("down");
    else setRealDirection(null);
    setDestPage(page);
  };

  const handleForcePageChange = () => {
    updatePage(destPage);
    setDestPage(null);
  };

  useEffect(() => {
    // console.log("currentPageId", currentPageId);
    // console.log("currentPage", currentPage);

    if (
      currentPageId &&
      currentPageId !== NaN &&
      currentPageId !== currentPage
    ) {
      console.log("UPDATE");
      setCurrentPage(currentPageId);
    }
  }, [router]);

  useEffect(() => {
    if (currentPage !== NaN && currentPageId !== currentPage)
      router.push(`/#${currentPage}`);
  }, [currentPage]);

  useEffect(() => {
    setRealDirection(direction);
  }, [direction]);

  useEffect(() => {
    setRealDirection(direction);
    if (!animating) handlePageChange(direction);
  }, [trigger]);

  useEffect(() => {
    if (destPage !== null) handleForcePageChange();
  }, [destPage]);

  if (currentPageId !== currentPage && !animating) return <></>;

  return (
    <>
      {pageIndicator && (
        <PageIndicator
          pages={children}
          currentPage={currentPage}
          setCurrentPage={forcePageChange}
        />
      )}
      <motion.div
        variants={
          isFirstRender
            ? initialVariants
            : baseVariants(realDirection, animating ? 0 : offset)
        }
        initial="initial"
        animate="animate"
        exit="exit"
        onAnimationComplete={() => {
          if (isFirstRender) setIsFirstRender(false);
          setAnimating(false);
        }}
        key={currentPage}
        className={styles.wrapper}
      >
        <div style={{ height: "100%", marginTop: "-100vh" }}>
          {PreviousPage}
        </div>
        {CurrentPage}
        {NextPage}
      </motion.div>
    </>
  );
}

export default Scroll;
