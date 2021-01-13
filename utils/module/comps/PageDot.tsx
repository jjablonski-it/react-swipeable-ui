import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import styles from "../../../styles/Pages.module.css";
import { PageIndicator } from "../Scroll";

interface Props {
  page: JSX.Element;
  current: boolean;
  index: number;
  type: PageIndicator;
  setCurrentPage: (page: number) => void;
}

function PageDot({
  page,
  current,
  index,
  setCurrentPage,
  type,
}: Props): ReactElement {
  const size = 11;

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
      {type !== "never" && (
        <div style={{ display: type == "always" ? "block" : "none" }}>
          {page.props.pageName || `Page ${index + 1}`}
        </div>
      )}
    </motion.div>
  );
}

export default PageDot;
