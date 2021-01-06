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
  const size = current ? 20 : 15;

  return (
    <motion.div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.5,
        backgroundColor: "gray",
        borderRadius: "50%",
        margin: "5px 0",
      }}
      onClick={() => {
        setCurrentPage(index);
      }}
    ></motion.div>
  );
}

export default PageDot;
