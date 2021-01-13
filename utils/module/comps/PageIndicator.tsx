import React, { ReactElement } from "react";
import { PageIndicator as PageIndicatorType } from "../Scroll";
import PageDot from "./PageDot";
import styles from "../../../styles/Pages.module.css";

interface Props {
  currentPage: number;
  pages: JSX.Element[];
  setCurrentPage: (page: number) => void;
  type: PageIndicatorType;
}

function PageIndicator({
  pages,
  currentPage,
  setCurrentPage,
  type,
}: Props): ReactElement {
  return (
    <div className={styles.pageIndicator}>
      {pages.map((page, i) => (
        <PageDot
          key={i}
          page={page}
          current={currentPage === i}
          index={i}
          setCurrentPage={setCurrentPage}
          type={type}
        />
      ))}
    </div>
  );
}

export default PageIndicator;
