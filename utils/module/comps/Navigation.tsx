import React, { ReactElement } from "react";
import { NavigationProps } from "../Scroll";

interface Props extends NavigationProps {}

function Navigation({
  pages,
  currentPage,
  forcePageChange,
}: Props): ReactElement {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        display: "flex",
        zIndex: 1,
        paddingLeft: "30%",
        justifyContent: "space-around",
        fontSize: "1.5rem",
      }}
    >
      {pages.map((page, i) => (
        <div
          key={i}
          onClick={() => forcePageChange(i)}
          style={{
            cursor: "pointer",
            textDecoration: currentPage === i ? "underline" : "none",
            color: "white",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          {page.props.pageName || `Page ${i + 1}`}
        </div>
      ))}
    </div>
  );
}

export default Navigation;
