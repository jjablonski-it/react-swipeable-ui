import React, { ReactElement, useState } from "react";
import { PageIndicator as _PageIndicator } from "../Scroll";
import PageDot from "./PageDot";
import styles from "../../../styles/Pages.module.css";

interface Props {
  currentPage: number;
  pages: JSX.Element[];
  setCurrentPage: (page: number) => void;
  type: _PageIndicator;
  force: boolean;
}

function PageIndicator({
  pages,
  currentPage,
  setCurrentPage,
  type,
  force,
}: Props): ReactElement {
  const [show, setShow] = useState(false);

  return (
    <div
      className={styles.pageIndicator}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseOut={() => setShow(true)}
    >
      {pages.map((page, i) => (
        <PageDot
          key={i}
          page={page}
          current={currentPage === i}
          index={i}
          setCurrentPage={setCurrentPage}
          show={
            (type !== "never" && show) ||
            (type !== "hover-only" && force) ||
            type === "always"
          }
        />
      ))}
    </div>
  );
}

export default PageIndicator;
