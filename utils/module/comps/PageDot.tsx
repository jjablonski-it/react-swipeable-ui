import React, { ReactElement } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styles from "../../../styles/Pages.module.css";
import { PageIndicator } from "../Scroll";

interface Props {
  page: JSX.Element;
  current: boolean;
  index: number;
  show: boolean;
  setCurrentPage: (page: number) => void;
}

const size = 13;

const wrapper: Variants = {
  default: (current) => ({
    scale: current ? 1.4 : 1,
  }),
  hover: (current) => ({
    scale: current ? 1.4 : 1.3,
    transition: { type: "spring", delayChildren: 1 },
  }),
};

const dot: Variants = {
  default: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
  leave: {
    opacity: 0,
    transition: { delay: 0.3 },
  },
};

function PageDot({
  page,
  current,
  index,
  setCurrentPage,
  show,
}: Props): ReactElement {
  return (
    <motion.div
      className={styles.pageDot}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      custom={current}
      variants={wrapper}
      animate="default"
      whileHover="hover"
      onClick={() => {
        setCurrentPage(index);
      }}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            variants={dot}
            initial="default"
            animate="hover"
            exit="leave"
          >
            {page.props.pageName || `Page ${index + 1}`}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PageDot;
