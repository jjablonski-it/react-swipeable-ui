import React, { ReactElement } from "react";
import { NavigationProps } from "../utils/module/Scroll";

interface Props extends NavigationProps {}

function TestNavigation({
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
        justifyContent: "space-between",
        fontSize: "1.3rem",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          minWidth: "25%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "2rem" }}>Logo</span>
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-around", flexGrow: 1 }}
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
    </div>
  );
}

export default TestNavigation;
