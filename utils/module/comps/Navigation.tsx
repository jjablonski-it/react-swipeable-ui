import React, { ReactElement } from "react";
import { NavigationProps } from "../Scroll";
import styles from "../../../styles/Pages.module.css";

interface Props extends NavigationProps {}

function Navigation({
  pages,
  currentPage,
  forcePageChange,
}: Props): ReactElement {
  return (
    <div className={styles.navigation}>
      {pages.map((page, i) => (
        <div
          key={i}
          onClick={() => forcePageChange(i)}
          style={{
            textDecoration: currentPage === i ? "underline" : "none",
          }}
        >
          {page.props.pageName || `Page ${i + 1}`}
        </div>
      ))}
    </div>
  );
}

export default Navigation;
