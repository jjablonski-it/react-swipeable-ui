import React, { ReactElement, useEffect, useState } from "react";
import useWindowsScroll, { Direction } from "../../hooks/useWindowsScroll";
import styles from "../../styles/Scroll.module.css";
import { motion, Variants } from "framer-motion";
import PageIndicator from "./dep/PageIndicator";
import { useRouter } from "next/dist/client/router";
import DefaultNavigation from "./dep/Navigation";
import classes from "../../utils/helpers/classes";

export type Page = JSX.Element;
export interface PageProps {
  pageName?: string;
}
export interface NavigationProps {
  pages: Page[];
  currentPage: number;
  forcePageChange: (page: number) => void;
}

export type PageIndicator =
  | boolean
  | "always"
  | "hover"
  | "hover-only"
  | "never";

type NavigationFunction = (props: NavigationProps) => JSX.Element;
type NavigationProp = NavigationFunction | boolean;
interface Props {
  children: Page[];
  pageIndicator?: PageIndicator;
  navigation?: NavigationProp;
}

const initialVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: (currentPage) => ({
    opacity: 1,
    y: currentPage === 0 ? ["0%", "-3%", "-3%", "-3%", "0%"] : 0,
    transition: {
      opactiy: { duration: 0.8 },
      y: {
        delay: 0.5,
        duration: 0.6,
      },
    },
  }),
  exit: { opacity: 1 },
};

const baseVariants = (direction, offset): Variants => {
  const offsetPx = -offset / 3;
  return {
    initial: {
      y: `${direction === "up" ? "-" : "+"}100%`,
      marginTop: offsetPx,
    },
    animate: {
      y: offsetPx,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 90,
        stiffness: 1000,
      },
    },
    exit: {
      y: `${direction === "up" ? "+" : "-"}100%`,
      marginTop: offsetPx,
    },
  };
};

function Scroll({ children, pageIndicator = true, navigation = false }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [animating, setAnimating] = useState(true);
  const [realDirection, setRealDirection] = useState<Direction>(null);
  const [destPage, setDestPage] = useState<number>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const router = useRouter();

  // Load page from url label
  const currentPageId = +router.asPath.replace("/#", "");

  // Custom use window hook
  const { direction, trigger, offset } = useWindowsScroll();

  const mapChild = (child: Page, key: number) => (
    <div
      className={classes(styles.page, key % 2 === 0 ? styles.odd : "")}
      key={key}
    >
      {child}
    </div>
  );

  const childrenWithProps = React.Children.map(children, mapChild);

  const PreviousPage = childrenWithProps[currentPage - 1];
  const CurrentPage = childrenWithProps[currentPage];
  const NextPage = childrenWithProps[currentPage + 1];
  const pagesCount = children.length;

  const createNavigation = (
    navigation: NavigationProp,
    props: NavigationProps
  ): ReactElement => {
    // TODO: correct type definitions
    if (!navigation) return null;

    if (navigation === true) return <DefaultNavigation {...props} />;
    return navigation(props);
  };

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

  const forcePageChange = (page: number) => {
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
    if (
      currentPageId &&
      currentPageId !== NaN &&
      currentPageId !== currentPage &&
      children.some((_, i) => currentPageId === i) // redirect only if page exits
    ) {
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

  const Navigation = createNavigation(navigation, {
    currentPage,
    forcePageChange,
    pages: children,
  });

  return (
    <>
      {Navigation}
      {pageIndicator && (
        <PageIndicator
          pages={children}
          currentPage={currentPage}
          setCurrentPage={forcePageChange}
          type={pageIndicator}
          force={animating}
        />
      )}
      <motion.div
        custom={currentPage}
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