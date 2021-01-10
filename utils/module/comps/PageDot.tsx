import React, { ReactElement } from "react";
import { motion } from "framer-motion";

interface Props {
  page: JSX.Element;
  current: boolean;
  index: number;
  setCurrentPage: (page: number) => void;
}

function PageDot({
  page,
  current,
  index,
  setCurrentPage,
}: Props): ReactElement {
  const size = 10;

  return (
    <motion.div
      style={{
        opacity: 0.4,
        backgroundColor: "gray",
        borderRadius: "50%",
        margin: "5px 0",
        cursor: "pointer",
        width: `${size}px`,
        height: `${size}px`,
      }}
      animate={{ scale: current ? 1.4 : 1 }}
      whileHover={{ scale: 1.2 }}
      onClick={() => {
        setCurrentPage(index);
      }}
    ></motion.div>
  );
}

export default PageDot;
