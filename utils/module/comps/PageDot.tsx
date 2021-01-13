import React, { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../../../styles/Pages.module.css";
import { PageIndicator } from "../Scroll";

interface Props {
  page: JSX.Element;
  current: boolean;
  index: number;
  show: boolean;
  setCurrentPage: (page: number) => void;
}

function PageDot({
  page,
  current,
  index,
  setCurrentPage,
  show,
}: Props): ReactElement {
  const size = 10;

  return (
    <motion.div
      className={styles.pageDot}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      animate={{ scale: current ? 1.3 : 1 }}
      whileHover={{ scale: current ? 1.25 : 1.2 }}
      onClick={() => {
        setCurrentPage(index);
      }}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {page.props.pageName || `Page ${index + 1}`}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PageDot;
